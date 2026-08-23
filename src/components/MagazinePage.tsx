import { useState, useEffect } from 'react';
import Header from './Header';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function MagazinePage() {
  const [editions, setEditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/magazine')
      .then((r) => r.json())
      .then((rows) =>
        setEditions(
          rows.map((r: any) => ({
            id: r.id,
            title: r.title,
            issue: r.issue,
            coverImage: r.cover_image_url,
            description: r.description,
            publishDate: r.publish_date,
            link: r.link,
            isCurrent: !!r.is_current,
          }))
        )
      )
      .catch(() => setEditions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <a href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
        </a>

        <div className="mb-10">
          <h1 className="text-4xl mb-4 text-slate-800">Arquivo da Revista Ponto Fixo</h1>
          <p className="text-slate-600 max-w-2xl">
            Todas as edições publicadas pelo NMATH, da mais recente à mais antiga.
          </p>
        </div>

        {loading && <p className="text-slate-500">A carregar...</p>}
        {!loading && editions.length === 0 && <p className="text-slate-500">Ainda não há edições publicadas.</p>}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {editions.map((edition) => (
            <Card
              key={edition.id}
              className="overflow-hidden border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => window.open(edition.link, '_blank', 'noopener,noreferrer')}
            >
              <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                <ImageWithFallback
                  src={edition.coverImage}
                  alt={edition.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                {edition.isCurrent && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white border-0">NOVA</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="mb-1 leading-tight">{edition.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{edition.issue}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(edition.link, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Ler
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
