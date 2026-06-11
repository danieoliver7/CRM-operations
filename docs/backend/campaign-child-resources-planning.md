# Campaign Child Resources Planning

## Purpose

This document defines the planning phase for Campaign child resources.

This phase prepares implementation order, boundaries and API direction for resources that live around Campaign.

It does not implement backend code.

It does not create controllers, services or routes.

It does not implement the Campaign Workspace endpoint.

---

# Current Phase

Campaign Child Resources Planning

The project already has:

- NestJS backend runtime
- Prisma and PostgreSQL foundation
- Reference Data APIs
- Campaign Persistence APIs
- Campaign as the central operational aggregate

The next step is to validate campaign-scoped child resources before implementing them.

---

# Why This Planning Exists

Campaign child resources are powerful but risky.

They can make the product operationally valuable, but they can also accidentally turn the product into:

- project management tool
- ticket system
- chat system
- event sourcing platform
- workflow engine
- audit log platform
- dependency graph runtime

This planning phase exists to prevent that drift.

---

# Campaign Child Resources

The relevant child resources are:

- Blockers
- Notes
- Decision Context
- Activities
- Handoffs

Each resource must remain campaign-scoped.

Each resource must support future Campaign Workspace durability.

Each resource must avoid becoming a generic collaboration, workflow or project management platform.

---

# Approved Implementation Order

```txt
1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint
```

Blockers come first because they are the clearest operational pain signal.

The Campaign Workspace Facts Endpoint comes last because it should compose existing facts instead of inventing new backend truth.

---

# Resource Guardrails

## Blockers

Blockers must remain lightweight operational impediments.

They must not become:

- ticket system
- incident system
- escalation engine
- SLA engine

## Notes

Notes must preserve short operational memory.

They must not become:

- chat
- comments platform
- threads
- mentions
- collaboration platform

## Decision Context

Decision Context must explain operational reasoning.

It must not become:

- approval workflow
- comment system
- knowledge base
- documentation platform

## Activities

Activities must record meaningful operational events.

They must not become:

- event sourcing
- audit log platform
- automatic log of everything
- timeline presentation backend
- notification feed

## Handoffs

Handoffs must capture lightweight operational transitions.

They must not become:

- workflow engine
- dependency graph
- BPM runtime
- orchestration layer

## Campaign Workspace Facts Endpoint

The Campaign Workspace Facts Endpoint should return facts only when implemented later.

It must not become:

- command center backend
- derived intelligence API
- timeline presentation API
- dashboard summary API

---

# Explicit Non-Goals

This planning phase does not create:

- backend runtime modules
- controllers
- services
- routes
- DTO files
- request files
- mapper files
- Prisma schema changes
- migrations
- seed changes
- frontend API client
- frontend mappers
- frontend integration
- auth
- RBAC
- Docker
- workflow engine
- event sourcing
- realtime
- notifications

---

# Final Principle

Plan Campaign child resources before implementing them.

The next likely implementation cut is Campaign Blockers Implementation, not Campaign Workspace.
