import React from "react";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

const calendarLinks = [
  {
    year: "1º Ano",
    link: "https://calendar.google.com/calendar/embed?src=41360b00598829ff1846efe90919834ed507b2353b126df1dd19302f495b2759%40group.calendar.google.com&ctz=Europe/Lisbon",
  },
  {
    year: "2º Ano",
    link: "https://calendar.google.com/calendar/embed?src=eb00b377c1894a6f74a819e275182d0d910214d616c852dc61a78ec0d7a1c6b3%40group.calendar.google.com&ctz=Europe/Lisbon",
  },
  {
    year: "3º Ano",
    link: "https://calendar.google.com/calendar/embed?src=6db57e8fd203da0ec88a436a0ce4f74ff8f34e9337329d81dba89131b7f6c387%40group.calendar.google.com&ctz=Europe/Lisbon",
  },
  {
    year: "Mestrado",
    link: "https://calendar.google.com/calendar/embed?src=f6f9b2919de8bcf8296174bc8016b07943c15ff037657f3c33db0aa37f28042e%40group.calendar.google.com&ctz=Europe/Lisbon",
  }
];

const upcomingEvents = [
  {
    title: "Quizz Matemático",
    date: "12 Novembro, 2024",
    time: "A definir",
    location: "A definir",
    description: "Testa os teus conhecimentos matemáticos neste quizz divertido e competitivo!",
    type: "Competição",
    link: undefined
  },
  {
    title: "Filosofia dos Números Ordinais",
    date: "21 Dezembro, 2024",
    time: "18:00",
    location: "Sala P12",
    description: "Palestra com o Professor Bruno Jacinto da FCUL sobre a filosofia por detrás dos números ordinais.",
    type: "Palestra",
    link: undefined
  }
];

const pastEvents = [
  {
    title: "Torneio de Sueca",
    date: "24 Setembro, 2024",
    time: "21:00",
    location: "Sala de Matemática",
    description: "Escolhe um parceiro e mostra que sabes jogar! Um momento de diversão e convívio entre estudantes.",
    type: "Social",
    link: undefined
  },
  {
    title: "Banco Alimentar",
    date: "10 Outubro, 2024", 
    time: "A definir",
    location: "Avenida de Ceuta n1",
    description: "Participa nesta iniciativa solidária do NMATH. Ajuda a fazer a diferença na comunidade!",
    type: "Social",
    link: "https://drive.google.com/drive/folders/1nmath-repo-example"
  }
];

export default function CalendarSection() {
  return (
    <section id="calendar" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600">Calendários Académicos</span>
          </div>
          <h2 className="text-4xl mb-4 text-slate-800">Organiza o Teu Semestre</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Acede aos calendários específicos do teu ano de curso e fica a par dos próximos eventos.
          </p>
        </div>

        {/* Links para Calendários */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl mb-6 text-slate-800 text-center">Calendários por Ano</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {calendarLinks.map((calendar) => (
              <Card 
                key={calendar.year} 
                className="overflow-hidden border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => window.open(calendar.link, '_blank')}
              >
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg mb-2 text-slate-800">{calendar.year}</h4>
                  <div className="flex items-center justify-center text-blue-600 text-sm">
                    <span>Ver Calendário</span>
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Próximos Eventos */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl mb-6 text-slate-800 text-center">Próximos Eventos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, idx) => (
              <Card key={idx} className="overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="border-blue-200 text-blue-600">
                      {event.type}
                    </Badge>
                    <span className="text-sm text-slate-500">{event.date}</span>
                  </div>
                  
                  <h4 className="text-lg mb-3 text-slate-800">{event.title}</h4>
                  
                  <div className="flex flex-col gap-2 mb-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  {event.link && (
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(event.link, '_blank')}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Ver Fotos
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Eventos Passados */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl mb-6 text-slate-800 text-center">Eventos Realizados</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event, idx) => (
              <Card key={idx} className="overflow-hidden border border-slate-200 hover:shadow-lg transition-all opacity-90">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="border-slate-300 text-slate-600">
                      {event.type}
                    </Badge>
                    <span className="text-sm text-slate-400">{event.date}</span>
                  </div>
                  
                  <h4 className="text-lg mb-3 text-slate-700">{event.title}</h4>
                  
                  <div className="flex flex-col gap-2 mb-4 text-sm text-slate-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  {event.link && (
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(event.link, '_blank')}
                        className="text-slate-600 border-slate-300 hover:bg-slate-50"
                      >
                        Ver Fotos
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
