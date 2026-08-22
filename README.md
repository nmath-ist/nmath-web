# NMATH Website

Site institucional do NMATH — Núcleo de Estudantes de Matemática do Instituto Superior Técnico ([nmath.pt](https://www.nmath.pt)).

## Visão geral

Página única (single-page) com as secções principais do núcleo: apresentação, notícias, eventos, calendários académicos, a revista Ponto Fixo, a equipa, e acessos rápidos a outros recursos do NMATH (Repositório, fórum Oráculo, fotos, entre outros).

O acesso ao Repositório de documentos (LMAC/MMAC) é feito por uma rota especial: `nmath.pt/#repositorio` redireciona automaticamente para a pasta do MEGA correspondente.

> Nota: o Repositório de documentos em si é um projeto separado (frontend próprio, com autenticação Fénix) — ver o repositório `RepositorioNMATH`.

## Stack tecnológica

- **React 18** + **TypeScript**
- **Vite 6** — build e servidor de desenvolvimento
- **Tailwind CSS v4** — via `@tailwindcss/postcss` (ver nota abaixo)
- **Radix UI** + **shadcn/ui** — biblioteca de componentes de interface
- **Lucide React** — ícones
- Outras: `react-hook-form`, `recharts`, `embla-carousel-react`, `sonner`, `cmdk`, `vaul`, `next-themes`

## Estrutura do projeto

```
├── src/
│   ├── assets/              # Imagens, logos, fotos de eventos, sólidos do logo NMATH
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── NewsSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── CalendarSection.tsx
│   │   ├── MagazineSection.tsx        # Revista Ponto Fixo
│   │   ├── TeamSection.tsx
│   │   ├── ResourceLinksSection.tsx   # Repositório, Oráculo, Fotos, etc.
│   │   ├── StudyRoomSection.tsx
│   │   ├── MainPage.tsx               # Composição das secções + Footer
│   │   ├── Router.tsx                 # Routing simples por hash (#repositorio, etc.)
│   │   ├── ui/                        # Componentes shadcn/ui (Radix + Tailwind)
│   │   └── figma/                     # Utilitários vindos do export inicial (Figma Make)
│   ├── styles/
│   │   └── globals.css                # Entrada do Tailwind + tokens de design (cores, tipografia)
│   ├── App.tsx
│   └── main.tsx
├── postcss.config.mjs       # Liga o Tailwind ao Vite (necessário — ver nota)
├── index.html
├── vite.config.ts
└── package.json
```

## Design system

As cores da marca são as mesmas do logo do NMATH, e estão centralizadas em `src/styles/globals.css`:

```css
--color-brand-navy:       #0D1E3E
--color-brand-navy-light: #17305C
--color-brand-teal:       #128F87
--color-brand-teal-deep:  #0D6F68
--color-brand-teal-light: #27BDB5
--color-brand-teal-soft:  #E4F5F3
```

A paleta padrão do Tailwind (`blue-*`, `teal-*`, `purple-*`, etc.) também está redefinida no mesmo ficheiro para resolver automaticamente nestas cores — por isso a maioria das classes já existentes no código (`bg-blue-600`, `from-teal-500 to-blue-500`, etc.) já saem na cor certa sem precisar de renomear nada.

Tipografia: **Fraunces** (títulos, a mesma serifa usada em repositorio.nmath.pt), **Inter** (corpo de texto), **IBM Plex Mono** (datas/labels).

O elemento de assinatura visual é o próprio símbolo do NMATH: os 4 sólidos de Platão do logo (tetraedro, cubo, dodecaedro, icosaedro) aparecem como marca de água na secção principal (`HeroSection.tsx`), com as mesmas imagens usadas no Repositório (`src/assets/solidos/`).

## Instalação e desenvolvimento local

### Pré-requisitos
- Node.js (v18 ou superior recomendado)
- npm

### Passos

```bash
git clone <url-do-repositório>
cd nmath-web
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:5173` (porta padrão do Vite).

### Build de produção

```bash
npm run build
```

## Nota importante sobre o Tailwind

O `postcss.config.mjs` na raiz do projeto é o que liga o Tailwind ao Vite — sem ele, as classes Tailwind usadas no código não geram CSS nenhum. Se este ficheiro for apagado ou o `postcss` deixar de ser detetado, o site perde todo o estilo (aparece "em branco"/sem formatação).

## Deploy

Deploy automático via **Vercel**, ligado a este repositório — cada push (ou merge) despoleta um novo deploy, sem passos manuais.

## Autor

NMATH — Núcleo de Estudantes de Matemática do Instituto Superior Técnico

## Licença

ISC
