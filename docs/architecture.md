# Architecture

## Current Position

CRM Operations Platform is an incremental full-stack application.

The frontend-first product discovery phase remains reflected in the UI and derived operational intelligence, but the repository now includes an implemented backend and PostgreSQL persistence. Backend adoption across frontend surfaces is intentionally incremental.

The current high-level flow is:

```txt
PostgreSQL
  -> Prisma
  -> NestJS resource modules
  -> REST API facts
  -> typed frontend API client
  -> DTO-to-View-Model mapper
  -> frontend-derived intelligence
  -> pages and components
```

This flow currently applies to Campaign Details / Campaign Workspace reads. It must not be assumed for every frontend screen.

## Frontend Architecture

The frontend uses:

- React 19;
- TypeScript;
- Vite;
- Tailwind CSS;
- React Router;
- Zustand;
- native `fetch` for the current backend integration.

Frontend responsibilities follow these boundaries:

```txt
pages orchestrate
components render
hooks connect behavior
stores share frontend state
utils derive operational intelligence
mappers translate backend DTOs into frontend models
```

Visual components must not render raw backend DTOs. Backend response changes must not be requested solely to move presentation logic out of the frontend.

## Backend Architecture

The backend uses:

- NestJS;
- TypeScript;
- Prisma;
- PostgreSQL;
- REST-first resource APIs;
- a modular monolith structure.

Implemented backend modules persist and expose operational facts for:

- workspaces;
- users;
- squads;
- campaigns;
- blockers;
- notes;
- decision context;
- activities;
- handoffs;
- composed Campaign Workspace facts.

Campaign remains the central operational aggregate. Campaign-scoped child resources remain explicit resources rather than becoming a workflow engine, event-sourcing layer or orchestration runtime.

## Persistence Boundary

The backend persists facts such as:

- campaign identity, status, priority, channel and dates;
- workspace, owner and squad references;
- activities, blockers, handoffs, notes and decision context;
- timestamps and supported resource metadata.

The frontend derives operational interpretation from those facts, including:

- execution health;
- SLA state;
- operational risk;
- coordination state;
- workflow continuity;
- planning pressure;
- command center presentation;
- timeline presentation;
- dashboard warnings.

Derived intelligence must not be persisted as primary backend truth without a newer accepted architectural decision.

## Incremental Integration Boundary

Current data sources are explicit:

| Surface | Current source | Integration level |
| --- | --- | --- |
| Campaign Details / Campaign Workspace | Backend Workspace facts | Backend read-only |
| Dashboard | Campaign mocks through Zustand | Mock/store-driven |
| Campaign List | Campaign mocks through Zustand | Mock/store-driven |
| Kanban | Campaign mocks through Zustand | Mock/store-driven |
| Calendar | Campaign mocks through Zustand | Mock/store-driven |

Campaign Details reads `GET /campaigns/:campaignId/workspace` through the typed Campaigns module API client. The response passes through DTO types and `mapCampaignWorkspaceFactsToViewModel` before reaching the existing Campaign Workspace components and derived utilities.

Workspace quick actions and the other listed surfaces remain local. Backend-connected writes and broader screen migration require separate approved tasks.

## State Boundary

Zustand remains responsible for shared frontend operational state that has not migrated and for local cross-screen coordination.

Zustand must not:

- replace backend persistence;
- duplicate backend data into a second durable source of truth;
- store derived intelligence as primary truth;
- become a workflow engine or orchestration layer;
- absorb temporary component state without a cross-screen need.

Route-level loading, error and temporary interaction state stay local to pages or hooks. Derived intelligence stays in deterministic utilities.

## Fetching Direction

The current backend read uses native `fetch` inside a typed feature service.

React Query, SWR and Axios are deferred. Introducing one of them requires an approved task that demonstrates a need for broader server-state caching, synchronization or request orchestration. The presence of a backend alone does not justify that dependency.

## Migration Rules

Every task that touches application data must declare whether the affected surface is:

- mock/store-driven;
- backend read-only;
- backend read-and-write;
- unchanged.

Do not replace mocks globally, connect additional screens implicitly or change a data source while performing unrelated work.

## Deferred Architecture

The current architecture does not include:

- authentication or RBAC;
- realtime or WebSocket coordination;
- React Query, SWR or Axios;
- workflow engines;
- event sourcing or CQRS;
- microservices;
- persisted derived intelligence;
- global migration of frontend mocks.
