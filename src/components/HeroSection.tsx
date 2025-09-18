import { Button } from './ui/button';
import { ArrowRight, Code, Coffee, BookOpen, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import picImage from 'figma:asset/pic.png';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 text-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <img src={picImage} alt="NMATH Image" className="h-16 w-16 object-contain" />
              <div>
                <h1 className="text-4xl lg:text-5xl mb-2 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">NMATH</span>
                </h1>
                <span className="text-blue-200 text-lg">Núcleo de Estudantes de Matemática</span>
              </div>
            </div>
            
            <div className="text-lg mb-8 leading-relaxed">
              <p className="text-blue-100 mb-4">
                O Núcleo de Estudantes de Matemática do Instituto Superior Técnico (NMATH) foi fundado em 2012 por alunos da Licenciatura em Matemática Aplicada e Computação (LMAC) e do Mestrado em Matemática e Aplicações (MMA).
              </p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">
                A sua missão é representar e apoiar o percurso académico de todos os estudantes de Matemática do IST, promover e divulgar a Matemática junto da comunidade, bem como valorizar os cursos de Matemática do IST no mercado de trabalho.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group" onClick={() => window.open('https://drive.google.com/drive/folders/1nmath-repo-example', '_blank')}>
                Explorar Recursos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => window.location.hash = 'team'}>
                Conhecer a Equipa
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg p-4 border border-white/10 hover:from-blue-500/30 hover:to-teal-500/30 transition-all hover:-translate-y-1 hover:shadow-lg text-left"
                  onClick={() => window.open('https://drive.google.com/drive/folders/1nmath-repo-example', '_blank')}
                >
                  <Code className="h-8 w-8 text-blue-400 mb-3" />
                  <h3 className="mb-2">Repositório</h3>
                  <p className="text-blue-200 text-sm">Materiais académicos e recursos de estudo</p>
                </button>
                <button 
                  className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-lg p-4 border border-white/10 hover:from-teal-500/30 hover:to-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-lg text-left"
                  onClick={() => window.location.hash = 'events'}
                >
                  <Calendar className="h-8 w-8 text-teal-400 mb-3" />
                  <h3 className="mb-2">Eventos</h3>
                  <p className="text-blue-200 text-sm">Palestras, workshops e networking</p>
                </button>
                <button 
                  className="bg-gradient-to-br from-blue-600/20 to-purple-500/20 rounded-lg p-4 border border-white/10 hover:from-blue-600/30 hover:to-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-lg text-left"
                  onClick={() => window.location.hash = 'magazine'}
                >
                  <BookOpen className="h-8 w-8 text-purple-400 mb-3" />
                  <h3 className="mb-2">Ponto Fixo</h3>
                  <p className="text-blue-200 text-sm">Revistas e publicações dos estudantes</p>
                </button>
                <button 
                  className="bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-lg p-4 border border-white/10 hover:from-purple-500/30 hover:to-blue-600/30 transition-all hover:-translate-y-1 hover:shadow-lg text-left"
                  onClick={() => window.location.hash = 'photos'}
                >
                  <Coffee className="h-8 w-8 text-orange-400 mb-3" />
                  <h3 className="mb-2">Multimédia</h3>
                  <p className="text-blue-200 text-sm">Álbum de fotos e conteúdo visual</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}