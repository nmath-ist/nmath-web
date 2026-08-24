import { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, ArrowRight, Zap, Trophy, Calendar as CalendarIcon, Search } from 'lucide-react';
import { announcementUrl } from './slug';
import { CardSkeletonGrid } from './CardSkeleton';
import { toast } from 'sonner';

const ICONS: Record<string, any> = { calendar: CalendarIcon, trophy: Trophy, zap: Zap };

function getInitialParam(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return new URLSearchParams(window.location.search).get(name) || fallback;
}

export default function AnnouncementsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>(() => getInitialParam('categoria', 'Todos'));
  const [query, setQuery] = useState<string>(() => getInitialParam('q', ''));

  useEffect(() => {
    fetch('/api/announcements')
      .then((r) => r.json())
      .then((rows) =>
        setItems(
          rows.map((r: any) => ({
            id: r.id,
            title: r.title,
            excerpt: r.excerpt,
            category: r.category,
            date: r.event_date,
            readTime: r.read_time,
            featured: r.featured,
            icon: ICONS[r.icon] || CalendarIcon,
            fullContent: r.full_content,
          })).reverse()
        )
      )
      .catch(() => {
        setItems([]);
        toast.error('Não foi possível carregar os anúncios. Tenta recarregar a página.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Mantém o filtro/pesquisa na URL, para poderes partilhar o link já filtrado.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category && category !== 'Todos') params.set('categoria', category);
    if (query) params.set('q', query);
    const qs = params.toString();
    const newUrl = window.location.pathname + (qs ? `?${qs}` : '');
    window.history.replaceState(null, '', newUrl);
  }, [category, query]);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean));
    return ['Todos', ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    let result = category === 'Todos' ? items : items.filter((i) => i.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.excerpt?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, category, query]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <a href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
        </a>

        <div className="mb-10">
          <h1 className="text-4xl mb-4 text-slate-800">Todos os Anúncios</h1>
          <p className="text-slate-600 max-w-2xl">
            Arquivo completo dos anúncios e oportunidades do NMATH, por ordem cronológica.
          </p>
        </div>

        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar anúncios..."
              className="pl-9"
              aria-label="Pesquisar anúncios"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                category === c
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && <CardSkeletonGrid count={6} />}

        {!loading && (
          <p className="text-sm text-slate-500 mb-4">
            {filtered.length} {filtered.length === 1 ? 'anúncio encontrado' : 'anúncios encontrados'}
          </p>
        )}

        {!loading && filtered.length === 0 && items.length > 0 && (
          <p className="text-slate-500">
            Não há anúncios que correspondam à tua pesquisa. Experimenta outro termo ou{' '}
            <button
              onClick={() => { setQuery(''); setCategory('Todos'); }}
              className="text-blue-600 hover:underline"
            >
              limpa os filtros
            </button>
            .
          </p>
        )}
        {!loading && items.length === 0 && (
          <p className="text-slate-500">
            Ainda não há anúncios publicados — segue-nos no{' '}
            <a href="https://instagram.com/nmath_ist" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Instagram
            </a>{' '}
            para novidades.
          </p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
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
                          {item.featured && (
                            <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                              Destaque
                            </Badge>
                          )}
                        </div>
                        <h3 className="mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">{item.excerpt}</p>
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
  );
}
