// Popula o Supabase com o conteúdo que já está hoje no site (anúncios,
// edições da revista, calendários por ano e próximos eventos).
//
// Como correr (uma única vez, depois de criares as tabelas com schema.sql):
//   1. npm install
//   2. Define as variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
//      (as mesmas que vais pôr no Vercel — ver ADMIN_SETUP.md)
//   3. node db/seed.mjs
//
// É seguro correr mais do que uma vez: o script apaga tudo o que já lá
// estiver nas 4 tabelas antes de inserir de novo, para não duplicar.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    'Faltam as variáveis de ambiente SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY.\n' +
    'Define-as no terminal antes de correr este script (ver ADMIN_SETUP.md).'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const announcements = [
  { title: "Workshop de Introdução ao JavaScript", excerpt: "Aprende os fundamentos do JavaScript, a linguagem essencial da Web, neste workshop prático com Rodrigo Girão Serrão.", category: "Workshops", event_date: "16 Fev, 2025", read_time: "2 min", featured: false, icon: "calendar", sort_order: 0, full_content: `
        <p>No dia <strong>27 de fevereiro</strong>, na sala <strong>P8</strong>, das <strong>17h30 às 19h30</strong>, o NMATH organiza um Workshop de Introdução ao JavaScript, a linguagem essencial da Web.</p>
        <p>O workshop será conduzido por <strong>Rodrigo Girão Serrão</strong> e tem como objetivo introduzir-te aos conceitos fundamentais de programação em JavaScript.</p>
      ` },
  { title: "Bem-vindos! — NMATH no Dia de Acolhimento", excerpt: "O NMATH marca presença no Dia de Acolhimento para receber e apoiar os novos estudantes de Matemática.", category: "Eventos", event_date: "1 Set, 2025", read_time: "3 min", featured: false, icon: "trophy", sort_order: 1, full_content: `
        <p>Bem-vindo a Matemática!</p>
        <p>De forma a começares esta tua jornada da melhor forma, o <strong>NMATH</strong> vai estar presente no <strong>Dia de Acolhimento</strong>, preparado para te apoiar e ser um dos teus principais pontos de referência no Técnico.</p>
        <h3>O que esperar?</h3>
        <p>No nosso espaço poderás conhecer melhor a associação, descobrir todas as iniciativas que temos para ti ao longo do ano e tirar dúvidas sobre a vida académica em Matemática.</p>
        <h3>Porquê visitar-nos?</h3>
        <ul>
          <li>Conhecer colegas e integrar-te na comunidade de Matemática</li>
          <li>Saber mais sobre os eventos e oportunidades organizados pelo NMATH</li>
          <li>Descobrir como participar e contribuir ativamente</li>
        </ul>
        <p>Vem conhecer-nos e dar início a uma jornada académica inesquecível. Estamos à tua espera!</p>
      ` },
  { title: "Noite de Cinema — Dead Poets Society", excerpt: "O NMATH traz de volta as noites de cinema com a exibição do filme Dead Poets Society no Anfiteatro AM.", category: "Recreativa", event_date: "17 Set, 2025", read_time: "1 min", featured: false, icon: "calendar", sort_order: 2, full_content: `
        <p>As noites de cinema do NMATH estão de volta. Se precisas de uma pausa das aulas e do estudo, aproveita para viver um fim de tarde diferente connosco.</p>
        <p>Será uma oportunidade para relaxar, divertir-te e partilhar um momento com os teus colegas.</p>
        <p><strong>Data:</strong> Quarta-feira, 17 de setembro<br>
        <strong>Hora:</strong> 19h00<br>
        <strong>Local:</strong> Anfiteatro AM [Mecânica II]</p>
        <p>O filme escolhido foi <em>Dead Poets Society</em>.</p>
      ` },
  { title: "Evento Rede UNITE — Transição Secundário→Universidade", excerpt: "Professores e alunos debatem a transição do secundário para a universidade no Departamento de Matemática.", category: "Eventos", event_date: "23 Set, 2025", read_time: "2 min", featured: false, icon: "calendar", sort_order: 3, full_content: `
        <p>A Rede UNITE está a desenvolver um projeto que estuda os desafios da transição dos alunos do ensino secundário para a universidade, com enfoque no ensino da matemática.</p>
        <p>No dia 23 de setembro, o Departamento de Matemática recebe professores de várias escolas da Rede UNITE para apresentar o projeto e debater com docentes e alunos do Técnico.</p>
        <p><strong>Data:</strong> 23 de setembro<br>
        <strong>Hora:</strong> 14h00 - 15h30<br>
        <strong>Local:</strong> Sala 3.10, Departamento de Matemática</p>
        <p>A sessão será seguida de um coffee break.</p>
        <p>Mais informações disponíveis em: <a href="https://tecnico.ulisboa.pt/pt/eventos/unite-seed-fund-workshop" target="_blank">tecnico.ulisboa.pt</a></p>
        <h3>Inscrição</h3>
        <p>Envia um email até 17/9 às 16h, indicando:</p>
        <ul>
          <li>O teu nome</li>
          <li>A frase: "Quero participar"</li>
        </ul>
        <p>Apenas existem 25 vagas, com prioridade para as primeiras inscrições.</p>
      ` },
  { title: "Voluntariado Banco Alimentar", excerpt: "O NMATH vai organizar uma tarde de voluntariado no Banco Alimentar no dia 10 de outubro, das 14h30 às 17h00.", category: "Voluntariado", event_date: "10 Out, 2025", read_time: "1 min", featured: false, icon: "calendar", sort_order: 4, full_content: `
        <p>O NMATH vai organizar uma tarde de voluntariado no <strong>Banco Alimentar no dia 10 de outubro, das 14h30 às 17h00</strong>.</p>
        <p>Será uma oportunidade para participar ativamente e contribuir para apoiar quem mais precisa!</p>
        <p><strong>Junta-te a nós e ajuda a fazer a diferença!</strong></p>
        <p><strong>Data:</strong> 10 de outubro<br>
        <strong>Hora:</strong> 14h30 - 17h00<br>
        <strong>Local:</strong> Banco Alimentar</p>
        <p><strong>Inscrições:</strong> Até dia 1/10</p>
      ` },
  { title: "Palestra Filosofia da Matemática", excerpt: "Palestra sobre 'Filosofia dos Números Ordinais' com o Prof. Bruno Jacinto (FCUL).", category: "Palestras", event_date: "21 Out, 2025", read_time: "2 min", featured: false, icon: "calendar", sort_order: 5, full_content: `
        <p>No próximo dia <strong>21 de outubro às 18h na sala PA1</strong> irá decorrer uma palestra de Filosofia da Matemática sobre o tópico: <strong>"Filosofia dos Números Ordinais"</strong> dada pelo Professor Bruno Jacinto da FCUL.</p>
        <p>Nesta palestra irás aprender sobre a definição de Cantor dos números ordinais e sobre o porquê desta ser inadequada. Para além disso, serão exploradas concepções alternativas de ordinais e as razões a favor destas perspectivas. O palestrante irá terminar com a sua própria visão deste tema.</p>
        <p><strong>Aparece e descobre mais sobre as ideias que moldam a matemática!</strong> No fim, haverá um coffee break!</p>
        <p><strong>Data:</strong> 21 de outubro<br>
        <strong>Hora:</strong> 18h00<br>
        <strong>Local:</strong> Sala PA1<br>
        <strong>Palestrante:</strong> Professor Bruno Jacinto da FCUL</p>
      ` },
  { title: "Workshop de LaTeX — P12", excerpt: "Sessão prática para dominar formatação, fórmulas e bibliografias em LaTeX.", category: "Workshops", event_date: "18 Nov, 2025", read_time: "2 min", featured: false, icon: "calendar", sort_order: 6, full_content: `
        <p><strong>O que:</strong> Workshop introdutório de LaTeX focado em produção de documentos académicos profissionais.</p>
        <p><strong>Quando:</strong> 18 de novembro, 18h00 — <strong>Local:</strong> Sala P12.</p>
        <p>Os participantes vão aprender a escrever equações, inserir tabelas e imagens, e gerir bibliografias de forma prática.</p>
      ` },
  { title: "Quiz Night — PA1", excerpt: "Noite de perguntas e convívio: forma equipa até 4 pessoas e participa!", category: "Eventos", event_date: "19 Nov, 2025", read_time: "1 min", featured: false, icon: "calendar", sort_order: 7, full_content: `
        <p><strong>Resumo:</strong> Uma noite de cultura geral e competição amigável para equipas de até 4 elementos.</p>
        <p><strong>Data e hora:</strong> 19 de novembro, 21h00 — <strong>Local:</strong> Sala PA1. Haverá uma pausa para coffee break.</p>
      ` },
  { title: "Pré-venda: Camisolas de Curso", excerpt: "Novos modelos e o clássico disponível — faz a tua encomenda antecipada.", category: "Merch", event_date: "Nov, 2025", read_time: "1 min", featured: false, icon: "trophy", sort_order: 8, full_content: `
        <p>A pré-venda das novas camisolas/sweats de curso abriu com um design novo e a versão clássica em três cores.</p>
        <p>Vê os designs no Instagram do NMATH.</p>
      ` },
  { title: "Merch MECD — pré-venda aberta", excerpt: "Linha de Engenharia & Ciência de Dados com modelos clássico e novo — prazo limitado.", category: "Merch", event_date: "Nov, 2025", read_time: "1 min", featured: false, icon: "trophy", sort_order: 9, full_content: `
        <p>Já podes encomendar a nova merch de Engenharia e Ciência de Dados: duas opções (clássico e novo), disponíveis em duas cores.</p>
        <p>Prazo para escolher: até domingo, 7 de dezembro às 23h59.</p>
      ` },
  { title: "Projeto 'Matemática vai às Escolas' — voluntariado", excerpt: "Convocatória para quem quer preparar e apresentar atividades matemáticas em escolas.", category: "Projetos", event_date: "Nov, 2025", read_time: "1 min", featured: false, icon: "zap", sort_order: 10, full_content: `
        <p>O NMATH está a lançar um projeto para levar atividades de matemática recreativa às escolas básicas e secundárias e procura voluntários.</p>
        <p>Os interessados podem ajudar a conceber tópicos e, se quiserem, apresentar nas escolas (atividades enquadradas em cidadania e desenvolvimento).</p>
      ` },
  { title: "Feira de Troca de Roupa — AmbientalIST", excerpt: "Doa peças em bom estado e poderá escolher outras no dia do evento.", category: "Eventos", event_date: "2 Dec, 2025", read_time: "1 min", featured: false, icon: "calendar", sort_order: 11, full_content: `
        <p>O AmbientalIST organiza uma feira de troca de roupa. Se tens peças, calçado ou acessórios em bom estado, podes doá-los para participar.</p>
        <p>Entrega em mão combinada até 2 de dezembro para seres incluído na base de dados e poderes escolher peças no dia do evento.</p>
      ` },
  { title: "PICTalks — Sessão Informativa PIC1", excerpt: "Sessão de apresentação dos temas de PIC1 com vários docentes e participação presencial e online.", category: "Palestras", event_date: "4 Dec, 2025", read_time: "1 min", featured: false, icon: "calendar", sort_order: 12, full_content: `
        <p>O Departamento organiza uma sessão <strong>PICTalks</strong> dedicada à apresentação dos temas disponíveis para <strong>PIC1</strong>, com a presença de vários docentes.</p>
        <p><strong>Data:</strong> 4 de dezembro<br>
        <strong>Hora:</strong> 18h00<br>
        <strong>Local:</strong> Sala PA2</p>
        <p>A sessão terá também <strong>participação online</strong> e termina com <strong>coffee break</strong>.</p>
      ` },
  { title: "Palestra: 'When Topology Meets Data Analysis'", excerpt: "Prof. Florian Pausinger aborda como ideias topológicas ajudam na análise de dados.", category: "Palestras", event_date: "10 Dec, 2025", read_time: "2 min", featured: false, icon: "calendar", sort_order: 13, full_content: `
        <p>O professor <strong>Florian Pausinger</strong> dá uma palestra sobre aplicações topológicas na análise de dados, cobrindo problemas de classificação, clustering e reconstrução.</p>
        <p><strong>Data e hora:</strong> 10 de dezembro, 18h00 — <strong>Local:</strong> Sala PA1. A apresentação será em inglês.</p>
      ` },
  { title: "Jantar de Reis — Cantina do Social", excerpt: "Encontro anual entre alunos e docentes — reserva o teu lugar até 19/12.", category: "Eventos", event_date: "9 Jan, 2026", read_time: "1 min", featured: false, icon: "trophy", sort_order: 14, full_content: `
        <p>O tradicional Jantar de Reis volta a reunir alunos e professores do Departamento de Matemática.</p>
        <p><strong>Quando:</strong> 9 de janeiro, 20h30 — <strong>Local:</strong> Cantina do Social. Preço: 7,5€ (inclui menu completo e bebidas).</p>
      ` },
  { title: "Time2Talk", excerpt: "Maior evento do NMATH, com palestras, workshops e discussões sobre temas atuais em matemática e tecnologia.", category: "Eventos", event_date: "9-11 Mar, 2026", read_time: "1 min", featured: true, icon: "trophy", sort_order: 15, full_content: `
        <p>O Time2Talk volta para mais uma edição com novas empresas, novos temas, mas com o mesmo objetivo de unir alunos e profissionais.</p>
        <p><strong>Quando:</strong> 9 a 11 de março, <strong>Local:</strong> Centro de Congressos do Pavilhão de Engenharia Civil.</p>
      ` },
  { title: "Dia do Pi — 14 de Março", excerpt: "As celebrações do aniversário do NMATH ocorreram no passado dia 16 de março, no Departamento de Matemática", category: "Eventos", event_date: "9-11 Mar, 2026", read_time: "1 min", featured: false, icon: "trophy", sort_order: 16, full_content: `
        <p>No passado dia 16 de março, o NMATH comemorou o Dia do Pi - o seu aniversário - através de diversas atividades que uniram estudantes, professores e docentes.</p>
        <p>O evento contou com palestras e um bolo de aniversário temático, proporcionando um ambiente de celebração e partilha de conhecimento.</p>
        <p><strong>Quando:</strong> 16 de março, <strong>Local:</strong> Departamento de Matemática.</p>
      ` },
];

const magazineEditions = [
  { title: "#5", issue: "Edição 2025", cover_image_url: "/magazine/pf25.png", description: "Depois de dois anos, o Ponto Fixo regressa com uma edição cheia de novas camadas — artigos intemporais, entrevistas inspiradoras e reflexões sobre o futuro académico.", highlights: "Matemática na Música\nMedalhas Fields\nEntrevistas a Alumni: Doutoramento ou não?\nArtigos de Professores e Estudantes", publish_date: "2025", link: "https://drive.google.com/file/d/1BFNrqOkf0h0LX_CqUx5XrICrJli21Hvc/view", is_current: true, sort_order: 0 },
  { title: "#4", issue: "Edição 2022", cover_image_url: "/magazine/pf22.png", description: "", highlights: "", publish_date: "2022", link: "https://nmath.tecnico.ulisboa.pt/wp-content/uploads/2022/08/pf_2022.pdf", is_current: false, sort_order: 1 },
  { title: "#3", issue: "Edição 2021", cover_image_url: "/magazine/pf21.png", description: "", highlights: "", publish_date: "2021", link: "https://nmath.tecnico.ulisboa.pt/wp-content/uploads/2021/06/pf_2021.pdf", is_current: false, sort_order: 2 },
  { title: "#2", issue: "Edição 2020", cover_image_url: "/magazine/pf20.png", description: "", highlights: "", publish_date: "2020", link: "https://nmath.tecnico.ulisboa.pt/pf2020.pdf", is_current: false, sort_order: 3 },
  { title: "#1", issue: "Edição 2019", cover_image_url: "/magazine/pf19.png", description: "", highlights: "", publish_date: "2019", link: "https://nmath.tecnico.ulisboa.pt/pf2019.pdf", is_current: false, sort_order: 4 },
];

const calendarYears = [
  { year_label: "1º Ano", calendar_link: "https://calendar.google.com/calendar/embed?src=41360b00598829ff1846efe90919834ed507b2353b126df1dd19302f495b2759%40group.calendar.google.com&ctz=Europe/Lisbon", sort_order: 0 },
  { year_label: "2º Ano", calendar_link: "https://calendar.google.com/calendar/embed?src=eb00b377c1894a6f74a819e275182d0d910214d616c852dc61a78ec0d7a1c6b3%40group.calendar.google.com&ctz=Europe/Lisbon", sort_order: 1 },
  { year_label: "3º Ano", calendar_link: "https://calendar.google.com/calendar/embed?src=6db57e8fd203da0ec88a436a0ce4f74ff8f34e9337329d81dba89131b7f6c387%40group.calendar.google.com&ctz=Europe/Lisbon", sort_order: 2 },
  { year_label: "Mestrado", calendar_link: "https://calendar.google.com/calendar/embed?src=f6f9b2919de8bcf8296174bc8016b07943c15ff037657f3c33db0aa37f28042e%40group.calendar.google.com&ctz=Europe/Lisbon", sort_order: 3 },
];

const upcomingEvents = [
  { title: "What Happens When Topology Meets Data Analysis", event_date: "10 Dezembro, 2025", event_time: "18:00", location: "Sala PA1", description: "Palestra com o Professor Florian Pausinger sobre aplicações topológicas em classificação, clustering e reconstrução de dados.", event_type: "Palestra", link: null, sort_order: 0 },
  { title: "Jantar de Reis", event_date: "9 Janeiro, 2026", event_time: "20:30", location: "Cantina do Social", description: "O tradicional Jantar de Reis que junta alunos e professores do Departamento de Matemática! Inclui entrada, prato, bebida à discrição e buffet de sobremesas. Preço: 7,5€", event_type: "Eventos", link: "https://forms.gle/wALxg8npQahjTVUWA", sort_order: 1 },
];

async function run() {
  console.log('A limpar tabelas...');
  for (const table of ['announcements', 'magazine_editions', 'calendar_years', 'upcoming_events']) {
    const { error } = await supabase.from(table).delete().neq('id', 0);
    if (error) throw new Error(`Erro a limpar ${table}: ${error.message}`);
  }

  console.log('A inserir anúncios...');
  { const { error } = await supabase.from('announcements').insert(announcements); if (error) throw error; }

  console.log('A inserir edições da revista...');
  { const { error } = await supabase.from('magazine_editions').insert(magazineEditions); if (error) throw error; }

  console.log('A inserir calendários por ano...');
  { const { error } = await supabase.from('calendar_years').insert(calendarYears); if (error) throw error; }

  console.log('A inserir próximos eventos...');
  { const { error } = await supabase.from('upcoming_events').insert(upcomingEvents); if (error) throw error; }

  console.log('Concluído! A base de dados está populada com o conteúdo atual do site.');
}

run().catch((err) => {
  console.error('Falhou:', err.message || err);
  process.exit(1);
});
