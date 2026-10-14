import Header from './Header';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Trophy, MapPin, CalendarDays, Users, ExternalLink } from 'lucide-react';
import { useDocumentMeta } from './useDocumentMeta';

const IMG = 'https://sites.google.com/u/0/sitesv-images-rt/';

const PHOTOS = {
  scranton: IMG + 'AMxu72tY9oBXWLZX6o-VkxyJn1t_wX4w6RdJ5guxRf3jI72CPBIzOXPoAFHfr91-cD9XAmut4YAX0AMNOnIfurXD8xcGug_p8KmEK6O5ta7OEpSIZT6HZKQLxdFBLqRY45V9bGu9l-79Hz3-6IkpcfQu0aS7k0mckWrJUVK8GpE8H17_OEQosMxCVX0xZ0F-Y_wgSkfKlDFVKKkjhRAoe0PJZxLqDj-Rch8MctDIc7jX-zM=w1280',
  westVirginia: IMG + 'AMxu72sL0x9imi-7O_4steo8BiWOknSlrhkHZogTNxx-6MCWfINBLE5JIUs_3YNNOe-hWekavJ38xzvKy_z7arIqxNEk2m3wIm7uLqAkgY1YGH1gaDgTvnTtPDfGoyBFR-v9w6dvfKIzm3czpwTGx9VfHRxQNsH0pLILP15Uc1qPZ-wkLjsIMmCOveWThlQskVvp25ebEhAD3B2qaXWbdcKN4NzTYKdPhgASm6Lk6Q=w1280',
  salaIA: IMG + 'AMxu72sMA6H5sFRk8DdIuxvxSQ5zfEHWQ0UdidAYKKU9RZj4IEIAUYSLgGfhnHkOZ7QuxnoDlg9fP_fmTGzDkEkhHXXZqEEchM8rDGqMSq0Vi5tMVrh_7IY5yTLMXTx2zeytoXWXbCKjKVJYvUcLFXBNJnJJN5dCj7TzxVFHOAPSXWkOljR3XJ258YcVS_oaAqslqcXa9cxiI0Rw4rfRUWvOg30OEYAwPm24zv1KPBXq5QY=w1280',
  anfQA: IMG + 'AMxu72seXL9rOyWnCq7bYtpBQxzzfToX0HEg0E5Lh0VwRHaHUvDNJEtJB4O_FxaeNKYN-jMdYCwX8XihjbLNZrPf_cU0L5-yQi3WRJ5hcQxJYOHdibP1up0YI1o2ryOehKuKDZXCbxe-WhkY54lQCybVBW423SCpIvPpMPGjcHwVlNpNmpuOL8EIs51N77D3_l1HAc7MDoY5vAFm80wrqQ4h-9bcdLVGyasEQCeBqh9LPcE=w1280',
  gal: [
    IMG + 'AMxu72tot1IHRFXEr91BLPOHOSwxsaJDSbl-yvSdCNvC5Nyj_PPVDqJRespQ4znzmU40c8gvp-gHZhCR7zmVrUrqaJ5pPVhUuByn0MW2Y7GHs37rECeYuupXGIHPOWXtHaR1Mczeu27xusq-2aQaA5zUVyxXawk2KSkzInHVonTioU1RSSJeRkXufLeTtey_Xm4Ih12whkeVrOVI9Br1yrXyJKSy791yBfS5Bca-tQeS8pw=w1280',
    IMG + 'AMxu72vATo9Qqk-zA_jriwZ1CDpx3Ajlw7iPjVOjZE6IDfFrSx8Zp4Qh4w2zowjw51Tm1A9yY5Y3SXKaSozldbqjjJD-yA0IyNdpG-cgiYY6ifInlXYSnUT0K3VUvXQbg2jDDa_Vw_G6LHMRq-47anoa56UBQfUN6qQtTWosw5aBGJIzLu_wEFfOUudu-hlDU8E5yVZmm8w8ia0lEn_rGIHrPLrwfoRL_8obNXkPaCDe3WI=w1280',
    IMG + 'AMxu72uwwkleG62iY8xA-3D5S3z5H4wuMpYR-XeJt1IVjkP2KPOi0wcGMf4dmlMSU_46AIFk7rmuWXIYmtNDqcdj7HymZTdq3enJ7ie2PUTWrqhNpX668S3AMDK_O1lJ0rdlZ6RTXUCgMMLNlxvc95W2QnDTChU7YdQ9VYl-C18Xvz0W7ebXL-VxD1aRIaWQKnD-X52bujWUZx3EbqaxGN2NBWXEaev7vA0IKtQKbz5F=w1280',
  ],
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
              <img src={PHOTOS.scranton} alt="Integration Bee 2019 na University of Scranton" loading="lazy" className="w-full rounded-lg" />
              <figcaption className="text-sm text-slate-500 mt-2">Integration Bee 2019, University of Scranton</figcaption>
            </figure>
            <figure>
              <img src={PHOTOS.westVirginia} alt="Integration Bee 2022 na West Virginia University" loading="lazy" className="w-full rounded-lg" />
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
              <img src={PHOTOS.salaIA} alt="Sala IA" loading="lazy" className="w-full rounded-lg" />
              <figcaption className="text-sm text-slate-500 mt-2">Fase escrita: Sala IA</figcaption>
            </figure>
            <figure>
              <img src={PHOTOS.anfQA} alt="Anfiteatro QA" loading="lazy" className="w-full rounded-lg" />
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
              <img key={src} src={src} alt="Fotografia do Integration Bee" loading="lazy" className="w-full rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
