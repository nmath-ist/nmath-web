import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { sortableTimestamp, formatDateRange, isIsoDate } from "./dateUtils";

// ---------- Tipos ----------
type CalendarLink = { id?: number; year: string; link: string };

// Evento já normalizado, venha do Google Calendar ou do admin.
type CalEvent = {
  id: string;
  title: string;
  startDay: string; // AAAA-MM-DD (hora de Lisboa). Vazio se a data for texto antigo.
  endDay: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  description: string;
  link: string;
  type: string; // só nos eventos do admin
  kind: "event" | "notice"; // "notice" = feriado, semana de exames, etc. (não é um evento do NMATH)
  sortKey: number;
  icsStart: string; // linhas prontas para o ficheiro .ics
  icsEnd: string;
};

type GoogleEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  location: string;
  description: string;
  link: string;
  notice?: boolean; // vem do calendário de avisos (feriados, exames...)
};

// ---------- Datas (tudo em hora de Lisboa) ----------
const TZ = "Europe/Lisbon";
const DAY_FMT = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const TIME_FMT = new Intl.DateTimeFormat("pt-PT", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const pad = (n: number) => String(n).padStart(2, "0");

const fmtUtc = (day: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("pt-PT", { timeZone: "UTC", ...opts }).format(new Date(`${day}T00:00:00Z`));

function addDays(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// Segunda-feira da semana a que o dia pertence (a semana começa à segunda).
function mondayOf(day: string): string {
  const dow = (new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7;
  return addDays(day, -dow);
}

function dayLabel(start: string, end: string): string {
  const clean = (s: string) => s.replace(/\./g, "");
  if (!end || end === start) return clean(fmtUtc(start, { weekday: "short", day: "numeric", month: "long" }));
  const [d1, d2] = [fmtUtc(start, { day: "numeric" }), fmtUtc(end, { day: "numeric" })];
  const [m1, m2] = [fmtUtc(start, { month: "long" }), fmtUtc(end, { month: "long" })];
  return m1 === m2 ? `${d1} a ${d2} de ${m1}` : `${d1} de ${m1} a ${d2} de ${m2}`;
}

const compactUtc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

// ---------- Avisos (feriados, exames...) ----------
// Isto não são eventos do NMATH: aparecem a cinzento no calendário e ficam fora de "Próximos eventos".
// Um evento conta como aviso se o título tiver uma destas expressões (sem acentos, sem maiúsculas),
// se começar por "[Aviso]", ou se (nos eventos do admin) o tipo for "Aviso".
// Para ajustar, basta editar esta lista.
const NOTICE_WORDS = [
  "feriado",
  "exame",
  "semana de testes",
  "semana de avaliac",
  "interrupc",
  "ferias",
  "sem aulas",
  "pausa letiva",
  "tolerancia de ponto",
];
const strip = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function classify(title: string, type: string): "event" | "notice" {
  const t = strip(title);
  if (strip(type) === "aviso" || t.startsWith("[aviso]")) return "notice";
  return NOTICE_WORDS.some((w) => t.includes(w)) ? "notice" : "event";
}
const cleanTitle = (title: string) => title.replace(/^\s*\[aviso\]\s*/i, "");

// ---------- Normalização ----------
function fromGoogle(e: GoogleEvent): CalEvent {
  let startDay: string, endDay: string, timeLabel = "", icsStart: string, icsEnd: string, sortKey: number;
  if (e.allDay) {
    startDay = e.start;
    endDay = e.end;
    sortKey = Date.parse(`${e.start}T00:00:00Z`);
    icsStart = `DTSTART;VALUE=DATE:${startDay.replace(/-/g, "")}`;
    icsEnd = `DTEND;VALUE=DATE:${addDays(endDay, 1).replace(/-/g, "")}`;
  } else {
    const s = new Date(e.start);
    const f = new Date(e.end);
    startDay = DAY_FMT.format(s);
    endDay = DAY_FMT.format(f);
    const st = TIME_FMT.format(s);
    const en = TIME_FMT.format(f);
    // Um evento que acaba à meia-noite em ponto não conta o dia seguinte.
    if (endDay > startDay && en === "00:00") endDay = addDays(endDay, -1);
    timeLabel = startDay !== endDay || st === en ? st : `${st} – ${en}`;
    sortKey = s.getTime();
    icsStart = `DTSTART:${compactUtc(e.start)}`;
    icsEnd = `DTEND:${compactUtc(e.end)}`;
  }
  return {
    id: e.id,
    title: cleanTitle(e.title),
    startDay,
    endDay,
    dateLabel: dayLabel(startDay, endDay),
    timeLabel,
    location: e.location,
    description: e.description,
    link: e.link,
    type: "",
    kind: e.notice ? "notice" : classify(e.title, ""),
    sortKey,
    icsStart,
    icsEnd,
  };
}

function fromAdmin(r: any): CalEvent {
  const iso = isIsoDate(r.event_date);
  const startDay = iso ? r.event_date : "";
  const endDay = iso ? (isIsoDate(r.event_end_date) ? r.event_end_date : startDay) : "";
  const time = String(r.event_time || "");
  const m = /^(\d{2}):(\d{2})(?:\s*[–-]\s*(\d{2}):(\d{2}))?$/.exec(time);
  let icsStart = "";
  let icsEnd = "";
  if (iso) {
    if (m) {
      const d1 = startDay.replace(/-/g, "");
      const d2 = endDay.replace(/-/g, "");
      const endHm = m[3] ? `${m[3]}${m[4]}` : `${pad(Math.min(23, Number(m[1]) + 1))}${m[2]}`;
      icsStart = `DTSTART;TZID=${TZ}:${d1}T${m[1]}${m[2]}00`;
      icsEnd = `DTEND;TZID=${TZ}:${d2}T${endHm}00`;
    } else {
      icsStart = `DTSTART;VALUE=DATE:${startDay.replace(/-/g, "")}`;
      icsEnd = `DTEND;VALUE=DATE:${addDays(endDay, 1).replace(/-/g, "")}`;
    }
  }
  return {
    id: `db-${r.id}`,
    title: cleanTitle(r.title),
    startDay,
    endDay,
    dateLabel: formatDateRange(r.event_date, r.event_end_date),
    timeLabel: time,
    location: r.location || "",
    description: r.description || "",
    link: r.link || "",
    type: r.event_type || "",
    kind: classify(r.title || "", r.event_type || ""),
    sortKey: sortableTimestamp(r.event_date, r.event_end_date),
    icsStart,
    icsEnd,
  };
}

function downloadIcs(ev: CalEvent) {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NMATH//Site//PT",
    "BEGIN:VEVENT",
    `UID:${ev.id}@nmath.pt`,
    `DTSTAMP:${stamp}`,
    ev.icsStart,
    ev.icsEnd,
    `SUMMARY:${esc(ev.title)}`,
    ev.location ? `LOCATION:${esc(ev.location)}` : "",
    ev.description ? `DESCRIPTION:${esc(ev.description)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.title.replace(/[^\w-]+/g, "_").slice(0, 40) || "evento"}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- Cores ----------
const getEventTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    Recreativa: "bg-orange-100 text-orange-700 border border-orange-200",
    Palestra: "bg-purple-100 text-purple-700 border border-purple-200",
    Eventos: "bg-teal-100 text-teal-700 border border-teal-200",
    Workshop: "bg-slate-100 text-slate-800 border border-slate-300",
  };
  return colors[type] || "bg-blue-100 text-blue-700 border border-blue-200";
};
const chipClass = (e: CalEvent) =>
  e.kind === "notice" ? "bg-slate-100 text-slate-500 border border-slate-200 italic" : e.type ? getEventTypeColor(e.type) : "bg-blue-100 text-blue-800 border border-blue-200";

// ---------- Cartão de evento ----------
function EventItem({ ev }: { ev: CalEvent }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
        <h4 className="text-lg text-slate-800">{ev.title}</h4>
        {ev.type && <span className={`px-3 py-0.5 rounded-full text-sm ${getEventTypeColor(ev.type)}`}>{ev.type}</span>}
      </div>
      <div className="text-sm text-slate-600 space-y-1 mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="inline-block first-letter:uppercase">{ev.dateLabel}</span>
        </div>
        {ev.timeLabel && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600 shrink-0" /> <span>{ev.timeLabel}</span>
          </div>
        )}
        {ev.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-teal-600 shrink-0" /> <span>{ev.location}</span>
          </div>
        )}
      </div>
      {ev.description && <p className="text-sm text-slate-600 mb-3 line-clamp-3 whitespace-pre-line">{ev.description}</p>}
      <div className="flex flex-wrap gap-2">
        {ev.link && (
          <a
            href={ev.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-blue-700 border border-blue-300 hover:bg-blue-50 px-3 py-1.5 rounded-lg"
          >
            Mais informações <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {ev.icsStart && (
          <button
            type="button"
            onClick={() => downloadIcs(ev)}
            className="inline-flex items-center gap-1.5 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-lg"
          >
            <CalendarPlus className="h-3.5 w-3.5" /> Adicionar ao meu calendário
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- Cartão de aviso (feriado, exames...) ----------
function NoticeItem({ ev }: { ev: CalEvent }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-slate-700">{ev.title}</h4>
        <span className="px-3 py-0.5 rounded-full text-xs bg-slate-200 text-slate-600">Aviso</span>
      </div>
      <p className="text-sm text-slate-500 first-letter:uppercase">{ev.dateLabel}</p>
      {ev.description && <p className="text-sm text-slate-500 mt-1 line-clamp-3 whitespace-pre-line">{ev.description}</p>}
    </div>
  );
}

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function CalendarSection() {
  const [calendarLinks, setCalendarLinks] = useState<CalendarLink[]>([]);
  const [adminEvents, setAdminEvents] = useState<CalEvent[]>([]);
  const [google, setGoogle] = useState<{ configured: boolean; error: boolean; events: CalEvent[] }>({ configured: false, error: false, events: [] });
  const [loading, setLoading] = useState(true);

  const todayKey = DAY_FMT.format(new Date());
  // Início da janela de 2 semanas visível (sempre uma segunda-feira).
  const [start, setStart] = useState(() => mondayOf(todayKey));
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/calendar-years")
      .then((r) => r.json())
      .then((rows) => setCalendarLinks(rows.map((r: any) => ({ id: r.id, year: r.year_label, link: r.calendar_link }))))
      .catch(() => setCalendarLinks([]));

    const fromDb = fetch("/api/upcoming-events")
      .then((r) => r.json())
      .then((rows) => setAdminEvents(rows.map(fromAdmin)))
      .catch(() => setAdminEvents([]));

    const fromGoogleCal = fetch("/api/calendar-years?resource=events")
      .then((r) => r.json())
      .then((d) =>
        setGoogle({ configured: !!d.configured, error: !!d.error, events: (d.events || []).map(fromGoogle) })
      )
      .catch(() => setGoogle({ configured: false, error: true, events: [] }));

    Promise.all([fromDb, fromGoogleCal]).finally(() => setLoading(false));
  }, []);

  // Se o Google Calendar estiver ligado e a funcionar, é a fonte. Senão, usa os eventos do admin.
  const useGoogle = google.configured && !google.error;
  const events = useGoogle ? google.events : adminEvents;

  const byDay = useMemo(() => {
    const map = new Map<string, CalEvent[]>();
    for (const ev of events) {
      if (!ev.startDay) continue;
      let d = ev.startDay;
      for (let i = 0; i < 31 && d <= ev.endDay; i++) {
        if (!map.has(d)) map.set(d, []);
        map.get(d)!.push(ev);
        d = addDays(d, 1);
      }
    }
    for (const list of map.values()) list.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "notice" ? 1 : -1) || a.sortKey - b.sortKey);
    return map;
  }, [events]);

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => e.kind === "event" && (!e.startDay || e.endDay >= todayKey))
        .sort((a, b) => a.sortKey - b.sortKey)
        .slice(0, 6),
    [events, todayKey]
  );

  // Grelha de 2 semanas (a semana começa à segunda)
  const WEEKS = 2;
  const cells = Array.from({ length: WEEKS * 7 }, (_, i) => addDays(start, i));
  const endDay = addDays(start, WEEKS * 7 - 1);
  const rangeTitle = `${dayLabel(start, endDay)} de ${endDay.slice(0, 4)}`;

  const goStep = (delta: number) => {
    setStart(addDays(start, delta * WEEKS * 7));
    setSelected(null);
  };
  const goToday = () => {
    setStart(mondayOf(todayKey));
    setSelected(null);
  };

  const panelEvents = selected ? byDay.get(selected) || [] : upcoming;

  return (
    <section id="calendar" className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 px-4 py-2 rounded-full mb-5 shadow-sm">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700">Calendário</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-4 text-slate-800">Organiza o Teu Semestre</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Acede ao calendário e fica a par dos nossos próximos eventos!</p>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">A carregar o calendário...</p>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
            {/* Calendário das próximas 2 semanas */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl md:text-2xl text-slate-800 first-letter:uppercase">{rangeTitle}</h3>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={goToday} className="text-sm text-blue-700 hover:bg-blue-50 rounded-lg px-3 py-1.5">
                    Hoje
                  </button>
                  <button type="button" onClick={() => goStep(-1)} aria-label="Duas semanas anteriores" className="p-2 rounded-lg hover:bg-slate-100">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => goStep(1)} aria-label="Duas semanas seguintes" className="p-2 rounded-lg hover:bg-slate-100">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                {WEEKDAYS.map((w) => (
                  <div key={w} className="bg-slate-50 py-2 text-center text-xs md:text-sm text-slate-500">
                    {w}
                  </div>
                ))}
                {cells.map((day, i) => {
                  const list = byDay.get(day) || [];
                  const isToday = day === todayKey;
                  const isSel = day === selected;
                  const isPast = day < todayKey;
                  const n = Number(day.slice(8));
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={list.length === 0}
                      onClick={() => setSelected(isSel ? null : day)}
                      aria-label={`${n} de ${fmtUtc(day, { month: "long" })}${list.length ? `, ${list.length} ${list.length === 1 ? "evento" : "eventos"}` : ""}`}
                      className={`text-left bg-white p-1.5 md:p-2 min-h-[56px] md:min-h-[96px] flex flex-col gap-1 transition-colors ${
                        list.length ? "hover:bg-blue-50 cursor-pointer" : "cursor-default"
                      } ${isSel ? "ring-2 ring-inset ring-blue-500 bg-blue-50" : ""} ${isPast ? "opacity-60" : ""}`}
                    >
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-xs md:text-sm inline-flex h-6 w-6 items-center justify-center rounded-full ${
                            isToday ? "bg-blue-600 text-white" : "text-slate-700"
                          }`}
                        >
                          {n}
                        </span>
                        {/* Mostra o mês no primeiro dia da janela e sempre que o mês muda */}
                        {(i === 0 || n === 1) && (
                          <span className="text-xs text-slate-500">{fmtUtc(day, { month: "short" }).replace(".", "")}</span>
                        )}
                      </div>
                      {/* Telemóvel: bolinhas. Computador: etiquetas com o título. */}
                      <div className="flex gap-0.5 md:hidden">
                        {list.slice(0, 3).map((e) => (
                          <span key={e.id} className={`h-1.5 w-1.5 rounded-full ${e.kind === "notice" ? "bg-slate-400" : "bg-blue-500"}`} />
                        ))}
                      </div>
                      <div className="hidden md:flex flex-col gap-1">
                        {list.slice(0, 2).map((e) => (
                          <span key={e.id} className={`truncate rounded px-1.5 py-0.5 text-xs ${chipClass(e)}`}>
                            {e.title}
                          </span>
                        ))}
                        {list.length > 2 && <span className="text-xs text-slate-500">+{list.length - 2} mais</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Painel lateral */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl text-slate-800 first-letter:uppercase">
                  {selected ? dayLabel(selected, selected) : "Próximos eventos"}
                </h3>
                {selected && (
                  <button type="button" onClick={() => setSelected(null)} className="text-sm text-blue-700 hover:underline">
                    Ver próximos
                  </button>
                )}
              </div>
              {panelEvents.length === 0 ? (
                <p className="text-slate-500 text-sm">Ainda não há eventos marcados.</p>
              ) : (
                panelEvents.map((e) => (e.kind === "notice" ? <NoticeItem key={e.id} ev={e} /> : <EventItem key={e.id} ev={e} />))
              )}
              {calendarLinks.length > 0 && (
                <a
                  href={calendarLinks[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-700 hover:underline pt-2"
                >
                  <Calendar className="h-4 w-4" /> Abrir no Google Calendar <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
