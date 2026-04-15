import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, ArrowRight, Zap, Trophy, Calendar as CalendarIcon, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { useState } from 'react';

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const newsItems = [
    // ---------- antigas (fev 2025)
    {
      id: 0,
      title: "Workshop de Introdução ao JavaScript",
      excerpt: "Aprende os fundamentos do JavaScript, a linguagem essencial da Web, neste workshop prático com Rodrigo Girão Serrão.",
      category: "Workshops",
      date: "16 Fev, 2025",
      readTime: "2 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
        <p>No dia <strong>27 de fevereiro</strong>, na sala <strong>P8</strong>, das <strong>17h30 às 19h30</strong>, o NMATH organiza um Workshop de Introdução ao JavaScript, a linguagem essencial da Web.</p>

        <p>O workshop será conduzido por <strong>Rodrigo Girão Serrão</strong> e tem como objetivo introduzir-te aos conceitos fundamentais de programação em JavaScript.</p>
      `
    },

    // ---------- antigas (set 2025)
    {
      id: 1,
      title: "Bem-vindos! — NMATH no Dia de Acolhimento",
      excerpt: "O NMATH marca presença no Dia de Acolhimento para receber e apoiar os novos estudantes de Matemática.",
      category: "Eventos",
      date: "1 Set, 2025",
      readTime: "3 min",
      featured: false,
      icon: Trophy,
      fullContent: `
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
      `
    },
    {
      id: 2,
      title: "Noite de Cinema — Dead Poets Society",
      excerpt: "O NMATH traz de volta as noites de cinema com a exibição do filme Dead Poets Society no Anfiteatro AM.",
      category: "Recreativa",
      date: "17 Set, 2025",
      readTime: "1 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
        <p>As noites de cinema do NMATH estão de volta. Se precisas de uma pausa das aulas e do estudo, aproveita para viver um fim de tarde diferente connosco.</p>
        <p>Será uma oportunidade para relaxar, divertir-te e partilhar um momento com os teus colegas.</p>
        <p><strong>Data:</strong> Quarta-feira, 17 de setembro<br>
        <strong>Hora:</strong> 19h00<br>
        <strong>Local:</strong> Anfiteatro AM [Mecânica II]</p>
        <p>O filme escolhido foi <em>Dead Poets Society</em>.</p>
      `
    },
    {
      id: 3,
      title: "Evento Rede UNITE — Transição Secundário→Universidade",
      excerpt: "Professores e alunos debatem a transição do secundário para a universidade no Departamento de Matemática.",
      category: "Eventos",
      date: "23 Set, 2025",
      readTime: "2 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
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
        <div style="margin: 20px 0;">
          <button 
            onclick="window.location.href='mailto:educacao.nmath.ist@gmail.com?subject=Inscrição Evento Rede UNITE&body=Olá,%0D%0A%0D%0AO meu nome é: [INDIQUE O SEU NOME]%0D%0A%0D%0AQuero participar%0D%0A%0D%0ACumprimentos'"
            style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(139, 92, 246, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(139, 92, 246, 0.3)'"
          >
            📧 Enviar Email de Inscrição
          </button>
        </div>
      `
    },

    // ---------- antigas (out 2025)
    {
      id: 4,
      title: "Voluntariado Banco Alimentar",
      excerpt: "O NMATH vai organizar uma tarde de voluntariado no Banco Alimentar no dia 10 de outubro, das 14h30 às 17h00.",
      category: "Voluntariado",
      date: "10 Out, 2025",
      readTime: "1 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
        <p>O NMATH vai organizar uma tarde de voluntariado no <strong>Banco Alimentar no dia 10 de outubro, das 14h30 às 17h00</strong>.</p>
        
        <p>Será uma oportunidade para participar ativamente e contribuir para apoiar quem mais precisa!</p>
        
        <p><strong>Junta-te a nós e ajuda a fazer a diferença!</strong></p>
        
        <p><strong>Data:</strong> 10 de outubro<br>
        <strong>Hora:</strong> 14h30 - 17h00<br>
        <strong>Local:</strong> Banco Alimentar</p>
        
        <p><strong>Inscrições:</strong> Até dia 1/10</p>
        
        <div style="margin: 20px 0; display: flex; gap: 15px; flex-wrap: wrap;">
          <button 
            onclick="window.open('https://docs.google.com/forms/d/e/1FAIpQLSdv3m13RZTzKSw7_co7AAAFuLKIWWFRmM-EJaioSzTYYkAs4A/viewform?usp=dialog', '_blank')"
            style="background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(59, 130, 246, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'"
          >
            📝 Inscreve-te aqui
          </button>
          
          <button 
            onclick="window.open('https://drive.google.com/drive/folders/1WiBirStzpvQ5X0rYB3Mxk1h-3yZLIyUk', '_blank')"
            style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(16, 185, 129, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.3)'"
          >
            📸 Ver fotos do evento
          </button>
        </div>
      `
    },

    // ---------- antigas (outubro/novembro 2025 / duplicado LaTeX mantido)
    {
      id: 5,
      title: "Palestra Filosofia da Matemática",
      excerpt: "Palestra sobre 'Filosofia dos Números Ordinais' com o Prof. Bruno Jacinto (FCUL).",
      category: "Palestras",
      date: "21 Out, 2025",
      readTime: "2 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
        <p>No próximo dia <strong>21 de outubro às 18h na sala PA1</strong> irá decorrer uma palestra de Filosofia da Matemática sobre o tópico: <strong>"Filosofia dos Números Ordinais"</strong> dada pelo Professor Bruno Jacinto da FCUL.</p>
        
        <p>Nesta palestra irás aprender sobre a definição de Cantor dos números ordinais e sobre o porquê desta ser inadequada. Para além disso, serão exploradas concepções alternativas de ordinais e as razões a favor destas perspectivas. O palestrante irá terminar com a sua própria visão deste tema.</p>
        
        <p><strong>Aparece e descobre mais sobre as ideias que moldam a matemática!</strong> No fim, haverá um coffee break!</p>
        
        <p><strong>Data:</strong> 21 de outubro<br>
        <strong>Hora:</strong> 18h00<br>
        <strong>Local:</strong> Sala PA1<br>
        <strong>Palestrante:</strong> Professor Bruno Jacinto da FCUL</p>
      `
    },

    // ---------- included previously (nov 2025 onward)
    {
      id: 6,
      title: "Workshop de LaTeX — P12",
      excerpt: "Sessão prática para dominar formatação, fórmulas e bibliografias em LaTeX.",
      category: "Workshops",
      date: "18 Nov, 2025",
      readTime: "2 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
        <p><strong>O que:</strong> Workshop introdutório de LaTeX focado em produção de documentos académicos profissionais.</p>
        <p><strong>Quando:</strong> 18 de novembro, 18h00 — <strong>Local:</strong> Sala P12.</p>
        <p>Os participantes vão aprender a escrever equações, inserir tabelas e imagens, e gerir bibliografias de forma prática.</p>
        <p>Inscrição e mais detalhes no formulário:<br>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScn8y_C_WuCaTEY9c95o9mXtOpgw6_bcmMw7lsrR4ZB2ddziQ/viewform?usp=publish-editor" target="_blank">Formulário de inscrição</a></p>
      `
    },
    {
      id: 7,
      title: "Quiz Night — PA1",
      excerpt: "Noite de perguntas e convívio: forma equipa até 4 pessoas e participa!",
      category: "Eventos",
      date: "19 Nov, 2025",
      readTime: "1 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
        <p><strong>Resumo:</strong> Uma noite de cultura geral e competição amigável para equipas de até 4 elementos.</p>
        <p><strong>Data e hora:</strong> 19 de novembro, 21h00 — <strong>Local:</strong> Sala PA1. Haverá uma pausa para coffee break.</p>
        <p>Inscreve a tua equipa aqui:<br>
        <a href="https://forms.gle/S2KmSYKLZtoEDLLA9" target="_blank">https://forms.gle/S2KmSYKLZtoEDLLA9</a></p>
      `
    },
    {
      id: 8,
      title: "Pré-venda: Camisolas de Curso",
      excerpt: "Novos modelos e o clássico disponível — faz a tua encomenda antecipada.",
      category: "Merch",
      date: "Nov, 2025",
      readTime: "1 min",
      featured: false,
      icon: Trophy,
      fullContent: `
        <p>A pré-venda das novas camisolas/sweats de curso abriu com um design novo e a versão clássica em três cores.</p>
        <p>Garante a tua peça preenchendo o formulário: <a href="https://forms.gle/mGn8aKwSPBq68Tf9A" target="_blank">https://forms.gle/mGn8aKwSPBq68Tf9A</a></p>
        <p>Vê os designs no Instagram:<br>
        <a href="https://www.instagram.com/p/DRPpM3ejF-M/?igsh=MXZiZTJ5NG5mcHhydg==" target="_blank">https://www.instagram.com/p/DRPpM3ejF-M/</a></p>
      `
    },
    {
      id:9,
      title: "Merch MECD — pré-venda aberta",
      excerpt: "Linha de Engenharia & Ciência de Dados com modelos clássico e novo — prazo limitado.",
      category: "Merch",
      date: "Nov, 2025",
      readTime: "1 min",
      featured: false,
      icon: Trophy,
      fullContent: `
        <p>Já podes encomendar a nova merch de Engenharia e Ciência de Dados: duas opções (clássico e novo), disponíveis em duas cores.</p>
        <p>Prazo para escolher: até domingo, 7 de dezembro às 23h59. Formulário de encomenda:<br>
        <a href="https://forms.gle/LKHjzNBeBkvguffJ9" target="_blank">https://forms.gle/LKHjzNBeBkvguffJ9</a></p>
        <p>Para referência, os designs das camisolas de curso também estão no Instagram:<br>
        <a href="https://www.instagram.com/p/DRPpM3ejF-M/?igsh=MXZiZTJ5NG5mcHhydg==" target="_blank">https://www.instagram.com/p/DRPpM3ejF-M/</a></p>
      `
    },
    {
      id: 10,
      title: "Projeto 'Matemática vai às Escolas' — voluntariado",
      excerpt: "Convocatória para quem quer preparar e apresentar atividades matemáticas em escolas.",
      category: "Projetos",
      date: "Nov, 2025",
      readTime: "1 min",
      featured: false,
      icon: Zap,
      fullContent: `
        <p>O NMATH está a lançar um projeto para levar atividades de matemática recreativa às escolas básicas e secundárias e procura voluntários.</p>
        <p>Os interessados podem ajudar a conceber tópicos e, se quiserem, apresentar nas escolas (atividades enquadradas em cidadania e desenvolvimento).</p>
        <p>Mostra interesse através do formulário: <a href="https://forms.gle/c7zLR8FGkAt2qXC27" target="_blank">https://forms.gle/c7zLR8FGkAt2qXC27</a></p>
      `
    },

    // ---------- dezembro 2025
    {
      id: 11,
      title: "Feira de Troca de Roupa — AmbientalIST",
      excerpt: "Doa peças em bom estado e poderá escolher outras no dia do evento.",
      category: "Eventos",
      date: "2 Dec, 2025",
      readTime: "1 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
        <p>O AmbientalIST organiza uma feira de troca de roupa. Se tens peças, calçado ou acessórios em bom estado, podes doá-los para participar.</p>
        <p>Entrega em mão combinada até 2 de dezembro para seres incluído na base de dados e poderes escolher peças no dia do evento.</p>
        <p>Contacta a organização para combinar a entrega e garantir a tua participação.</p>
      `
    },
    
    {
      id: 12
,
      title: "PICTalks — Sessão Informativa PIC1",
      excerpt: "Sessão de apresentação dos temas de PIC1 com vários docentes e participação presencial e online.",
      category: "Palestras",
      date: "4 Dec, 2025",
      readTime: "1 min",
      featured: false,
      icon: CalendarIcon,
      fullContent: `
        <p>O Departamento organiza uma sessão <strong>PICTalks</strong> dedicada à apresentação dos temas disponíveis para <strong>PIC1</strong>, com a presença de vários docentes.</p>
    
        <p><strong>Data:</strong> 4 de dezembro<br>
        <strong>Hora:</strong> 18h00<br>
        <strong>Local:</strong> Sala PA2</p>
    
        <p>A sessão terá também <strong>participação online</strong> e termina com <strong>coffee break</strong>.</p>
    
        <h3>Programa da Sessão</h3>
        <ul>
          <li><strong>18h10 – 18h20:</strong> Abertura do NMATH</li>
          <li><strong>18h20 – 18h30:</strong> Apresentação do <em>Start to Spark Challenge</em> — Prof. Miguel Preto</li>
          <li><strong>18h30 – 18h40:</strong> Prof. Paulo Mateus</li>
          <li><strong>18h40 – 18h50:</strong> Prof. Pedro Freitas</li>
          <li><strong>18h50 – 19h00:</strong> Prof. Pedro Resende</li>
          <li><strong>19h00 – 19h10:</strong> Prof.ª Rosário Oliveira</li>
          <li><strong>19h10 – 19h20:</strong> Prof.ª Conceição Amado</li>
          <li><strong>19h20 – 19h30:</strong> Prof. Miguel Couceiro</li>
          <li><strong>19h30 – 19h40:</strong> Encerramento — Prof.ª Lina Oliveira (Estrutura geral + FAQs sobre o PIC)</li>
          <li><strong>19h40:</strong> Coffee Break</li>
        </ul>
    
        <p>
          <strong>Participação online:</strong><br>
          <a href="https://meet.google.com/jcj-duwh-yrr" target="_blank">
            Entrar na reunião Google Meet
          </a>
        </p>
      `
    },
    
    {
      id: 13,
      title: "Palestra: 'When Topology Meets Data Analysis'",
      excerpt: "Prof. Florian Pausinger aborda como ideias topológicas ajudam na análise de dados.",
      category: "Palestras",
      date: "10 Dec, 2025",
      readTime: "2 min",
      featured: true,
      icon: CalendarIcon,
      fullContent: `
        <p>O professor <strong>Florian Pausinger</strong> dá uma palestra sobre aplicações topológicas na análise de dados, cobrindo problemas de classificação, clustering e reconstrução.</p>
        <p><strong>Data e hora:</strong> 10 de dezembro, 18h00 — <strong>Local:</strong> Sala PA1. A apresentação será em inglês.</p>
        <p>Uma oportunidade para conhecer ferramentas teóricas e algoritmos inspirados por topologia.</p>
      `
    },

    // ---------- janeiro 2026
    {
      id: 14,
      title: "Jantar de Reis — Cantina do Social",
      excerpt: "Encontro anual entre alunos e docentes — reserva o teu lugar até 19/12.",
      category: "Eventos",
      date: "9 Jan, 2026",
      readTime: "1 min",
      featured: false,
      icon: Trophy,
      fullContent: `
        <p>O tradicional Jantar de Reis volta a reunir alunos e professores do Departamento de Matemática.</p>
        <p><strong>Quando:</strong> 9 de janeiro, 20h30 — <strong>Local:</strong> Cantina do Social. Preço: 7,5€ (inclui menu completo e bebidas).</p>
        <p>Inscrições e pagamento até 19 de dezembro. Formulário:<br>
        <a href="https://forms.gle/wALxg8npQahjTVUWA" target="_blank">https://forms.gle/wALxg8npQahjTVUWA</a></p>
      `
    },
    //Time2talk
    {
      id: 15,
      title: "Time2Talk",
      excerpt: "Maior evento do NMATH, com palestras, workshops e discussões sobre temas atuais em matemática e tecnologia.",
      category: "Eventos",
      date: "9-11 Mar, 2026",
      readTime: "1 min",
      featured: true,
      icon: Trophy,
      fullContent: `
        <p>O Time2Talk volta para mais uma edição com novas empresas, novos temas, mas com o mesmo objetivo de unir alunos e profissionais.</p>
        <p><strong>Quando:</strong> 9 a 11 de março, <strong>Local:</strong> Centro de Congressos do Pavilhão de Engenharia Civil.</p>
      `
      },
      {
      id: 16,
      title: "Dia do Pi — 14 de Março",
      excerpt: "As celebrações do aniversário do NMATH ocorreram no passado dia 16 de março, no Departamento de Matemática",
      category: "Eventos",
      date: "9-11 Mar, 2026",
      readTime: "1 min",
      featured: true,
      icon: Trophy,
      fullContent: `
        <p>No passado dia 16 de março, o NMATH comemorou o Dia do Pi - o seu aniversário - através de diversas atividades que uniram estudantes, professores e docentes.</p>
        <p>O evento contou com palestras e um bolo de aniversário temático, proporcionando um ambiente de celebração e partilha de conhecimento.</p>
        <p><strong>Quando:</strong> 16 de março, <strong>Local:</strong> Departamento de Matemática.</p>
      `
      }
  ];

  return (
    <section id="news" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-slate-800">Anúncios</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Mantém-te informado com os anúncios e oportunidades do NMATH — organizados por data.
          </p>
        </div>

        {selectedArticle ? (
          <div className="max-w-4xl mx-auto">
            <Card className="border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="border-blue-200 text-blue-600">
                      {selectedArticle.category}
                    </Badge>
                    <span className="text-sm text-slate-500">{selectedArticle.date}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedArticle(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <h1 className="text-4xl mb-6 text-slate-800">
                  {selectedArticle.title}
                </h1>
                
                <div className="prose prose-slate max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: selectedArticle.fullContent || selectedArticle.excerpt 
                    }}
                    className="space-y-4"
                  />
                </div>
                
                <div className="flex items-center justify-end mt-8 pt-4 border-t border-slate-200">
                  <Button onClick={() => setSelectedArticle(null)}>
                    Voltar aos Anúncios
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div>
            <div className="mb-8">
            {newsItems
                .filter(item => item.featured)
                .slice()
                .reverse()
                .map((item) => (

                <Card key={item.id} className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        Em destaque
                      </Badge>
                      <Badge variant="outline" className="border-white/30 text-white">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-3xl leading-tight">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                        {item.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-blue-200">
                          <span>{item.date}</span>
                        </div>
                        
                        <Button 
                          variant="secondary" 
                          className="bg-white/20 text-white border-0 hover:bg-white/30 group"
                          onClick={() => setSelectedArticle(item)}
                        >
                          Ler Mais
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="text-xl mb-4 text-slate-800">Outros Anúncios (por data)</h3>
              <div className="relative">
                <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {newsItems
                  .filter(item => !item.featured)
                  .slice()
                  .reverse()
                  .map((item) => (

                    <Card 
                      key={item.id} 
                      className="flex-shrink-0 w-80 overflow-hidden border border-slate-200 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 group"
                      onClick={() => setSelectedArticle(item)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                              <item.icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="border-blue-200 text-blue-600">
                                {item.category}
                              </Badge>
                            </div>
                            <h3 className="mb-2 leading-tight hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                              {item.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-sm text-slate-500">
                              <span>{item.date}</span>
                              <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-sm text-slate-500">← Desliza para ver mais anúncios →</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
