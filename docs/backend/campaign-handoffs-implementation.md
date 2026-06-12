# Campaign Handoffs Implementation

## Purpose

This document defines the Campaign Handoffs Implementation sprint.

This sprint implements the fifth Campaign child resource.

It introduces campaign-scoped handoffs as persisted lightweight operational transitions.

It does not implement Campaign Workspace endpoint.

It does not implement frontend integration.

It does not implement auth.

It does not implement workflow engine.

It does not implement dependency graph.

It does not implement BPM.

It does not implement automatic activity creation.

It does not implement AI.

---

# Current Phase

Campaign Handoffs Implementation

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

The next backend cut is to implement campaign-scoped handoffs.

---

# Sprint Goal

Implement simple backend APIs for Campaign Handoffs:

- list handoffs for a campaign
- create a handoff for a campaign
- update handoff facts
- complete a handoff
- cancel a handoff

The goal is to persist lightweight operational transitions without turning Handoffs into workflow engine, task management, dependency graph or orchestration behavior.

---

# Why Handoffs Come After Activities

Blockers explain impediments.

Notes preserve lightweight memory.

Decision Context preserves operational reasoning.

Activities preserve meaningful operational events.

Handoffs preserve coordination transitions.

Handoffs help answer:

- who needs to act next
- which area is receiving work
- what workflow transition is waiting
- where coordination may stall
- when responsibility changed
- why a campaign is waiting for another squad/person

Handoffs are useful for future Campaign Workspace and Workflow Continuity composition, but they must stay small and controlled.

---

# Approved Scope

This sprint may create:

- HandoffsModule
- HandoffsController
- HandoffsService
- Handoff DTOs
- Handoff request DTOs/helpers
- Handoff response mapper
- tests for DTO/request/mapper/service behavior if practical

---

# Allowed Endpoints

Allowed endpoints:

```txt
GET /campaigns/:campaignId/handoffs
POST /campaigns/:campaignId/handoffs
PATCH /campaigns/:campaignId/handoffs/:handoffId
POST /campaigns/:campaignId/handoffs/:handoffId/complete
POST /campaigns/:campaignId/handoffs/:handoffId/cancel
```

Do not create any other Handoffs endpoints in this sprint.

Do not create global handoff endpoints.

Do not create workflow engine endpoints.

Do not create dependency graph endpoints.

---

# Endpoint Intent

## GET /campaigns/:campaignId/handoffs

Returns handoffs scoped to a Campaign.

Must validate Campaign exists.

Should return records ordered by most recent first if simple.

Should not return workflow graph.

Should not return derived workflow continuity.

Should not return task board behavior.

---

## POST /campaigns/:campaignId/handoffs

Creates a lightweight handoff for an existing Campaign.

Must validate Campaign exists.

If user references are provided, they must validate User exists.

If squad references are provided, they must validate Squad exists.

Should not create activity records automatically.

Should not create timeline events automatically.

Should not change Campaign status automatically.

Should not trigger workflow transitions.

---

## PATCH /campaigns/:campaignId/handoffs/:handoffId

Updates handoff facts.

Must validate Campaign exists.

Must validate handoff belongs to the Campaign.

Should not allow moving handoff to another campaign.

Should not complete or cancel the handoff unless explicitly requested through the dedicated complete/cancel endpoints.

---

## POST /campaigns/:campaignId/handoffs/:handoffId/complete

Marks a handoff as completed.

Must validate Campaign exists.

Must validate handoff belongs to Campaign.

Should set completion facts supported by the schema.

The current schema does not persist `completedById` or completion notes, so this endpoint does not accept those fields.

Should not automatically change Campaign status.

Should not automatically create activity.

Should not automatically create timeline event.

---

## POST /campaigns/:campaignId/handoffs/:handoffId/cancel

Marks a handoff as cancelled.

Must validate Campaign exists.

Must validate handoff belongs to Campaign.

Should set cancellation facts supported by the schema.

The current schema does not persist `cancelledById`, so this endpoint does not accept that field.

Should not automatically change Campaign status.

Should not automatically create activity.

Should not automatically create timeline event.

---

# Handoff Facts

Handoff APIs may expose facts such as:

- id
- campaignId
- status
- fromStage
- toStage
- fromOwnerId
- toOwnerId
- fromSquadId
- toSquadId
- reason
- completedAt
- cancelledAt
- createdAt
- updatedAt

Use only fields supported by the current Prisma schema.

Do not alter schema unless there is a blocking mismatch.

If the current schema uses different field names, map internal persistence fields to clean API DTO fields.

Current implementation note:

- `requestedById`, `completedById`, `cancelledById`, `notes` and `dueAt` are not accepted because the current schema does not persist them.
- created handoffs require at least one destination: `toStage`, `toOwnerId` or `toSquadId`.
- complete/cancel endpoints update only `status`, timestamps and cancel `reason` where supported.

---

# What Handoffs Must Not Become

Handoffs must not become:

- workflow engine
- dependency graph
- BPM software
- task management system
- approval flow
- orchestration engine
- automation runtime
- state machine runtime
- assignment engine
- notification engine
- SLA engine
- AI planner

Handoffs are only campaign-scoped lightweight operational transitions.

---

# Handoffs Versus Workflow

Workflow is operational guidance.

Handoff is a persisted transition fact.

A handoff may represent:

- briefing to copy
- copy to approval
- approval to development
- development to QA
- QA to scheduling
- CRM to media
- media to CRM
- squad to squad
- owner to owner

Do not use Handoffs to enforce workflow progression.

Do not automatically move Campaign status when a handoff is created, completed or cancelled.

Do not create workflow rules engine.

---

# Handoffs Versus Activities

Activities preserve meaningful operational events.

Handoffs preserve coordination transitions.

A handoff may later be represented as an activity or timeline item, but not in this sprint.

Do not automatically create activities from handoff operations in this sprint.

Activity automation may be evaluated later.

---

# Handoffs Versus Timeline

Handoffs are persisted facts.

Timeline is a future presentation layer.

Do not implement timeline generation in this sprint.

Do not return timeline events from Handoffs API.

Do not persist timeline presentation fields in Handoffs.

---

# Handoff Status Rule

Handoff status should remain simple.

Allowed status direction should follow current schema.

Typical conceptual states:

- pending
- completed
- cancelled

Do not introduce complex state machines.

Do not introduce multi-step approval status.

Do not introduce blocked/escalated/delegated workflows unless already supported by schema and explicitly required.

---

# Reference Validation Rule

Handoff writes must validate references.

Required:

- campaignId must exist
- handoffId must belong to campaignId

Optional references should be validated if provided and supported by schema:

- fromOwnerId
- toOwnerId
- fromSquadId
- toSquadId

Do not create referenced records automatically.

Expected errors:

- CAMPAIGN_NOT_FOUND
- HANDOFF_NOT_FOUND
- USER_NOT_FOUND
- SQUAD_NOT_FOUND
- INVALID_HANDOFF_INPUT

Only implement optional reference errors for references actually accepted by the API.

---

# Prisma Usage Rule

HandoffsService may use PrismaService directly and simply.

Allowed:

- findMany
- findUnique
- create
- update
- simple select
- simple orderBy
- simple where clauses
- simple related reference validation

Avoid:

- repository abstraction
- unit of work
- domain event bus
- workflow orchestration
- state machine framework
- dependency graph engine
- task engine
- notification engine
- SLA engine
- generic CRUD framework

---

# Response Shape Rule

Responses should align with:

- `/docs/contracts/api-response-shapes.md`
- `/docs/backend/campaign-handoffs-api-contract.md`

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

Handoffs may be useful for a future CRM Operations Copilot.

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

The only AI-ready implication is to keep handoffs clean, explicit, semantic and campaign-scoped.

---

# What This Sprint Must Not Implement

Do not implement:

- Campaign Workspace endpoint
- frontend API client
- frontend mappers
- auth
- RBAC
- Docker
- realtime
- notification engine
- workflow engine
- dependency graph
- BPM
- state machine runtime
- task management
- approval workflow
- automatic activity creation
- automatic timeline generation
- AI features

---

# Success Criteria

This sprint succeeds if:

- handoffs can be listed by campaign
- handoff can be created for an existing campaign
- handoff can be updated
- handoff can be completed
- handoff can be cancelled
- campaign existence is validated
- handoff ownership by campaign is validated
- accepted user references are validated when provided
- accepted squad references are validated when provided
- backend validation passes
- frontend validation passes
- Blockers API remains working
- Notes API remains working
- Decision Context API remains working
- Activities API remains working
- Campaign APIs remain working
- no Campaign Workspace endpoint is created
- no frontend integration is created
- no auth is created
- no workflow engine is created
- no dependency graph is created
- no automatic activity/timeline behavior is created
- no AI behavior is created

---

# Final Principle

Campaign Handoffs Implementation should make lightweight operational transitions durable.

It should not turn CRM Operations Platform into workflow engine, dependency graph, task management or orchestration software.
