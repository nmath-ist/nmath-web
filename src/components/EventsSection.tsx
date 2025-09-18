import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  image: string;
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
    image: 'https://images.unsplash.com/photo-1754304342484-3256d59778e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMGNvbXBldGl0aW9uJTIwaW50ZWdyYXRpb24lMjBjYWxjdWx1c3xlbnwxfHx8fDE3NTY2NDk5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
    image: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbmZlcmVuY2UlMjBtYXRoZW1hdGljcyUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzU2NjQ5OTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
    image: 'https://images.unsplash.com/photo-1660795468878-d9d8d75967b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMG5hdGlvbmFsJTIwY29uZmVyZW5jZSUyMHN0dWRlbnRzfGVufDF8fHx8MTc1NjY0OTk5MHww&ixlib=rb-4.1.0&q=80&w=1080',
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
    image: 'https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMHRhbGslMjBwcmVzZW50YXRpb24lMjBsZWN0dXJlfGVufDF8fHx8MTc1NjY0OTk5NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

function EventCard({ event }: { event: Event }) {
  return (
    <div className="group transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 h-full">
      <Card className="relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        {/* Header com imagem */}
        <div className="h-32 relative overflow-hidden flex-shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/400x200/3b82f6/white?text=${encodeURIComponent(event.title)}`;
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Sparkles decorativos */}
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="h-8 w-8 text-white" />
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
              {event.category}
            </Badge>
          </div>

          {/* Icon */}
          <div className="absolute bottom-4 left-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl border border-white border-opacity-30">
              <div className="text-white">{event.icon}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardHeader className="pb-3 relative flex-1">
          <div className="flex items-start justify-between h-full">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2 group-hover:text-gray-900 transition-colors">
                {event.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 leading-relaxed">
                {event.shortDescription}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Footer */}
        <CardContent className="pt-0 pb-6 flex-shrink-0">
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
                  className="inline-flex items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 text-sm rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
                >
                  {event.title === 'Integration Bee' && 'Integration Bee '}
                  {event.title === 'Jornadas de Matemática' && 'Jornadas '}
                  {event.title === 'ENEMATH' && 'ENEMATH '}
                  {event.title === 'Time2Talk' && 'Time2Talk '}
                  {yearLink.year}
                </a>
              ))}
            </div>
          )}
        </CardContent>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
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

        <div className="max-w-7xl mx-auto">
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