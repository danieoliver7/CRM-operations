# TASK-001 — Restore Frontend Quality Gate

## Status

Done

## Type

Bug | Engineering Enablement

## Priority

High

## Risk

Medium

## Dependency Context

This task was created after:

```text
TASK-000 — Align Agent And Repository Documentation
```

TASK-000 completed its authorized documentation changes but could not pass the global repository quality gate because the frontend contains pre-existing TypeScript errors.

This task exists only to restore the frontend validation baseline.

It must not expand the documentation scope of TASK-000.

## Context

The repository-level validation command runs:

```bash
npm run verify
```

The backend validation currently passes, including 32 backend tests.

The frontend validation fails during its TypeScript validation step.

The frontend package currently defines:

```bash
npm run lint
```

as its TypeScript validation command.

The reported frontend errors existed before the documentation changes performed by TASK-000.

## Evidence Of Current Behavior

From the repository root:

```bash
npm run verify:frontend
```

fails because of TypeScript errors inside the existing frontend implementation.

The documentation-only diff from TASK-000 did not modify:

* `frontend/src`;
* frontend dependencies;
* frontend TypeScript configuration;
* runtime application behavior.

Before editing, capture and document the complete current output of:

```bash
npm run verify:frontend
```

## Problem

The repository does not currently have a reliable global quality gate because the frontend TypeScript validation fails.

This prevents:

* TASK-000 from reaching Done;
* future tasks from distinguishing new errors from existing errors;
* autonomous development loops from using `npm run verify` as an objective completion signal.

## Objective

Restore the existing frontend quality gate by resolving the current TypeScript errors using the smallest safe changes possible.

After completion:

```bash
npm run verify:frontend
```

and:

```bash
npm run verify
```

must pass.

## Data Source Position

Unchanged data source.

This task must not change the current data-source boundaries:

* Campaign Details remains backend read-only;
* Dashboard remains mock/store-driven;
* Campaign List remains mock/store-driven;
* Kanban remains mock/store-driven;
* Calendar remains mock/store-driven.

## Approved Dependency Exception

The investigation confirmed that the frontend uses React 19 with TypeScript but does not declare the official React type packages.

This task is explicitly authorized to add only:

```text
@types/react@^19
@types/react-dom@^19
```

as frontend development dependencies.

The authorized installation command is:

```bash
npm --prefix frontend install --save-dev @types/react@^19 @types/react-dom@^19
```

This exception is limited to restoring the existing React 19 TypeScript environment.

The agent must not add, remove or upgrade any other dependency.

Expected dependency files that may change:

```text
frontend/package.json
frontend/package-lock.json
```

The lockfile must be updated through the package manager. It must not be edited manually.

This dependency change does not authorize:

* React runtime upgrades;
* React DOM runtime upgrades;
* TypeScript upgrades;
* Vite upgrades;
* component rewrites;
* TypeScript configuration weakening;
* frontend architecture changes;
* new product behavior.


## Allowed Scope

The agent may:

* inspect all current frontend TypeScript errors;
* identify their root causes;
* update affected frontend TypeScript or React source files;
* correct invalid imports;
* correct incompatible types;
* correct outdated component props;
* correct DTO, View Model or domain type mismatches;
* remove genuinely unused code when it is directly responsible for validation failure;
* make minimal safe adjustments required for the existing build to pass;
* update frontend documentation only when an existing documented contract is demonstrably inconsistent with the corrected implementation.

The agent must inspect the complete error set before making changes.

Prefer fixing shared root causes instead of applying isolated patches to every error.

- add `@types/react@^19` and `@types/react-dom@^19` as frontend development dependencies;
- update `frontend/package.json` and `frontend/package-lock.json` through npm;
- make additional source corrections only if TypeScript errors remain after the official React types are installed.

## Non-Goals

Do not:

* change product behavior intentionally;
* redesign any interface;
* migrate additional screens to the backend;
* replace mocks globally;
* change API contracts;
* modify backend implementation;
* modify Prisma schema;
* create migrations;
* add React Query;
* add SWR;
* add Axios;
* add a frontend test framework;
* add any dependency other than `@types/react@^19` and `@types/react-dom@^19`;
* upgrade or downgrade existing runtime dependencies;
* weaken TypeScript configuration;
* disable strictness;
* remove validation commands;
* suppress errors without resolving them;
* refactor unrelated frontend modules;
* implement new features;
* edit TASK-000 execution evidence;
* commit, push or open a pull request.


## Prohibited Error Suppression

Do not resolve errors by introducing:

```text
@ts-ignore
@ts-nocheck
eslint-disable
skipLibCheck changes
strict: false
noImplicitAny: false
```

Do not introduce broad `any` types merely to satisfy the compiler.

A narrowly justified type assertion is allowed only when runtime validation or an existing contract proves the asserted shape.

Every assertion introduced must be explained in the completion report.

## Architectural Rules

Preserve the current frontend architecture:

```text
API response
  -> DTO
  -> mapper
  -> frontend View Model or compatible domain model
  -> derived intelligence
  -> UI component
```

Preserve responsibility boundaries:

* pages orchestrate;
* components render;
* hooks connect behavior;
* stores share frontend state;
* utilities derive operational intelligence;
* backend DTOs do not render directly in visual components.

Follow:

```text
AGENTS.md
frontend/AGENTS.md
docs/current-state.md
docs/roadmap.md
docs/mvp-boundaries.md
docs/frontend/frontend-architecture-rules.md
docs/frontend/state-management.md
```

## Required Investigation

Before editing:

1. Run `npm run verify:frontend`.
2. Capture the complete TypeScript error list.
3. Group errors by likely root cause.
4. Identify whether errors are:

   * stale imports;
   * incompatible types;
   * incorrect props;
   * missing exports;
   * DTO/View Model mismatches;
   * unsafe null or undefined handling;
   * dead code;
   * configuration problems.
5. Determine the smallest coherent correction.
6. Document the implementation plan in the execution evidence.

Do not begin broad refactoring before completing this investigation.

## Acceptance Criteria

### AC-01 — Error baseline captured

Given the existing frontend validation failure
When implementation begins
Then the original error output is recorded in the task execution evidence.

### AC-02 — TypeScript validation passes

Given the corrected frontend implementation
When the following command is executed:

```bash
npm run verify:frontend
```

Then it exits successfully.

### AC-03 — Frontend build passes

Given the corrected frontend implementation
When the frontend production build executes
Then it completes successfully without TypeScript compilation errors.

An existing non-failing bundle-size warning may remain documented.

### AC-04 — Global quality gate passes

Given frontend validation is restored and backend validation remains valid
When the following command is executed:

```bash
npm run verify
```

Then it exits successfully.

### AC-05 — No error suppression

Given the final diff
When it is reviewed
Then no TypeScript validation rule was weakened and no broad error-suppression directive was added.

### AC-06 — No intentional behavior change

Given the affected frontend routes
When they are manually inspected
Then their existing user-visible behavior remains functionally equivalent.

### AC-07 — Data boundaries preserved

Given the current incremental migration
When the final diff is inspected
Then no additional screen was connected to the backend and no global mock replacement occurred.

### AC-08 — Backend remains untouched

Given this is a frontend validation task
When the final diff is inspected
Then backend source code, Prisma schema and migrations remain unchanged.

### AC-09 — Official React types declared

Given the frontend uses React 19 and TypeScript
When frontend development dependencies are inspected
Then `@types/react` and `@types/react-dom` are declared with React 19-compatible versions.

### AC-10 — Dependency scope remains limited

Given the final dependency diff
When `frontend/package.json` and `frontend/package-lock.json` are reviewed
Then no dependency other than `@types/react` and `@types/react-dom` was added, removed, upgraded or downgraded intentionally.

### AC-11 — React type errors resolved structurally

Given the official React type packages are installed
When frontend TypeScript validation runs
Then React HTML props such as `className`, `children`, `src`, `alt`, `type` and the JSX `key` attribute are recognized without local prop workarounds.

## Error And Empty States

Do not remove or weaken existing:

* loading states;
* not-found states;
* backend-unavailable states;
* unexpected-error states;
* empty child-resource handling.

When a TypeScript correction affects one of these states, manually verify the corresponding behavior.

## Required Tests

The frontend does not currently have an approved test framework.

Do not introduce one in this task.

Use:

* TypeScript validation;
* production build;
* global repository verification;
* targeted manual validation of affected routes.

Backend tests must continue passing as part of `npm run verify`.

## Automated Validation

Run from the repository root:

```bash
npm run verify:frontend
npm run verify
git diff --check
git status --short
```
Confirm that:

- `@types/react` is listed under frontend `devDependencies`;
- `@types/react-dom` is listed under frontend `devDependencies`;
- no local React or JSX declaration file was created;
- no `key` prop was manually added merely to imitate React's intrinsic JSX behavior;
- no TypeScript compiler rule was weakened;
- no runtime dependency was intentionally changed.

If applicable, also run focused commands used to investigate individual TypeScript files.

## Manual Validation

After identifying the files changed, manually validate the directly affected routes or components.

At minimum, check when affected:

* Dashboard;
* Campaign List;
* Kanban;
* Calendar;
* Campaign Details;
* primary navigation;
* Campaign Workspace loading state;
* Campaign Workspace error state.

Do not claim a route was manually validated if it was not executed.

Document which routes were checked and which were not applicable.

## Documents To Read

```text
AGENTS.md
frontend/AGENTS.md
docs/current-state.md
docs/roadmap.md
docs/mvp-boundaries.md
docs/architecture.md
docs/frontend/state-management.md
docs/frontend/frontend-architecture-rules.md
docs/contracts/dto-to-view-model-mapping.md
docs/contracts/campaign-workspace-contract.md
docs/decisions/ADR-029-campaign-workspace-frontend-integration.md
frontend/package.json
frontend/tsconfig.json
```

Read additional documents only when directly related to an affected module.

## Documents To Update

Normally:

```text
None
```

Update documentation only when the TypeScript error exposes a demonstrable inconsistency between an active contract and the current implementation.

Do not update historical planning documents as part of this task.

## Stop Conditions

Stop and report instead of guessing when:

* resolving an error requires a product decision;
* resolving an error requires changing an API contract;
* resolving an error requires changing backend behavior;
* resolving an error requires migrating another page to the backend;
* resolving an error requires weakening TypeScript validation;
* the errors reveal a broad architectural inconsistency;
* a required fix would significantly change user-visible behavior;
* an unrelated dependency or environment failure prevents validation.

When stopped, report:

* exact remaining errors;
* affected files;
* root cause;
* decision or follow-up task required.

## Completion Report

The final report must contain:

* original TypeScript error count;
* errors grouped by root cause;
* root causes corrected;
* implementation approach;
* files changed;
* whether any type assertions were introduced;
* commands executed;
* result of every command;
* routes manually validated;
* acceptance criteria results;
* remaining warnings;
* remaining limitations;
* whether TASK-000 can now be unblocked.

## Execution Evidence

### Approved Resolution

The project owner authorized adding:

- `@types/react@^19`
- `@types/react-dom@^19`

as frontend development dependencies.

This authorization resolves the dependency-related stop condition.

The task returned from `Blocked` to `Ready`.

### Started

* Date: 2026-07-18
* Branch: `main`
* Agent: Codex

### Original Validation Failure

```text
> crm-operations-platform@0.1.0 verify:frontend
> npm --prefix frontend run lint && npm --prefix frontend run build

> react-example@0.0.0 lint
> tsc --noEmit

src/components/ui/Avatar.tsx(11,49): error TS2339: Property 'className' does not exist on type 'AvatarProps'.
src/components/ui/Avatar.tsx(11,60): error TS2339: Property 'src' does not exist on type 'AvatarProps'.
src/components/ui/Avatar.tsx(11,65): error TS2339: Property 'alt' does not exist on type 'AvatarProps'.
src/components/ui/AvatarGroup.tsx(13,11): error TS2322: Type '{ key: string; src: string; fallback: string; alt: string; size: "sm"; className: string; }' is not assignable to type 'AvatarProps'.
  Property 'key' does not exist on type 'AvatarProps'.
src/components/ui/Badge.tsx(14,44): error TS2339: Property 'className' does not exist on type 'BadgeProps'.
src/components/ui/Button.tsx(29,3): error TS2339: Property 'className' does not exist on type 'ButtonProps'.
src/components/ui/Button.tsx(30,3): error TS2339: Property 'children' does not exist on type 'ButtonProps'.
src/components/ui/Button.tsx(31,3): error TS2339: Property 'type' does not exist on type 'ButtonProps'.
src/components/ui/Card.tsx(11,45): error TS2339: Property 'className' does not exist on type 'CardProps'.
src/components/ui/Input.tsx(4,46): error TS2339: Property 'className' does not exist on type 'InputProps'.
src/components/ui/Modal.tsx(34,16): error TS2322: Type '{ children: string; variant: "icon"; size: "icon"; "aria-label": string; onClick: () => void; }' is not assignable to type 'ButtonProps'.
  Property 'children' does not exist on type 'ButtonProps'.
src/components/ui/ProgressBar.tsx(4,38): error TS2339: Property 'className' does not exist on type 'ProgressBarProps'.
src/components/ui/SidebarItem.tsx(7,3): error TS2339: Property 'className' does not exist on type 'SidebarItemProps'.
src/components/ui/SidebarItem.tsx(8,3): error TS2339: Property 'children' does not exist on type 'SidebarItemProps'.
src/modules/campaigns/components/CampaignCreationModal.tsx(155,12): error TS2322: Type '{ children: string; variant: "ghost"; onClick: () => void; }' is not assignable to type 'ButtonProps'.
  Property 'children' does not exist on type 'ButtonProps'.
src/modules/campaigns/components/CampaignCreationModal.tsx(156,12): error TS2322: Type '{ children: string; type: string; variant: "primary"; leftIcon: any; }' is not assignable to type 'ButtonProps'.
  Property 'children' does not exist on type 'ButtonProps'.
src/modules/campaigns/components/CampaignDecisionContext.tsx(36,32): error TS2322: Type '{ key: string; context: DecisionContext; }' is not assignable to type 'DecisionContextCardProps'.
  Property 'key' does not exist on type 'DecisionContextCardProps'.
src/modules/campaigns/components/CampaignExecutionIntelligence.tsx(52,32): error TS2322: Type '{ key: string; blocker: OperationalBlocker; }' is not assignable to type 'WorkflowBlockerCardProps'.
  Property 'key' does not exist on type 'WorkflowBlockerCardProps'.
src/modules/campaigns/components/CampaignExecutionIntelligence.tsx(55,37): error TS2322: Type '{ key: string; risk: OperationalRisk; }' is not assignable to type 'OperationalRiskIndicatorProps'.
  Property 'key' does not exist on type 'OperationalRiskIndicatorProps'.
src/modules/campaigns/components/CampaignOperationalCommandCenter.tsx(89,36): error TS2322: Type '{ key: string; blocker: OperationalBlocker; }' is not assignable to type 'WorkflowBlockerCardProps'.
  Property 'key' does not exist on type 'WorkflowBlockerCardProps'.
src/modules/campaigns/components/CampaignOperationalCommandCenter.tsx(107,41): error TS2322: Type '{ key: string; risk: OperationalRisk; }' is not assignable to type 'OperationalRiskIndicatorProps'.
  Property 'key' does not exist on type 'OperationalRiskIndicatorProps'.
src/modules/campaigns/components/CampaignOperationalTimeline.tsx(36,30): error TS2322: Type '{ key: string; event: TimelineEvent; isLast: boolean; }' is not assignable to type 'TimelineEventCardProps'.
  Property 'key' does not exist on type 'TimelineEventCardProps'.
src/modules/kanban/components/CampaignKanbanColumn.tsx(56,31): error TS2322: Type '{ key: string; campaign: Campaign; }' is not assignable to type 'CampaignKanbanCardProps'.
  Property 'key' does not exist on type 'CampaignKanbanCardProps'.
src/pages/Kanban.tsx(62,17): error TS2322: Type '{ key: any; column: any; campaigns: any; }' is not assignable to type 'CampaignKanbanColumnProps'.
  Property 'key' does not exist on type 'CampaignKanbanColumnProps'.
```

### Error Groups

| Group | Error count | Root cause | Planned correction |
| ------- | ----------: | ---------- | ------------------ |
| React DOM component props | 15 | `ButtonHTMLAttributes`, `HTMLAttributes`, `ImgHTMLAttributes` and related React types resolved without the official React declaration package, so inherited props such as `className`, `children`, `src`, `alt` and `type` disappeared. | Resolved by adding the approved official React 19 type packages as frontend development dependencies. |
| JSX `key` handling | 9 | The React JSX namespace was unavailable without the official React types, so `key` was incorrectly checked as a normal component prop. | Resolved by restoring the official React JSX declarations. No `key` prop workaround was added. |

### Implementation Plan

1. Confirm that the frontend manifest, lockfile and installed modules do not include `@types/react` or `@types/react-dom`.
2. Add version-compatible official React 19 type packages as development dependencies, without changing TypeScript configuration or component behavior.
3. Re-run frontend and repository quality gates, then manually validate affected shared UI, Kanban and Campaign Workspace routes.

All three steps are complete. The approved dependency exception removed all 24 diagnostics, so no frontend source correction was necessary.

### Implementation Summary

Added only `@types/react@^19` and `@types/react-dom@^19` as approved frontend development dependencies through npm. The lockfile added the selected React type packages and their required `csstype` transitive dependency without changing any existing package version. This restored React HTML prop and JSX `key` typing and removed all 24 original diagnostics. `npm run verify:frontend` passed immediately after installation, so no file under `frontend/src` and no TypeScript configuration was changed.

### Files Changed

* `frontend/package.json`
* `frontend/package-lock.json`
* `tasks/active/TASK-001-restore-frontend-quality-gate.md` (status and execution evidence)

### Type Assertions Introduced

None.

### Validation Results

| Command                   | Result  | Notes |
| ------------------------- | ------- | ----- |
| `npm --prefix frontend install --save-dev @types/react@^19 @types/react-dom@^19` | Passed | Added the two approved devDependencies and `csstype` transitively. npm reported 6 audit findings; no audit fix was run. |
| `npm run verify:frontend` | Passed | `tsc --noEmit` and Vite production build passed before any frontend source edit. All 24 baseline diagnostics were resolved. |
| `npm run verify` | Passed | Diff check, frontend lint/build, backend lint, 32 backend tests and backend build passed. |
| `git diff --check` | Passed | No whitespace errors. Existing line-ending warnings do not fail the command. |
| `git status --short` | Completed | Shows the two authorized frontend dependency files, TASK-001 evidence and pre-existing TASK-000/governance changes. No frontend runtime, TypeScript configuration, backend or Prisma change was introduced. |

### Manual Validation Results

| Route or flow | Result  | Notes |
| ------------- | ------- | ----- |
| Dashboard | Passed | Operations Dashboard rendered with metrics, shared UI components and primary navigation. |
| Campaign List | Passed | Campaign Inventory rendered and exposed 11 campaign links. |
| Kanban | Passed | All workflow columns and 11 campaign links rendered; no body-level horizontal overflow was detected. |
| Calendar | Passed | Month/Week/Day controls, filters and New Campaign action rendered; no body-level horizontal overflow was detected. |
| Primary navigation | Passed | Dashboard, Campaigns, Kanban and Calendar navigation links were exercised successfully. |
| Campaign Details / Workspace success | Passed | Workspace rendered persisted facts for campaign `cmq9jpurv0005n4rkwouyhjhv` with operational command center content. |
| Campaign Workspace error state | Passed | `/campaign/cmp-001` rendered the existing calm `Campaign not found` state because that mock ID is absent from the local database. |
| Campaign Workspace loading state | Not captured | Navigation exercised the loading path, but the local response completed before a visible snapshot could capture the transient message. No runtime source changed. |
| New Campaign modal | Passed | Topbar button opened the Plan Campaign modal with expected controls; Close modal dismissed it. |
| Browser console | Passed | No console errors were recorded during the final Dashboard/modal validation. |

### Acceptance Criteria Results

| Criterion | Result  | Evidence |
| --------- | ------- | -------- |
| AC-01 | Passed | The complete original `npm run verify:frontend` output and all 24 diagnostics remain recorded above. |
| AC-02 | Passed | Frontend TypeScript validation passes. |
| AC-03 | Passed | Vite production build passes. |
| AC-04 | Passed | The global repository quality gate passes, including all 32 backend tests. |
| AC-05 | Passed | No suppression directive, assertion or TypeScript configuration change was introduced. |
| AC-06 | Passed | Required routes and shared UI controls remained functionally equivalent in manual browser validation. No runtime source changed. |
| AC-07 | Passed | No frontend data-source or runtime source file changed. Campaign Details remains backend read-only and other screens remain mock/store-driven. |
| AC-08 | Passed | No backend source, Prisma or backend dependency file changed. |
| AC-09 | Passed | `@types/react@^19.2.17` and `@types/react-dom@^19.2.3` are declared under frontend `devDependencies`. |
| AC-10 | Passed | Manifest/lockfile review shows only the two authorized direct devDependencies and required `csstype` transitive package were added; no existing dependency version changed. |
| AC-11 | Passed | All React HTML prop and JSX `key` diagnostics disappeared without local declarations or prop workarounds. |

### Remaining Warnings

* Vite reports the existing non-failing production chunk-size warning: the main JavaScript bundle is 841.61 kB before gzip and exceeds 500 kB.
* npm installation reports 6 audit findings (2 low, 1 moderate and 3 high). They were not changed or auto-fixed because audit remediation is outside this task.
* `git diff --check` reports only non-failing line-ending conversion warnings for existing working-tree files.

### Remaining Limitations

* The transient Campaign Workspace loading message was not captured visually because the local response completed immediately; successful and not-found Workspace states were validated.
* The mock campaign ID `cmp-001` is not present in the local backend database, so a persisted campaign ID was used to validate the successful Workspace route.
* No frontend test framework exists; validation remains TypeScript, production build, global backend tests and targeted browser checks.

### TASK-000 Unblocking Recommendation

TASK-000 can now be re-evaluated because `npm run verify` passes. TASK-000 was not modified during this task; its SHA-256 remained `BD7342C481A69AA2C70B7716BD53E10B01164607A9CB81BB39F758D78821F730` before and after TASK-001 execution.
