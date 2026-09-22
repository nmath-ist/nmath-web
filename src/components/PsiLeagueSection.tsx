import React from "react";
import { Trophy, Sparkles, Gift, ExternalLink } from "lucide-react";

const RANKING_URL =
  "https://leaderboarded.com/board/cmbtpbfhczsgr/?public=true";

export default function PsiLeagueSection() {
  return (
    <section
      id="psi-liga"
      className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 text-white"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
            <Trophy className="h-5 w-5 text-teal-300" />
            <span className="text-teal-200">Sistema de Pontos</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-4">𝜓-Liga</h2>
          <p className="text-slate-200 max-w-2xl mx-auto">
            Participa nos eventos do núcleo, soma 𝜓's e sobe no
            ranking! No final do ano há prémios à espera dos
            melhores classificados.
          </p>
        </div>

        {/* Como Funciona */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="bg-teal-500/20 rounded-xl p-3 inline-flex mb-4">
              <Sparkles className="h-6 w-6 text-teal-300" />
            </div>
            <h3 className="mb-2">Começa do zero</h3>
            <p className="text-slate-300 text-sm">
              Todos os participantes começam com 0 𝜓's.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="bg-blue-500/20 rounded-xl p-3 inline-flex mb-4">
              <Trophy className="h-6 w-6 text-blue-300" />
            </div>
            <h3 className="mb-2">Ganha 𝜓's</h3>
            <p className="text-slate-300 text-sm">
              Participa nos eventos elegíveis do núcleo para
              somar 𝜓's, alguns eventos dão extra 𝜓's.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="bg-orange-500/20 rounded-xl p-3 inline-flex mb-4">
              <Gift className="h-6 w-6 text-orange-300" />
            </div>
            <h3 className="mb-2">Ganha prémios</h3>
            <p className="text-slate-300 text-sm">
              No final do ano há prémios para os vencedores!
              Os prémios serão anunciados brevemente.
            </p>
          </div>
        </div>

        {/* CTA Ranking */}
        <div className="text-center">
          <a
            href={RANKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-blue-900 hover:bg-slate-100 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Trophy className="h-5 w-5" />
            <span className="text-lg">Ver Ranking</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
