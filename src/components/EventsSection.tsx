import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, BookOpen, Mic, Sparkles } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  shortDescription: string;
  category: string;
  stats?: string;
  yearLinks: { year: string; url: string }[];
  icon: React.ReactNode;
}

const ICONS: Record<string, React.ReactNode> = {
  trophy: <Trophy className="h-7 w-7" />,
  book: <BookOpen className="h-7 w-7" />,
  mic: <Mic className="h-7 w-7" />,
};

function parseYearLinks(raw: string): { year: string; url: string }[] {
  return (raw || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [year, ...rest] = line.split('|');
      return { year: (year || '').trim(), url: rest.join('|').trim() };
    })
    .filter((yl) => yl.year && yl.url);
}

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
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/flagship-events')
      .then((r) => r.json())
      .then((rows) =>
        setEvents(
          rows.map((r: any) => ({
            id: r.id,
            title: r.title,
            shortDescription: r.short_description,
            category: r.category,
            stats: r.stats,
            yearLinks: parseYearLinks(r.year_links),
            icon: ICONS[r.icon] || ICONS.trophy,
          }))
        )
      )
      .catch(() => setEvents([]));
  }, []);

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
          {events.length === 0 ? (
            <p className="text-center text-slate-500">
              Ainda não há eventos publicados aqui — segue-nos no{' '}
              <a href="https://instagram.com/nmath_ist" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Instagram
              </a>{' '}
              para novidades.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event) => (
                <div key={event.id} className="h-full">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
