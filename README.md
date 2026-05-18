# CRM Operations Platform

MVP de uma plataforma SaaS para centralizar a operação de campanhas de CRM Marketing em um fluxo único, moderno e colaborativo.

O produto combina referências de Linear, Jira, Notion e Trello, mas com foco específico em times de CRM, marketing automation, copy, design, implementação, QA e gestão operacional.

> Este repositório contém documentação estratégica e técnica do produto. Mantenha-o privado.

## Visão do Produto

Times de CRM normalmente operam em ferramentas fragmentadas: planejamento em planilhas, copy em documentos, aprovações em chats, implementação em plataformas como Salesforce Marketing Cloud, HubSpot ou Braze, e métricas em dashboards separados.

A CRM Operations Platform busca unificar esse fluxo em uma experiência SaaS enterprise:

- Planejamento de campanhas
- Inventário operacional
- Kanban de produção
- Calendário de envios
- Detalhes de campanha
- QA e aprovações
- Analytics executivo
- Colaboração assíncrona

## Status Atual

O projeto está na fase de MVP frontend. O visual inicial foi gerado no Google AI Studio/Stitch e deve ser preservado enquanto a arquitetura evolui de forma incremental.

Já existem telas funcionais para:

- Dashboard
- Campaigns
- Kanban
- Calendar
- Analytics
- Campaign Details

## Stack

Frontend:

- React 19
- TypeScript
- Vite
- TailwindCSS v4
- React Router
- Lucide React
- Recharts
- Motion
- Zustand

Backend planejado:

- Node.js
- NestJS
- PostgreSQL
- Prisma
- Socket.io

## Estrutura

```txt
CRM operations/
├── backend/
├── database/
├── docs/
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   │   ├── layout/
    │   │   └── ui/
    │   ├── hooks/
    │   ├── modules/
    │   │   ├── analytics/
    │   │   ├── calendar/
    │   │   ├── campaigns/
    │   │   ├── dashboard/
    │   │   └── kanban/
    │   ├── pages/
    │   ├── services/
    │   ├── stores/
    │   ├── types/
    │   └── utils/
    ├── App.tsx
    ├── main.tsx
    └── vite.config.ts
```

## Fluxo Operacional

O fluxo principal de uma campanha no MVP segue estes status:

```txt
Briefing -> Copy -> Approval -> Development -> QA -> Scheduled -> Sent -> Completed
```

Canais previstos:

- Email
- Push
- SMS
- WhatsApp
- Web Push
- InApp

## Como Rodar

Entre no frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Rode em desenvolvimento:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Validação Atual

O frontend passa em:

```bash
npm run lint
npm run build
```

O build ainda emite um aviso de bundle acima de 500 kB. Isso é esperado nesta fase e pode ser tratado depois com code splitting por rota.

## Diretrizes

- Preservar o visual aprovado do Stitch.
- Fazer mudanças pequenas e incrementais.
- Separar UI, domínio, serviços e estado aos poucos.
- Evitar overengineering no MVP.
- Não implementar backend antes da base frontend estar madura.
- Manter a documentação em repositório privado.
