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
    date: "12 Novembro, 2025",
    time: "A definir",
    location: "A definir",
    description: "Testa os teus conhecimentos de cultura gerak neste quizz divertido e competitivo!",
    type: "Recreativa",
    link: undefined
  }
];

const pastEvents = [
  ,
  {
    title: "Filosofia dos Números Ordinais",
    date: "21 Dezembro, 2025",
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
    <section id="calendar" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-teal-50 px-5 py-2.5 rounded-full mb-6 border border-blue-100">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600">Calendários Académicos</span>
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-slate-800">Organiza o Teu Semestre</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Acede aos calendários específicos do teu ano de curso e fica a par dos próximos eventos.
          </p>
        </div>

        {/* Links para Calendários */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-2xl mb-8 text-slate-800 text-center">Calendários por Ano</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {calendarLinks.map((calendar, idx) => (
              <Card 
                key={calendar.year} 
                className="overflow-hidden border-2 border-transparent bg-white/80 backdrop-blur-sm hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                onClick={() => window.open(calendar.link, '_blank')}
              >
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-4 inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-10 w-10 text-blue-600" />
                    </div>
                    <h4 className="text-xl mb-3 text-slate-800">{calendar.year}</h4>
                    <div className="flex items-center justify-center text-blue-600">
                      <span>Ver Calendário</span>
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Próximos Eventos */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h3 className="text-3xl mb-3 text-slate-800">Próximos Eventos</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, idx) => (
              <Card key={idx} className="overflow-hidden border-2 border-slate-100 bg-white hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-8 relative">
                  {/* Gradient overlay on hover */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className={`${getEventBadgeColor(event.type)} border-2 px-3 py-1`}>
                      {event.type}
                    </Badge>
                    <span className="text-sm text-slate-500">{event.date}</span>
                  </div>
                  
                  <h4 className="text-xl mb-4 text-slate-800 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                  
                  <div className="flex flex-col gap-3 mb-5 text-slate-600">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-teal-50 p-2 rounded-lg">
                        <MapPin className="h-4 w-4 text-teal-600" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {event.link && (
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(event.link, '_blank')}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-400 transition-all"
                      >
                        Ver Fotos
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Eventos Passados */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl mb-3 text-slate-700">Eventos Realizados</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-slate-300 to-slate-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event, idx) => (
              <Card key={idx} className="overflow-hidden border border-slate-200 bg-white/60 backdrop-blur-sm hover:shadow-xl hover:bg-white/80 transition-all duration-300 group">
                <CardContent className="p-8 relative">
                  {/* Subtle gradient bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-300 to-slate-400 opacity-50"></div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className={`${getEventBadgeColor(event.type)} opacity-75 border px-3 py-1`}>
                      {event.type}
                    </Badge>
                    <span className="text-sm text-slate-400">{event.date}</span>
                  </div>
                  
                  <h4 className="text-xl mb-4 text-slate-700 group-hover:text-slate-800 transition-colors">{event.title}</h4>
                  
                  <div className="flex flex-col gap-3 mb-5 text-slate-500">
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <Clock className="h-4 w-4 text-slate-500" />
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <MapPin className="h-4 w-4 text-slate-500" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {event.link && (
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(event.link, '_blank')}
                        className="text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
                      >
                        Ver Fotos
                        <ExternalLink className="ml-2 h-3 w-3" />
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
