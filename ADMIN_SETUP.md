# Portal de Administração: guia de instalação

O site tem uma área `/admin` (link "Administrador" no fundo do site) onde se
editam, sem mexer em código:

- **Anúncios** (com hora e local opcionais)
- **Calendário**: mostra se o site está ligado ao Google Calendar. Os eventos
  criam-se no próprio Google Calendar
- **Eventos NMATH** (Integration Bee, Jornadas, ENEMATH, Time2Talk...)
- **Revista** (Ponto Fixo)
- **Oráculo** (episódios do podcast)
- **Fotos** (álbuns)
- **Mobilidade** (documentos de Erasmus e mestrados no estrangeiro)
- **Recrutamento** (link do botão "Candidata-te")

Segue estes passos, por ordem, uma única vez.

## 1. Criar o projeto Supabase (base de dados gratuita)

1. Vai a [supabase.com](https://supabase.com) e cria uma conta.
2. Cria um projeto (**New Project**) com uma password de base de dados forte,
   guardada num sítio seguro (não é a password do admin do site).
3. Espera 1 a 2 minutos até o projeto ficar pronto.

## 2. Criar as tabelas

1. No Supabase, abre **SQL Editor**, **New query**.
2. Cola o conteúdo de `db/schema.sql` e clica em **Run**.
3. É seguro repetir: só cria o que ainda não existe e nunca apaga dados.

> A tabela `upcoming_events` (antigos "Próximos Eventos") já não é usada pelo
> site, porque os eventos vêm do Google Calendar. Pode ficar na base de dados.

## 3. Obter as chaves do Supabase

1. **Project Settings**, **API**.
2. Copia o **Project URL** e a chave **service_role** (não a `anon public`).
   A `service_role` é secreta e nunca vai para o browser nem para o código.

## 4. Variáveis de ambiente no Vercel

Em **Settings**, **Environment Variables** do projeto, cria:

| Nome | Valor |
|---|---|
| `ADMIN_PASSWORD` | uma password forte, só tua. Não a escrevas em ficheiros do projeto |
| `SUPABASE_URL` | o Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | a chave service_role |
| `GOOGLE_CALENDAR_ICS_URL` | "Endereço secreto no formato iCal" do calendário dos eventos |
| `GOOGLE_CALENDAR_NOTICES_ICS_URL` | (opcional) o mesmo, para um calendário só de avisos (feriados, exames) |

Para obter o endereço iCal: Google Calendar no computador, ao lado do
calendário, três pontinhos, **Definições e partilha**, **Integrar calendário**,
**Endereço secreto no formato iCal**. Não cliques em "Repor", porque isso
invalida o endereço. Aplica as variáveis a todos os ambientes.

## 5. Deploy

Faz `git push`. O Vercel faz o deploy sozinho, com as funções de `api/`.
Depois de mudares uma variável de ambiente é preciso um **Redeploy**.

## 6. Testar

1. Abre o site, vai ao fundo da página e clica em **Administrador**.
2. Entra com a `ADMIN_PASSWORD`.
3. No separador **Calendário** deve aparecer "Ligado ao Google Calendar".

## Notas

- **Segurança**: a password é partilhada (sem contas individuais), por isso
  serve para conteúdo do site, não para dados sensíveis. Se a mudares, atualiza
  `ADMIN_PASSWORD` no Vercel e faz Redeploy. As sessões antigas deixam de valer.
- **Rascunhos e lixo**: cada item tem o interruptor Publicado/Rascunho. O que
  se apaga vai primeiro para o Lixo, de onde se pode repor.
- **Uploads**: imagens até 5 MB e PDFs até 3 MB (limite do Vercel).
- **Limite de funções**: o plano gratuito do Vercel só permite 12 funções em
  `api/`. Neste momento há 10. Para novos pedidos à API, reaproveita uma função
  existente (como se faz com `?resource=` em `api/calendar-years.js`).
- **Testar localmente**: `vercel dev` (depois de `npm i -g vercel` e
  `vercel link`), com as variáveis num ficheiro `.env` que nunca se commita.
- **Segredos**: `.env`, chaves SSH e passwords nunca devem ir para o git.
