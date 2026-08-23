# Portal de Administração — Guia de Instalação

Este site passou a ter uma área `/admin` (link "Administrador" no fundo do
site) onde é possível editar Anúncios, Edições da Revista, Calendários por
Ano e Próximos Eventos sem mexer em código.

Segue estes passos, por ordem, uma única vez, para pores tudo a funcionar.

## 1. Criar o projeto Supabase (base de dados gratuita)

1. Vai a [supabase.com](https://supabase.com) e cria uma conta (podes usar o GitHub).
2. Cria um novo projeto (**New Project**). Escolhe uma password de base de
   dados forte e guarda-a nalgum sítio seguro (não é a mesma coisa que a
   password do admin do site).
3. Espera 1-2 minutos até o projeto ficar pronto.

## 2. Criar as tabelas

1. No menu lateral do Supabase, abre **SQL Editor** → **New query**.
2. Copia todo o conteúdo do ficheiro `db/schema.sql` (está na raiz deste
   projeto) e cola no editor.
3. Clica em **Run**. Devias ver 4 tabelas novas em **Table Editor**:
   `announcements`, `magazine_editions`, `calendar_years`, `upcoming_events`.

## 3. Obter as chaves do Supabase

1. No menu lateral, vai a **Project Settings** → **API**.
2. Copia o **Project URL** (algo como `https://xxxxx.supabase.co`).
3. Copia a chave **service_role** (não é a `anon public` — tem de ser a
   `service_role`, que fica secreta e nunca vai para o browser).

## 4. Popular a base de dados com o conteúdo atual do site

No teu computador, dentro da pasta do projeto:

```bash
npm install
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="a_tua_service_role_key"
npm run seed
```

(No Windows/PowerShell usa `$env:SUPABASE_URL="..."` em vez de `export`.)

Isto vai inserir nas tabelas todos os anúncios, edições da revista,
calendários e eventos que já estavam escritos no código do site — para
começares exatamente de onde o site está hoje.

## 5. Configurar as variáveis de ambiente no Vercel

No dashboard do Vercel, abre o projeto do site → **Settings** →
**Environment Variables**, e adiciona:

| Nome                     | Valor                                             |
|---------------------------|---------------------------------------------------|
| `ADMIN_PASSWORD`          | `gabriela` (ou a password que preferires)          |
| `SUPABASE_URL`             | o Project URL do passo 3                          |
| `SUPABASE_SERVICE_ROLE_KEY`| a service_role key do passo 3                     |

Aplica a todos os ambientes (Production, Preview, Development).

## 6. Deploy

Faz `git push` como habitualmente — o Vercel vai fazer o deploy automático,
já com as funções em `api/` incluídas.

## 7. Testar

1. Abre o site e vai ao fundo da página — clica em **Administrador**.
2. Introduz a password (`gabriela`, ou a que definiste).
3. Deves ver 4 separadores: Anúncios, Revista, Calendário, Próximos Eventos.
   Experimenta editar ou criar algo e confirma que aparece no site público.

## Notas importantes

- **A password não está no código**: fica só na variável de ambiente
  `ADMIN_PASSWORD` do Vercel. Ainda assim, é uma proteção simples (uma
  password partilhada, sem contas individuais) — adequada para conteúdo de
  marketing, não para dados sensíveis.
- **Imagens da revista**: o formulário de nova edição pede um URL de
  imagem. As edições antigas já têm as capas em `public/magazine/`. Para
  edições novas, ou fazes upload da imagem a um serviço como o Google
  Drive/Imgur e colas o link direto, ou pedes a alguém para adicionar o
  ficheiro à pasta `public/magazine/` do repositório.
- **Se mudares a password**: só precisas de atualizar a variável
  `ADMIN_PASSWORD` no Vercel e fazer um novo deploy (ou "Redeploy" sem
  alterações) — as sessões já iniciadas com a password antiga deixam de
  funcionar automaticamente.
- **Testar localmente**: usa `vercel dev` (depois de instalares a CLI do
  Vercel com `npm i -g vercel` e correres `vercel link`) para correres o
  site com as funções `api/` a funcionar no teu computador, com as mesmas
  variáveis de ambiente num ficheiro `.env`.

## Atualização: "Eventos NMATH" e "Oráculo"

Se já tinhas o portal a funcionar e acabaste de atualizar o código com as
secções **Eventos NMATH** (Integration Bee, Jornadas, ENEMATH, Time2Talk)
e **Oráculo** (episódios do podcast), só precisas de 2 passos extra —
**não é preciso repetir a instalação toda**:

1. No Supabase → **SQL Editor** → **New query**, cola de novo o conteúdo
   completo de `db/schema.sql` e corre. É seguro repetir: as tabelas que já
   existiam (`announcements`, `magazine_editions`, etc.) não são apagadas
   nem alteradas — só são criadas as 2 tabelas novas (`flagship_events` e
   `oracle_episodes`).

2. No terminal, com as variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`
   definidas (como antes), corre:
   ```bash
   npm install
   npm run seed:new
   ```
   **Não uses `npm run seed`** (esse apaga e reescreve as 4 tabelas
   originais, o que perderia qualquer edição que já tenhas feito no admin).
   `npm run seed:new` só mexe nas 2 tabelas novas.

3. Faz `git push` do código atualizado e, se o Vercel não fizer deploy
   automático, força um com Redeploy. Não é preciso mudar nenhuma variável
   de ambiente — são as mesmas de antes.

## Atualização: páginas de arquivo, rascunhos, lixo e upload de imagens

Se já tinhas o portal com "Eventos NMATH" e "Oráculo" a funcionar e acabaste
de atualizar outra vez o código, aqui está o que mudou e o que fazer:

**O que é novo:**
- `/anuncios` — página com o arquivo completo de todos os anúncios (a
  homepage passou a mostrar só os mais recentes, com um botão "Ver todos")
- `/revista` — página com o arquivo completo de edições da revista (a
  homepage mostra só a edição atual, com um botão "Ver arquivo completo")
- Cada item (anúncios, revista, eventos NMATH, próximos eventos, Oráculo)
  tem agora um interruptor **Publicado / Rascunho** — um rascunho fica
  guardado mas não aparece no site até ativares "Publicado"
- Ao apagar algo no admin, ele vai para o **Lixo** em vez de desaparecer
  logo — há um botão "Lixo" em cada secção para o veres, repor, ou eliminar
  definitivamente
- No formulário da Revista já dá para fazer **upload direto de uma imagem**
  em vez de teres de arranjar um link à parte

**O que precisas de fazer:**

1. No Supabase → SQL Editor, cola de novo o `db/schema.sql` completo e
   corre. É seguro repetir — só acrescenta as colunas novas
   (`published`, `deleted_at`) às tabelas existentes e cria o espaço de
   armazenamento para as imagens (`nmath-uploads`). Nada é apagado.
2. **Não precisas de correr nenhum seed novo** — os anúncios, revista, etc.
   que já tinhas ficam automaticamente marcados como "Publicado".
3. `git push` do código novo e confirma o deploy no Vercel.
4. Testa: no `/admin`, confirma que consegues marcar algo como rascunho e
   que deixa de aparecer no site; apaga um item de teste e confirma que
   aparece no "Lixo" com opção de repor.


