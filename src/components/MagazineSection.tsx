import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BookOpen, 
  ExternalLink,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Edition = {
  id: number;
  title: string;
  issue: string;
  coverImage: string;
  description: string;
  publishDate: string;
  highlights: string[];
  link: string;
  isCurrent: boolean;
};

export default function MagazineSection() {
  const [editions, setEditions] = useState<Edition[]>([]);

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
            highlights: (r.highlights || '').split('\n').filter(Boolean),
            link: r.link,
            isCurrent: !!r.is_current,
          }))
        )
      )
      .catch(() => setEditions([]));
  }, []);

  const currentEdition = editions.find((e) => e.isCurrent) || editions[0];

  const handleEditionClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="magazine" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600">Revista e Repositório</span>
          </div>
          <h2 className="text-4xl mb-4 text-slate-800">Para Ler e Estudar</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Lê a revista Ponto Fixo, feita por alunos, professores e investigadores do IST, e encontra no Repositório os documentos para estudar.
          </p>
        </div>

        {/* Revista (tamanho mantido) com o Repositório ao lado; em ecrãs pequenos ficam um por baixo do outro */}
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,48rem)_minmax(0,1fr)]">
          <div className="w-full max-w-3xl mx-auto lg:mx-0">
            {!currentEdition ? (
              <p className="text-center text-slate-500">A carregar edições...</p>
            ) : (
              <Card className="overflow-hidden border border-slate-200 shadow-xl bg-white cursor-pointer hover:shadow-2xl transition-all">
                <div className="grid lg:grid-cols-2 gap-0" onClick={() => handleEditionClick(currentEdition.link)}>
                  <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                    <ImageWithFallback 
                      src={currentEdition.coverImage}
                      alt={currentEdition.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white border-0">
                        NOVA
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm opacity-90">{currentEdition.issue}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl mb-2">{currentEdition.title}</CardTitle>
                      <p className="text-slate-600">{currentEdition.issue}</p>
                    </CardHeader>

                    <CardContent className="p-0">
                      <p className="text-slate-700 mb-6 leading-relaxed">
                        {currentEdition.description}
                      </p>

                      {currentEdition.highlights.length > 0 && (
                        <div className="mb-6">
                          <h4 className="mb-3 text-slate-800">Destaques desta Edição</h4>
                          <ul className="space-y-2">
                            {currentEdition.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-slate-600">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditionClick(currentEdition.link);
                          }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Ler Online
                        </Button>
                        <a href="/revista" onClick={(e) => e.stopPropagation()}>
                          <Button variant="outline">
                            Arquivo
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Repositório */}
          <div className="w-full max-w-3xl mx-auto lg:max-w-none lg:mx-0">
            <Card className="h-full border border-slate-200 shadow-xl bg-white">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white flex items-center justify-center mb-4">
                  <FolderOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl mb-2 text-slate-800">Repositório</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  O arquivo de documentos de matemática do NMATH, para quem estuda no IST.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['LMAC', 'MMAC', 'MECD', 'Doutoramento'].map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-500 mb-6">Entras com a tua conta do Fénix.</p>
                <a
                  href="https://repositorio.nmath.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Abrir Repositório
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
