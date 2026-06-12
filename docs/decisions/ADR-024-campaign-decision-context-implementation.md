# ADR-024: Campaign Decision Context Implementation

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Skeleton Implementation
- Prisma And Database Foundation
- Reference Data Implementation
- Campaign Persistence Implementation
- Campaign Child Resources Planning
- Campaign Blockers Implementation
- Campaign Notes Implementation

The backend now has:

- NestJS runtime
- Prisma/PostgreSQL
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API
- Campaign Notes API

Campaign is durable and already has two child resources:

- Blockers
- Notes

The approved child resource order places Campaign Decision Context after Campaign Notes.

---

# Decision

We will implement Campaign Decision Context as the third Campaign child resource.

This sprint may implement:

- DecisionContextModule
- DecisionContextController
- DecisionContextService
- Decision Context DTOs
- Decision Context request helpers
- Decision Context response mapper
- Decision Context validation tests

Allowed endpoints:

```txt
GET /campaigns/:campaignId/decision-context
POST /campaigns/:campaignId/decision-context
PATCH /campaigns/:campaignId/decision-context/:decisionContextId
```

---

# Why

Decision Context preserves operational reasoning.

It helps explain why campaign execution changed.

It may capture:

- why status changed
- why priority changed
- why a campaign was delayed
- why a blocker matters
- why a risk was accepted
- why a plan was adjusted
- why a decision should be remembered later

Decision Context is a strategic child resource because it helps the product explain operational history.

---

# What We Will Do

We will persist and expose campaign-scoped decision context facts through simple REST endpoints.

We will keep implementation:

- campaign-scoped
- Prisma-backed
- REST-first
- simple
- validation-focused
- mapped from internal `authorUserId`/`content` to API `authorId`/`body`
- free of derived intelligence persistence
- free of comments/approval behavior
- free of AI behavior

The implementation may accept and validate related references already supported by the existing schema:

- relatedBlockerId
- relatedActivityId
- relatedHandoffId

This does not approve Activities API or Handoffs API.

`relatedStatus` is not accepted because it is not persisted by the current schema.

---

# What We Will Not Do

We will not implement:

- Activities API
- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- frontend mappers
- auth
- RBAC
- Docker
- realtime
- notifications
- workflow engine
- event sourcing
- approval workflow
- comment system
- knowledge base
- AI features
- semantic search
- embeddings

---

# Decision Context Boundary

Decision Context is not chat.

Decision Context is not Notes.

Decision Context is not approval workflow.

Decision Context is not knowledge base.

Decision Context is not AI-generated explanation.

A decision context record is only an operational reasoning fact attached to a campaign.

---

# Notes Boundary

Notes preserve lightweight memory.

Decision Context preserves rationale.

Do not merge Notes and Decision Context into a generic comment model.

Do not automatically create Notes from Decision Context.

Do not automatically create Decision Context from Notes.

---

# Activity Position

Decision Context operations must not automatically create activities in this sprint.

This means:

- decision context created does not create activity
- decision context updated does not create activity
- decision context type changed does not create activity

Activity creation will be planned later.

---

# Timeline Position

Decision Context operations must not generate timeline presentation events in this sprint.

Timeline remains derived later.

Important decision context records may become timeline inputs in the future.

---

# Derived Intelligence Position

Decision Context API must not persist or return as backend truth:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- SLA label
- progress
- dashboardWarnings
- AI summary
- Copilot insight

These remain frontend-derived, future presentation-level concepts or future AI considerations.

---

# Operational Copilot Position

Decision Context may become useful future input for a CRM Operations Copilot.

This sprint must not implement AI.

AI-ready means decision context is clear, contextual and campaign-scoped.

AI-ready does not mean embeddings, prompts, semantic search or Copilot UI.

---

# Response Position

Responses should use simple DTOs and response wrappers.

Preferred:

```ts
type ListResponse<T> = {
  data: T[];
};

type DetailResponse<T> = {
  data: T;
};
```

Do not expose raw Prisma internals.

---

# Consequences

## Positive

- third Campaign child resource becomes durable
- operational reasoning becomes backend-supported
- Campaign Workspace will later have real decision facts
- future Activities and Workspace composition can build on richer context
- future Copilot vision benefits from cleaner decision context without AI implementation now

## Negative

- still no Activities API
- still no Handoffs API
- still no Campaign Workspace endpoint
- no automatic activity/timeline generation yet
- no frontend integration yet

These tradeoffs are accepted.

---

# Guardrails

Do not expand this sprint into full child resource implementation.

Do not create Activities or Handoffs APIs.

Do not connect frontend.

Do not add auth.

Do not create comments, approvals or knowledge base behavior.

Do not create AI behavior.

---

# Final Decision

Campaign Decision Context Implementation begins durable operational reasoning while preserving Activities, Handoffs and Campaign Workspace for later sprints.
