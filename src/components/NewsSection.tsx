import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, ArrowRight, Zap, Trophy, Calendar as CalendarIcon, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { useState } from 'react';

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const newsItems = [
    {
      id: 1,
      title: "Bem vindos!",
      excerpt: "O NMATH vai marcar presença no Dia de Acolhimento, pronto para ser um dos teus principais pontos de referência aqui no Técnico.",
      category: "Eventos",
      date: "1 Set, 2025",
      readTime: "3 min",
      featured: true,
      icon: Trophy,
      fullContent: `
        <p>Bem-vindo a Matemática! 🎉</p>
    
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
      title: "Programação Time2Talk",
  excerpt: "Workshops e palestras no Anfiteatro Abreu Faro sobre Finanças, Tecnologias Quânticas, Data Science e Machine Learning.",
  category: "Eventos",
  date: "16 Fev, 2025",
  readTime: "2 min",
  featured: false,
  icon: CalendarIcon,
  fullContent: `
    <p>⚠ Já está quase! Não percas o <strong>Time2Talk</strong>, um evento imperdível no Anfiteatro Abreu Faro com workshops e palestras sobre as aplicações da matemática.</p>

    <h3>O que vais encontrar</h3>
    <ul>
      <li>Finanças</li>
      <li>Tecnologias Quânticas</li>
      <li>Data Science & Machine Learning</li>
    </ul>

    <p>Além disso, podes habilitar-te a ganhar <strong>bilhetes para o NOS Alive</strong>, um monitor e muito mais!</p>

    <h3>Inscreve-te</h3>
    <p>Se estás a pensar ir, inscreve-te já para garantir o teu lugar.</p>
  `
},
    ,
    {
      id: 3,
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
      id: 4,
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