import { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Zap, Trophy, Calendar as CalendarIcon, X } from 'lucide-react';

const ICONS: Record<string, any> = { calendar: CalendarIcon, trophy: Trophy, zap: Zap };

export default function AnnouncementsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('Todos');
  const [selected, setSelected] = useState<any>(null);

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
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean));
    return ['Todos', ...Array.from(set)];
  }, [items]);

  const filtered = category === 'Todos' ? items : items.filter((i) => i.category === category);

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

        {selected ? (
          <div className="max-w-4xl mx-auto">
            <Card className="border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="border-blue-200 text-blue-600">
                      {selected.category}
                    </Badge>
                    <span className="text-sm text-slate-500">{selected.date}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <h1 className="text-4xl mb-6 text-slate-800">{selected.title}</h1>
                <div className="prose prose-slate max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: selected.fullContent || selected.excerpt }}
                    className="space-y-4"
                  />
                </div>
                <div className="flex items-center justify-end mt-8 pt-4 border-t border-slate-200">
                  <Button onClick={() => setSelected(null)}>Voltar à lista</Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <>
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

            {loading && <p className="text-slate-500">A carregar...</p>}
            {!loading && filtered.length === 0 && (
              <p className="text-slate-500">Não há anúncios nesta categoria.</p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border border-slate-200 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 group"
                  onClick={() => setSelected(item)}
                >
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
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
