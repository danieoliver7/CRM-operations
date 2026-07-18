# Frontend Agent Instructions

## Scope

These instructions apply to every file inside `frontend/`.

Read the root `AGENTS.md` before using this file.

## Current Frontend Architecture

The frontend uses:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- native fetch for the current backend integration

The frontend is being migrated incrementally from mock/store-driven data toward backend facts.

Do not assume all screens use the backend.

## Required Documentation

Before changing frontend behavior, read the applicable files:

- `docs/current-state.md`
- `docs/roadmap.md`
- `docs/mvp-boundaries.md`
- `docs/frontend/frontend-architecture-rules.md`
- `docs/frontend/state-management.md`
- `docs/frontend/ui-rules.md`
- relevant frontend feature documentation
- relevant contracts
- latest applicable ADR

For Campaign Workspace integration, also inspect:

- `docs/contracts/campaign-workspace-contract.md`
- `docs/contracts/dto-to-view-model-mapping.md`
- latest Campaign Workspace ADR

## Responsibilities

### Pages

Pages orchestrate.

Pages may:

- compose modules;
- connect hooks;
- manage route-level loading and error states;
- arrange layouts;
- pass prepared data into components.

Pages must not:

- contain complex derived intelligence;
- become large state managers;
- render raw backend DTOs;
- hide domain rules inside JSX.

### Components

Components render UI.

Components may:

- receive typed props;
- display state;
- trigger callbacks;
- compose smaller components.

Components must not:

- own complex business rules;
- calculate operational intelligence;
- access backend DTOs directly;
- become persistence layers;
- duplicate shared campaign collections.

### Hooks

Hooks connect behavior.

Hooks may:

- manage local interaction state;
- connect shared state;
- encapsulate UI behavior;
- prepare callbacks for components.

Hooks must not:

- become workflow engines;
- hide broad orchestration;
- duplicate backend persistence;
- store derived intelligence as primary truth.

### Zustand Stores

Zustand is allowed for:

- shared frontend operational state;
- cross-screen coordination;
- shared campaign state that has not yet migrated;
- simple state actions.

Zustand must not:

- replace backend persistence;
- become a database;
- render backend DTOs directly;
- store derived operational intelligence as primary truth;
- duplicate the same shared entity collection across components.

### Utilities

Utilities own deterministic derived intelligence.

Examples include:

- execution health;
- SLA state;
- operational risk;
- coordination state;
- planning pressure;
- workflow continuity;
- timeline presentation.

Utilities must remain:

- deterministic;
- transparent;
- testable;
- independent from UI rendering;
- free from state mutation.

## Backend Data Boundary

Backend responses must follow:

API response
  -> DTO type
  -> mapper
  -> frontend View Model or domain-compatible model
  -> derived intelligence
  -> component



===============================

Do not render raw backend DTOs inside visual components.

Do not modify backend response contracts only to simplify frontend rendering.

Data Source Declaration

Every frontend task involving data must state one of:

mock/store-driven;
backend read-only;
backend read-and-write;
unchanged data source.

Do not migrate additional pages to the backend unless explicitly included in the active task.

Fetching Direction

Use the existing native-fetch approach for current backend reads.

Do not introduce:

React Query;
SWR;
Axios;
a new global data-fetching abstraction;

unless the active task explicitly approves the architecture change.

UI Rules
Preserve the existing visual language.
Reuse existing components.
Avoid redesigning unrelated sections.
Include loading, error and empty states when applicable.
Interactive elements must produce visible behavior.
Avoid giant page components.
Keep business logic outside JSX.
Preserve responsive behavior.
Dependencies

Do not add frontend dependencies unless:

the active task requires them;
the existing stack cannot safely solve the problem;
the completion report explains the reason.
Frontend Validation

From the repository root:

npm run verify:frontend

Equivalent commands inside frontend/:

npm run lint
npm run build

The current frontend does not have a test framework.

Do not introduce one as part of an unrelated product task.

When frontend tests are introduced by an approved task, use the package script defined by that task.

Manual Validation

For UI changes, manually validate:

affected route;
primary successful flow;
loading state;
error state;
empty state when applicable;
responsive layout;
navigation continuity;
no visible regression in adjacent components.