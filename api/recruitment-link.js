import { getSupabase } from './_supabase.js';
import { isAuthenticated } from './_auth.js';

// Guarda o link do botão "Candidata-te" da secção da Equipa. É só uma
// linha (id fixo = 1) — tal como os links dos calendários, mas sem lista.
export default async function handler(req, res) {
  try {
    const supabase = getSupabase();

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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Erro no servidor' });
  }
}
