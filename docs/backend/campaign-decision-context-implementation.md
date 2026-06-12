# Campaign Decision Context Implementation

## Purpose

This document records the Campaign Decision Context Implementation sprint.

This sprint implements the third Campaign child resource.

It introduces campaign-scoped decision context as persisted operational reasoning.

It does not implement Activities.

It does not implement Handoffs.

It does not implement Campaign Workspace endpoint.

It does not implement frontend integration.

It does not implement auth.

It does not implement AI.

---

# Current Phase

Campaign Decision Context Implementation

The project already has:

- NestJS backend runtime
- Prisma/PostgreSQL persistence foundation
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API
- Campaign Notes API
- Campaign Child Resources Planning validated
- future Operational Copilot vision documented as non-MVP scope

This backend cut implements campaign-scoped decision context.

---

# Sprint Goal

Implement simple backend APIs for Campaign Decision Context:

- list decision context records for a campaign
- create decision context for a campaign
- update decision context

The goal is to make operational reasoning durable without turning decision context into comments, approvals, documentation, knowledge base or AI explanations.

---

# Why Decision Context Comes After Notes

Notes preserve lightweight operational memory.

Decision Context preserves operational reasoning.

Decision Context explains:

- why a campaign changed direction
- why a priority changed
- why a blocker matters
- why a campaign was delayed
- why a plan was adjusted
- why a risk was accepted
- why a decision should be remembered

Decision Context is more strategic than Notes and needs stricter boundaries.

---

# Approved Scope

This sprint may create:

- DecisionContextModule
- DecisionContextController
- DecisionContextService
- Decision Context DTOs
- Decision Context request DTOs/helpers
- Decision Context response mapper
- tests for DTO/request/mapper/service behavior if practical

---

# Allowed Endpoints

Allowed endpoints:

```txt
GET /campaigns/:campaignId/decision-context
POST /campaigns/:campaignId/decision-context
PATCH /campaigns/:campaignId/decision-context/:decisionContextId
```

Do not create any other Decision Context endpoints in this sprint.

---

# Endpoint Intent

## GET /campaigns/:campaignId/decision-context

Returns decision context records scoped to a Campaign.

Must validate Campaign exists.

Should return records ordered by most recent first if simple.

Should not return comments, threads, approvals, knowledge base hierarchy or AI summaries.

---

## POST /campaigns/:campaignId/decision-context

Creates decision context for an existing Campaign.

Must validate Campaign exists.

If `authorId` is provided, it must validate User exists.

If related references are provided, they must be validated only if the schema and existing implementation support it safely.

Should not create activity records automatically.

Should not create timeline events automatically.

Should not create notes automatically.

Should not create approval workflows.

---

## PATCH /campaigns/:campaignId/decision-context/:decisionContextId

Updates decision context facts.

Allowed update fields:

- type
- title
- body
- relatedWorkflowStage
- relatedBlockerId
- relatedActivityId
- relatedHandoffId

Must validate Campaign exists.

Must validate decision context belongs to the Campaign.

Should not create activity records automatically.

Should not create timeline events automatically.

---

# Decision Context Facts

Decision Context APIs may expose facts such as:

- id
- campaignId
- authorId
- type
- title
- body
- relatedActivityId
- relatedWorkflowStage
- relatedBlockerId
- relatedHandoffId
- createdAt
- updatedAt

Use only fields supported by the current Prisma schema.

The API maps `authorUserId` to `authorId` and `content` to `body`.

No Prisma schema change was required.

---

# What Decision Context Must Not Become

Decision Context must not become:

- chat
- comments
- replies
- threads
- approval workflow
- sign-off workflow
- knowledge base
- document editor
- incident postmortem system
- AI-generated explanation store

Decision Context is only campaign-scoped operational reasoning.

---

# Decision Context Versus Notes

Notes preserve lightweight operational memory.

Decision Context explains why operational decisions happened.

Notes can say:

```txt
Audience file expected tomorrow.
```

Decision Context should explain:

```txt
Campaign launch was moved because audience validation depends on the revised segmentation file.
```

Do not merge Notes and Decision Context into one generic comment system.

Do not automatically create notes from decision context.

Do not automatically create decision context from notes.

---

# Derived Intelligence Boundary

Decision Context may later be used by frontend/domain utilities or future AI-ready memory to support explanations.

But Decision Context itself must not persist derived intelligence.

Do not persist or return as backend truth:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- SLA label
- progress
- dashboard warning
- timeline presentation
- AI summary
- AI recommendation
- Copilot insight

---

# Reference Validation Rule

Decision Context writes must validate references.

Required:

- campaignId must exist
- decisionContextId must belong to campaignId
- authorId must exist if provided

Optional references may be validated only if safely supported by current schema and modules:

- relatedBlockerId
- relatedActivityId
- relatedHandoffId

Current implementation accepts and validates all three directly through Prisma without creating Activities or Handoffs APIs.

`relatedStatus` is not accepted because the current Prisma schema does not persist it.

Do not create referenced records automatically.

Expected errors:

- CAMPAIGN_NOT_FOUND
- DECISION_CONTEXT_NOT_FOUND
- USER_NOT_FOUND
- BLOCKER_NOT_FOUND
- ACTIVITY_NOT_FOUND
- HANDOFF_NOT_FOUND
- INVALID_DECISION_CONTEXT_INPUT

Only implement optional related-reference errors if those references are actually accepted by the API.

---

# Prisma Usage Rule

DecisionContextService may use PrismaService directly and simply.

Allowed:

- findMany
- findUnique
- create
- update
- simple select
- simple orderBy
- simple where clauses

Avoid:

- repository abstraction
- unit of work
- domain event bus
- workflow orchestration
- approval engine
- comment system
- knowledge base engine
- AI summary generator
- generic CRUD framework

---

# Response Shape Rule

Responses should align with:

- `/docs/contracts/api-response-shapes.md`
- `/docs/backend/campaign-decision-context-api-contract.md`

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

# Activity Creation Rule

Decision Context operations must not automatically create CampaignActivity records in this sprint.

For this sprint:

- creating decision context does not create activity
- updating decision context does not create activity
- changing decision type does not create activity

Activity automation may be planned later.

---

# Timeline Rule

Decision Context APIs must not return timeline presentation events.

Timeline remains derived later from facts.

Do not implement timeline generation in this sprint.

Important decision context records may become timeline inputs later, but that is not part of this sprint.

---

# Operational Copilot Future Rule

Decision Context may be important for a future CRM Operations Copilot.

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

The only AI-ready implication is to keep decision context clean, explicit, semantic and campaign-scoped.

---

# What This Sprint Must Not Implement

Do not implement:

- Activities API
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
- approval workflow
- comment system
- knowledge base
- AI features

---

# Success Criteria

This sprint succeeds if:

- decision context can be listed by campaign
- decision context can be created for an existing campaign
- decision context can be updated
- campaign existence is validated
- decision context ownership by campaign is validated
- author user reference is validated when provided
- backend validation passes
- frontend validation passes
- Blockers API remains working
- Notes API remains working
- Campaign APIs remain working
- no Activities API is created
- no Handoffs API is created
- no Campaign Workspace endpoint is created
- no frontend integration is created
- no auth is created
- no AI behavior is created

---

# Final Principle

Campaign Decision Context Implementation should make operational reasoning durable.

It should not turn CRM Operations Platform into comments, approvals, knowledge base or AI software.
