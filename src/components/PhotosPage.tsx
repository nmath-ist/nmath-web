import { useState, useEffect } from 'react';
import Header from './Header';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, ExternalLink, Camera } from 'lucide-react';

function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const [ano, mes, dia] = dateStr.split('-').map(Number);
  if (!ano || !mes || !dia) return dateStr;
  return `${dia} ${meses[mes - 1]} ${ano}`;
}

export default function PhotosPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/photo-albums')
      .then((r) => r.json())
      .then((rows) =>
        setAlbums(
          rows
            .map((r: any) => ({
              id: r.id,
              title: r.title,
              url: r.drive_url,
              date: formatShortDate(r.album_date),
              rawDate: r.album_date,
            }))
            .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime())
        )
      )
      .catch(() => setAlbums([]))
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
          <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Camera className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl mb-2 text-slate-800">Todos os Álbuns de Fotos</h1>
            <p className="text-slate-600 max-w-2xl">
              Explora as memórias de todos os eventos e atividades do NMATH.
            </p>
          </div>
        </div>

        {loading && <p className="text-slate-500">A carregar...</p>}
        {!loading && albums.length === 0 && (
          <p className="text-slate-500">Ainda não há álbuns publicados.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <Card
              key={album.id}
              className="overflow-hidden border border-slate-200 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 group"
              onClick={() => window.open(album.url, '_blank')}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Camera className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 leading-tight group-hover:text-blue-600 transition-colors">
                      {album.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        Abrir no Drive <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                      {album.date && <span>· {album.date}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}