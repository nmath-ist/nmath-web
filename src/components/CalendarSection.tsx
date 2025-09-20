import React from "react";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import arraial from '../assets/arraial.jpeg';
import sueca from '../assets/sueca.JPG';
import cinema from '../assets/cinema.JPG';

const calendarsData = {
  "1º Ano": {
    ics: "https://calendar.google.com/calendar/ical/41360b00598829ff1846efe90919834ed507b2353b126df1dd19302f495b2759%40group.calendar.google.com/public/basic.ics",
    link: "https://calendar.google.com/calendar/embed?src=41360b00598829ff1846efe90919834ed507b2353b126df1dd19302f495b2759%40group.calendar.google.com&ctz=Europe/Lisbon",
    events: [
      {
        title: 'Sessão de Apoio: Demonstrações',
        date: '23 de setembro de 2025',
        time: '15:00',
        location: '4.35 - P. Matemática',
        description: 'Começaram as aulas e já te sentes perdido? Vem e aproveita estas sessões semanais criadas para que os novos alunos compreendam facilmente as diversas técnicas de demonstrações.',
        category: 'Apoio ao Estudo'
      },
      {
        title: 'ITN - MAP15',
        date: '24 de setembro de 2025',
        time: 'A definir',
        location: 'A definir',
        description: '',
        category: 'Avaliação'
      },
      {
        title: 'Torneio de Sueca',
        date: '24 de setembro de 2025',
        time: '19:00',
        location: 'A definir',
        description: "Durante o dia estudas, e ao pôr do sol relaxas: junta-te a nós para ver o teu filme favorito ao ar livre!",
        category: 'Social'
      }
    ]
  },
  "2º Ano": {
    ics: "https://calendar.google.com/calendar/ical/eb00b377c1894a6f74a819e275182d0d910214d616c852dc61a78ec0d7a1c6b3%40group.calendar.google.com/public/basic.ics",
    link: "https://calendar.google.com/calendar/embed?src=eb00b377c1894a6f74a819e275182d0d910214d616c852dc61a78ec0d7a1c6b3%40group.calendar.google.com&ctz=Europe/Lisbon",
    events: [
      {
        title: 'Arraial do Técnico',
        date: '12–13 de setembro de 2025',
        time: '20:00',
        location: 'Instituto Superior Técnico — banca 5',
        description: 'Vem festejar com os alunos de Matemática no Arraial do Técnico. Procura a banca 5 e junta-te à festa universitária!',
        category: 'Social'
      },
      {
        title: 'Sessão de cinema',
        date: '17 de setembro de 2025',
        time: '19:00',
        location: 'A definir',
        description: "Durante o dia estudas, e ao pôr do sol relaxas: junta-te a nós para ver o teu filme favorito ao ar livre!",
        category: 'Social'
      },
      {
        title: "Torneio de Sueca",
        date: "24 de setembro, 2025",
        time: "21:00",
        location: "LabMat",
        description: "Escolhe um parceiro e mostra que sabes jogar!",
        category: "Social"
      }
    ]
  },
  "3º Ano": {
    ics: "https://calendar.google.com/calendar/ical/6db57e8fd203da0ec88a436a0ce4f74ff8f34e9337329d81dba89131b7f6c387%40group.calendar.google.com/public/basic.ics",
    link: "https://calendar.google.com/calendar/embed?src=6db57e8fd203da0ec88a436a0ce4f74ff8f34e9337329d81dba89131b7f6c387%40group.calendar.google.com&ctz=Europe/Lisbon",
    events: [
      {
        title: 'Arraial do Técnico',
        date: '12–13 de setembro de 2025',
        time: '20:00',
        location: 'Instituto Superior Técnico — banca 5',
        description: 'Vem festejar com os alunos de Matemática no Arraial do Técnico. Procura a banca 5 e junta-te à festa universitária!',
        category: 'Social'
      },
      {
        title: 'Sessão de cinema',
        date: '17 de setembro de 2025',
        time: '19:00',
        location: 'A definir',
        description: "Uma noite de cinema descontraída com colegas!",
        category: 'Social'
      },
      {
        title: "Torneio de Sueca",
        date: "24 de setembro, 2025",
        time: "21:00",
        location: "LabMat",
        description: "Escolhe um parceiro e mostra que sabes jogar!",
        category: "Social"
      }
    ]
  },
  "Mestrado": {
    ics: "https://calendar.google.com/calendar/ical/f6f9b2919de8bcf8296174bc8016b07943c15ff037657f3c33db0aa37f28042e%40group.calendar.google.com/public/basic.ics",
    link: "https://calendar.google.com/calendar/embed?src=f6f9b2919de8bcf8296174bc8016b07943c15ff037657f3c33db0aa37f28042e%40group.calendar.google.com&ctz=Europe/Lisbon",
    events: [
      {
        title: 'Arraial do Técnico',
        date: '12–13 de setembro de 2025',
        time: '20:00',
        location: 'Instituto Superior Técnico — banca 5',
        description: 'Vem festejar com os alunos de Matemática no Arraial do Técnico. Procura a banca 5 e junta-te à festa universitária!',
        category: 'Social'
      },
      {
        title: 'Sessão de cinema',
        date: '17 de setembro de 2025',
        time: '19:00',
        location: 'A definir',
        description: "Uma noite de cinema descontraída com colegas!",
        category: 'Social'
      },
      {
        title: "Torneio de Sueca",
        date: "24 de setembro, 2025",
        time: "21:00",
        location: "LabMat",
        description: "Escolhe um parceiro e mostra que sabes jogar!",
        category: "Social"
      }
    ]
  }
};

// imagens associadas a eventos sociais
const socialImages: { [key: string]: string } = {
  "Arraial do Técnico": arraial,
  "Torneio de Sueca": sueca,
  "Sessão de cinema": cinema,
};

export default function CalendarSection() {
  const getColorForCategory = (category: string) => {
    const colors: { [key: string]: string } = {
      'Apoio ao Estudo': 'from-blue-500 to-teal-600',
      'Workshop': 'from-green-500 to-green-600',
      'Avaliação': 'from-red-500 to-red-600',
      'Social': 'from-indigo-500 to-purple-600',
      'Projeto': 'from-orange-500 to-orange-600',
      'Exame': 'from-red-600 to-red-700',
      'Dissertação': 'from-indigo-500 to-indigo-600',
      'Palestra': 'from-cyan-500 to-cyan-600',
      'Orientação': 'from-teal-500 to-teal-600',
      'Conferência': 'from-pink-500 to-pink-600',
      'Apresentação': 'from-violet-500 to-violet-600'
    };
    return colors[category] || 'from-slate-500 to-slate-600';
  };

  return (
    <section id="calendar" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600">Calendários</span>
          </div>
          <h2 className="text-4xl mb-4 text-slate-800">Próximos Eventos</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Consulta os eventos específicos para cada ano de curso.
          </p>
        </div>

        <Tabs defaultValue="1º Ano" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-100 max-w-2xl mx-auto">
            <TabsTrigger value="1º Ano">1º Ano</TabsTrigger>
            <TabsTrigger value="2º Ano">2º Ano</TabsTrigger>
            <TabsTrigger value="3º Ano">3º Ano</TabsTrigger>
            <TabsTrigger value="Mestrado">Mestrado</TabsTrigger>
          </TabsList>

          {Object.entries(calendarsData).map(([year, yearData]) => (
            <TabsContent key={year} value={year}>
              <div className="max-w-6xl mx-auto">
                <div className="grid gap-8 mb-8">
                  {yearData.events.map((event, idx) => {
                    const socialImage = event.category === "Social" ? socialImages[event.title] : null;
                    return (
                      <Card key={idx} className="overflow-hidden border border-slate-200 hover:shadow-xl transition-all">
                        <CardContent className="p-0">
                          <div className="md:flex">
                            {socialImage ? (
                              <div
                                className="relative p-8 text-white md:w-1/3 flex flex-col justify-center bg-cover bg-center"
                                style={{ backgroundImage: `url(${socialImage})` }}
                              >
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="relative text-center">
                                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-80" />
                                  <h3 className="text-2xl mb-2">{event.title}</h3>
                                  <p className="opacity-90 text-lg">{event.date}</p>
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`bg-gradient-to-br ${getColorForCategory(event.category)} p-8 text-white md:w-1/3 flex flex-col justify-center`}
                              >
                                <div className="text-center">
                                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-80" />
                                  <h3 className="text-2xl mb-2">{event.title}</h3>
                                  <p className="opacity-90 text-lg">{event.date}</p>
                                </div>
                              </div>
                            )}

                            <div className="flex-1 p-8">
                              <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center space-x-2 text-slate-600">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-600">
                                  <ExternalLink className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                                <Badge variant="outline" className="border-blue-200 text-blue-600">
                                  {event.category}
                                </Badge>
                              </div>

                              <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="text-center">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3"
                    onClick={() => window.open(yearData.link, '_blank')}
                  >
                    Ver Calendário Completo do {year}
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
