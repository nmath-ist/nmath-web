import React from "react";
import { Card, CardContent } from './ui/card';
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
  },
  // Adiciona mais eventos aqui seguindo o mesmo formato:
  // {
  //   title: "Nome do Evento",
  //   date: "DD Mês, AAAA",
  //   time: "HH:MM",
  //   location: "Local",
  //   description: "Descrição do evento...",
  //   type: "Recreativa" ou "Palestra" ou "Workshop" ou "Eventos",
  //   link: "https://..." ou undefined
  // }
];

const getEventTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'Recreativa': 'bg-orange-100 text-orange-700',
    'Palestra': 'bg-purple-100 text-purple-700',
    'Eventos': 'bg-teal-100 text-teal-700',
    'Workshop': 'bg-blue-100 text-blue-700',
  };
  return colors[type] || 'bg-blue-100 text-blue-700';
};

export default function CalendarSection() {
  return (
    <section id="calendar" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 px-5 py-2 rounded-full mb-5 shadow-sm">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700">Calendários Académicos</span>
          </div>
          <h2 className="text-4xl mb-4 text-slate-800">Organiza o Teu Semestre</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Acede aos calendários específicos do teu ano de curso e fica a par dos próximos eventos.
          </p>
        </div>

        {/* Calendários Grid */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-2xl mb-10 text-slate-800 text-center">Calendários por Ano</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {calendarLinks.map((calendar) => (
              <Card
                key={calendar.year}
                className="border-2 border-slate-200 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => window.open(calendar.link, '_blank')}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-5 inline-block mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-10 w-10 text-blue-600" />
                  </div>
                  <h4 className="text-xl mb-3 text-slate-800">{calendar.year}</h4>
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <span>Ver Calendário</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Próximos Eventos */}
        {upcomingEvents.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-3xl mb-3 text-slate-800">Próximos Eventos</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Grid que se adapta: 1 coluna se houver 1 evento, 2 colunas se houver 2+ */}
            <div className={`grid gap-6 ${upcomingEvents.length === 1 ? 'max-w-3xl mx-auto' : 'md:grid-cols-2'}`}>
              {upcomingEvents.map((event, idx) => (
                <Card key={idx} className="border-2 border-blue-200 bg-white shadow-md hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    
                    {/* Header do Card */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                      <span className={`px-4 py-1.5 rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className="text-slate-500">{event.date}</span>
                    </div>
                    
                    {/* Título */}
                    <h4 className="text-2xl text-slate-800 mb-5">{event.title}</h4>
                    
                    {/* Info */}
                    <div className="mb-5 space-y-3">
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="bg-teal-50 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-teal-600" />
                        </div>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    {/* Descrição */}
                    <p className="text-slate-600 leading-relaxed mb-5">{event.description}</p>
                    
                    {/* Link */}
                    {event.link && (
                      <a 
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 px-5 py-2.5 rounded-lg transition-all"
                      >
                        <span>Ver Fotos</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
