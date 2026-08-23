import { getSupabase } from './_supabase.js';
import { isAuthenticated } from './_auth.js';

// Fábrica de handlers CRUD partilhada por announcements, magazine, flagship
// events, oracle episodes e upcoming events. Todas seguem a mesma regra:
//  - GET público: só linhas publicadas e não apagadas
//  - GET autenticado: todas as linhas não apagadas (inclui rascunhos)
//  - GET autenticado com ?trash=true: só as apagadas (para o "Lixo" do admin)
//  - DELETE normal: soft-delete (marca deleted_at)
//  - DELETE ?permanent=true: apaga mesmo, sem volta
//  - PUT com { action: 'restore', id }: repõe um item do lixo
export function createContentHandler(table, fields, { requiredFields = [] } = {}) {
  return async function handler(req, res) {
    try {
      const supabase = getSupabase();
      const authed = isAuthenticated(req);

      if (req.method === 'GET') {
        let query = supabase.from(table).select('*');

        if (req.query?.trash === 'true') {
          if (!authed) return res.status(401).json({ error: 'Não autenticado' });
          query = query.not('deleted_at', 'is', null).order('deleted_at', { ascending: false });
        } else if (authed) {
          query = query.is('deleted_at', null).order('sort_order', { ascending: true });
        } else {
          query = query
            .is('deleted_at', null)
            .eq('published', true)
            .order('sort_order', { ascending: true });
        }

        const { data, error } = await query;
        if (error) throw error;
        return res.status(200).json(data);
      }

      if (!authed) {
        return res.status(401).json({ error: 'Não autenticado' });
      }

      if (req.method === 'POST') {
        const b = req.body || {};
        for (const f of requiredFields) {
          if (!b[f]) return res.status(400).json({ error: `Campo obrigatório em falta: ${f}` });
        }
        const payload = {};
        for (const f of fields) if (b[f] !== undefined) payload[f] = b[f];

        const { data, error } = await supabase.from(table).insert(payload).select().single();
        if (error) throw error;
        return res.status(201).json(data);
      }

      if (req.method === 'PUT') {
        const b = req.body || {};
        if (!b.id) return res.status(400).json({ error: 'id em falta' });

        if (b.action === 'restore') {
          const { data, error } = await supabase
            .from(table)
            .update({ deleted_at: null })
            .eq('id', b.id)
            .select()
            .single();
          if (error) throw error;
          return res.status(200).json(data);
        }

        const payload = {};
        for (const f of fields) if (b[f] !== undefined) payload[f] = b[f];

        const { data, error } = await supabase
          .from(table)
          .update(payload)
          .eq('id', b.id)
          .select()
          .single();
        if (error) throw error;
        return res.status(200).json(data);
      }

      if (req.method === 'DELETE') {
        const id = req.query?.id;
        if (!id) return res.status(400).json({ error: 'id em falta' });

        if (req.query?.permanent === 'true') {
          const { error } = await supabase.from(table).delete().eq('id', id);
          if (error) throw error;
          return res.status(200).json({ ok: true, permanent: true });
        }

        const { error } = await supabase
          .from(table)
          .update({ deleted_at: new Date().toISOString() })
          .eq('id', id);
        if (error) throw error;
        return res.status(200).json({ ok: true, trashed: true });
      }

      res.setHeader('Allow', 'GET, POST, PUT, DELETE');
      return res.status(405).json({ error: 'Método não permitido' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message || 'Erro no servidor' });
    }
  };
}
