import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// IMPORTA AQUI AS FOTOS LOCAIS (coloca-as em src/assets/team/ - instruções abaixo)
// Exemplo:
import matildeImg from '../assets/team/matilde.jpg';
import leonorImg from '../assets/team/leonor.jpg';
import catarinaImg from '../assets/team/catarina.jpeg';
import joaoImg from '../assets/team/joao.jpg';
import franciscoImg from '../assets/team/francisco.jpg';
import catiaImg from '../assets/team/catia.jpg';
import luisaImg from '../assets/team/luisa.jpg';

export default function TeamSection() {
  const teamMembers = [
    { id: 1, name: "Matilde Variz", role: "Presidente", year: "3º Ano - LMAC", image: matildeImg },
    { id: 2, name: "Leonor Lourenço", role: "Vice Presidente", year: "3º Ano - LMAC", image: leonorImg },
    { id: 3, name: "Catarina Franco", role: "Tesoureira", year: "2º Ano - MMAC", image: catarinaImg },
    { id: 4, name: "João Cordeiro", role: "Coordenador da Educação", year: "1º Ano - MMAC", image: joaoImg },
    { id: 5, name: "Francisco Relvas", role: "Coordenador de Eventos e Relações Empresariais", year: "1º Ano - MMAC", image: franciscoImg },
    { id: 6, name: "Cátia Mendes", role: "Coordenadora do Marketing", year: "3º Ano - LMAC", image: catiaImg },
    { id: 7, name: "Luisa Marcelino", role: "Coordenadora da Recreativa", year: "3º Ano - LMAC", image: luisaImg },
  ];

  const MemberCard = ({ member }: { member: typeof teamMembers[0] }) => (
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
                onClick={() => window.open('https://docs.google.com/forms/d/1UKR38c0HM9hxx9y8zUOMKr5mfEOwozNLDsRNEIOJlSQ/edit')}
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
