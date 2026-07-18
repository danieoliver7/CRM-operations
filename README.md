# CRM Operations Platform

MVP de uma plataforma SaaS para centralizar a operacao de campanhas de CRM Marketing em um fluxo unico, moderno e colaborativo.

O produto cobre planejamento, briefing, copy, aprovacao, desenvolvimento, QA, agendamento, envio e acompanhamento operacional. Campaign e a entidade central da experiencia.

## Status atual

O repositorio e uma aplicacao full-stack incremental:

- o frontend operacional esta implementado com React e Zustand;
- o backend esta implementado com NestJS, Prisma e PostgreSQL;
- APIs REST persistem campanhas, dados de referencia e recursos operacionais relacionados;
- Campaign Details consome os fatos persistidos do Campaign Workspace;
- Dashboard, Campaign List, Kanban e Calendar ainda usam os mocks e o estado compartilhado do frontend.

A migracao de dados para o backend e intencionalmente gradual. A existencia do backend nao significa que todas as telas ja foram migradas.

## Arquitetura

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Zustand
- `fetch` nativo na integracao atual com o backend
- inteligencia operacional derivada no frontend

O frontend converte respostas do backend antes da renderizacao:

```txt
Backend facts
  -> typed API client
  -> DTO
  -> DTO-to-View-Model mapper
  -> derived operational intelligence
  -> pages and components
```

React Query, SWR e Axios nao foram adotados e permanecem adiados ate existir uma necessidade arquitetural aprovada.

### Backend

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- APIs REST-first
- monolito modular

O backend persiste fatos operacionais, incluindo campanhas, usuarios, squads, atividades, blockers, handoffs, notes e decision context. O endpoint `GET /campaigns/:campaignId/workspace` agrega os fatos persistidos necessarios ao Campaign Workspace.

O backend nao e a fonte primaria de execution health, SLA state, operational risk, coordination state, workflow continuity, planning pressure, command center, timeline de apresentacao ou warnings do Dashboard. Esses sinais continuam derivados no frontend.

## Fronteiras de dados atuais

| Superficie | Fonte atual | Observacao |
| --- | --- | --- |
| Campaign Details / Workspace | Backend, somente leitura | Usa `GET /campaigns/:campaignId/workspace`, DTO tipado e mapper |
| Dashboard | Mock/Zustand | Migracao para backend ainda nao aprovada |
| Campaign List | Mock/Zustand | Criacao e atualizacoes permanecem locais |
| Kanban | Mock/Zustand | Status compartilhado continua local |
| Calendar | Mock/Zustand | Planejamento exibido a partir do estado local |

As acoes rapidas do Campaign Workspace ainda atualizam apenas o estado local. Escritas do Workspace no backend permanecem fora do escopo atual.

## Estrutura principal

```txt
CRM operations/
|-- backend/       NestJS, Prisma, PostgreSQL e APIs REST
|-- docs/          fontes de verdade do produto e da arquitetura
|-- frontend/      React, UI operacional, estado e inteligencia derivada
|-- tasks/         tarefas ativas e evidencias de execucao
|-- AGENTS.md      regras para agentes de desenvolvimento
`-- package.json   quality gates do repositorio
```

## Como executar

Instale as dependencias de frontend e backend a partir da raiz:

```bash
npm run install:all
```

Com PostgreSQL e as variaveis do backend configurados, inicie os processos em terminais separados:

```bash
npm --prefix backend run start:dev
npm --prefix frontend run dev
```

Por padrao, o frontend usa `http://localhost:3000` e o backend usa `http://localhost:4000`. O Vite encaminha requisicoes locais de `/campaigns` para o backend.

## Validacao

Execute o quality gate completo na raiz:

```bash
npm run verify
```

Validacoes isoladas tambem estao disponiveis:

```bash
npm run verify:frontend
npm run verify:backend
npm run verify:database
```

`verify:database` depende de configuracao valida do ambiente de banco e nao faz parte do quality gate padrao.

## Diretrizes

- Preservar o comportamento e a identidade visual aprovados.
- Migrar superficies para o backend apenas por tarefas e decisoes aceitas.
- Persistir fatos e derivar inteligencia operacional.
- Manter DTOs do backend fora dos componentes visuais.
- Usar Zustand para estado operacional compartilhado, nunca como substituto do backend.
- Evitar overengineering, migracao global de mocks e novas dependencias sem necessidade aprovada.
