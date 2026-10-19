import { GraduationCap, FolderTree, ListChecks, Users, ArrowRight } from 'lucide-react';

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
            Vais fazer Erasmus ou mestrado fora? Lê as experiências de alunos do IST que já passaram por lá: alojamento,
            custos, bolsas, burocracia e dicas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="bg-teal-500/20 rounded-xl p-3 inline-flex mb-4">
              <FolderTree className="h-6 w-6 text-teal-300" />
            </div>
            <h3 className="mb-2">Organizado por pastas</h3>
            <p className="text-slate-300 text-sm">Continente, país e universidade. Vai direto ao destino que te interessa.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="bg-blue-500/20 rounded-xl p-3 inline-flex mb-4">
              <ListChecks className="h-6 w-6 text-blue-300" />
            </div>
            <h3 className="mb-2">As mesmas perguntas</h3>
            <p className="text-slate-300 text-sm">Todos os documentos respondem às mesmas questões, por isso é fácil comparar.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="bg-orange-500/20 rounded-xl p-3 inline-flex mb-4">
              <Users className="h-6 w-6 text-orange-300" />
            </div>
            <h3 className="mb-2">Feito por alunos</h3>
            <p className="text-slate-300 text-sm">Experiências reais, contadas por quem estudou nesses destinos.</p>
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
