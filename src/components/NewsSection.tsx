import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, ArrowRight, Zap, Trophy, Calendar as CalendarIcon, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const newsItems = [
    {
      id: 0,
      title: "Palestra Filosofia da Matemática",
      excerpt: "No próximo dia 21/10 às 18h na sala PA1 irá decorrer uma palestra sobre 'Filosofia dos Números Ordinais' com o Professor Bruno Jacinto da FCUL.",
      category: "Palestras",
      date: "21 Out, 2024",
      readTime: "2 min",
      featured: true,
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
    {
      id: 1,
      title: "Voluntariado Banco Alimentar",
      excerpt: "O NMATH vai organizar uma tarde de voluntariado no Banco Alimentar no dia 10 de outubro, das 14h30 às 17h00.",
      category: "Voluntariado",
      date: "10 Out, 2024",
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
    { 
      id: 2,
      title: "Noite de Cinema",
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
        title: "Evento Rede UNITE",
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
      {
        id: 4,
        title: "Bem vindos!",
        excerpt: "O NMATH vai marcar presença no Dia de Acolhimento, pronto para ser um dos teus principais pontos de referência aqui no Técnico.",
        category: "Eventos",
        date: "1 Set, 2025",
        readTime: "3 min",
        featured: false,
        icon: Trophy,
        fullContent: `
          <p>Bem-vindo a Matemática! </p>
      
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
      id: 5,
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
    {
      id: 6,
      title: "Time2Talk... Novo Formato das Jornadas",
      excerpt: "As Jornadas NMATH regressam com um conceito inovador: o Time2Talk! Três dias de aplicações práticas da matemática.",
      category: "Eventos",
      date: "16 Jan, 2025",
      readTime: "2 min",
      featured: false,
      icon: Zap,
      fullContent: `
        <p><strong>Este ano as Jornadas terão um novo formato!</strong></p>
        
        <p>Apresentamos o <strong>Time2Talk...</strong>, um evento que decorrerá nos dias <strong>5, 6 e 7 de Março</strong> e que se destina a divulgar as aplicações da matemática em áreas fundamentais como:</p>
        
        <ul>
          <li>Finanças</li>
          <li>Machine Learning & Data Science </li>
          <li>Tecnologias Quânticas </li>
        </ul>
        
        <p>Este é um evento pensado para mostrar como a matemática está presente no mundo real e nas inovações do futuro.</p>
        
        <h3>Segue as novidades</h3>
        <p>Fica atento às atualizações e segue-nos no Instagram: <a href="https://instagram.com/time2talk_ist" target="_blank">@time2talk_ist</a></p>
      `
    }
    
  ];

  return (
    <section id="news" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-slate-800">Anúncios</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Mantém-te informado com os últimos anúncios, eventos e oportunidades do NMATH.
          </p>
        </div>

        {selectedArticle ? (
          /* Full Article View - Takes up full space */
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
          /* New Layout - Featured article + horizontal scroll */
          <div>
            {/* Featured Article */}
            <div className="mb-8">
              {newsItems.filter(item => item.featured).map((item) => (
                <Card key={item.id} className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        Featured
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

            {/* Horizontal Scrolling News */}
            <div>
              <h3 className="text-xl mb-4 text-slate-800">Outros Anúncios</h3>
              <div className="relative">
                <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                  {newsItems.filter(item => !item.featured).map((item) => (
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
                
                {/* Gradient fade effects */}
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