import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Code, Coffee, BookOpen, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// ✅ Importa a imagem localmente (igual à TeamSection)
import whiteLogo from '../assets/white.png';
import tetraedro from '../assets/solidos/tetraedro.png';
import cubo from '../assets/solidos/cubo.png';
import dodecaedro from '../assets/solidos/dodecaedro.png';
import icosaedro from '../assets/solidos/icosaedro.png';

export default function HeroSection() {
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
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg p-4 border border-white/10 hover:from-blue-500/30 hover:to-teal-500/30 transition-all hover:-translate-y-1 hover:shadow-lg text-left"
                  onClick={() =>
                    window.open('https://repositorio.nmath.pt', '_blank')
                  }
                >
                  <Code className="h-8 w-8 text-blue-400 mb-3" />
                  <h3 className="mb-2">Repositório</h3>
                  <p className="text-blue-200 text-sm">Materiais académicos e recursos de estudo</p>
                </button>

                <button
                  className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-lg p-4 border border-white/10 hover:from-teal-500/30 hover:to-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-lg text-left"
                  onClick={() => (window.location.hash = 'events')}
                >
                  <Calendar className="h-8 w-8 text-teal-400 mb-3" />
                  <h3 className="mb-2">Eventos</h3>
                  <p className="text-blue-200 text-sm">Palestras, workshops e networking</p>
                </button>

                <button
                  className="bg-gradient-to-br from-blue-600/20 to-teal-600/20 rounded-lg p-4 border border-white/10 hover:from-blue-600/30 hover:to-teal-600/30 transition-all hover:-translate-y-1 hover:shadow-lg text-left"
                  onClick={() => (window.location.hash = 'magazine')}
                >
                  <BookOpen className="h-8 w-8 text-blue-300 mb-3" />
                  <h3 className="mb-2">Ponto Fixo</h3>
                  <p className="text-blue-200 text-sm">Revistas e publicações dos estudantes</p>
                </button>

                <button
                  className="bg-gradient-to-br from-teal-600/20 to-blue-500/20 rounded-lg p-4 border border-white/10 hover:from-teal-600/30 hover:to-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-lg text-left"
                  onClick={() => (window.location.hash = 'photos')}
                >
                  <Coffee className="h-8 w-8 text-teal-300 mb-3" />
                  <h3 className="mb-2">Fotos & Oráculo</h3>
                  <p className="text-blue-200 text-sm">Álbum de fotos e o nosso podcast</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
