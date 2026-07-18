# TASK-000 — Align Agent And Repository Documentation

## Status

Done

## Type

Documentation | Engineering Enablement

## Priority

High

## Risk

Low

## Context

The repository evolved from a frontend-only MVP into an incremental full-stack application.

The current implementation includes:

- React, TypeScript, Vite, Tailwind and Zustand frontend;
- NestJS backend;
- Prisma and PostgreSQL persistence;
- Campaign APIs;
- campaign child-resource APIs;
- Campaign Workspace Facts endpoint;
- backend integration for Campaign Details;
- mock/store-driven Dashboard, Kanban, Calendar and Campaign List.

Some high-level documentation still describes the backend as planned or the project as frontend-only.

## Evidence Of Current Behavior

Current implementation and current-state documentation confirm that the backend and partial frontend integration exist.

The following documents contain outdated or conflicting direction:

```text
README.md
docs/architecture.md
docs/frontend/state-management.md
```

Examples include:

- backend described as planned;
- architecture described as frontend-only;
- React Query described as the current API-data rule even though its adoption remains deferred.

## Problem

Development agents may follow outdated documentation and:

- avoid the existing backend;
- introduce a conflicting data-fetching approach;
- treat Zustand as the only source of campaign data;
- misunderstand the incremental migration boundary;
- select historical planning documentation over current decisions.

## Objective

Align the minimum set of high-level repository documentation with the current architecture without changing runtime behavior.

## Data Source Position

Unchanged data source.

This task must not change any frontend or backend data flow.

Current boundaries remain unchanged:

- Campaign Details uses backend Campaign Workspace facts;
- Dashboard remains mock/store-driven;
- Kanban remains mock/store-driven;
- Calendar remains mock/store-driven;
- Campaign List remains mock/store-driven.

## Allowed Scope

Update:

```text
README.md
docs/architecture.md
docs/frontend/state-management.md
```

The updates must describe:

- existing frontend and backend architecture;
- incremental backend integration;
- persisted facts versus frontend-derived intelligence;
- Zustand boundaries;
- current native-fetch direction;
- React Query, SWR and Axios as deferred;
- current mock/store versus backend boundaries.

Minor corrections to broken references in `AGENTS.md` are allowed only when a referenced path does not exist.

## Non-Goals

Do not:

- modify files inside `frontend/src`;
- modify files inside `backend/src`;
- change UI behavior;
- change API behavior;
- change Prisma schema;
- create migrations;
- connect additional screens to the backend;
- introduce React Query, SWR or Axios;
- introduce tests;
- introduce GitHub Actions;
- introduce Docker;
- implement authentication;
- commit, push or open a pull request.

## Architectural Rules

Preserve:

- incremental migration;
- backend persisted-facts boundary;
- frontend-derived intelligence;
- DTO-to-View-Model mapping;
- Zustand as shared frontend state, not backend replacement;
- current visual and runtime behavior.

Historical planning documents must not override:

```text
docs/current-state.md
docs/roadmap.md
newer accepted ADRs
current contracts
```

## Acceptance Criteria

### AC-01 — README reflects implemented backend

Given the current repository
When `README.md` is read
Then the backend is described as implemented rather than merely planned.

### AC-02 — Architecture reflects full-stack transition

Given the current architecture
When `docs/architecture.md` is read
Then it describes the frontend, backend and incremental integration boundary.

### AC-03 — State-management direction is current

Given the current frontend architecture
When `docs/frontend/state-management.md` is read
Then Zustand is not described as backend persistence and React Query is not presented as the current adopted solution.

### AC-04 — Data-source boundaries remain explicit

Given the current incremental migration
When the updated documents are read
Then Campaign Details is identified as backend-connected while Dashboard, Kanban, Calendar and Campaign List remain mock/store-driven.

### AC-05 — No runtime change

Given this documentation-only task
When the final diff is reviewed
Then no runtime source code, dependency, schema or migration has changed.

### AC-06 — Repository quality gate

Given dependencies are installed
When the repository quality gate is executed
Then frontend and backend validation pass.

## Error And Empty States

Not applicable.

This task must not change runtime error, loading or empty states.

## Required Tests

No new tests are required.

Existing frontend and backend validation must pass.

## Automated Validation

Run from the repository root:

```bash
npm run verify
git diff --check
git status --short
```

## Manual Validation

Confirm manually:

- `README.md` no longer describes the backend as only planned;
- `docs/architecture.md` describes the current full-stack architecture;
- `docs/frontend/state-management.md` does not mandate React Query as currently adopted;
- current mock/backend boundaries are explicit;
- no file under `frontend/src` changed;
- no file under `backend/src` changed;
- no Prisma file changed;
- no dependency changed.

## Documents To Read

```text
AGENTS.md
frontend/AGENTS.md
backend/AGENTS.md
README.md
docs/README.md
docs/current-state.md
docs/roadmap.md
docs/mvp-boundaries.md
docs/architecture.md
docs/frontend/state-management.md
docs/frontend/frontend-architecture-rules.md
docs/contracts/dto-to-view-model-mapping.md
docs/decisions/ADR-029-campaign-workspace-frontend-integration.md
frontend/package.json
backend/package.json
```

## Documents To Update

```text
README.md
docs/architecture.md
docs/frontend/state-management.md
```

## Stop Conditions

Stop and report instead of guessing when:

- current-state and roadmap materially disagree;
- an applicable newer ADR contradicts the proposed direction;
- the task requires changing runtime behavior;
- `npm run verify` fails because of an unrelated existing problem;
- a required document does not exist;
- aligning the documentation requires a new product decision.

## Completion Report

The final report must contain:

- contradictions corrected;
- files updated;
- final architectural description;
- final data-source boundaries;
- commands executed;
- validation results;
- acceptance criteria results;
- remaining outdated documentation discovered;
- recommended follow-up tasks.

## Execution Evidence

### Started

- Date: 2026-07-18
- Branch: `main`
- Agent: Codex

### Implementation Summary

Aligned the authorized high-level documentation with the implemented incremental full-stack architecture. The updated documents now describe the NestJS/Prisma/PostgreSQL backend, the persisted-facts versus frontend-derived-intelligence boundary, the read-only Campaign Workspace integration, the remaining mock/Zustand screens, the current native-fetch approach and the deferral of React Query, SWR and Axios. No runtime behavior or data source changed.

The task is blocked from completion because the repository quality gate exposes unrelated, pre-existing frontend TypeScript errors. The task did not modify any file under `frontend/src`, and fixing those errors is outside the authorized documentation scope.

### Files Changed

- `README.md`
- `docs/architecture.md`
- `docs/frontend/state-management.md`
- `tasks/active/TASK-000-align-agent-documentation.md` (status and execution evidence only)

### Validation Results

| Command | Result | Notes |
|---|---|---|
| `npm run verify` | Blocked | `git diff --check` passed, then `verify:frontend` failed during `tsc --noEmit` with existing TS2339/TS2322 errors in UI, Campaign Workspace and Kanban components. No `frontend/src` file changed in this task. |
| `npm run verify:backend` | Passed | Backend lint passed, 32 tests passed and Nest build passed. Run separately because the combined quality gate stopped at frontend lint. |
| `git diff --check` | Passed | No whitespace errors after removing task-introduced blank lines at EOF. |
| `git status --short` | Completed | Shows the three authorized documentation updates plus pre-existing uncommitted governance/task files. No runtime, Prisma or dependency file was changed by this task. |

### Re-evaluation After TASK-001

- Date: 2026-07-18
- Trigger: TASK-000 was re-evaluated after TASK-001 was reported as having restored the frontend quality gate.
- `npm run verify`: Failed. `git diff --check` passed, but `verify:frontend` still reports the same 24 TS2339/TS2322 diagnostics in shared UI, Campaign Workspace and Kanban components. The frontend build and backend validation were not reached by the combined command.
- `git diff --check`: Passed. Only non-failing line-ending conversion warnings were reported for existing working-tree files.
- `git status --short`: Completed. The worktree still contains the approved documentation changes and pre-existing governance/task files.
- Conclusion: AC-06 remains blocked. TASK-001 has not restored the quality gate in the current worktree, so TASK-000 remains `Blocked` and stays under `tasks/active/`.

### Manual Validation Results

- `README.md` describes the backend as implemented and the repository as an incremental full-stack application.
- `docs/architecture.md` describes frontend, backend, persisted facts, derived intelligence and incremental integration boundaries.
- `docs/frontend/state-management.md` documents native `fetch` as current and React Query, SWR and Axios as deferred rather than adopted.
- Campaign Details / Campaign Workspace is explicitly backend read-only.
- Dashboard, Campaign List, Kanban and Calendar are explicitly mock/store-driven.
- `git diff --exit-code -- frontend/src backend/src backend/prisma frontend/package.json backend/package.json frontend/package-lock.json backend/package-lock.json` passed, confirming no source, Prisma or dependency changes.
- No unrelated file was modified by this task; pre-existing changes in `AGENTS.md`, nested agent instructions, root `package.json` and `tasks/` were preserved.

### Acceptance Criteria Results

| Criterion | Result | Evidence |
|---|---|---|
| AC-01 | Passed | `README.md` lists the implemented NestJS, Prisma, PostgreSQL and REST backend. |
| AC-02 | Passed | `docs/architecture.md` documents the full-stack flow and route-scoped migration boundary. |
| AC-03 | Passed | `docs/frontend/state-management.md` limits Zustand and records native `fetch` as current, with React Query/SWR/Axios deferred. |
| AC-04 | Passed | All three updated documents identify Campaign Details as backend-connected and the four remaining surfaces as mock/store-driven. |
| AC-05 | Passed | Focused diff check confirms no changes under frontend/backend source, Prisma or package dependency files. |
| AC-06 | Blocked | Re-evaluation after TASK-001 still reports the same 24 frontend TypeScript errors, so the repository quality gate does not pass. |

### Remaining Limitations

- Repository verification remains red until the pre-existing frontend TypeScript prop/key errors are resolved in a separately authorized task.
- `docs/architecture/backend-readiness.md` still contains phase-local present-tense statements that no backend, Prisma or NestJS implementation exists. This historical planning document was outside the authorized update scope and should be clarified in a follow-up documentation task.
- No commit, push or pull request was created, as required.
