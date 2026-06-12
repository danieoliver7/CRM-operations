# Campaign Activities Implementation

## Purpose

This document defines the Campaign Activities Implementation sprint.

This sprint implements the fourth Campaign child resource.

It introduces campaign-scoped activities as persisted meaningful operational events.

It does not implement Handoffs.

It does not implement Campaign Workspace endpoint.

It does not implement frontend integration.

It does not implement auth.

It does not implement event sourcing.

It does not implement automatic timeline generation.

It does not implement AI.

---

# Current Phase

Campaign Activities Implementation

The project already has:

- NestJS backend runtime
- Prisma/PostgreSQL persistence foundation
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API
- Campaign Notes API
- Campaign Decision Context API
- Campaign Activities API
- Campaign Child Resources Planning validated
- future Operational Copilot vision documented as non-MVP scope

The current backend cut implements campaign-scoped activities.

---

# Sprint Goal

Implement simple backend APIs for Campaign Activities:

- list activities for a campaign
- create an activity for a campaign

The goal is to persist meaningful operational activity facts without turning Activities into event sourcing, audit logging, notifications, workflow orchestration or timeline backend behavior.

---

# Why Activities Come After Decision Context

Blockers explain impediments.

Notes preserve lightweight memory.

Decision Context preserves operational reasoning.

Activities preserve meaningful operational events.

Activities help answer:

- what happened
- when it happened
- who acted
- what operational movement occurred
- which fact changed the campaign story

Activities are useful for future Campaign Workspace and Timeline composition, but they must stay small and controlled.

---

# Approved Scope

This sprint may create:

- ActivitiesModule
- ActivitiesController
- ActivitiesService
- Activity DTOs
- Activity request DTOs/helpers
- Activity response mapper
- tests for DTO/request/mapper/service behavior if practical

---

# Allowed Endpoints

Allowed endpoints:

```txt
GET /campaigns/:campaignId/activities
POST /campaigns/:campaignId/activities
```

Do not create any other Activities endpoints in this sprint.

Do not create PATCH activity endpoint.

Do not create DELETE activity endpoint.

Do not create activity replay, activity stream, audit log or event sourcing endpoints.

---

# Endpoint Intent

## GET /campaigns/:campaignId/activities

Returns activities scoped to a Campaign.

Must validate Campaign exists.

Should return records ordered by most recent first if simple.

Should not return timeline presentation events.

Should not return derived intelligence.

Should not return notification feed behavior.

---

## POST /campaigns/:campaignId/activities

Creates a meaningful operational activity for an existing Campaign.

Must validate Campaign exists.

If `actorId` or equivalent actor user reference is provided, it must validate User exists.

If related references are provided, they must be validated only if the schema and existing implementation support it safely.

Should not create timeline events automatically.

Should not create notes automatically.

Should not create decision context automatically.

Should not create handoffs automatically.

Should not trigger workflow transitions.

---

# Activity Facts

Activity APIs may expose facts such as:

- id
- campaignId
- actorId
- type
- category
- message
- metadata
- relatedBlockerId
- relatedNoteId
- relatedDecisionContextId
- relatedHandoffId
- createdAt
- updatedAt

Use only fields supported by the current Prisma schema.

Do not alter schema unless there is a blocking mismatch.

Current implementation note:

- `actorUserId` maps to public `actorId`
- `message` is the persisted activity message
- `metadata` is the existing flexible activity fact container
- related references are validated directly through Prisma and stored in `metadata`
- `occurredAt`, `title` and `description` are not accepted because the current schema does not persist them separately

---

# What Activities Must Not Become

Activities must not become:

- event sourcing
- audit log platform
- append-only reconstruction system
- notification feed
- workflow engine
- orchestration engine
- automatic log of every backend write
- technical debugging log
- analytics event stream
- timeline presentation backend
- AI memory engine

Activities are only campaign-scoped meaningful operational events.

---

# Activities Versus Timeline

Activities are persisted operational facts.

Timeline is a future presentation layer that may use activities plus other facts.

Do not implement timeline generation in this sprint.

Do not return timeline events from Activities API.

Do not persist timeline presentation fields in Activities.

The current principle remains:

```txt
Persist facts.
Derive intelligence.
Derive presentation.
```

---

# Activities Versus Event Sourcing

Activities are not event sourcing.

Do not use Activities to reconstruct current Campaign state.

Do not replay Activities to calculate state.

Do not create event versioning.

Do not create event handlers.

Do not create domain event bus.

Do not create projections.

Do not create CQRS.

Campaign state remains stored directly in Campaign facts.

Activities only help explain meaningful operational movement.

---

# Activity Creation Rule

This sprint implements manual/direct Activity creation only through the Activities API.

Do not automatically create activities from:

- Campaign create/update
- status changes
- priority changes
- owner changes
- squad changes
- blocker creation
- blocker resolution
- note creation
- note update
- decision context creation
- decision context update
- future handoff creation

Automatic activity creation may be evaluated later.

---

# Reference Validation Rule

Activity writes must validate references.

Required:

- campaignId must exist
- actorId must exist if provided

Optional related references may be validated only if safely supported by current schema and modules:

- relatedBlockerId
- relatedNoteId
- relatedDecisionContextId
- relatedHandoffId

Do not create referenced records automatically.

Expected errors:

- CAMPAIGN_NOT_FOUND
- USER_NOT_FOUND
- BLOCKER_NOT_FOUND
- NOTE_NOT_FOUND
- DECISION_CONTEXT_NOT_FOUND
- HANDOFF_NOT_FOUND
- INVALID_ACTIVITY_INPUT

Only implement optional related-reference errors if those references are actually accepted by the API.

---

# Prisma Usage Rule

ActivitiesService may use PrismaService directly and simply.

Allowed:

- findMany
- create
- simple select
- simple orderBy
- simple where clauses

Avoid:

- repository abstraction
- unit of work
- domain event bus
- event sourcing framework
- audit log framework
- workflow orchestration
- notification engine
- timeline engine
- generic CRUD framework

---

# Response Shape Rule

Responses should align with:

- `/docs/contracts/api-response-shapes.md`
- `/docs/backend/campaign-activities-api-contract.md`

Preferred response style:

```ts
type DetailResponse<T> = {
  data: T;
};

type ListResponse<T> = {
  data: T[];
};
```

Do not expose raw Prisma internals.

---

# Operational Copilot Future Rule

Activities may be useful for a future CRM Operations Copilot.

However, this sprint must not implement AI.

Do not create:

- embeddings
- vector database
- semantic search
- AI summaries
- Copilot insights
- prompt engine
- OpenAI API integration
- agent runtime

The only AI-ready implication is to keep activities clean, explicit, semantic and campaign-scoped.

---

# What This Sprint Must Not Implement

Do not implement:

- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- frontend mappers
- auth
- RBAC
- Docker
- realtime
- notification engine
- workflow engine
- event sourcing
- audit log platform
- activity replay
- timeline generation
- AI features

---

# Success Criteria

This sprint succeeds if:

- activities can be listed by campaign
- activity can be created for an existing campaign
- campaign existence is validated
- actor user reference is validated when provided
- accepted related references are validated when provided
- backend validation passes
- frontend validation passes
- Blockers API remains working
- Notes API remains working
- Decision Context API remains working
- Campaign APIs remain working
- no Handoffs API is created
- no Campaign Workspace endpoint is created
- no frontend integration is created
- no auth is created
- no event sourcing is created
- no timeline generation is created
- no AI behavior is created

---

# Final Principle

Campaign Activities Implementation should make meaningful operational events durable.

It should not turn CRM Operations Platform into event sourcing, audit logs, workflow orchestration or notification software.
