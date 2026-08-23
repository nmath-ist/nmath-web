import { getSupabase } from './_supabase.js';
import { isAuthenticated } from './_auth.js';

export default async function handler(req, res) {
  try {
    const supabase = getSupabase();

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('magazine_editions')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    if (req.method === 'POST') {
      const b = req.body || {};
      if (!b.title || !b.cover_image_url || !b.link) {
        return res.status(400).json({ error: 'Título, imagem de capa e link são obrigatórios.' });
      }
      const { data, error } = await supabase
        .from('magazine_editions')
        .insert({
          title: b.title,
          issue: b.issue || '',
          cover_image_url: b.cover_image_url,
          description: b.description || '',
          highlights: b.highlights || '',
          publish_date: b.publish_date || '',
          link: b.link,
          is_current: !!b.is_current,
          sort_order: Number(b.sort_order) || 0,
        })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const b = req.body || {};
      if (!b.id) return res.status(400).json({ error: 'id em falta' });
      const { data, error } = await supabase
        .from('magazine_editions')
        .update({
          title: b.title,
          issue: b.issue || '',
          cover_image_url: b.cover_image_url,
          description: b.description || '',
          highlights: b.highlights || '',
          publish_date: b.publish_date || '',
          link: b.link,
          is_current: !!b.is_current,
          sort_order: Number(b.sort_order) || 0,
        })
        .eq('id', b.id)
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id;
      if (!id) return res.status(400).json({ error: 'id em falta' });
      const { error } = await supabase.from('magazine_editions').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Erro no servidor' });
  }
}
