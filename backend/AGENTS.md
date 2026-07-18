# Backend Agent Instructions

## Scope

These instructions apply to every file inside `backend/`.

Read the root `AGENTS.md` before using this file.

## Current Backend Architecture

The backend uses:

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- REST-first APIs
- modular monolith architecture

The backend exists to persist and expose operational facts.

It must not become the source of truth for frontend-derived operational intelligence without an accepted architectural decision.

## Required Documentation

Before changing backend behavior, read:

- `docs/current-state.md`
- `docs/roadmap.md`
- `docs/mvp-boundaries.md`
- `docs/backend/backend-principles.md`
- `docs/backend/persistence-boundaries.md`
- `docs/backend/api-boundaries.md`
- relevant API contract
- relevant validation document
- latest applicable ADR

For frontend-facing API changes, also read:

- `docs/contracts/api-response-shapes.md`
- `docs/contracts/dto-to-view-model-mapping.md`
- `docs/contracts/campaign-workspace-contract.md`

## Backend Responsibility

The backend may persist and expose:

- workspaces;
- users;
- squads;
- campaigns;
- campaign status and priority facts;
- campaign ownership facts;
- blockers;
- notes;
- decision context;
- activities;
- handoffs;
- Campaign Workspace persisted facts.

The backend must not persist as primary truth:

- execution health;
- SLA state;
- operational risk;
- coordination state;
- workflow continuity;
- planning pressure;
- command center presentation;
- timeline presentation;
- dashboard warnings;
- frontend UI state.

## Module Boundaries

Keep modules:

- resource-oriented;
- campaign-centered where applicable;
- simple;
- explicit;
- independent from frontend presentation concerns.

Do not introduce:

- workflow engines;
- generic orchestration services;
- repository abstractions without need;
- event sourcing;
- CQRS;
- automatic status transitions;
- hidden cross-resource side effects;
- automatic activity creation unless explicitly approved.

## Controllers

Controllers should:

- receive route and input data;
- delegate behavior to services;
- return established response shapes;
- remain thin.

Controllers should not:

- contain persistence logic;
- contain broad validation logic;
- calculate derived intelligence;
- coordinate unrelated modules.

## Services

Services should:

- enforce resource ownership;
- validate related records;
- perform Prisma operations;
- return persisted facts;
- use explicit errors.

Services should not:

- become workflow engines;
- update unrelated resources implicitly;
- create frontend presentation models;
- return derived operational intelligence as persisted truth.

## API Response Rules

Use the existing response direction:

```json
{
  "data": {}
}
```

List endpoints should use:

```json
{
  "data": []
}
```

Errors should follow the established error contract:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

Do not create a new response convention inside a single endpoint.

Related Record Validation

Before persisting references, validate applicable entities such as:

workspace;
user;
squad;
campaign;
campaign child-resource ownership.

A campaign-scoped child resource must belong to the campaign identified by the route.

Do not trust request identifiers without validation.

Prisma Rules

Do not change schema.prisma unless the active task explicitly authorizes it.

Do not create migrations unless the task explicitly authorizes:

schema change;
migration creation;
migration validation;
documentation update.

Do not delete or rewrite existing migration history.

Do not use destructive reset commands unless the user explicitly authorizes them.

Do not expose credentials or create committed .env files.

Use .env.example only for placeholder configuration.

Database Safety

Stop before executing destructive operations involving:

database reset;
dropping tables;
deleting production-like data;
rewriting migration history;
destructive seeds.

Report the required operation and its consequences.

Backend Tests

Add or update backend tests when changing:

service behavior;
validation behavior;
API response mapping;
error handling;
ownership boundaries;
child-resource behavior.

Tests must validate behavior, not implementation details.

Backend Validation

From the repository root:

npm run verify:backend

Equivalent commands inside backend/:

npm run lint
npm run test
npm run build

For schema-related tasks, also run when credentials and environment permit:

npm run prisma:format
npm run prisma:validate
npm run prisma:generate

Do not claim database integration was validated when a required database connection was unavailable.

Cross-Layer Changes

Do not modify frontend code as part of a backend task unless the active task explicitly includes contract integration.

When changing an API contract:

update the backend contract;
update relevant DTO documentation;
inspect frontend mapper compatibility;
add validation for the contract;
document migration impact.
