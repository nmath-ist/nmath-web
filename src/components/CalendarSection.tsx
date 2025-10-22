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
    title: "Quizz",
    date: "12 Novembro, 2025",
    time: "A definir",
    location: "A definir",
    description: "Testa os teus conhecimentos de cultura geral neste quizz divertido e competitivo!",
    type: "Recreativa",
    link: undefined
  }
];

const pastEvents = [
  {
    title: "Filosofia dos Números Ordinais",
    date: "21 Dezembro, 2024",
    time: "18:00",
    location: "Sala P12",
    description: "Palestra com o Professor Bruno Jacinto da FCUL sobre a definição de Cantor dos números ordinais e sobre o porquê desta ser inadequada.",
    type: "Palestra",
    link: undefined
  },
  {
    title: "Banco Alimentar",
    date: "10 Outubro, 2024", 
    time: "A definir",
    location: "Avenida de Ceuta n1",
    description: "Participa nesta iniciativa solidária do NMATH. Ajuda a fazer a diferença na comunidade!",
    type: "Recreativa",
    link: "https://drive.google.com/drive/folders/1WiBirStzpvQ5X0rYB3Mxk1h-3yZLIyUk"
  }
];

const getEventBadgeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'Recreativa': 'border-orange-200 bg-orange-50 text-orange-700',
    'Palestra': 'border-purple-200 bg-purple-50 text-purple-700',
    'Eventos': 'border-teal-200 bg-teal-50 text-teal-700',
    'Workshop': 'border-blue-200 bg-blue-50 text-blue-700',
  };
  return colors[type] || 'border-blue-200 bg-blue-50 text-blue-600';
};

export default function CalendarSection() {
  return (
    <section id="calendar" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white px-5 py-2.5 rounded-full mb-6 border border-blue-200 shadow-sm">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600">Calendários Académicos</span>
          </div>
          <h2 className="text-4xl mb-4 text-slate-800">Organiza o Teu Semestre</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Acede aos calendários específicos do teu ano de curso e fica a par dos próximos eventos.
          </p>
        </div>

        {/* Links para Calendários */}
        <div className="mb-20">
          <h3 className="text-2xl mb-8 text-slate-800 text-center">Calendários por Ano</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {calendarLinks.map((calendar) => (
              <button
                key={calendar.year}
                onClick={() => window.open(calendar.link, '_blank')}
                className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
              >
                <Calendar className="h-10 w-10 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                <div className="text-slate-800 mb-2">{calendar.year}</div>
                <div className="text-sm text-blue-600 flex items-center justify-center gap-1">
                  Ver Calendário
                  <ExternalLink className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Próximos Eventos */}
        {upcomingEvents.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl mb-8 text-slate-800 text-center">Próximos Eventos</h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="bg-white rounded-xl border-2 border-blue-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <Badge className={`${getEventBadgeColor(event.type)} border`}>
                      {event.type}
                    </Badge>
                    <span className="text-sm text-slate-500">{event.date}</span>
                  </div>
                  
                  <h4 className="text-xl text-slate-800 mb-4">{event.title}</h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4">{event.description}</p>
                  
                  {event.link && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(event.link, '_blank')}
                      className="text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      Ver Fotos
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Eventos Passados */}
        {pastEvents.length > 0 && (
          <div>
            <h3 className="text-2xl mb-8 text-slate-800 text-center">Eventos Realizados</h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {pastEvents.map((event, idx) => (
                <div key={idx} className="bg-white/70 rounded-xl border border-slate-300 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <Badge variant="outline" className={`${getEventBadgeColor(event.type)} border opacity-75`}>
                      {event.type}
                    </Badge>
                    <span className="text-sm text-slate-400">{event.date}</span>
                  </div>
                  
                  <h4 className="text-xl text-slate-700 mb-4">{event.title}</h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 mb-4">{event.description}</p>
                  
                  {event.link && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(event.link, '_blank')}
                      className="text-slate-600 border-slate-300 hover:bg-slate-50"
                    >
                      Ver Fotos
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
