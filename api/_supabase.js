import { createClient } from '@supabase/supabase-js';

// Usa a "service role key" — só existe no servidor (funções Vercel), nunca
// é enviada ao browser. É esta chave que ignora as regras de RLS e permite
// às nossas funções ler/escrever nas tabelas.
let client = null;

export function getSupabase() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não estão configuradas.');
  }

  client = createClient(url, key, {
    auth: { persistSession: false },
  });
  return client;
}
