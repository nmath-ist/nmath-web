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

-- "Eventos NMATH" — os eventos-bandeira mostrados na secção EventsSection
-- (Integration Bee, Jornadas de Matemática, ENEMATH, Time2Talk, etc.)
create table if not exists flagship_events (
  id bigint generated always as identity primary key,
  title text not null,
  short_description text not null default '',
  category text not null default '',
  stats text not null default '',
  icon text not null default 'trophy', -- 'trophy' | 'book' | 'mic'
  year_links text not null default '', -- uma linha por ano: "2025|https://..."
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Episódios do podcast Oráculo (mostra-se o mais recente na secção "Conecta & Explora")
create table if not exists oracle_episodes (
  id bigint generated always as identity primary key,
  title text not null,
  duration text not null default '',
  episode_date text not null default '',
  plays text not null default '',
  url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Álbuns de fotos (cada um é um link para uma pasta do Drive, com título)
-- Mostra-se o mais recente na secção "Conecta & Explora", tal como o Oráculo.
create table if not exists photo_albums (
  id bigint generated always as identity primary key,
  title text not null,
  drive_url text not null,
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
alter table flagship_events enable row level security;
alter table oracle_episodes enable row level security;
alter table photo_albums enable row level security;

-- Rascunhos + "lixo" (soft delete). Seguro de correr mais do que uma vez.
alter table announcements add column if not exists published boolean not null default true;
alter table announcements add column if not exists deleted_at timestamptz;

alter table magazine_editions add column if not exists published boolean not null default true;
alter table magazine_editions add column if not exists deleted_at timestamptz;

alter table flagship_events add column if not exists published boolean not null default true;
alter table flagship_events add column if not exists deleted_at timestamptz;

alter table oracle_episodes add column if not exists published boolean not null default true;
alter table oracle_episodes add column if not exists deleted_at timestamptz;

alter table photo_albums add column if not exists published boolean not null default true;
alter table photo_albums add column if not exists deleted_at timestamptz;

alter table upcoming_events add column if not exists published boolean not null default true;
alter table upcoming_events add column if not exists deleted_at timestamptz;

-- Datas de fim opcionais, para anúncios/eventos que duram mais do que um dia
-- (ex: "9 a 11 de Março"). Continuam a guardar-se como texto (formato ISO
-- AAAA-MM-DD vindo do seletor de data do admin), tal como event_date.
alter table announcements add column if not exists event_end_date text;
alter table upcoming_events add column if not exists event_end_date text;

-- O "tempo de leitura" deixou de ser mostrado nos anúncios.
alter table announcements drop column if exists read_time;

-- Link de recrutamento (o botão "Candidata-te" da secção da Equipa).
-- Só uma linha (id fixo = 1), tal como um "calendar_years" com uma entrada só.
create table if not exists recruitment_link (
  id bigint primary key default 1,
  link text not null default 'https://docs.google.com/forms/d/1UKR38c0HM9hxx9y8zUOMKr5mfEOwozNLDsRNEIOJlSQ/edit',
  constraint recruitment_link_singleton check (id = 1)
);
insert into recruitment_link (id, link)
values (1, 'https://docs.google.com/forms/d/1UKR38c0HM9hxx9y8zUOMKr5mfEOwozNLDsRNEIOJlSQ/edit')
on conflict (id) do nothing;
alter table recruitment_link enable row level security;

-- Espaço de armazenamento para imagens que a equipa fizer upload no admin
-- (ex: capas de revistas novas). Fica público para leitura (para as imagens
-- aparecerem no site) mas só a chave service_role (usada pelas funções do
-- servidor) consegue escrever lá — nunca o browser diretamente.
insert into storage.buckets (id, name, public)
values ('nmath-uploads', 'nmath-uploads', true)
on conflict (id) do nothing;

drop policy if exists "Leitura pública nmath-uploads" on storage.objects;
create policy "Leitura pública nmath-uploads"
  on storage.objects for select
  using (bucket_id = 'nmath-uploads');

