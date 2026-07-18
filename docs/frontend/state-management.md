# State Management

## Purpose

State ownership follows the current incremental frontend-to-backend migration. The application does not have one state mechanism for every kind of data.

Use the narrowest owner that matches the state lifecycle:

```txt
persisted operational facts -> backend
shared frontend operational state -> Zustand
derived operational intelligence -> deterministic utilities
route and component UI state -> React state/hooks
```

## Current Data-Source Boundaries

| Surface | Current source | State position |
| --- | --- | --- |
| Campaign Details / Campaign Workspace | `GET /campaigns/:campaignId/workspace` | Backend read-only, mapped before rendering |
| Dashboard | Campaign mocks through Zustand | Shared local operational state |
| Campaign List | Campaign mocks through Zustand | Shared local operational state |
| Kanban | Campaign mocks through Zustand | Shared local operational state |
| Calendar | Campaign mocks through Zustand | Shared local operational state |

These boundaries are intentional. A task must not migrate another surface or remove mocks globally unless its approved scope explicitly authorizes that change.

## Zustand Boundary

Use Zustand for:

- the shared campaign collection used by screens that remain mock/store-driven;
- simple shared campaign actions;
- cross-screen operational coordination that is still local;
- other genuinely shared frontend state.

Zustand must not:

- become backend persistence;
- act as a database or offline cache;
- duplicate server facts as a second durable source of truth;
- store execution health, SLA, risk or coordination as persisted facts;
- become a workflow engine, event log or orchestration runtime;
- absorb temporary form, modal, route loading or component-only state by default.

Current Campaign Workspace quick actions still update local state only. Backend-connected writes are deferred and must be introduced through a separate approved integration task.

## Backend Read Boundary

Campaign Details currently uses native `fetch` in a typed Campaigns module service.

The required direction is:

```txt
REST response
  -> backend DTO type
  -> DTO-to-View-Model mapper
  -> frontend-compatible campaign/workspace model
  -> derived intelligence
  -> visual components
```

Raw backend DTOs must not be stored in visual components or rendered directly. Route-level loading and errors remain local to the page or an appropriate hook.

## Derived Intelligence

Keep the following in deterministic frontend utilities:

- execution health;
- SLA state;
- operational risk;
- coordination state;
- workflow continuity;
- planning pressure;
- command center content;
- timeline presentation;
- dashboard warnings.

These values are interpretations of current facts. They are not primary backend state and should not be written into Zustand as durable truth.

## UI-Only State

Keep UI state local when it belongs to one interaction or route, including:

- modal visibility;
- active tabs;
- temporary form input;
- route loading and error state;
- transient feedback;
- component-only selection.

Promote UI state to a shared store only when multiple independent surfaces need the same state and a simpler existing mechanism is insufficient.

## Fetching Libraries

The adopted direction for the current backend integration is native `fetch`.

React Query, SWR and Axios are not currently adopted. They remain deferred until an approved task identifies a concrete need such as broader server-state caching, invalidation or synchronization.

Do not introduce a fetching library merely because the backend exists.

## Migration Rule

Every frontend task involving application data must declare one position:

- mock/store-driven;
- backend read-only;
- backend read-and-write;
- unchanged data source.

Migration must be route- or feature-scoped. Preserve existing state behavior outside the authorized surface.

## Explicitly Deferred

- backend-connected Campaign Workspace writes;
- Dashboard backend integration;
- Campaign List backend integration;
- Kanban backend integration;
- Calendar backend integration;
- global mock replacement;
- React Query;
- SWR;
- Axios;
- authentication state design;
- realtime synchronization state.
