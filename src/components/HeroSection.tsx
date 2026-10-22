import React, { useState } from 'react';
import { GraduationCap, Handshake, Megaphone, PartyPopper } from 'lucide-react';

// ✅ Importa a imagem localmente (igual à TeamSection)
import whiteLogo from '../assets/white.png';
import tetraedro from '../assets/solidos/tetraedro.png';
import cubo from '../assets/solidos/cubo.png';
import dodecaedro from '../assets/solidos/dodecaedro.png';
import icosaedro from '../assets/solidos/icosaedro.png';

// Departamentos do NMATH (separadores). "short" é o nome curto que aparece no separador.
const DEPARTMENTS: {
  id: string;
  short: string;
  title: string;
  description: string;
  icon: typeof GraduationCap;
}[] = [
  {
    id: 'educacao',
    short: 'Educação',
    title: 'Educação',
    description:
      'Apoia o percurso académico dos alunos: mantém o Repositório, publica a revista Ponto Fixo, o podcast Oráculo, organiza workshops, apoios e o projeto de Explicações, e promove conversas entre alunos e alumni de LMAC, MMAC e MECD.',
    icon: GraduationCap,
  },
  {
    id: 'eventos',
    short: 'Eventos',
    title: 'Eventos e Relações Empresariais',
    description:
      'Aproxima os alunos do mercado de trabalho, com open days e roundtables com empresas, procura parcerias para o núcleo e organiza eventos como Time2Talk.',
    icon: Handshake,
  },
  {
    id: 'marketing',
    short: 'Marketing',
    title: 'Marketing',
    description:
      'Cuida da imagem e da comunicação do NMATH: design da revista e das camisolas, redes sociais, fotografias das atividades e o site.',
    icon: Megaphone,
  },
  {
    id: 'recreativa',
    short: 'Recreativa',
    title: 'Recreativa',
    description:
      'Organiza o convívio: Game Nights, atividades lúdico-desportivas, churrascos, torneios de sueca, piqueniques, Jantar de Reis e a Gala Lebesgue.',
    icon: PartyPopper,
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const dep = DEPARTMENTS[active];
  const DepIcon = dep.icon;

  // Setas esquerda/direita mudam de separador (acessibilidade)
  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + DEPARTMENTS.length) % DEPARTMENTS.length;
    setActive(next);
    document.getElementById(`dep-tab-${DEPARTMENTS[next].id}`)?.focus();
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 text-white py-20 relative overflow-hidden">
      {/* Signature background: the actual Platonic solids from the NMATH mark,
          same imagery as repositorio.nmath.pt, for a consistent identity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <img src={tetraedro} alt="" className="absolute -top-14 -right-10 w-64 h-64 lg:w-80 lg:h-80 object-contain opacity-[0.10]" />
        <img src={cubo} alt="" className="absolute bottom-0 -left-14 w-56 h-56 lg:w-72 lg:h-72 object-contain opacity-[0.10]" />
        <img src={dodecaedro} alt="" className="absolute top-1/3 right-[8%] w-36 h-36 lg:w-44 lg:h-44 object-contain opacity-[0.08]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          <img
            src={icosaedro}
            alt=""
            className="hidden lg:block absolute left-[38%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 xl:w-24 xl:h-24 object-contain z-20 opacity-[0.08]"
          />
          <div>
            <div className="flex justify-center lg:justify-start mb-8">
              {/* ✅ Usa o import estático */}
              <img
                src={whiteLogo}
                alt="NMATH Logo"
                className="h-64 w-64 lg:h-80 lg:w-80 object-contain"
              />
            </div>

            <div className="text-lg mb-8 leading-relaxed">
              <p className="text-blue-100 mb-4">
                O Núcleo de Estudantes de Matemática do Instituto Superior Técnico (NMATH) foi fundado em 2012 por alunos da Licenciatura em Matemática Aplicada e Computação (LMAC) e do Mestrado em Matemática e Aplicações (MMA).
              </p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">
                A sua missão é representar e apoiar o percurso académico de todos os estudantes de Matemática do IST, promover e divulgar a Matemática junto da comunidade, bem como valorizar os cursos de Matemática do IST no mercado de trabalho.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl mb-1">Os Nossos Departamentos</h2>
              <p className="text-blue-200 text-sm mb-5">O que fazemos no NMATH, área a área.</p>

              {/* Separadores */}
              <div role="tablist" aria-label="Departamentos do NMATH" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {DEPARTMENTS.map((d, i) => {
                  const Icon = d.icon;
                  const isActive = i === active;
                  return (
                    <button
                      key={d.id}
                      id={`dep-tab-${d.id}`}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls="dep-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => onTabKeyDown(e, i)}
                      className={`flex flex-col items-center gap-1.5 rounded-lg px-2 py-3 border text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${
                        isActive
                          ? 'bg-white/20 border-white/40 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${isActive ? 'text-teal-300' : ''}`} />
                      {d.short}
                    </button>
                  );
                })}
              </div>

              {/* Painel do departamento selecionado */}
              <div
                id="dep-panel"
                role="tabpanel"
                aria-labelledby={`dep-tab-${dep.id}`}
                className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg p-5 border border-white/10 min-h-[12rem]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <DepIcon className="h-5 w-5 text-teal-300" />
                  </div>
                  <h3 className="text-xl leading-tight">{dep.title}</h3>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">{dep.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
