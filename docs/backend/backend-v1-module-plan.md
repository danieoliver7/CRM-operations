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

---

# Final Principle

Modules should make ownership clear.

They should not make the backend feel larger than the product.
