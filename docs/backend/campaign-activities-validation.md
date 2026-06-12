# Campaign Activities Validation

## Purpose

This document defines validation rules for the Campaign Activities Implementation sprint.

It should be used after implementing Campaign Activities APIs.

---

# Validation Goal

Validate that Campaign activities can be created and read through simple REST endpoints backed by Prisma/PostgreSQL.

This sprint should validate meaningful operational event persistence without creating Handoffs, Campaign Workspace, timeline generation or event sourcing.

---

# Pre-Validation Requirements

Before testing endpoints, confirm:

- local `backend/.env` exists and is not committed
- `DATABASE_URL` points to local PostgreSQL
- migration has been applied
- seed has been run
- at least one Campaign exists or can be created
- reference users exist if testing actorId
- Campaign APIs still work
- Blockers API still work
- Notes API still work
- Decision Context API still work

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
```

---

# Required Activities Endpoint Validation

Validate:

```txt
GET /campaigns/:campaignId/activities
POST /campaigns/:campaignId/activities
```

---

# Expected Activities Behavior

## GET /campaigns/:campaignId/activities

- returns list response
- validates campaign exists
- returns only activities for that campaign
- does not include timeline presentation
- does not include derived intelligence
- does not include audit/replay metadata
- does not include notification state
- does not include AI output

## POST /campaigns/:campaignId/activities

- creates activity for existing campaign
- validates campaign exists
- validates actorId if provided
- requires `type` and `message`
- accepts optional `category`, `metadata` and supported related references
- rejects `title`, `description` and `occurredAt` because the current schema does not persist them separately
- rejects invalid campaignId
- rejects invalid actorId
- validates related references if accepted by the request contract
- stores accepted related references in existing activity metadata
- does not create timeline event
- does not create note
- does not create decision context
- does not create handoff
- does not trigger workflow transition
- does not create notification

---

# Required Error Validation

Validate:

- missing campaign returns CAMPAIGN_NOT_FOUND
- invalid actorId returns USER_NOT_FOUND
- invalid payload returns INVALID_ACTIVITY_INPUT

If related references are implemented, validate:

- invalid relatedBlockerId returns BLOCKER_NOT_FOUND
- invalid relatedNoteId returns NOTE_NOT_FOUND
- invalid relatedDecisionContextId returns DECISION_CONTEXT_NOT_FOUND
- invalid relatedHandoffId returns HANDOFF_NOT_FOUND

Only validate related references that are actually implemented.

---

# Repository Safety Validation

Confirm no forbidden files or features were added:

- no Handoffs API
- no Campaign Workspace endpoint
- no frontend API client
- no frontend mappers
- no auth
- no RBAC
- no Docker
- no workflow engine
- no event sourcing
- no CQRS
- no projections
- no event replay
- no timeline engine
- no realtime
- no notification engine
- no audit log framework
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
- aggregateVersion
- eventSequence
- replayCursor
- projectionVersion
- notificationStatus
- AI summary fields
- Copilot fields
- auth fields

Activities may persist meaningful operational facts only.

---

# Prisma Usage Validation

Confirm Activities service uses Prisma directly and simply.

Reject:

- repository abstraction layer
- unit of work abstraction
- domain event bus
- custom ORM layer
- event sourcing framework
- audit log framework
- projection layer
- workflow runtime
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
- event sourcing concepts
- audit log concepts
- notification concepts
- AI concepts
- raw Prisma internals

---

# Success Criteria

This sprint succeeds if:

- activity endpoints work
- activities are campaign-scoped
- activities are persisted in PostgreSQL through Prisma
- campaign existence is validated
- actor user reference is validated when provided
- accepted related references are validated when provided
- existing health/reference/campaign/blocker/note/decision-context endpoints still work
- backend validation passes
- frontend validation passes
- Handoffs remain deferred
- Campaign Workspace endpoint remains deferred
- auth remains deferred
- frontend integration remains deferred
- timeline generation remains deferred
- event sourcing remains absent
- AI remains deferred

---

# Failure Criteria

This sprint fails if it introduces:

- event sourcing behavior
- audit log platform behavior
- activity replay behavior
- timeline backend behavior
- notification feed behavior
- automatic activity creation from other resources
- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- authentication
- RBAC
- workflow engine
- derived intelligence persistence
- AI implementation
- Docker/CI complexity

---

# Final Principle

Campaign Activities validation proves meaningful operational events can become durable facts.

It does not prove the full Campaign Workspace backend yet.
