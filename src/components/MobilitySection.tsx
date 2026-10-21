import { GraduationCap, Users, ArrowRight } from 'lucide-react';

export default function MobilitySection() {
  return (
    <section id="mobility" className="py-16 md:py-20 bg-gradient-to-br from-teal-800 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-5">
            <GraduationCap className="h-5 w-5 text-teal-300" />
            <span className="text-teal-200">Erasmus e mestrados no estrangeiro</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-4">Mobilidade</h2>
          <p className="text-slate-200 max-w-2xl mx-auto">
            Vais fazer Erasmus ou mestrado fora? Lê as experiências de alunos de matemática do IST que já passaram por lá: alojamento,
            custos, bolsas, burocracia e dicas.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-6 md:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="shrink-0 rounded-full bg-orange-400/20 p-4">
            <Users className="h-8 w-8 text-orange-300" />
          </div>
          <div>
            <h3 className="text-xl mb-1">Feito por alunos</h3>
            <p className="text-slate-200">Experiências reais, contadas por quem estudou nesses destinos.</p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/mobilidade"
            className="inline-flex items-center gap-3 bg-white text-blue-900 hover:bg-slate-100 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="text-lg">Ver documentos</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
