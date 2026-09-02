import { useState, useEffect } from 'react';
import Header from './Header';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useDocumentMeta } from './useDocumentMeta';
import { CardSkeleton } from './CardSkeleton';
import { toast } from 'sonner';
import { formatDateRange } from './dateUtils';

// Página de detalhe de um anúncio, com URL própria (/anuncios/:id-slug).
// Isto permite partilhar o link de um anúncio específico (Instagram,
// WhatsApp, etc.) com o preview correto, e é indexável pelo Google.
export default function AnnouncementDetailPage({ id }: { id: number }) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetch('/api/announcements')
      .then((r) => r.json())
      .then((rows) => {
        const found = (rows || []).find((r: any) => r.id === id);
        if (!found) {
          setNotFound(true);
          setItem(null);
        } else {
          setItem(found);
        }
      })
      .catch(() => {
        setNotFound(true);
        toast.error('Não foi possível carregar este anúncio. Tenta recarregar a página.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const plainExcerpt = (item?.excerpt || '').replace(/<[^>]+>/g, '').slice(0, 160);
  useDocumentMeta(
    item ? `${item.title} — NMATH` : 'NMATH',
    item ? plainExcerpt : undefined
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <a href="/anuncios" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar aos anúncios
        </a>

        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="p-2">
              <CardSkeleton />
            </div>
          )}

          {!loading && notFound && (
            <Card className="border border-slate-200 p-8 text-center">
              <p className="text-slate-600 mb-4">Não encontrámos este anúncio — pode ter sido removido.</p>
              <a href="/anuncios">
                <Button variant="outline">Ver todos os anúncios</Button>
              </a>
            </Card>
          )}

          {!loading && item && (
            <Card className="border border-slate-200 shadow-xl">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Badge variant="outline" className="border-blue-200 text-blue-600">
                    {item.category}
                  </Badge>
                  <span className="text-sm text-slate-500">{formatDateRange(item.event_date, item.event_end_date)}</span>
                </div>

                <h1 className="text-4xl mb-6 text-slate-800">{item.title}</h1>

                <div className="prose prose-slate max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.full_content || item.excerpt }}
                    className="space-y-4"
                  />
                </div>

                <div className="flex items-center justify-end mt-8 pt-4 border-t border-slate-200">
                  <a href="/anuncios">
                    <Button>Voltar aos Anúncios</Button>
                  </a>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
