import { getSupabase } from './_supabase.js';

const SITE_URL = 'https://www.nmath.pt';

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function slugify(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

// Feed RSS 2.0 dos anúncios publicados, para quem quiser subscrever
// novidades do NMATH num leitor de feeds, bot de Discord/Telegram, etc.
export default async function handler(req, res) {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('announcements')
      .select('id, title, excerpt, category, created_at')
      .is('deleted_at', null)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;

    const items = (data || [])
      .map((item) => {
        const slug = slugify(item.title);
        const link = `${SITE_URL}/anuncios/${item.id}${slug ? `-${slug}` : ''}`;
        const pubDate = new Date(item.created_at).toUTCString();
        return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(item.excerpt)}</description>
      <category>${escapeXml(item.category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
      })
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>NMATH — Anúncios</title>
    <link>${SITE_URL}/anuncios</link>
    <description>Anúncios e oportunidades do Núcleo de Estudantes de Matemática do IST</description>
    <language>pt-PT</language>
${items}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    return res.status(200).send(xml);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Erro no servidor' });
  }
}
