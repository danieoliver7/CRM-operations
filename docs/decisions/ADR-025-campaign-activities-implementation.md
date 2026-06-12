# ADR-025: Campaign Activities Implementation

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

The approved child resource order places Campaign Activities after Campaign Decision Context.

---

# Decision

We will implement Campaign Activities as the fourth Campaign child resource.

This sprint may implement:

- ActivitiesModule
- ActivitiesController
- ActivitiesService
- Activity DTOs
- Activity request helpers
- Activity response mapper
- Activity validation tests

Allowed endpoints:

```txt
GET /campaigns/:campaignId/activities
POST /campaigns/:campaignId/activities
```

---

# Why

Activities preserve meaningful operational events.

They help explain campaign execution by recording:

- what happened
- when it happened
- who acted
- what operational movement occurred
- which fact changed the campaign story

Activities are useful for future Campaign Workspace and Timeline composition.

However, Activities must not become event sourcing, audit logs, workflow orchestration or automatic backend noise.

---

# What We Will Do

We will persist and expose campaign-scoped activity facts through simple REST endpoints.

The implementation uses the existing `CampaignActivity` schema without adding a migration. Public `actorId` maps to persisted `actorUserId`, the public activity text uses the persisted `message` field, and optional related reference ids are validated directly through Prisma and stored in the existing `metadata` field.

We will keep implementation:

- campaign-scoped
- Prisma-backed
- REST-first
- simple
- validation-focused
- free of derived intelligence persistence
- free of event sourcing behavior
- free of timeline generation
- free of AI behavior

---

# What We Will Not Do

We will not implement:

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
- audit log platform
- activity replay
- timeline generation
- automatic activity creation from other resources
- AI features
- semantic search
- embeddings

---

# Activity Boundary

Activity is not event sourcing.

Activity is not audit log.

Activity is not timeline presentation.

Activity is not notification feed.

Activity is not workflow orchestration.

Activity is not AI memory.

A Campaign Activity record is only a meaningful operational event attached to a campaign.

---

# Timeline Boundary

Timeline is a future presentation layer.

Activities may be used by timeline later.

Do not implement timeline generation in this sprint.

Do not return timeline presentation events from Activities API.

Do not persist timeline presentation fields in Activities.

---

# Automation Boundary

Activities should not be created automatically by other modules in this sprint.

Do not automatically create activities from:

- Campaign changes
- Blocker changes
- Note changes
- Decision Context changes
- future Handoff changes

Manual/direct Activities API creation only.

---

# Event Sourcing Boundary

Do not use Activities to reconstruct current Campaign state.

Do not replay Activities.

Do not create event handlers.

Do not create domain event bus.

Do not create projections.

Do not create CQRS.

Campaign state remains stored as Campaign facts.

Activities explain meaningful operational movement.

---

# Derived Intelligence Position

Activities API must not persist or return as backend truth:

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

Activities may become useful future input for a CRM Operations Copilot.

This sprint must not implement AI.

AI-ready means activities are clear, contextual and campaign-scoped.

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

- fourth Campaign child resource becomes durable
- meaningful operational events become backend-supported
- future Timeline and Workspace composition can build on richer facts
- future Copilot vision benefits from cleaner activity history without AI implementation now

## Negative

- still no Handoffs API
- still no Campaign Workspace endpoint
- no automatic activity generation yet
- no timeline backend yet
- no frontend integration yet

These tradeoffs are accepted.

---

# Guardrails

Do not expand this sprint into full timeline implementation.

Do not create Handoffs API.

Do not connect frontend.

Do not add auth.

Do not create event sourcing, audit log, workflow engine or notification behavior.

Do not create AI behavior.

---

# Final Decision

Campaign Activities Implementation begins durable meaningful operational event persistence while preserving Handoffs and Campaign Workspace for later sprints.
