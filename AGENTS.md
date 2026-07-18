# CRM Operations Platform — Agent Instructions

## Purpose

This file defines the mandatory operating rules for AI development agents working in this repository.

The repository contains a CRM Operations SaaS platform focused on campaign planning, execution visibility, operational coordination and campaign workspace durability.

## Current Architecture

The repository is an incremental full-stack application.

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- Native fetch for current backend integration
- Frontend-derived operational intelligence

### Backend

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- REST-first APIs
- Modular monolith

The backend persists operational facts.

The frontend may derive:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- planning pressure
- command center presentation
- timeline presentation
- dashboard warnings

Derived intelligence must not become persisted backend truth unless an accepted architectural decision explicitly changes this rule.

## Current Migration Model

Frontend migration to backend data is incremental.

Do not assume every frontend screen consumes backend data.

Every implementation task that touches application data must explicitly declare whether the affected surface:

- remains mock/store-driven;
- becomes backend-read-only;
- becomes backend read-and-write;
- keeps its current data source unchanged.

Do not perform global mock replacement unless explicitly authorized by an active task and an accepted architectural decision.

## Task Authority

The active task defines:

- scope;
- objective;
- acceptance criteria;
- validation;
- non-goals.

An active task does not automatically have authority to override architecture, product boundaries, contracts or accepted ADRs.

If a task conflicts with current architecture or an accepted decision, stop and report the conflict.

## Sources of Truth

Before implementing a task, read:

1. the active task;
2. `docs/current-state.md`;
3. `docs/roadmap.md`;
4. `docs/mvp-boundaries.md`;
5. the latest applicable accepted ADR;
6. applicable contracts;
7. applicable frontend, backend or domain documentation;
8. the current implementation and tests.

Historical planning documents do not override:

- `docs/current-state.md`;
- `docs/roadmap.md`;
- newer accepted ADRs;
- current contracts.

When modifying files inside `frontend/`, also read:

```text
frontend/AGENTS.md
```

When modifying files inside backend/, also read:

```text
backend/AGENTS.md
```

When modifying both areas, read both files.

## Documentation Conflict Rule

Do not silently choose between materially conflicting documents.

When precedence clearly resolves the conflict, follow the newer applicable source and document the obsolete reference.

When precedence does not clearly resolve the conflict, stop and report:

conflicting files;
conflicting instructions;
implementation impact;
decision required.
## Mandatory Execution Loop

For every implementation task:

Read the complete active task.
Confirm that the task status is Ready.
Read the applicable repository instructions and documentation.
Inspect the affected implementation before editing.
Validate that the task does not conflict with current decisions.
Identify the smallest safe implementation.
Produce a short implementation plan.
Add or update tests when required.
Implement only the approved scope.
Run task-specific validation.
Run the repository quality gate.
Investigate and fix failures caused by the task.
Repeat validation until it passes or a stop condition is reached.
Review the complete diff.
Remove unrelated or unnecessary changes.
Update required documentation.
Add execution evidence to the task.
Return the required completion report.

Do not report completion while required validation is failing.

Repository Quality Gate

From the repository root, run:

npm run verify

For frontend-only tasks, also use:

npm run verify:frontend

For backend-only tasks, also use:

npm run verify:backend

Database-specific validation may use:

npm run verify:database

Database validation is not part of the default quality gate when it requires unavailable credentials or external services.

Scope Control
Do not implement unrelated features.
Do not refactor unrelated files.
Do not redesign interfaces unless explicitly requested.
Do not introduce dependencies without justification.
Prefer existing patterns and utilities.
Keep changes small and reviewable.
Do not change data sources implicitly.
Do not update database schema without explicit authorization.
Do not create migrations without explicit authorization.
Do not introduce auth, RBAC, realtime, workflow engines or AI behavior unless explicitly requested.
Do not introduce React Query, SWR or Axios unless explicitly approved.
Documentation Rules

Documentation must describe current behavior, not intended behavior presented as completed.

Update docs/current-state.md only when the actual current product state changes.

Update docs/roadmap.md when:

a roadmap item is completed;
a new item is approved;
a planned direction changes.

Create or update an ADR when a durable architectural decision changes.

Do not create an ADR for minor implementation details.

Definition of Done

A task is complete only when:

all acceptance criteria are satisfied;
automated validation passes;
required manual validation is documented;
no unrelated changes remain;
implementation follows the existing architecture;
required documentation is updated;
remaining limitations are documented;
execution evidence is added to the task.
Stop Conditions

Stop and report a blocker instead of guessing when:

the task is not marked Ready;
a material product decision is missing;
two applicable sources materially conflict;
destructive data changes are required;
credentials or secrets are required;
the task requires an unapproved architecture change;
validation fails because of a pre-existing unrelated problem;
the requested work exceeds the active task scope.
Git Rules

Do not commit, push, merge or open a pull request unless explicitly instructed.

Do not modify unrelated uncommitted user changes.
