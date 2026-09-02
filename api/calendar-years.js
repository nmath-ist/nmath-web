import { getSupabase } from './_supabase.js';
import { isAuthenticated } from './_auth.js';

// Nota: o link de recrutamento (botão "Candidata-te") também é servido
// por esta função, em vez de ter a sua própria — o plano Hobby da Vercel
// só permite 12 funções serverless, por isso reaproveitamos esta rota
// (que já é "definições simples, uma linha só, como o calendário") com
// ?resource=recruitment em vez de criar api/recruitment-link.js.
async function handleRecruitmentLink(req, res, supabase) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('recruitment_link')
      .select('*')
      .eq('id', 1)
      .single();
    if (error) throw error;
    return res.status(200).json(data);
  }

  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  if (req.method === 'PUT') {
    const b = req.body || {};
    if (!b.link) return res.status(400).json({ error: 'Link é obrigatório.' });
    const { data, error } = await supabase
      .from('recruitment_link')
      .update({ link: b.link })
      .eq('id', 1)
      .select()
      .single();
    if (error) throw error;
    return res.status(200).json(data);
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Método não permitido' });
}

export default async function handler(req, res) {
  try {
    const supabase = getSupabase();

    if (req.query?.resource === 'recruitment') {
      return handleRecruitmentLink(req, res, supabase);
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('calendar_years')
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
      if (!b.year_label || !b.calendar_link) {
        return res.status(400).json({ error: 'Nome do ano e link do calendário são obrigatórios.' });
      }
      const { data, error } = await supabase
        .from('calendar_years')
        .insert({
          year_label: b.year_label,
          calendar_link: b.calendar_link,
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
        .from('calendar_years')
        .update({
          year_label: b.year_label,
          calendar_link: b.calendar_link,
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
      const { error } = await supabase.from('calendar_years').delete().eq('id', id);
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
