import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  Camera,
  Headphones,
  ExternalLink,
  Trophy,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

const RANKING_URL = "https://leaderboarded.com/board/cmbtpbfhczsgr/?public=true";

function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const [ano, mes, dia] = dateStr.split('-').map(Number);
  if (!ano || !mes || !dia) return dateStr; // fallback se não vier no formato esperado
  return `${dia} ${meses[mes - 1]} ${ano}`;
}

type Extra = { label: string; title: string; href: string; date?: string };

export default function ResourceLinksSection() {
  const [latestEpisode, setLatestEpisode] = useState<{ title: string; url: string; date: string } | null>(null);
  const [latestAlbum, setLatestAlbum] = useState<{ title: string; url: string; date: string } | null>(null);

  useEffect(() => {
    fetch('/api/oracle-episodes')
      .then((r) => r.json())
      .then((rows) => {
        if (rows && rows.length > 0) {
          const sorted = [...rows].sort(
            (a, b) => new Date(b.episode_date).getTime() - new Date(a.episode_date).getTime()
          );
          const ep = sorted[0];
          setLatestEpisode({ title: ep.title, url: ep.url, date: formatShortDate(ep.episode_date) });
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
          setLatestAlbum({ title: album.title, url: album.drive_url, date: formatShortDate(album.album_date) });
        }
      })
      .catch(() => setLatestAlbum(null));
  }, []);

  // Os 4 cartões da secção. O "id" serve de âncora (por exemplo /#psi-liga).
  const cards: {
    id: string;
    title: string;
    description: string;
    icon: typeof Trophy;
    color: string;
    extra?: Extra | null;
    cta: { label: string; href: string; external?: boolean };
  }[] = [
    {
      id: "psi-liga",
      title: "𝜓-Liga",
      description: "Participa nos eventos do núcleo, soma 𝜓's e sobe no ranking. No final do ano há prémios para os melhores.",
      icon: Trophy,
      color: "from-blue-600 to-teal-600",
      cta: { label: "Ver ranking", href: RANKING_URL, external: true },
    },
    {
      id: "mobility",
      title: "Mobilidade",
      description: "Experiências de alunos de matemática do IST em Erasmus e mestrados fora: alojamento, custos, bolsas e dicas.",
      icon: GraduationCap,
      color: "from-blue-600 to-teal-600",
      cta: { label: "Ver documentos", href: "/mobilidade" },
    },
    {
      id: "fotos",
      title: "Álbum de Fotos",
      description: "Revive as memórias dos nossos eventos e atividades.",
      icon: Camera,
      color: "from-blue-600 to-teal-600",
      extra: latestAlbum && { label: "Álbum mais recente", title: latestAlbum.title, href: latestAlbum.url, date: latestAlbum.date },
      cta: { label: "Ver todas as fotos", href: "/fotos" },
    },
    {
      id: "oraculo",
      title: "Oráculo",
      description: "Se aprender Matemática é bom, ouvir Matemática é ainda melhor.",
      icon: Headphones,
      color: "from-blue-600 to-teal-600",
      extra: latestEpisode && { label: "Último episódio", title: latestEpisode.title, href: latestEpisode.url, date: latestEpisode.date },
      cta: { label: "Ver todos os episódios", href: "/oraculo" },
    },
  ];

  return (
    <section id="photos" className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl mb-4 text-slate-800">Para Além das Aulas</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Compete, prepara o teu Erasmus ou mestrado no estrangeiro, revê memórias e ouve Matemática. O NMATH também se vive fora da sala.
          </p>
        </div>

        {/* Os 4 cartões: 4 numa linha no computador, 2x2 no telemóvel e tablet */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cards.map((card) => (
            <div key={card.id} id={card.id} className="scroll-mt-24">
              <Card className="h-full border border-slate-200 bg-white hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-4`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl mb-2 text-slate-800">{card.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{card.description}</p>

                  {card.extra && (
                    <a
                      href={card.extra.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 mb-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 p-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    >
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs text-slate-500">
                          {card.extra.label}
                          {card.extra.date ? ` · ${card.extra.date}` : ''}
                        </span>
                        <span className="block text-sm font-medium text-slate-800 leading-tight line-clamp-2">{card.extra.title}</span>
                      </div>
                    </a>
                  )}

                  <a
                    href={card.cta.href}
                    {...(card.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm text-teal-700 hover:text-teal-800"
                  >
                    {card.cta.label}
                    {card.cta.external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </a>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-8 border border-slate-200 bg-gradient-to-r from-blue-600 to-teal-600 text-white overflow-hidden">
          <CardContent className="p-5 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-xl mb-2">Precisas de Ajuda ou Tens Sugestões?</h3>
              <p className="text-blue-100 text-sm mb-4 max-w-2xl mx-auto">
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
