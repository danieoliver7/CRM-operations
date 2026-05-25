# Backend MVP Definition

## Purpose

This document defines the Backend MVP for CRM Operations Platform.

The Backend MVP is not the full backend.

It is the smallest backend capable of making the validated operational product durable.

No backend code, database schema, framework setup or API route should be created from this document alone.

---

# Current Phase

Backend MVP Definition

The previous phases defined:

- backend principles
- persistence boundaries
- entity relationships
- API boundaries
- backend design
- architecture risks
- architecture review

This phase defines the minimum backend scope before implementation.

---

# Backend MVP Goal

The Backend MVP should make the Campaign Workspace durable.

It should persist the minimum set of operational facts needed to replace mock/local campaign state.

It should support the operational surfaces already validated in the frontend:

- Campaign Workspace
- Campaigns list
- Kanban
- Calendar
- Dashboard derived from campaigns

The Backend MVP should not attempt to commercialize the full product yet.

---

# Backend MVP Definition

The Backend MVP is:

```txt
A minimal persistence layer for Campaign Workspace durability.
```

It exists to persist operational facts for campaigns and their workspace context.

It is not:

- a full SaaS backend
- a tenant runtime
- a billing platform
- a workflow engine
- an auth-first platform
- a realtime platform
- an integrations platform

---

# Required Backend MVP Scope

The required Backend MVP scope is:

## Campaign Persistence

Campaign must be persisted because it is the central operational aggregate.

Required campaign facts:

- name
- description
- objective
- status
- channel
- priority
- owner
- squad
- dueDate
- plannedDate
- audience
- segmentation
- campaignType
- tags
- content fields when needed by the current workspace
- createdAt
- updatedAt

## Workspace-Compatible Scope

The MVP should assume:

```txt
single organization
single default workspace
multiple campaigns
multiple users as reference data
multiple squads as reference data
```

The backend should be workspace-compatible.

It should not implement full multi-tenancy yet.

## User Reference Data

Users are required as operational references for:

- campaign owner
- activity actor
- note author
- decision context author
- blocker creator or resolver
- handoff participants

This does not mean auth implementation.

## Squad Reference Data

Squads are required as operational references for:

- campaign ownership
- planning pressure
- handoff context
- workspace coordination

## Campaign Activities

Activities are required to support operational history.

They must represent meaningful operational facts.

They must not become event sourcing.

## Blockers

Blockers are required because execution intelligence and workspace clarity depend on them.

They must remain lightweight operational impediments.

They must not become tickets or incidents.

## Handoffs

Handoffs are required because coordination awareness depends on transition context.

They must not become dependency graph runtime.

## Campaign Notes

Notes are required when they preserve operational memory.

They must not become chat, replies or threads.

## Decision Context

Decision Context is required because the product already validates operational memory.

It explains why execution changed.

It must not become comments, approvals or knowledge base.

---

# Optional Backend MVP Scope

## Attachment Metadata

Attachment metadata is optional.

Include only if the current Campaign Workspace cannot feel durable without attachment references.

Do not include:

- file upload
- file storage
- asset processing
- DAM behavior

## Campaign Metrics

Campaign metrics are optional.

Include only if the first backend must persist captured campaign performance facts.

Do not include:

- analytics warehouse
- attribution model
- BI layer
- reporting engine

---

# Deferred Scope

The following are outside Backend MVP:

- billing
- subscriptions
- advanced RBAC
- enterprise permissions
- realtime
- websocket
- notifications
- integrations
- AI
- workflow automation
- approval engine
- analytics warehouse
- file storage
- event sourcing
- CQRS
- microservices
- Docker
- CI/CD complexity
- repository pattern
- unit of work
- domain events

---

# Auth Timing

Auth is conditional.

If Backend MVP is local, dev-only or internal:

```txt
auth may be deferred
```

If Backend MVP is hosted or shared:

```txt
basic auth should be introduced earlier
```

Do not define:

- enterprise auth
- RBAC
- permission matrix
- auth provider
- JWT/session strategy

Those belong to future implementation planning.

---

# Success Criteria

Backend MVP succeeds if it can:

- persist campaigns
- retrieve campaign workspace data
- persist operational activity
- persist blockers and handoffs
- persist notes and decision context
- provide users and squads as reference data
- keep dashboard, calendar and kanban derivable from campaign facts
- keep derived intelligence outside persisted primary truth

It fails if it becomes:

- full SaaS platform
- generic project management backend
- workflow engine
- analytics warehouse
- realtime collaboration platform
- enterprise permissions system

---

# Final Principle

Backend MVP should make the validated product durable.

It should not make the product architecturally heavier than necessary.
