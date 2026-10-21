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

// Eventos do Google Calendar, lidos do endereço iCal guardado em GOOGLE_CALENDAR_ICS_URL.
// Também vive nesta função (?resource=events) para não gastar mais uma das 12 funções do plano.
// O import é dinâmico de propósito: se faltar a biblioteca, só os eventos falham e o resto
// (links do calendário, recrutamento) continua a funcionar.
async function handleCalendarEvents(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Método não permitido' });
  }
  const url = process.env.GOOGLE_CALENDAR_ICS_URL;
  if (!url) return res.status(200).json({ configured: false, events: [] });
  try {
    const { fetchCalendarEvents } = await import('./_ics.js');
    const events = await fetchCalendarEvents(url);
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=900');
    return res.status(200).json({ configured: true, events });
  } catch (err) {
    console.error('Erro a ler o Google Calendar:', err);
    return res.status(200).json({ configured: true, events: [], error: 'Não foi possível ler o calendário.' });
  }
}

export default async function handler(req, res) {
  try {
    if (req.query?.resource === 'events') {
      return handleCalendarEvents(req, res);
    }

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
