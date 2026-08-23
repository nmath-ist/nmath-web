-- Schema para o portal de administração do site NMATH.
-- Corre este ficheiro no SQL Editor do teu projeto Supabase (Supabase > SQL Editor > New query).
-- Depois de criar as tabelas, corre "npm run seed" (ver README/ADMIN_SETUP.md) para as
-- popular com o conteúdo que já está no site hoje.

create table if not exists announcements (
  id bigint generated always as identity primary key,
  title text not null,
  excerpt text not null,
  category text not null default 'Eventos',
  event_date text not null,
  read_time text not null default '2 min',
  featured boolean not null default false,
  icon text not null default 'calendar', -- 'calendar' | 'trophy' | 'zap'
  full_content text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists magazine_editions (
  id bigint generated always as identity primary key,
  title text not null,
  issue text not null,
  cover_image_url text not null,
  description text not null default '',
  highlights text not null default '', -- uma linha por destaque
  publish_date text not null,
  link text not null,
  is_current boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists calendar_years (
  id bigint generated always as identity primary key,
  year_label text not null,
  calendar_link text not null,
  sort_order integer not null default 0
);

create table if not exists upcoming_events (
  id bigint generated always as identity primary key,
  title text not null,
  event_date text not null,
  event_time text not null,
  location text not null,
  description text not null default '',
  event_type text not null default 'Eventos',
  link text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Row Level Security: a chave "service role" que as funções do servidor usam
-- ignora RLS automaticamente, por isso ativamos RLS para bloquear qualquer
-- acesso direto ao Supabase a partir do browser (chave pública/anon) e
-- obrigar tudo a passar pelas nossas funções serverless, que verificam a
-- password de administrador antes de escrever.
alter table announcements enable row level security;
alter table magazine_editions enable row level security;
alter table calendar_years enable row level security;
alter table upcoming_events enable row level security;
