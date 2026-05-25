# Backend MVP Scope

## Purpose

This document separates Backend MVP scope into:

- required
- optional
- deferred
- explicitly avoided
- conditional

It should guide the first backend implementation planning sprint.

It should not create backend code.

---

# Required Scope

## 1. Campaign Persistence

Required because Campaign is the central operational aggregate.

Minimum capability:

- create campaign
- read campaign
- update campaign facts
- update campaign status
- update campaign priority
- assign owner
- assign squad

Required because:

- Dashboard derives from campaigns
- Kanban groups campaigns by workflow status
- Calendar reads planned and due dates
- Campaign Workspace needs durable campaign context

---

## 2. Workspace-Compatible Campaign Scope

Required because future SaaS depends on workspace boundaries.

Backend MVP assumption:

```txt
single organization
single default workspace
```

Implementation direction:

- campaigns should be compatible with workspace scoping
- squads should be compatible with workspace scoping
- full tenant runtime is deferred

This avoids painful migration later without building multi-tenancy now.

---

## 3. User Reference Data

Required as reference data, not auth.

Users support:

- campaign ownership
- activity actors
- note authors
- decision authors
- blocker creators and resolvers
- handoff participants

Do not include:

- login
- sessions
- JWT
- enterprise permissions
- identity provider integration

---

## 4. Squad Reference Data

Required for operational coordination.

Squads support:

- ownership
- campaign grouping
- capacity perception
- handoff context
- operational pressure

Do not include:

- workforce management
- permission groups
- enterprise team administration

---

## 5. Campaign Activities

Required for operational history.

Activities should persist meaningful facts such as:

- campaign created
- status changed
- owner changed
- priority changed
- blocker created or resolved
- handoff started or completed
- note added
- decision recorded

Do not include:

- event sourcing
- audit-log architecture
- UI activity
- notification streams

---

## 6. Blockers

Required for execution intelligence.

Blockers support:

- blocked campaign awareness
- execution risk
- workspace clarity
- operational continuity

Do not include:

- ticketing
- incidents
- escalation workflow

---

## 7. Handoffs

Required for coordination awareness.

Handoffs support:

- workflow continuity
- next responsible area
- waiting states
- operational transitions

Do not include:

- dependency graph engine
- workflow orchestration
- BPM runtime

---

## 8. Campaign Notes

Required when notes preserve campaign operational memory.

Notes support:

- clarifications
- operational context
- execution observations

Do not include:

- chat
- threads
- replies
- mentions
- rich text editor

---

## 9. Decision Context

Required because Operational Memory is validated.

Decision Context supports:

- rationale
- risk notes
- resolution notes
- handoff notes
- explanation of why execution changed

Do not include:

- comment system
- approval workflow
- knowledge base
- realtime collaboration

---

# Optional Scope

## Attachment Metadata

Optional.

Can enter Backend MVP only if campaign workspace durability requires attachment references.

Allowed:

- attachment name
- attachment type
- attachment URL/reference
- uploadedBy reference
- createdAt

Deferred:

- upload pipeline
- storage provider
- file processing
- permissions
- asset management

## Campaign Metrics

Optional.

Can enter Backend MVP only if captured metric facts are necessary for campaign context.

Allowed:

- metric type
- value
- source
- capturedAt

Deferred:

- analytics warehouse
- dashboards as BI
- attribution
- reporting engine

---

# Deferred Scope

These are not Backend MVP:

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
- Docker
- CI/CD complexity
- production SaaS operations

---

# Explicitly Avoided Scope

Do not introduce:

- event sourcing
- CQRS
- microservices
- workflow engine
- orchestration layer
- repository pattern for its own sake
- unit of work abstraction
- domain event bus
- generic task system
- incident management
- Slack-style collaboration

---

# Conditional Scope

## Auth

Auth timing depends on deployment target.

Local/dev/internal backend:

```txt
auth may be deferred
```

Hosted/shared backend:

```txt
basic auth should move earlier
```

Still deferred:

- advanced RBAC
- enterprise SSO
- permission matrix
- billing roles
- tenant admin console

---

# Backend MVP Boundary

Backend MVP should make the existing product durable.

It should not expand the product surface.

If a capability does not directly support Campaign Workspace durability, it should remain optional or deferred.
