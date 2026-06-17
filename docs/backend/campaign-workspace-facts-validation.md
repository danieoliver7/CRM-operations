# Campaign Workspace Facts Endpoint Validation

## Purpose

This document defines validation rules for the Campaign Workspace Facts Endpoint sprint.

It should be used after implementing:

```txt
GET /campaigns/:campaignId/workspace
```

---

# Validation Goal

Validate that Campaign Workspace can load composed persisted facts through one backend endpoint.

This sprint validates composition only.

It must not validate frontend integration, derived intelligence, timeline generation, command center logic or AI behavior.

---

# Pre-Validation Requirements

Before testing the endpoint, confirm:

- local `backend/.env` exists and is not committed
- `DATABASE_URL` points to local PostgreSQL
- migration has been applied
- seed has been run
- at least one Campaign exists or can be created
- existing child resource APIs work
- reference users and squads exist if testing owner/squad composition

---

# Required Backend Commands

Run from `/backend`:

```bash
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run test
npm run build
```

If needed:

```bash
npx prisma migrate dev
npm run prisma:seed
```

---

# Required Frontend Commands

Run from `/frontend`:

```bash
npm run lint
npm run build
```

Frontend should remain unaffected.

Do not modify frontend runtime code.

---

# Required Existing Endpoint Validation

Validate existing endpoints still work:

```txt
GET /health
GET /workspaces
GET /users
GET /squads
GET /campaigns
GET /campaigns/:campaignId
GET /campaigns/:campaignId/blockers
GET /campaigns/:campaignId/notes
GET /campaigns/:campaignId/decision-context
GET /campaigns/:campaignId/activities
GET /campaigns/:campaignId/handoffs
```

---

# Required Workspace Endpoint Validation

Validate:

```txt
GET /campaigns/:campaignId/workspace
```

---

# Expected Workspace Behavior

## GET /campaigns/:campaignId/workspace

Should:

- return `{ data: {...} }`
- validate Campaign exists
- return Campaign DTO
- return owner reference DTO or null
- return squad reference DTO or null
- return blockers array
- return notes array
- return decisionContext array
- return activities array
- return handoffs array
- return empty arrays when no child resources exist
- preserve existing DTO mappings
- avoid raw Prisma internals

Should not:

- calculate execution health
- calculate operational risk
- calculate coordination state
- calculate workflow continuity
- return command center summary
- return timeline presentation
- return dashboard warnings
- return AI output
- create or update any records

---

# Required Error Validation

Validate:

- missing campaign returns CAMPAIGN_NOT_FOUND
- empty child resource lists return empty arrays, not errors

No new child-resource-specific errors should appear for empty lists.

---

# Composition Validation

Create or use a campaign with:

- at least one blocker
- at least one note
- at least one decision context record
- at least one activity
- at least one handoff

Then validate that the workspace response includes all corresponding facts.

Also validate a campaign with no child resources and confirm arrays are empty.

---

# Repository Safety Validation

Confirm no forbidden files or features were added:

- no frontend API client
- no frontend mappers
- no auth
- no RBAC
- no Docker
- no workflow engine
- no dependency graph
- no timeline engine
- no command center engine
- no derived intelligence service
- no notification engine
- no automatic activity creation
- no AI provider
- no embeddings
- no semantic search

---

# Schema Safety Validation

Confirm the sprint did not alter schema to add:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- progress
- slaLabel
- planningPressure
- ownerPressure
- squadPressure
- nextBestAction
- recommendedAction
- AI summary fields
- Copilot fields
- auth fields

Workspace endpoint should compose facts only.

---

# Prisma Usage Validation

Confirm CampaignWorkspaceService uses Prisma directly and simply.

Reject:

- repository abstraction layer
- unit of work abstraction
- domain event bus
- custom ORM layer
- intelligence engine
- timeline engine
- command center engine
- workflow runtime
- AI system
- cache layer
- Redis
- query framework

---

# Response Contract Validation

Confirm response follows:

```ts
type DetailResponse<T> = {
  data: T;
};
```

Confirm DTO contains:

- campaign
- owner
- squad
- blockers
- notes
- decisionContext
- activities
- handoffs

Confirm DTO does not contain:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- AI summary
- raw Prisma internals

---

# Success Criteria

This sprint succeeds if:

- workspace endpoint works
- campaign existence is validated
- campaign facts are returned
- owner/squad reference facts are returned or null
- all child fact arrays are returned
- empty child resources return empty arrays
- existing health/reference/campaign/child APIs still work
- backend validation passes
- frontend validation passes
- no frontend integration is implemented
- no derived intelligence is returned
- no timeline generation is implemented
- no command center logic is implemented
- no AI behavior is implemented

---

# Failure Criteria

This sprint fails if it introduces:

- frontend API client
- frontend mock replacement
- auth
- RBAC
- workflow engine
- dependency graph
- timeline backend behavior
- command center backend behavior
- derived intelligence persistence
- automatic activity creation
- notification behavior
- AI implementation
- Docker/CI complexity

---

# Final Principle

Campaign Workspace Facts validation proves the backend can compose operational facts.

It does not prove backend intelligence, frontend integration or Campaign Workspace UI migration.