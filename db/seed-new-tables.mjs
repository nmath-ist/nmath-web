// Popula APENAS as duas tabelas novas (flagship_events e oracle_episodes)
// com o conteúdo que já está hoje no site. Ao contrário de seed.mjs, este
// script NÃO mexe nas outras tabelas — seguro de correr mesmo que já
// tenhas editado anúncios/revista/calendário no admin.
//
// Como correr:
//   1. npm install  (se ainda não tiveres corrido depois de atualizares os ficheiros)
//   2. Define SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no terminal
//   3. node db/seed-new-tables.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY nas variáveis de ambiente.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const flagshipEvents = [
  {
    title: 'Integration Bee',
    short_description: 'Competição de cálculo integral que desafia estudantes a resolver integrais sob pressão de tempo.',
    category: 'Competição',
    stats: 'Edição 2025 • Prémios',
    icon: 'trophy',
    year_links: '2025|https://sites.google.com/view/integration-bee/integration-bee-2025',
    sort_order: 0,
  },
  {
    title: 'Jornadas de Matemática',
    short_description: 'Encontro académico com palestras, roundtables e networking.',
    category: 'Conferência',
    stats: 'Edições: 2017 • 2018 • 2019 • 2023',
    icon: 'book',
    year_links: [
      '2023|https://nmath.tecnico.ulisboa.pt/jmatematica23',
      '2019|https://nmath.tecnico.ulisboa.pt/jmatematica19/',
      '2018|https://nmath.tecnico.ulisboa.pt/jmatematica18/',
      '2017|https://nmath.tecnico.ulisboa.pt/jmatematica17/',
    ].join('\n'),
    sort_order: 1,
  },
  {
    title: 'ENEMATH',
    short_description: 'Encontro Nacional de Matemática.',
    category: 'ENEMATH',
    stats: 'Edições: 2016 • 2021',
    icon: 'book',
    year_links: [
      '2021|https://nmath.tecnico.ulisboa.pt/enemath/',
      '2016|https://nmath.tecnico.ulisboa.pt/enemath2016/',
    ].join('\n'),
    sort_order: 2,
  },
  {
    title: 'Time2Talk',
    short_description: 'Evento dedicado à divulgação do papel da Matemática no mundo empresarial com roundtables e palestras.',
    category: 'Palestras',
    stats: 'Edição 2025',
    icon: 'mic',
    year_links: '2025|https://sites.google.com/view/time2talk-nmath/p%C3%A1gina-inicial',
    sort_order: 3,
  },
];

const oracleEpisodes = [
  {
    title: 'Como sobreviver ao meu primeiro ano em Matemática',
    duration: '42 min',
    episode_date: '3 Set, 2025',
    plays: '1.2k',
    url: 'https://open.spotify.com/episode/2U48w20Lvi7CIM5uiX9X11?si=OnYUjCw2R5aJX6xOP5E1Dw',
    sort_order: 0,
  },
];

async function run() {
  console.log('A limpar as duas tabelas novas...');
  for (const table of ['flagship_events', 'oracle_episodes']) {
    const { error } = await supabase.from(table).delete().neq('id', 0);
    if (error) throw new Error(`Erro a limpar ${table}: ${error.message}`);
  }

  console.log('A inserir Eventos NMATH...');
  { const { error } = await supabase.from('flagship_events').insert(flagshipEvents); if (error) throw error; }

  console.log('A inserir episódios do Oráculo...');
  { const { error } = await supabase.from('oracle_episodes').insert(oracleEpisodes); if (error) throw error; }

  console.log('Concluído!');
}

run().catch((err) => {
  console.error('Falhou:', err.message || err);
  process.exit(1);
});
