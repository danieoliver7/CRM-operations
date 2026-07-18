# CRM Operations Platform - Agent Instructions

## Project context

This project is a CRM operations management platform.

The product supports the campaign lifecycle:

Planning -> Copy -> Approval -> Development -> QA -> Scheduling -> Sending -> Analytics.

Current stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Frontend-only MVP
- No backend unless explicitly requested
- Campaign data currently lives in the global application store

## Sources of truth

Before implementing a task, read the relevant files in:

- docs/architecture.md
- docs/state-models.md
- docs/component-guidelines.md
- docs/naming-conventions.md
- docs/backlog.md
- docs/release-notes.md

The active task file is the source of truth for scope and acceptance criteria.

## Mandatory execution loop

For every implementation task:

1. Read the complete task.
2. Inspect the affected code before editing.
3. Identify the smallest safe implementation.
4. Create or update tests when applicable.
5. Implement the change.
6. Run the required validation commands.
7. If validation fails, investigate and fix the failure.
8. Repeat validation until it passes.
9. Review the final diff for regressions and unnecessary changes.
10. Update the task status and relevant documentation.

Do not report completion while required validation is failing.

## Scope control

- Do not implement unrelated features.
- Do not refactor unrelated components.
- Do not add a backend unless explicitly required.
- Do not replace the current design system.
- Do not introduce new dependencies unless necessary.
- Prefer existing components, utilities and state patterns.
- Keep changes small and reviewable.

## State management rules

- Zustand is the current source of truth for campaign state.
- Components must not maintain duplicated campaign collections.
- Different campaign creation buttons must use the same action and state flow.
- State mutations must happen through store actions.
- Generated IDs must be unique and stable.
- Persistence logic must remain separate from presentation components.

## UI rules

- Preserve the existing design language.
- Reuse existing buttons, cards, badges and modal components.
- Every interactive element must have a visible result.
- Empty, loading and error states must be considered.
- Do not redesign screens unless the task explicitly requests it.

## Validation

Run the available project commands:

- npm run lint
- npm run typecheck
- npm run test
- npm run build

When a command does not exist, inspect package.json and use the equivalent command.

For critical UI flows, execute the available end-to-end or browser validation.

## Definition of done

A task is complete only when:

- All acceptance criteria are satisfied.
- Required validations pass.
- No unrelated files were changed.
- The implementation follows the existing architecture.
- Relevant documentation was updated.
- Remaining limitations are explicitly documented.

## Stop conditions

Stop and report a blocker instead of guessing when:

- A product decision materially changes the expected behavior.
- The task requires destructive data changes.
- Credentials or production secrets are required.
- Two sources of truth directly contradict each other.
- The requested work is outside the defined task scope.

Do not commit, push or open a pull request unless explicitly instructed.
