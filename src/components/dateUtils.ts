// Utilitários de datas partilhados pelo site e pelo admin.
//
// Contexto: os campos de data de anúncios/eventos eram texto livre
// (ex: "10 Dez, 2025", "Nov, 2025", "9-11 Mar, 2026"), o que tornava
// impossível ordenar cronologicamente de forma fiável — daí novos
// itens por vezes "desaparecerem" da ordenação. A partir de agora os
// formulários do admin usam campos de data reais (input type="date",
// formato ISO "AAAA-MM-DD"), incluindo uma data de fim opcional para
// eventos que duram mais do que um dia.
//
// Para não partir conteúdo antigo (que ainda tem texto livre em vez de
// ISO), as funções abaixo continuam a aceitar e a apresentar esse texto
// tal como estava — só o comportamento de ORDENAÇÃO e a APRESENTAÇÃO de
// datas novas (ISO) é que mudam.

const MESES_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const MESES_PT_LONGOS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

// Aceita abreviaturas PT ("Dez"), nomes completos PT ("Dezembro") e
// abreviaturas EN que apareciam nalguns dados antigos ("Dec").
const MES_LOOKUP: Record<string, number> = {};
MESES_PT.forEach((m, i) => (MES_LOOKUP[m.toLowerCase()] = i));
MESES_PT_LONGOS.forEach((m, i) => (MES_LOOKUP[m.toLowerCase()] = i));
const MESES_EN = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
MESES_EN.forEach((m, i) => (MES_LOOKUP[m] = i));

/** true se a string estiver no formato ISO "AAAA-MM-DD" (o que os inputs type="date" produzem). */
export function isIsoDate(value: string | null | undefined): value is string {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/**
 * Tenta extrair um timestamp (para ordenar) de texto livre em português,
 * incluindo o formato antigo. Devolve null se não conseguir perceber nada.
 * Casos cobertos: "10 Dez, 2025", "10 Dezembro 2025", "9-11 Mar, 2026"
 * (usa o primeiro dia do intervalo), "Nov, 2025" (assume dia 1).
 */
function parseLegacyPtDate(raw: string): number | null {
  const value = raw.trim();
  if (!value) return null;

  // "9-11 Mar, 2026" ou "9–11 Mar, 2026" -> usa o primeiro dia do intervalo.
  const rangeMatch = value.match(/^(\d{1,2})\s*[-–]\s*\d{1,2}\s+([A-Za-zçÇ]+)\.?,?\s+(\d{4})$/);
  if (rangeMatch) {
    const [, dia, mesTxt, ano] = rangeMatch;
    const mes = MES_LOOKUP[mesTxt.toLowerCase()];
    if (mes !== undefined) return new Date(Number(ano), mes, Number(dia)).getTime();
  }

  // "10 Dez, 2025" / "10 Dezembro 2025" / "10 Dec, 2025"
  const fullMatch = value.match(/^(\d{1,2})\s+([A-Za-zçÇ]+)\.?,?\s+(\d{4})$/);
  if (fullMatch) {
    const [, dia, mesTxt, ano] = fullMatch;
    const mes = MES_LOOKUP[mesTxt.toLowerCase()];
    if (mes !== undefined) return new Date(Number(ano), mes, Number(dia)).getTime();
  }

  // "Nov, 2025" (só mês e ano) -> assume dia 1.
  const monthYearMatch = value.match(/^([A-Za-zçÇ]+)\.?,?\s+(\d{4})$/);
  if (monthYearMatch) {
    const [, mesTxt, ano] = monthYearMatch;
    const mes = MES_LOOKUP[mesTxt.toLowerCase()];
    if (mes !== undefined) return new Date(Number(ano), mes, 1).getTime();
  }

  // Só o ano (ex: edições da revista, "2025") -> assume 1 de janeiro.
  const yearOnlyMatch = value.match(/^(\d{4})$/);
  if (yearOnlyMatch) return new Date(Number(yearOnlyMatch[1]), 0, 1).getTime();

  // Último recurso: deixa o motor de JS tentar (funciona p. ex. para "2025-12-10").
  const native = Date.parse(value);
  if (!Number.isNaN(native)) return native;

  return null;
}

/** Timestamp a partir de um created_at (timestamptz) do Supabase, para tabelas sem data própria (ex: Eventos NMATH). */
export function sortableCreatedAt(createdAt?: string | null): number {
  if (!createdAt) return -Infinity;
  const t = Date.parse(createdAt);
  return Number.isNaN(t) ? -Infinity : t;
}

/**
 * Timestamp para ordenar cronologicamente (mais recente primeiro).
 * Usa a data de fim quando existe (um evento de vários dias só deixa
 * de ser "recente" quando termina), senão a data de início.
 * Datas que não se conseguem interpretar vão parar ao fim da lista
 * em vez de rebentar a ordenação.
 */
export function sortableTimestamp(startDate?: string | null, endDate?: string | null): number {
  const preferred = endDate && endDate.trim() ? endDate : startDate;
  if (!preferred) return -Infinity;
  if (isIsoDate(preferred)) return new Date(preferred + 'T00:00:00').getTime();
  const legacy = parseLegacyPtDate(preferred);
  return legacy ?? -Infinity;
}

/** Ordena uma lista (não modifica a original) por uma data, mais recente primeiro. */
export function sortByDateDesc<T>(items: T[], getStart: (item: T) => string | null | undefined, getEnd?: (item: T) => string | null | undefined): T[] {
  return [...items].sort((a, b) => {
    const tb = sortableTimestamp(getStart(b), getEnd ? getEnd(b) : undefined);
    const ta = sortableTimestamp(getStart(a), getEnd ? getEnd(a) : undefined);
    return tb - ta;
  });
}

/** Formata uma data ISO como "10 Dez, 2025". Texto que não seja ISO é devolvido tal como está (dados antigos). */
export function formatDate(value: string | null | undefined): string {
  if (!value) return '';
  if (!isIsoDate(value)) return value; // dados antigos em texto livre — não mexe
  const [ano, mes, dia] = value.split('-').map(Number);
  return `${dia} ${MESES_PT[mes - 1]}, ${ano}`;
}

/**
 * Formata um intervalo de datas para eventos de vários dias, ex:
 * "9–11 Mar, 2026" (mesmo mês) ou "30 Mar – 2 Abr, 2026" (meses diferentes).
 * Se não houver data de fim (ou for igual à de início), devolve só a data única.
 */
export function formatDateRange(startValue: string | null | undefined, endValue: string | null | undefined): string {
  if (!startValue) return '';
  if (!endValue || endValue === startValue) return formatDate(startValue);

  // Só sabemos construir o intervalo bonito quando ambas as datas são ISO;
  // caso contrário (dados antigos), mostra apenas a data de início.
  if (!isIsoDate(startValue) || !isIsoDate(endValue)) return formatDate(startValue);

  const [anoI, mesI, diaI] = startValue.split('-').map(Number);
  const [anoF, mesF, diaF] = endValue.split('-').map(Number);

  if (anoI === anoF && mesI === mesF) {
    return `${diaI}–${diaF} ${MESES_PT[mesI - 1]}, ${anoI}`;
  }
  if (anoI === anoF) {
    return `${diaI} ${MESES_PT[mesI - 1]} – ${diaF} ${MESES_PT[mesF - 1]}, ${anoI}`;
  }
  return `${diaI} ${MESES_PT[mesI - 1]}, ${anoI} – ${diaF} ${MESES_PT[mesF - 1]}, ${anoF}`;
}
