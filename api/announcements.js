import { getSupabase } from './_supabase.js';
import { isAuthenticated } from './_auth.js';

export default async function handler(req, res) {
  try {
    const supabase = getSupabase();

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('id', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    if (req.method === 'POST') {
      const b = req.body || {};
      if (!b.title || !b.excerpt || !b.event_date) {
        return res.status(400).json({ error: 'Título, resumo e data são obrigatórios.' });
      }
      const { data, error } = await supabase
        .from('announcements')
        .insert({
          title: b.title,
          excerpt: b.excerpt,
          category: b.category || 'Eventos',
          event_date: b.event_date,
          read_time: b.read_time || '2 min',
          featured: !!b.featured,
          icon: b.icon || 'calendar',
          full_content: b.full_content || '',
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
        .from('announcements')
        .update({
          title: b.title,
          excerpt: b.excerpt,
          category: b.category || 'Eventos',
          event_date: b.event_date,
          read_time: b.read_time || '2 min',
          featured: !!b.featured,
          icon: b.icon || 'calendar',
          full_content: b.full_content || '',
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
      const { error } = await supabase.from('announcements').delete().eq('id', id);
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
