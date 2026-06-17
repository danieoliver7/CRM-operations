# Backend V1 Module Plan

## Purpose

This document defines the planned Backend V1 module structure.

It is not backend code and not a NestJS implementation. It is a planning reference for the future NestJS modular monolith.

---

# Architecture Direction

Backend V1 should be a modular monolith.

Modules should be:

- shallow
- resource-oriented
- campaign-centered
- easy to test
- aligned with Backend MVP scope
- aligned with frontend-backend contracts

Avoid deep enterprise layering and avoid modules that behave like independent systems.

---

# Planned Module Structure

Possible future structure:

```txt
backend/
  src/
    modules/
      workspaces/
      users/
      squads/
      campaigns/
      activities/
      blockers/
      handoffs/
      campaign-workspace/
      notes/
      decision-context/
    shared/
    main.ts
```

This structure is conceptual. Do not create it during planning.

---

# Module Responsibilities

## workspaces

Responsibilities:

- provide default workspace context
- support workspace-compatible scoping
- prepare future multi-workspace direction

Non-goals:

- tenant runtime
- organization switcher
- billing
- enterprise permissions

---

## users

Responsibilities:

- provide user reference data
- support campaign ownership display
- support activity/note author references

Non-goals:

- authentication
- sessions
- JWT
- RBAC
- identity provider integration

---

## squads

Responsibilities:

- provide squad reference data
- support campaign squad assignment
- support workspace campaign planning context

Non-goals:

- squad pressure persistence
- capacity engine
- staffing engine

---

## campaigns

Responsibilities:

- campaign persistence
- campaign list/detail
- campaign create/update
- status/priority/owner/squad fact updates
- workspace-scoped campaign facts

Non-goals:

- workflow engine
- automation runtime
- command center summary persistence
- SLA label persistence

Campaigns should remain the central operational aggregate.

---

## activities

Responsibilities:

- meaningful campaign activity records
- activity listing by campaign
- activity creation when operational facts change

Non-goals:

- event sourcing
- audit log platform
- event bus

---

## blockers

Responsibilities:

- campaign blocker records
- blocker status updates
- blocker resolution facts

Non-goals:

- ticketing system
- incident management
- escalation engine

---

## handoffs

Responsibilities:

- handoff records between stages, owners or squads
- pending/completed/canceled handoff facts
- handoff context for Campaign Workspace

Non-goals:

- dependency graph engine
- orchestration layer
- BPM runtime

---

## notes

Responsibilities:

- campaign notes
- operational memory records
- risk, resolution and handoff note facts when represented as notes

Non-goals:

- chat
- comments
- replies
- mentions
- threaded discussions

---

## decision-context

Responsibilities:

- decision rationale records
- clarification, risk note, resolution note and handoff note context
- operational reasoning attached to campaign execution

Non-goals:

- comment system
- knowledge base
- approval workflow

---

## campaign-workspace

Responsibilities:

- composed Campaign Workspace facts read
- Campaign, owner and squad fact composition
- campaign-scoped Blockers, Notes, Decision Context, Activities and Handoffs composition
- empty child resource list handling

Non-goals:

- frontend integration
- timeline generation
- command center backend
- derived intelligence service
- workflow engine
- AI/Copilot behavior

---

## shared

Responsibilities:

- common types/helpers
- configuration helpers
- simple validation primitives
- shared response conventions

Non-goals:

- domain runtime
- generic repository framework
- unit of work abstraction by default
- orchestration layer

---

# Modules Not To Create In Backend V1

Do not create:

- ExecutionHealthModule
- OperationalRiskModule
- CoordinationStateModule
- WorkflowContinuityModule
- CommandCenterModule
- TimelinePresentationModule
- WorkflowEngineModule
- CapacityPlanningModule
- NotificationModule
- RealtimeModule
- AuthModule in the first local/internal validation cut

These concepts remain frontend-derived, presentation-level, deferred or conditional.

---

# Module Dependency Direction

Preferred direction:

```txt
workspaces
  -> users / squads
  -> campaigns
  -> campaign child resources
```

Campaign child resources include:

- activities
- blockers
- handoffs
- notes
- decision-context

Avoid circular dependencies and avoid cross-module orchestration.

# Campaign Activities Implementation Validation

During the Campaign Activities Implementation sprint, the fourth Campaign child resource API is created.

Allowed:

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

Still disallowed:

- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- frontend mappers
- auth
- RBAC
- Docker
- workflow engine
- event sourcing
- audit log platform
- activity replay
- projections
- CQRS
- timeline generation
- notification engine
- realtime
- AI features
- embeddings
- semantic search

Use:

- `/docs/backend/campaign-activities-implementation.md`
- `/docs/backend/campaign-activities-api-contract.md`
- `/docs/backend/campaign-activities-validation.md`

to validate the sprint.

Activities APIs must remain campaign-scoped.

Activities store activity text in `message` and optional operational context in `metadata`.

Activity operations must not automatically create timeline events, notes, decision context, handoffs or notifications.

Activities must not return or persist derived intelligence as backend truth.

Activities must not introduce event sourcing, audit log, replay, projection, workflow engine, notification feed, timeline backend or AI behavior.

---

# Campaign Handoffs Implementation Validation

During the Campaign Handoffs Implementation sprint, the fifth Campaign child resource API is created.

Allowed:

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

Still disallowed:

- Campaign Workspace endpoint
- frontend API client
- frontend mappers
- auth
- RBAC
- Docker
- workflow engine
- dependency graph
- BPM
- task management
- orchestration layer
- automatic Campaign status transitions
- automatic activity creation
- automatic timeline generation
- notification engine
- realtime
- AI features
- embeddings
- semantic search

Handoffs APIs must remain campaign-scoped.

Handoff operations must not automatically change Campaign status.

Handoff operations must not automatically create activities, timeline events, notes, decision context or notifications.

Handoffs store lightweight transition facts supported by the current schema.

Unsupported schema fields such as `requestedById`, `completedById`, `cancelledById`, `notes` and `dueAt` must remain rejected until the schema explicitly supports them.

Handoffs must not introduce workflow engine, dependency graph, BPM, task management, orchestration, automatic workflow, notification feed, timeline backend or AI behavior.

---

# Campaign Workspace Facts Endpoint Validation

During the Campaign Workspace Facts Endpoint sprint, the composed Campaign Workspace read endpoint is created.

Allowed:

- CampaignWorkspaceModule
- CampaignWorkspaceController
- CampaignWorkspaceService
- Campaign Workspace Facts DTOs
- Campaign Workspace response mapper/composer
- Campaign Workspace validation tests

Allowed endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

Still disallowed:

- frontend API client
- frontend mappers
- frontend mock replacement
- auth
- RBAC
- Docker
- workflow engine
- dependency graph
- timeline generation
- command center backend logic
- derived intelligence persistence
- notification engine
- realtime
- AI features
- embeddings
- semantic search

Campaign Workspace Facts Endpoint must remain read-only.

Campaign Workspace Facts Endpoint must compose persisted facts only.

Campaign Workspace Facts Endpoint must not mutate Campaign or child resources.

Campaign Workspace Facts Endpoint must not automatically create activities, timeline events, notes, decision context, handoffs or notifications.

Campaign Workspace Facts Endpoint must not return or persist derived intelligence as backend truth.

Campaign Workspace Facts Endpoint must not introduce frontend integration, timeline backend, command center backend, workflow engine, notification feed or AI behavior.

---

# Final Principle

Modules should make ownership clear.

They should not make the backend feel larger than the product.
