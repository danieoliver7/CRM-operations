# Campaign Handoffs Validation

## Purpose

This document defines validation rules for the Campaign Handoffs Implementation sprint.

It should be used after implementing Campaign Handoffs APIs.

---

# Validation Goal

Validate that Campaign handoffs can be created, read, updated, completed and cancelled through simple REST endpoints backed by Prisma/PostgreSQL.

This sprint should validate lightweight operational transition persistence without creating Campaign Workspace, workflow engine, dependency graph or automation.

---

# Pre-Validation Requirements

Before testing endpoints, confirm:

- local `backend/.env` exists and is not committed
- `DATABASE_URL` points to local PostgreSQL
- migration has been applied
- seed has been run
- at least one Campaign exists or can be created
- reference users exist if testing user references
- reference squads exist if testing squad references
- Campaign APIs still work
- Blockers API still work
- Notes API still work
- Decision Context API still work
- Activities API still work

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
```

---

# Required Handoffs Endpoint Validation

Validate:

```txt
GET /campaigns/:campaignId/handoffs
POST /campaigns/:campaignId/handoffs
PATCH /campaigns/:campaignId/handoffs/:handoffId
POST /campaigns/:campaignId/handoffs/:handoffId/complete
POST /campaigns/:campaignId/handoffs/:handoffId/cancel
```

---

# Expected Handoffs Behavior

## GET /campaigns/:campaignId/handoffs

- returns list response
- validates campaign exists
- returns only handoffs for that campaign
- does not include workflow graph
- does not include derived workflow continuity
- does not include timeline presentation
- does not include task/dependency graph data
- does not include AI output

## POST /campaigns/:campaignId/handoffs

- creates handoff for existing campaign
- validates campaign exists
- validates user references if provided
- validates squad references if provided
- rejects invalid campaignId
- rejects invalid user reference
- rejects invalid squad reference
- does not change Campaign status
- does not create activity
- does not create timeline event
- does not create notification

## PATCH /campaigns/:campaignId/handoffs/:handoffId

- updates handoff facts
- validates campaign exists
- validates handoff belongs to campaign
- validates user references if provided
- validates squad references if provided
- does not allow moving handoff to another campaign
- does not complete handoff through generic PATCH
- does not cancel handoff through generic PATCH
- does not change Campaign status automatically

## POST /campaigns/:campaignId/handoffs/:handoffId/complete

- validates campaign exists
- validates handoff belongs to campaign
- marks handoff as completed
- sets completed facts supported by schema
- rejects `completedById` and `notes` because the current schema does not persist them
- does not change Campaign status automatically
- does not create activity automatically
- does not create timeline event automatically

## POST /campaigns/:campaignId/handoffs/:handoffId/cancel

- validates campaign exists
- validates handoff belongs to campaign
- marks handoff as cancelled
- sets cancellation facts supported by schema
- accepts `reason` because the current schema persists it
- rejects `cancelledById` because the current schema does not persist it
- does not change Campaign status automatically
- does not create activity automatically
- does not create timeline event automatically

---

# Required Error Validation

Validate:

- missing campaign returns CAMPAIGN_NOT_FOUND
- missing handoff returns HANDOFF_NOT_FOUND
- handoff from another campaign returns HANDOFF_NOT_FOUND
- invalid user reference returns USER_NOT_FOUND
- invalid squad reference returns SQUAD_NOT_FOUND
- invalid payload returns INVALID_HANDOFF_INPUT
- invalid complete request returns INVALID_HANDOFF_INPUT
- invalid cancel request returns INVALID_HANDOFF_INPUT

Only validate references that are actually accepted by this sprint.

---

# Repository Safety Validation

Confirm no forbidden files or features were added:

- no Campaign Workspace endpoint
- no frontend API client
- no frontend mappers
- no auth
- no RBAC
- no Docker
- no workflow engine
- no dependency graph
- no BPM engine
- no orchestration layer
- no automatic activity creation
- no timeline engine
- no realtime
- no notification engine
- no task management system
- no approval workflow
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
- dependencyGraph
- workflowRuntimeState
- orchestrationState
- taskTree
- approvalState
- escalationState
- notificationStatus
- AI summary fields
- Copilot fields
- auth fields

Handoffs may persist lightweight operational transition facts only.

---

# Prisma Usage Validation

Confirm Handoffs service uses Prisma directly and simply.

Reject:

- repository abstraction layer
- unit of work abstraction
- domain event bus
- custom ORM layer
- workflow engine
- dependency graph engine
- BPM runtime
- orchestration layer
- state machine engine
- task engine
- timeline engine
- notification system
- AI system

---

# Response Contract Validation

Confirm responses follow:

- `ListResponse<T>`
- `DetailResponse<T>`
- simple error response shape

Confirm DTOs do not expose:

- derived operational intelligence
- workflow engine concepts
- dependency graph concepts
- task system concepts
- notification concepts
- AI concepts
- raw Prisma internals

---

# Success Criteria

This sprint succeeds if:

- handoff endpoints work
- handoffs are campaign-scoped
- handoffs are persisted in PostgreSQL through Prisma
- campaign existence is validated
- handoff ownership by campaign is validated
- user references are validated when provided
- squad references are validated when provided
- complete and cancel endpoints work
- existing health/reference/campaign/blocker/note/decision-context/activity endpoints still work
- backend validation passes
- frontend validation passes
- Campaign Workspace endpoint remains deferred
- auth remains deferred
- frontend integration remains deferred
- workflow engine remains absent
- dependency graph remains absent
- automatic activity creation remains absent
- timeline generation remains deferred
- AI remains deferred

---

# Failure Criteria

This sprint fails if it introduces:

- workflow engine behavior
- dependency graph behavior
- BPM behavior
- orchestration behavior
- task management behavior
- automatic Campaign status transitions
- automatic activity creation from handoffs
- timeline backend behavior
- notification feed behavior
- Campaign Workspace endpoint
- frontend API client
- authentication
- RBAC
- derived intelligence persistence
- AI implementation
- Docker/CI complexity

---

# Final Principle

Campaign Handoffs validation proves lightweight operational transitions can become durable facts.

It does not prove the full Campaign Workspace backend yet.
