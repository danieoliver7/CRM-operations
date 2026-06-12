# Campaign Decision Context Validation

## Purpose

This document defines validation rules for the Campaign Decision Context Implementation sprint.

It should be used after implementing Campaign Decision Context APIs.

---

# Validation Goal

Validate that Campaign decision context can be created, read and updated through simple REST endpoints backed by Prisma/PostgreSQL.

This sprint should validate operational reasoning persistence without creating Activities, Handoffs or Campaign Workspace.

---

# Pre-Validation Requirements

Before testing endpoints, confirm:

- local `backend/.env` exists and is not committed
- `DATABASE_URL` points to local PostgreSQL
- migration has been applied
- seed has been run
- at least one Campaign exists or can be created
- reference users exist if testing authorId
- Campaign APIs still work
- Blockers API still work
- Notes API still work

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
```

---

# Required Decision Context Endpoint Validation

Validate:

```txt
GET /campaigns/:campaignId/decision-context
POST /campaigns/:campaignId/decision-context
PATCH /campaigns/:campaignId/decision-context/:decisionContextId
```

---

# Expected Decision Context Behavior

## GET /campaigns/:campaignId/decision-context

- returns list response
- validates campaign exists
- returns only decision context for that campaign
- does not include comments/thread data
- does not include approvals
- does not include derived intelligence
- does not include timeline presentation
- does not include AI output

## POST /campaigns/:campaignId/decision-context

- creates decision context for existing campaign
- validates campaign exists
- validates authorId if provided
- rejects invalid campaignId
- rejects invalid authorId
- validates related references if accepted by the request contract
- does not create activity
- does not create timeline event
- does not create note
- does not create approval
- does not create notification

## PATCH /campaigns/:campaignId/decision-context/:decisionContextId

- updates decision context facts
- validates campaign exists
- validates decision context belongs to campaign
- does not allow moving decision context to another campaign
- does not create activity
- does not create timeline event
- does not create note
- does not create approval

---

# Required Error Validation

Validate:

- missing campaign returns CAMPAIGN_NOT_FOUND
- missing decision context returns DECISION_CONTEXT_NOT_FOUND
- decision context from another campaign returns DECISION_CONTEXT_NOT_FOUND
- invalid authorId returns USER_NOT_FOUND
- invalid payload returns INVALID_DECISION_CONTEXT_INPUT

If related references are implemented, validate:

- invalid relatedBlockerId returns BLOCKER_NOT_FOUND
- invalid relatedActivityId returns ACTIVITY_NOT_FOUND
- invalid relatedHandoffId returns HANDOFF_NOT_FOUND

Only validate related references that are actually implemented.

---

# Repository Safety Validation

Confirm no forbidden files or features were added:

- no Activities API
- no Handoffs API
- no Campaign Workspace endpoint
- no frontend API client
- no frontend mappers
- no auth
- no RBAC
- no Docker
- no workflow engine
- no event sourcing
- no realtime
- no notification engine
- no approval workflow
- no comment engine
- no knowledge base engine
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
- replies
- mentions
- thread fields
- reaction fields
- approval fields
- sign-off fields
- knowledge base hierarchy fields
- AI summary fields
- Copilot fields
- auth fields

Decision Context may persist facts and rationale only.

---

# Prisma Usage Validation

Confirm Decision Context service uses Prisma directly and simply.

Reject:

- repository abstraction layer
- unit of work abstraction
- domain event bus
- custom ORM layer
- complex query orchestration
- workflow runtime
- approval framework
- comment system
- knowledge base system
- AI system

---

# Response Contract Validation

Confirm responses follow:

- `ListResponse<T>`
- `DetailResponse<T>`
- simple error response shape

Confirm DTOs do not expose:

- derived operational intelligence
- comment/chat concepts
- approval concepts
- AI concepts
- raw Prisma internals

---

# Success Criteria

This sprint succeeds if:

- decision context endpoints work
- decision context is campaign-scoped
- decision context is persisted in PostgreSQL through Prisma
- campaign existence is validated
- decision context ownership by campaign is validated
- author user reference is validated when provided
- existing health/reference/campaign/blocker/note endpoints still work
- backend validation passes
- frontend validation passes
- Activities remain deferred
- Handoffs remain deferred
- Campaign Workspace endpoint remains deferred
- auth remains deferred
- frontend integration remains deferred
- AI remains deferred

---

# Failure Criteria

This sprint fails if it introduces:

- comment system behavior
- approval workflow behavior
- knowledge base behavior
- Activities API
- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- authentication
- RBAC
- workflow engine
- event sourcing
- derived intelligence persistence
- AI implementation
- Docker/CI complexity

---

# Final Principle

Campaign Decision Context validation proves operational reasoning can become durable facts.

It does not prove the full Campaign Workspace backend yet.