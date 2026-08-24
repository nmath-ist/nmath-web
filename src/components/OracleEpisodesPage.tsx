import { useState, useEffect } from 'react';
import Header from './Header';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Play, Clock, Headphones } from 'lucide-react';
import { CardSkeletonGrid } from './CardSkeleton';
import { toast } from 'sonner';

function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const [ano, mes, dia] = dateStr.split('-').map(Number);
  if (!ano || !mes || !dia) return dateStr; // fallback se não vier no formato esperado
  return `${dia} ${meses[mes - 1]} ${ano}`;
}

export default function OracleEpisodesPage() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/oracle-episodes')
      .then((r) => r.json())
      .then((rows) =>
        setEpisodes(
          rows
            .map((r: any) => ({
              id: r.id,
              title: r.title,
              duration: r.duration,
              date: formatShortDate(r.episode_date),
              rawDate: r.episode_date, // guardamos o original para ordenar
              plays: r.plays,
              url: r.url,
            }))
            .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime())
        )
      )
      .catch(() => {
        setEpisodes([]);
        toast.error('Não foi possível carregar os episódios. Tenta recarregar a página.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <a href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
        </a>

        <div className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Headphones className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl mb-2 text-slate-800">Todos os Episódios do Oráculo</h1>
            <p className="text-slate-600 max-w-2xl">
              O arquivo completo do nosso podcast, por ordem cronológica.
            </p>
          </div>
        </div>

        {loading && <CardSkeletonGrid count={6} />}

        {!loading && episodes.length === 0 && (
          <p className="text-slate-500">
            Ainda não há episódios publicados — o primeiro está a caminho. Entretanto, dá uma vista de
            olhos ao resto do{' '}
            <a href="https://open.spotify.com/show/2yqzMLv5S0W5kaiDGJ6Fa7?si=537cde4120b3435c" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Spotify
            </a>.
          </p>
        )}

        {!loading && episodes.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((ep) => (
              <a
                key={ep.id}
                href={ep.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
              >
                <Card className="overflow-hidden border border-slate-200 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <Play className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                          {ep.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          {ep.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" /> {ep.duration}
                            </span>
                          )}
                          <span>{ep.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button
            variant="outline"
            onClick={() => window.open('https://open.spotify.com/show/2yqzMLv5S0W5kaiDGJ6Fa7?si=537cde4120b3435c', '_blank')}
          >
            Ouvir no Spotify
          </Button>
        </div>
      </div>
    </div>
  );
}
