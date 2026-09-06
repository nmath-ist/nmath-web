import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, Zap, Trophy, Calendar as CalendarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { announcementUrl } from './slug';
import { CardSkeletonGrid } from './CardSkeleton';
import { toast } from 'sonner';
import { sortByDateDesc, formatDateRange } from './dateUtils';

const ICONS: Record<string, any> = { calendar: CalendarIcon, trophy: Trophy, zap: Zap };

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/announcements')
      .then((r) => r.json())
      .then((rows) =>
        setNewsItems(
          sortByDateDesc(rows, (r: any) => r.event_date, (r: any) => r.event_end_date).map((r: any) => ({
            id: r.id,
            title: r.title,
            excerpt: r.excerpt,
            category: r.category,
            date: formatDateRange(r.event_date, r.event_end_date),
            featured: r.featured,
            icon: ICONS[r.icon] || CalendarIcon,
            fullContent: r.full_content,
          }))
        )
      )
      .catch(() => {
        setNewsItems([]);
        toast.error('Não foi possível carregar os anúncios. Tenta recarregar a página.');
      })
      .finally(() => setLoading(false));
  }, []);

  // newsItems já vem ordenado do mais recente para o mais antigo.
  const featured = newsItems.filter((item) => item.featured);
  const others = newsItems.filter((item) => !item.featured).slice(0, 4);

  return (
    <section id="news" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-slate-800">Anúncios</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Mantém-te informado com os anúncios e oportunidades do NMATH.
          </p>
        </div>

        {loading ? (
          <CardSkeletonGrid count={5} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" />
        ) : (
          <div>
            <div className="mb-8">
              {featured.map((item) => (
                <Card key={item.id} className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        Em destaque
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

                        <a href={announcementUrl(item)}>
                          <Button
                            variant="secondary"
                            className="bg-white/20 text-white border-0 hover:bg-white/30 group"
                          >
                            Ler Mais
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-slate-800">Outros Anúncios (por data)</h3>
                <a href="/anuncios">
                  <Button variant="outline" size="sm">
                    Ver todos os anúncios
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
              {others.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {others.map((item) => (
                    <a
                      key={item.id}
                      href={announcementUrl(item)}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
                    >
                      <Card className="overflow-hidden border border-slate-200 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 group h-full">
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
                              <h3 className="mb-2 leading-tight group-hover:text-blue-600 transition-colors">
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
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
