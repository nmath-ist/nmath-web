import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, BookOpen, Mic, Sparkles } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  shortDescription: string;
  color: string;
  category: string;
  stats?: string;
  yearLinks?: { year: string; url: string }[]; // Links específicos para cada ano
  icon: React.ReactNode;
}

const events: Event[] = [
  {
    id: 'integration-bee',
    title: 'Integration Bee',
    shortDescription:
      'Competição de cálculo integral que desafia estudantes a resolver integrais sob pressão de tempo.',
    color: 'blue',
    category: 'Competição',
    stats: 'Edição 2025 • Prémios',
    icon: <Trophy className="h-7 w-7" />,
    yearLinks: [
      { year: '2025', url: 'https://www.nmath.pt/eventos/integration-bee-2025' }
    ],
  },
  {
    id: 'jornadas-matematica',
    title: 'Jornadas de Matemática',
    shortDescription:
      'Encontro académico com palestras, roundtables e networking.',
    color: 'purple',
    category: 'Conferência',
    stats: 'Edições: 2017 • 2018 • 2019 • 2023',
    icon: <BookOpen className="h-7 w-7" />,
    yearLinks: [
      { year: '2023', url: 'https://nmath.tecnico.ulisboa.pt/jmatematica23' },
      { year: '2019', url: 'https://nmath.tecnico.ulisboa.pt/jmatematica19/' },
      { year: '2018', url: 'https://nmath.tecnico.ulisboa.pt/jmatematica18/' },
      { year: '2017', url: 'https://nmath.tecnico.ulisboa.pt/jmatematica17/' }
    ],
  },
  {
    id: 'enemath',
    title: 'ENEMATH',
    shortDescription:
      'Encontro Nacional de Matemática.',
    color: 'indigo',
    category: 'ENEMATH',
    stats: 'Edições: 2016 • 2021',
    icon: <BookOpen className="h-7 w-7" />,
    yearLinks: [
      { year: '2021', url: 'https://nmath.tecnico.ulisboa.pt/enemath/' },
      { year: '2016', url: 'https://nmath.tecnico.ulisboa.pt/enemath2016/' }
    ],
  },
  {
    id: 'time2talk',
    title: 'Time2Talk',
    shortDescription:
      'Evento dedicado à divulgação do papel da Matemática no mundo empresarial, com ENEMATH, roundtables e palestras.',
    color: 'green',
    category: 'Palestras',
    stats: 'Edição 2025 • ENEMATH & Palestras',
    icon: <Mic className="h-7 w-7" />,
    yearLinks: [
      { year: '2025', url: 'https://sites.google.com/view/time2talk-nmath/p%C3%A1gina-inicial' }
    ],
  },
];

function EventCard({ event }: { event: Event }) {
  return (
    <div 
      className="group transition-all duration-300 hover:scale-[1.02] h-full"
    >
      <Card className="relative overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Content */}
        <CardHeader className="pb-3 relative flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="text-blue-600">{event.icon}</div>
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                {event.category}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
              {event.title}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600 leading-relaxed">
              {event.shortDescription}
            </CardDescription>
          </div>
        </CardHeader>

        {/* Footer */}
        <CardContent className="pt-0 pb-4 flex-shrink-0">
          {/* Year Links */}
          {event.yearLinks && event.yearLinks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.yearLinks.map((yearLink, index) => (
                <a
                  key={index}
                  href={yearLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 text-xs rounded border border-blue-200 hover:border-blue-300 transition-colors"
                >
                  {yearLink.year}
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function EventsSection() {
  return (
    <section id="events" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-purple-200 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-60 border border-gray-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">Principais Eventos</span>
          </div>

          <h2 className="text-4xl mb-6 text-blue-600">Eventos NMATH</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descobre os principais eventos organizados pelo NMATH ao longo dos anos.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div key={event.id} className="h-full">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}