import ICAL from 'ical.js';

// Lê um calendário no formato iCal (.ics), por exemplo o do Google Calendar, e
// devolve só os eventos de que o site precisa: uma janela de tempo à volta de hoje,
// com os eventos que se repetem já "desdobrados" em ocorrências.

const DAYS_BACK = 31;
const DAYS_AHEAD = 400;
const MAX_OCCURRENCES = 400;
const MAX_EVENTS = 600;

const pad = (n) => String(n).padStart(2, '0');
const dateOnly = (t) => `${t.year}-${pad(t.month)}-${pad(t.day)}`;

function addDays(day, n) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// Tira etiquetas HTML e espaços a mais (o Google mete HTML nas descrições).
function cleanText(raw) {
  return String(raw || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n')
    .trim();
}

function firstUrl(...texts) {
  for (const t of texts) {
    const m = /https?:\/\/[^\s<>"')]+/i.exec(String(t || ''));
    if (m) return m[0].replace(/[.,;]+$/, '');
  }
  return '';
}

function toRecord(item, startTime, endTime, uid) {
  const allDay = startTime.isDate;
  let start, end;
  if (allDay) {
    start = dateOnly(startTime);
    // No iCal o fim de um evento de dia inteiro é exclusivo (o dia seguinte).
    end = dateOnly(endTime);
    end = addDays(end, -1);
    if (end < start) end = start;
  } else {
    start = startTime.toJSDate().toISOString();
    end = endTime.toJSDate().toISOString();
  }
  const rawDesc = item.description || '';
  const description = cleanText(rawDesc);
  return {
    id: `${uid}_${start}`,
    title: item.summary || '(sem título)',
    start,
    end,
    allDay,
    location: cleanText(item.location || ''),
    description: description.length > 300 ? `${description.slice(0, 297)}...` : description,
    link: firstUrl(rawDesc, item.component.getFirstPropertyValue('url')),
  };
}

export function parseEvents(icsText, now = new Date()) {
  const root = new ICAL.Component(ICAL.parse(icsText));

  // Fusos horários definidos no próprio ficheiro (ex: Europe/Lisbon).
  for (const tz of root.getAllSubcomponents('vtimezone')) {
    try { ICAL.TimezoneService.register(tz); } catch { /* já registado */ }
  }

  const windowStart = new Date(now.getTime() - DAYS_BACK * 86400000);
  const windowEnd = new Date(now.getTime() + DAYS_AHEAD * 86400000);

  const all = root.getAllSubcomponents('vevent')
    .filter((v) => String(v.getFirstPropertyValue('status') || '').toUpperCase() !== 'CANCELLED')
    .map((v) => new ICAL.Event(v));

  const masters = all.filter((e) => !e.isRecurrenceException());
  for (const ex of all.filter((e) => e.isRecurrenceException())) {
    const master = masters.find((m) => m.uid === ex.uid && m.isRecurring());
    if (master) master.relateException(ex);
    else masters.push(ex); // exceção sem série: tratar como evento normal
  }

  const out = [];
  for (const ev of masters) {
    if (ev.isRecurring()) {
      const it = ev.iterator();
      let next;
      let n = 0;
      while ((next = it.next()) && n++ < MAX_OCCURRENCES) {
        const d = ev.getOccurrenceDetails(next);
        if (d.startDate.toJSDate() > windowEnd) break;
        if (d.endDate.toJSDate() < windowStart) continue;
        out.push(toRecord(d.item, d.startDate, d.endDate, ev.uid));
      }
    } else {
      if (ev.startDate.toJSDate() > windowEnd) continue;
      if (ev.endDate.toJSDate() < windowStart) continue;
      out.push(toRecord(ev, ev.startDate, ev.endDate, ev.uid));
    }
  }

  out.sort((a, b) => a.start.localeCompare(b.start));
  return out.slice(0, MAX_EVENTS);
}

export async function fetchCalendarEvents(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'nmath-site' } });
  if (!res.ok) throw new Error(`O calendário respondeu ${res.status}`);
  return parseEvents(await res.text());
}
