# ADR-026: Campaign Handoffs Implementation

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
- Campaign Decision Context Implementation
- Campaign Activities Implementation

The backend now has:

- NestJS runtime
- Prisma/PostgreSQL
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API
- Campaign Notes API
- Campaign Decision Context API
- Campaign Activities API

Campaign is durable and already has four child resources:

- Blockers
- Notes
- Decision Context
- Activities

The approved child resource order places Campaign Handoffs after Campaign Activities.

---

# Decision

We will implement Campaign Handoffs as the fifth Campaign child resource.

This sprint may implement:

- HandoffsModule
- HandoffsController
- HandoffsService
- Handoff DTOs
- Handoff request helpers
- Handoff response mapper
- Handoff validation tests

Allowed endpoints:

```txt
GET /campaigns/:campaignId/handoffs
POST /campaigns/:campaignId/handoffs
PATCH /campaigns/:campaignId/handoffs/:handoffId
POST /campaigns/:campaignId/handoffs/:handoffId/complete
POST /campaigns/:campaignId/handoffs/:handoffId/cancel
```

---

# Why

Handoffs preserve lightweight operational transitions.

They help explain coordination and ownership across campaign execution.

They may capture:

- who handed work off
- who received work
- which squad is next
- which workflow stage is waiting
- why responsibility moved
- when a transition was completed or cancelled

Handoffs are useful for future Campaign Workspace and Workflow Continuity composition.

However, Handoffs must not become workflow engine, dependency graph, BPM or task management.

---

# What We Will Do

We will persist and expose campaign-scoped handoff facts through simple REST endpoints.

The implementation uses the existing `Handoff` schema without adding a migration. It persists `fromStage`, `toStage`, `fromOwnerId`, `toOwnerId`, `fromSquadId`, `toSquadId`, `status`, `reason`, `completedAt` and `cancelledAt`.

It does not accept `requestedById`, `completedById`, `cancelledById`, `notes` or `dueAt` because the current schema does not persist those facts safely.

We will keep implementation:

- campaign-scoped
- Prisma-backed
- REST-first
- simple
- validation-focused
- free of derived intelligence persistence
- free of workflow engine behavior
- free of dependency graph behavior
- free of AI behavior

---

# What We Will Not Do

We will not implement:

- Campaign Workspace endpoint
- frontend API client
- frontend mappers
- auth
- RBAC
- Docker
- realtime
- notifications
- workflow engine
- dependency graph
- BPM
- task management
- state machine runtime
- orchestration
- automatic campaign status changes
- automatic activity creation
- automatic timeline generation
- AI features
- semantic search
- embeddings

---

# Handoff Boundary

Handoff is not workflow engine.

Handoff is not dependency graph.

Handoff is not task management.

Handoff is not approval workflow.

Handoff is not orchestration.

A Campaign Handoff record is only a lightweight operational transition attached to a campaign.

---

# Workflow Boundary

Workflow remains guidance.

Handoffs record coordination movement.

Do not use Handoffs to enforce workflow progression.

Do not automatically change Campaign status when a handoff is created, completed or cancelled.

Do not create workflow runtime behavior.

---

# Activity Position

Handoff operations must not automatically create activities in this sprint.

This means:

- handoff created does not create activity
- handoff updated does not create activity
- handoff completed does not create activity
- handoff cancelled does not create activity

Activity automation may be evaluated later.

---

# Timeline Position

Handoff operations must not generate timeline presentation events in this sprint.

Timeline remains derived later.

Important handoffs may become timeline inputs in the future.

---

# Derived Intelligence Position

Handoffs API must not persist or return as backend truth:

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

Handoffs may become useful future input for a CRM Operations Copilot.

This sprint must not implement AI.

AI-ready means handoffs are clear, contextual and campaign-scoped.

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

- fifth Campaign child resource becomes durable
- operational coordination transitions become backend-supported
- future Workflow Continuity and Workspace composition can build on richer facts
- future Copilot vision benefits from cleaner handoff history without AI implementation now

## Negative

- still no Campaign Workspace endpoint
- no automatic activity generation yet
- no timeline backend yet
- no frontend integration yet

These tradeoffs are accepted.

---

# Guardrails

Do not expand this sprint into Campaign Workspace implementation.

Do not connect frontend.

Do not add auth.

Do not create workflow engine, dependency graph, task management, BPM or notification behavior.

Do not create AI behavior.

---

# Final Decision

Campaign Handoffs Implementation begins durable lightweight operational transition persistence while preserving Campaign Workspace Facts Endpoint for a later sprint.
