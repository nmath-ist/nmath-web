import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  Camera, 
  Headphones, 
  ExternalLink, 
  Play,
  Clock
} from 'lucide-react';

function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const [ano, mes, dia] = dateStr.split('-').map(Number);
  if (!ano || !mes || !dia) return dateStr; // fallback se não vier no formato esperado
  return `${dia} ${meses[mes - 1]} ${ano}`;
}

export default function ResourceLinksSection() {
  const [latestEpisode, setLatestEpisode] = useState<{
    title: string; duration: string; date: string; url: string;
  } | null>(null);
  const [latestAlbum, setLatestAlbum] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    fetch('/api/oracle-episodes')
      .then((r) => r.json())
      .then((rows) => {
        if (rows && rows.length > 0) {
          const sorted = [...rows].sort(
            (a, b) => new Date(b.episode_date).getTime() - new Date(a.episode_date).getTime()
          );
          const ep = sorted[0];
          setLatestEpisode({
            title: ep.title,
            duration: ep.duration,
            date: formatShortDate(ep.episode_date),
            url: ep.url,
          });
        }
      })
      .catch(() => setLatestEpisode(null));

    fetch('/api/photo-albums')
  .then((r) => r.json())
  .then((rows) => {
    if (rows && rows.length > 0) {
      const sorted = [...rows].sort(
        (a, b) => new Date(b.album_date).getTime() - new Date(a.album_date).getTime()
      );
      const album = sorted[0];
      setLatestAlbum({ title: album.title, url: album.drive_url });
    }
  })
  .catch(() => setLatestAlbum(null));
  }, []);

  const externalLinks = [
    {
      id: 1,
      title: "Álbum de Fotos",
      description: "Explora as memórias dos nossos eventos e atividades",
      icon: Camera,
      url: latestAlbum?.url || "https://drive.google.com/drive/folders/1UCcJhlosNg9WY2-VhXz3bD7F3Gz0R3eU",
      color: "from-teal-600 to-blue-700",
      highlights: ["Hackathon 2024", "Cerimónia de Graduação", "Atividades do Núcleo", "Eventos do Campus"],
    },
    {
      id: 2,
      title: "Oráculo",
      description: "Se aprender Matemática é bom, ouvir Matemática é ainda melhor.",
      icon: Headphones,
      url: "https://open.spotify.com/show/2yqzMLv5S0W5kaiDGJ6Fa7?si=537cde4120b3435c",
      color: "from-blue-700 to-teal-600",
      stats: "Lançamentos mensais",
      highlights: ["Dicas", "Entrevistas", "Insights de alunos"],
    }
  ];

  // Último episódio disponível (vem da API — ver useEffect acima)

  return (
    <section id="photos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-slate-800">Conecta & Explora</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Acede às nossas memórias fotográficas, ouve testemunhos da comunidade de Matemática e encontra recursos úteis para os teus estudos.
          </p>
        </div>

        {/* Main External Links */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {externalLinks.map((link) => (
            <Card key={link.id} className="overflow-hidden border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div
                  className={`bg-gradient-to-br ${link.color} p-8 text-white relative overflow-hidden ${link.id === 1 ? 'cursor-pointer' : ''}`}
                  onClick={link.id === 1 ? () => (window.location.href = '/fotos') : undefined}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <link.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl mb-1">{link.title}</h3>
                    </div>
                    
                    <p className="text-white/90 mb-6 leading-relaxed">
                      {link.description}
                    </p>

                {link.id === 2 && (
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-0 group-hover:bg-white group-hover:text-slate-800 transition-all"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    Ouvir Agora
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
                  </div>
                </div>

                {/* Extra section apenas para o Oráculo */}
                {link.id === 2 && latestEpisode && (
                  <div className="p-6 bg-slate-50">
                    <h4 className="mb-4 text-slate-800">🎧 Último Episódio</h4>
                    <a
                      href={latestEpisode.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <Play className="h-5 w-5 text-teal-700" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm leading-tight">{latestEpisode.title}</p>
                          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{latestEpisode.duration}</span>
                            </span>
                            <span>{latestEpisode.date}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="/oraculo" className="block text-center text-sm text-teal-700 hover:text-teal-800 mt-3">
                      Ver todos os episódios →
                    </a>
                  </div>
                )}

                {/* Extra section apenas para as Fotos */}
                {link.id === 1 && latestAlbum && (
                  <div className="p-6 bg-slate-50">
                    <h4 className="mb-4 text-slate-800">📷 Álbum mais recente</h4>
                    <a
                      href={latestAlbum.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Camera className="h-5 w-5 text-blue-700" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm leading-tight">{latestAlbum.title}</p>
                        </div>
                      </div>
                    </a>
                    <a href="/fotos" className="block text-center text-sm text-teal-700 hover:text-teal-800 mt-3">
                      Ver todas as fotos →
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-8 border border-slate-200 bg-gradient-to-r from-blue-600 to-teal-600 text-white overflow-hidden">
          <CardContent className="p-8 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl mb-3">Precisas de Ajuda ou Tens Sugestões?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Estamos aqui para ajudar! Entra em contacto connosco para suporte, feedback ou ideias para melhorar a tua experiência em Matemática.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="secondary" 
                  className="bg-white/20 text-white border-0 hover:bg-white hover:text-slate-800"
                  onClick={() => { window.location.href = 'mailto:nmath.geral@gmail.com?subject=Contacto NMATH&body=Olá! Gostaria de entrar em contacto convosco.'; }}
                >
                  Contacta-nos
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}