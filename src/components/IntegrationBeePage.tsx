import type React from 'react';
import Header from './Header';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Trophy, MapPin, CalendarDays, Users, ExternalLink } from 'lucide-react';
import { useDocumentMeta } from './useDocumentMeta';

// Coloca estas imagens em public/integration-bee/ (descarregadas do site de 2025).
const P = '/integration-bee/';

const PHOTOS = {
  scranton: P + 'scranton-2019.jpg',
  westVirginia: P + 'west-virginia-2022.jpg',
  salaIA: P + 'sala-ia.jpg',
  anfQA: P + 'anfiteatro-qa.jpg',
  escrita: P + 'fase-escrita.jpg',
  aoVivo: P + 'meias-finais-e-final.jpg',
  gal: [P + 'galeria-1.jpg', P + 'galeria-2.jpg', P + 'galeria-3.jpg'],
};

// Se uma imagem não existir, esconde-a em vez de mostrar o ícone partido.
const hideBroken = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none';
};

const WINNERS = [
  { place: '1º', name: 'Francisco Alves', prize: '1000€' },
  { place: '2º', name: 'Afonso Sousa', prize: '500€' },
  { place: '3º', name: 'Lourenço Relva', prize: '250€' },
  { place: '4º', name: 'Jing Xu', prize: 'Vale de 50€ para a loja da SPM' },
];

// Quando tiveres os PDFs das soluções, preenche o "url" de cada fase.
const SOLUTIONS: { label: string; url?: string }[] = [
  { label: 'Fase escrita' },
  { label: 'Disputa pelo 3º, 4º e 5º lugares' },
  { label: 'Meia-final' },
  { label: 'Final' },
];

const STEPS = [
  { title: 'Fase escrita', text: 'Cada participante resolve um conjunto de integrais. Só os melhores avançam.' },
  { title: 'Disputa pelo 3º, 4º e 5º lugares', text: 'Ao vivo, para decidir os lugares seguintes ao pódio.' },
  { title: 'Meia-final', text: 'Ao vivo, com os integrais resolvidos em tempo real.' },
  { title: 'Final', text: 'Ao vivo, para decidir o 1º e o 2º lugares.' },
];

const SPONSORS = [
  'Caixa Geral de Depósitos',
  'Departamento de Matemática do IST',
  'SPM – Sociedade Portuguesa de Matemática',
];

export default function IntegrationBeePage() {
  useDocumentMeta(
    'Integration Bee 2026 | NMATH',
    'Integration Bee 2026: competição de cálculo de integrais organizada pelo NMATH no Instituto Superior Técnico. Resultados, prémios e como funciona.'
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-4 -top-16 text-[18rem] md:text-[28rem] leading-none font-serif font-bold text-white/5"
        >
          ∫
        </span>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <a href="/#events" className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white mb-6">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar aos eventos
          </a>
          <h1 className="text-5xl md:text-7xl mb-5">Integration Bee 2026</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-3">
            A competição de cálculo de integrais do NMATH, no Instituto Superior Técnico.
          </p>
          <p className="text-blue-200 mb-6">Realizou-se a 30 de maio de 2026.</p>
          <span className="inline-block rounded-full border-2 border-teal-300 text-teal-200 px-4 py-2">
            Próxima edição em breve
          </span>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Vencedores */}
        <section className="py-14">
          <h2 className="text-3xl mb-8 text-slate-800">Vencedores</h2>
          <ol className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {WINNERS.map((w, i) => (
              <li
                key={w.place}
                className={
                  i === 0
                    ? 'col-span-2 lg:col-span-1 rounded-lg bg-blue-900 text-white p-6 lg:pt-10 lg:pb-9'
                    : `rounded-lg border border-slate-200 bg-white p-5 ${i === 1 ? 'lg:pt-8 lg:pb-7' : i === 2 ? 'lg:pt-6' : ''}`
                }
              >
                <div className={`text-4xl font-serif font-bold ${i === 0 ? 'text-teal-300' : 'text-teal-600'}`}>{w.place}</div>
                <div className="mt-2 text-lg">{w.name}</div>
                <div className={`text-sm mt-1 ${i === 0 ? 'text-blue-100' : 'text-slate-500'}`}>{w.prize}</div>
              </li>
            ))}
          </ol>
        </section>

        {/* Soluções */}
        <section className="py-14 border-t border-slate-200">
          <h2 className="text-3xl mb-3 text-slate-800">Soluções</h2>
          <p className="text-slate-600 mb-8">As soluções de cada fase vão ficar disponíveis aqui.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((s) => (
              <Card key={s.label} className="border border-slate-200">
                <CardContent className="p-5">
                  <div className="mb-2">{s.label}</div>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                      Abrir soluções <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-sm text-slate-500">Em breve</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-14 border-t border-slate-200">
          <h2 className="text-3xl mb-3 text-slate-800">Como funciona</h2>
          <p className="text-slate-600 max-w-2xl mb-8">
            A competição é individual em todas as fases. Os participantes resolvem integrais, primeiro por escrito e depois ao vivo, em tempo real.
          </p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-r-lg border-l-4 border-teal-600 bg-slate-50 p-4">
                <div className="text-2xl font-serif font-bold text-teal-600">{i + 1}</div>
                <div className="mb-1">{s.title}</div>
                <p className="text-sm text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <figure>
              <img src={PHOTOS.escrita} alt="Fase escrita" loading="lazy" onError={hideBroken} className="w-full rounded-lg" />
              <figcaption className="text-sm text-slate-500 mt-2">Fase escrita</figcaption>
            </figure>
            <figure>
              <img src={PHOTOS.aoVivo} alt="Meias-finais e final" loading="lazy" onError={hideBroken} className="w-full rounded-lg" />
              <figcaption className="text-sm text-slate-500 mt-2">Meias-finais e final</figcaption>
            </figure>
          </div>
          <p className="text-slate-600">As fases ao vivo são abertas a qualquer estudante que queira assistir.</p>
        </section>

        {/* O que é */}
        <section className="py-14 border-t border-slate-200">
          <h2 className="text-3xl mb-4 text-slate-800">O que é o Integration Bee?</h2>
          <p className="text-slate-600 max-w-3xl mb-8">
            O Integration Bee é uma competição matemática de cálculo de integrais, criada no MIT em 1981 e realizada anualmente até hoje. Desde então, este desafio tem sido replicado por várias universidades nos EUA e na Europa. O nome vem do famoso concurso Spelling Bee.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            <figure>
              <img src={PHOTOS.scranton} alt="Integration Bee 2019 na University of Scranton" loading="lazy" onError={hideBroken} className="w-full rounded-lg" />
              <figcaption className="text-sm text-slate-500 mt-2">Integration Bee 2019, University of Scranton</figcaption>
            </figure>
            <figure>
              <img src={PHOTOS.westVirginia} alt="Integration Bee 2022 na West Virginia University" loading="lazy" onError={hideBroken} className="w-full rounded-lg" />
              <figcaption className="text-sm text-slate-500 mt-2">Integration Bee 2022, West Virginia University</figcaption>
            </figure>
          </div>
        </section>

        {/* Quando e onde */}
        <section className="py-14 border-t border-slate-200">
          <h2 className="text-3xl mb-4 text-slate-800">Quando e onde</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-slate-600 mb-3">
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-teal-600" /> 30 de maio de 2026</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-600" /> Instituto Superior Técnico, Alameda</span>
          </div>
          <p className="text-slate-600 mb-8">
            Para encontrar as salas, usa o{' '}
            <a href="https://spaces.leic.pt/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IST Space Finder</a>.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            <figure>
              <img src={PHOTOS.salaIA} alt="Sala IA" loading="lazy" onError={hideBroken} className="w-full rounded-lg" />
              <figcaption className="text-sm text-slate-500 mt-2">Fase escrita: Sala IA</figcaption>
            </figure>
            <figure>
              <img src={PHOTOS.anfQA} alt="Anfiteatro QA" loading="lazy" onError={hideBroken} className="w-full rounded-lg" />
              <figcaption className="text-sm text-slate-500 mt-2">Fases ao vivo: Anfiteatro QA</figcaption>
            </figure>
          </div>
        </section>

        {/* Quem pode participar */}
        <section className="py-14 border-t border-slate-200">
          <h2 className="text-3xl mb-4 text-slate-800 flex items-center gap-3">
            <Users className="h-7 w-7 text-teal-600" /> Quem pode participar?
          </h2>
          <p className="text-slate-600 mb-3">
            Qualquer aluno que esteja a frequentar uma licenciatura ou mestrado da Universidade de Lisboa.
          </p>
          <p className="text-slate-800">
            Próxima edição em breve. Acompanha o NMATH para saberes quando abrem as inscrições.
          </p>
        </section>

        {/* Prémios e patrocinadores */}
        <section className="py-14 border-t border-slate-200">
          <h2 className="text-3xl mb-4 text-slate-800 flex items-center gap-3">
            <Trophy className="h-7 w-7 text-teal-600" /> Prémios e patrocinadores
          </h2>
          <p className="text-slate-600 mb-6 max-w-3xl">
            1º lugar: 1000€. 2º lugar: 500€. 3º lugar: 250€. 4º lugar: vale de 50€ para a loja da SPM (Sociedade Portuguesa de Matemática).
          </p>
          <ul className="grid sm:grid-cols-3 gap-3">
            {SPONSORS.map((s) => (
              <li key={s} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">{s}</li>
            ))}
          </ul>
        </section>

        {/* Fotografias */}
        <section className="py-14 border-t border-slate-200">
          <h2 className="text-3xl mb-8 text-slate-800">Fotografias</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PHOTOS.gal.map((src) => (
              <img key={src} src={src} alt="Fotografia do Integration Bee" loading="lazy" onError={hideBroken} className="w-full rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
