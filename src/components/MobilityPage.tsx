import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Header from './Header';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Folder, FileText, ChevronRight, Search, ExternalLink, Home, ArrowLeft } from 'lucide-react';
import { useDocumentMeta } from './useDocumentMeta';

type MobilityDoc = {
  id: number;
  program_type: string;
  continent: string;
  country: string;
  university: string;
  city: string;
  academic_year: string;
  semester: string;
  summary: string;
  author_name: string;
  file_url: string;
};

const BASE = '/mobilidade';
const CONTINENT_ORDER = ['Europa', 'América do Sul', 'América do Norte', 'América Central', 'Ásia', 'África', 'Oceânia'];
const TYPES = ['Todos', 'Erasmus', 'Mestrado no estrangeiro', 'Outro'];

// "América do Sul" -> "america-do-sul"
const slug = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const plural = (n: number) => `${n} ${n === 1 ? 'documento' : 'documentos'}`;

function groupBy<T>(items: T[], key: (i: T) => string): Map<string, T[]> {
  const m = new Map<string, T[]>();
  for (const it of items) {
    const k = key(it);
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(it);
  }
  return m;
}

function FolderCard({ href, name, detail }: { href: string; name: string; detail: string }) {
  return (
    <a href={href} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
      <Card className="border border-slate-200 group-hover:border-blue-400 group-hover:shadow-md transition-all h-full">
        <CardContent className="p-5 flex items-center gap-4">
          <Folder className="h-9 w-9 shrink-0 text-teal-600" />
          <div className="min-w-0">
            <div className="text-slate-800 truncate">{name}</div>
            <div className="text-sm text-slate-500">{detail}</div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

function DocCard({ doc, showPath }: { doc: MobilityDoc; showPath?: boolean }) {
  const when = [doc.academic_year, doc.semester].filter(Boolean).join(', ');
  return (
    <Card className="border border-slate-200">
      <CardContent className="p-5">
        {showPath && (
          <p className="text-sm text-slate-500 mb-1">
            {doc.continent} / {doc.country} / {doc.university}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs rounded-full bg-blue-50 text-blue-800 px-2.5 py-0.5">{doc.program_type}</span>
          {when && <span className="text-sm text-slate-600">{when}</span>}
          {doc.city && <span className="text-sm text-slate-500">· {doc.city}</span>}
        </div>
        {doc.summary && <p className="text-slate-700 mb-3">{doc.summary}</p>}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-slate-500">{doc.author_name ? `Por ${doc.author_name}` : 'Autor anónimo'}</span>
          <a
            href={doc.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-blue-700 text-white px-4 py-2 text-sm hover:bg-blue-800"
          >
            <FileText className="h-4 w-4" /> Abrir PDF <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MobilityPage() {
  const [docs, setDocs] = useState<MobilityDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Todos');

  // /mobilidade/<continente>/<pais>/<universidade>
  const segs = window.location.pathname.replace(/^\/mobilidade\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [sContinent, sCountry, sUniversity] = segs;

  useEffect(() => {
    fetch('/api/mobility-docs')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Não foi possível carregar os documentos.'))))
      .then((d) => setDocs(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => (type === 'Todos' ? docs : docs.filter((d) => d.program_type === type)), [docs, type]);

  const continent = sContinent ? filtered.find((d) => slug(d.continent) === sContinent)?.continent ?? docs.find((d) => slug(d.continent) === sContinent)?.continent : undefined;
  const country = sCountry ? docs.find((d) => slug(d.continent) === sContinent && slug(d.country) === sCountry)?.country : undefined;
  const university = sUniversity ? docs.find((d) => slug(d.continent) === sContinent && slug(d.country) === sCountry && slug(d.university) === sUniversity)?.university : undefined;

  const title = university ? `${university} | Mobilidade` : country ? `${country} | Mobilidade` : continent ? `${continent} | Mobilidade` : 'Mobilidade | NMATH';
  useDocumentMeta(title, 'Experiências de alunos de matemática do IST em Erasmus e mestrados no estrangeiro, organizadas por continente, país e universidade.');

  const searching = query.trim().length > 0;
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return filtered.filter((d) =>
      [d.continent, d.country, d.university, d.city, d.program_type, d.summary, d.author_name, d.academic_year]
        .join(' ').toLowerCase().includes(q)
    );
  }, [filtered, query]);

  const crumbs: { label: string; href?: string }[] = [{ label: 'Mobilidade', href: sContinent ? BASE : undefined }];
  if (continent) crumbs.push({ label: continent, href: sCountry ? `${BASE}/${sContinent}` : undefined });
  if (country) crumbs.push({ label: country, href: sUniversity ? `${BASE}/${sContinent}/${sCountry}` : undefined });
  if (university) crumbs.push({ label: university });

  // Conteúdo da pasta atual
  let body: ReactNode;
  if (loading) {
    body = <p className="text-slate-500">A carregar...</p>;
  } else if (error) {
    body = <p className="text-red-600">{error}</p>;
  } else if (searching) {
    body = results.length === 0 ? (
      <p className="text-slate-500">Nada encontrado para "{query}".</p>
    ) : (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">{plural(results.length)}</p>
        {results.map((d) => <DocCard key={d.id} doc={d} showPath />)}
      </div>
    );
  } else if (sContinent && !continent) {
    body = <p className="text-slate-600">Esta pasta não existe. <a className="text-blue-600 hover:underline" href={BASE}>Voltar ao início</a>.</p>;
  } else if (!sContinent) {
    const byContinent = groupBy(filtered, (d) => d.continent);
    const names = [...byContinent.keys()].sort((a, b) => {
      const ia = CONTINENT_ORDER.indexOf(a), ib = CONTINENT_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b, 'pt');
    });
    body = names.length === 0 ? (
      <p className="text-slate-500">Ainda não há documentos{type !== 'Todos' ? ` do tipo "${type}"` : ''}.</p>
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {names.map((n) => (
          <FolderCard key={n} href={`${BASE}/${slug(n)}`} name={n} detail={`${byContinent.get(n)!.length} documentos · ${new Set(byContinent.get(n)!.map((d) => d.country)).size} países`} />
        ))}
      </div>
    );
  } else if (!sCountry) {
    const inContinent = filtered.filter((d) => slug(d.continent) === sContinent);
    const byCountry = groupBy(inContinent, (d) => d.country);
    const names = [...byCountry.keys()].sort((a, b) => a.localeCompare(b, 'pt'));
    body = names.length === 0 ? <p className="text-slate-500">Sem documentos nesta pasta.</p> : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {names.map((n) => (
          <FolderCard key={n} href={`${BASE}/${sContinent}/${slug(n)}`} name={n} detail={`${plural(byCountry.get(n)!.length)} · ${new Set(byCountry.get(n)!.map((d) => d.university)).size} universidades`} />
        ))}
      </div>
    );
  } else if (!country) {
    body = <p className="text-slate-600">Esta pasta não existe. <a className="text-blue-600 hover:underline" href={`${BASE}/${sContinent}`}>Voltar</a>.</p>;
  } else if (!sUniversity) {
    const inCountry = filtered.filter((d) => slug(d.continent) === sContinent && slug(d.country) === sCountry);
    const byUni = groupBy(inCountry, (d) => d.university);
    const names = [...byUni.keys()].sort((a, b) => a.localeCompare(b, 'pt'));
    body = names.length === 0 ? <p className="text-slate-500">Sem documentos nesta pasta.</p> : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {names.map((n) => {
          const cities = [...new Set(byUni.get(n)!.map((d) => d.city).filter(Boolean))];
          return <FolderCard key={n} href={`${BASE}/${sContinent}/${sCountry}/${slug(n)}`} name={n} detail={`${plural(byUni.get(n)!.length)}${cities.length ? ` · ${cities.join(', ')}` : ''}`} />;
        })}
      </div>
    );
  } else if (!university) {
    body = <p className="text-slate-600">Esta pasta não existe. <a className="text-blue-600 hover:underline" href={`${BASE}/${sContinent}/${sCountry}`}>Voltar</a>.</p>;
  } else {
    const list = filtered.filter((d) => slug(d.continent) === sContinent && slug(d.country) === sCountry && slug(d.university) === sUniversity);
    body = list.length === 0 ? <p className="text-slate-500">Sem documentos nesta pasta.</p> : (
      <div className="space-y-4">{list.map((d) => <DocCard key={d.id} doc={d} />)}</div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </a>
          <h1 className="text-4xl md:text-5xl mb-3">Mobilidade</h1>
          <p className="text-blue-100 max-w-2xl">
            Experiências de alunos de matemática do IST que fizeram Erasmus ou mestrado no estrangeiro. Cada documento responde às mesmas
            perguntas: alojamento, custos, bolsas, língua, clima, burocracia e dificuldades.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-5xl py-10">
        <div className="grid sm:grid-cols-[1fr_auto] gap-3 mb-6">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <Input className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar por país, universidade, cidade..." aria-label="Pesquisar" />
          </div>
          <select className="border rounded-md h-9 px-3 bg-input-background text-sm" value={type} onChange={(e) => setType(e.target.value)} aria-label="Tipo de programa">
            {TYPES.map((t) => <option key={t} value={t}>{t === 'Todos' ? 'Todos os tipos' : t}</option>)}
          </select>
        </div>

        {!searching && (
          <nav aria-label="Localização" className="flex flex-wrap items-center gap-1 text-sm text-slate-600 mb-6">
            <Home className="h-4 w-4 mr-1 text-slate-400" />
            {crumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                {c.href ? <a href={c.href} className="text-blue-600 hover:underline">{c.label}</a> : <span className="text-slate-800">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}

        {body}

        <p className="text-sm text-slate-500 mt-10 border-t border-slate-200 pt-4">
          São experiências pessoais. Custos e regras de visto mudam com o tempo, por isso confirma sempre com os serviços oficiais de mobilidade.
        </p>
      </main>
    </div>
  );
}
