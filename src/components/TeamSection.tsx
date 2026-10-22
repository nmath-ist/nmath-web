import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const FALLBACK_RECRUITMENT_LINK = 'https://docs.google.com/forms/d/1UKR38c0HM9hxx9y8zUOMKr5mfEOwozNLDsRNEIOJlSQ/edit';

// IMPORTA AQUI AS FOTOS LOCAIS (coloca-as em src/assets/team/ - instruções abaixo)
// Exemplo:
import bernardoImg from '../assets/team/Bernardo.jpeg';
import relvasImg from '../assets/team/Relvas.jpeg';
import gabrielaImg from '../assets/team/Gabriela.jpeg';
import ptImg from '../assets/team/Pedro.jpeg';
import matildeImg from '../assets/team/Matilde.jpeg';
import madalenaImg from '../assets/team/Madalena.jpeg';
import duarteImg from '../assets/team/Duarte.jpeg';

// Sólidos de Platão do logótipo, usados como fundo dos cartões com recorte
import tetraedro from '../assets/solidos/tetraedro.png';
import cubo from '../assets/solidos/cubo.png';
import dodecaedro from '../assets/solidos/dodecaedro.png';
import icosaedro from '../assets/solidos/icosaedro.png';

const SOLIDS = [tetraedro, cubo, dodecaedro, icosaedro];

// Fotos sem fundo: ficheiros com o nome da foto + "f" em src/assets/team/ (ex.: Bernardof.png).
// O site vai buscar sozinho os que existirem; quem ainda não tiver recorte mantém a foto normal.
const cutoutModules = (import.meta as any).glob('../assets/team/*f.{png,PNG,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const CUTOUTS: Record<string, string> = {};
for (const [path, url] of Object.entries(cutoutModules)) {
  const base = (path.split('/').pop() || '').replace(/\.[^.]+$/, '').replace(/f$/i, '').toLowerCase();
  CUTOUTS[base] = url;
}

export default function TeamSection() {
  const [recruitmentLink, setRecruitmentLink] = useState(FALLBACK_RECRUITMENT_LINK);

  useEffect(() => {
    fetch('/api/calendar-years?resource=recruitment')
      .then((r) => r.json())
      .then((data) => {
        if (data?.link) setRecruitmentLink(data.link);
      })
      .catch(() => {});
  }, []);

  const teamMembers = [
    { id: 1, name: "Bernardo Alves", role: "Presidente", year: "2º Ano - MMAC", image: bernardoImg, key: "bernardo" },
    { id: 2, name: "Francisco Relvas", role: "Vice Presidente", year: "2º Ano - MMAC", image: relvasImg, key: "relvas" },
    { id: 3, name: "Gabriela Barros", role: "Tesoureira", year: "2º Ano - MMAC", image: gabrielaImg, key: "gabriela" },
    { id: 4, name: "Pedro Coelho", role: "Coordenador da Educação", year: "1º Ano - MMAC", image: ptImg, key: "pedro" },
    { id: 5, name: "Matilde Neri", role: "Coordenador de Eventos e Relações Empresariais", year: "1º Ano - MECD", image: matildeImg, key: "matilde" },
    { id: 6, name: "Madalena Oliveira", role: "Coordenadora do Marketing", year: "2º Ano - MMAC", image: madalenaImg, key: "madalena" },
    { id: 7, name: "Duarte Serra", role: "Coordenadora da Recreativa", year: "1º Ano - MECD", image: duarteImg, key: "duarte" },
  ];

  const MemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
    const cutout = CUTOUTS[member.key];

    // Com recorte (foto sem fundo): a pessoa "sai" do cartão, com um sólido de Platão atrás
    if (cutout) {
      const solid = SOLIDS[(member.id - 1) % SOLIDS.length];
      return (
        <div className="relative h-full pt-16 group">
          <div className="relative h-full rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white border border-slate-200 shadow-md group-hover:shadow-xl transition-all group-hover:-translate-y-2 flex flex-col">
            {/* Fundo decorativo (cortado nos cantos do cartão) */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <img
                src={solid}
                alt=""
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-44 max-w-none opacity-35 [filter:brightness(2.2)]"
              />
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
            </div>

            {/* Pessoa: a cabeça passa por cima do topo do cartão */}
            <div className="relative z-10 h-36">
              <img
                src={cutout}
                alt={member.name}
                loading="lazy"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-52 w-auto max-w-none object-contain drop-shadow-xl"
              />
            </div>

            {/* Nome e cargo: painel que cobre a base do recorte */}
            <div className="relative z-20 -mt-4 mx-3 mb-3 rounded-lg bg-slate-900/30 backdrop-blur-sm px-3 py-3 text-center flex-1 flex flex-col items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold truncate">{member.name}</h3>
                <p className="text-blue-100 text-sm leading-tight">{member.role}</p>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 px-3 py-1">
                {member.year}
              </Badge>
            </div>
          </div>
        </div>
      );
    }

    // Sem recorte: cartão com a foto normal, como antes
    return (
      <Card className="overflow-hidden border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-2 group h-full">
        <CardContent className="p-0 h-full">
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-6 text-white relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 pointer-events-none"></div>

            <div className="relative z-10 text-center flex flex-col items-center px-2">
              <div className="w-32 h-32 bg-white/20 rounded-2xl mb-4 overflow-hidden mx-auto border-2 border-white/30 flex-shrink-0">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="mb-2 text-lg font-semibold truncate">{member.name}</h3>
              <p className="text-blue-100 mb-3 text-sm leading-tight text-ellipsis max-w-[12rem]">{member.role}</p>
            </div>

            <div className="relative z-10 text-center">
              <Badge variant="secondary" className="bg-white/20 text-white border-0 px-3 py-1">
                {member.year}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="team" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600">Direção</span>
          </div>
          <h2 className="text-4xl mb-4 text-slate-800">Conhece a Nossa Equipa</h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Row 1: 3 cards centered */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl items-stretch w-full">
              {teamMembers.slice(0, 3).map((member) => (
                <div className="h-full" key={member.id}>
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: 4 cards centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl items-stretch w-full">
              {teamMembers.slice(3, 7).map((member) => (
                <div className="h-full" key={member.id}>
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Card className="inline-block border-slate-200 bg-gradient-to-r from-blue-50 to-teal-50">
            <CardContent className="p-8">
              <h3 className="text-xl mb-3 text-slate-800">Queres Juntar-te à Nossa Equipa?</h3>
              <p className="text-slate-600 mb-4 max-w-md">
                As candidaturas estão abertas o ano todo, para que possas fazer parte do NMATH e representar o nosso curso!
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open(recruitmentLink)}
              >
                Candidata-te
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
