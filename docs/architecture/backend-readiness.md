# Backend Readiness

## Purpose

This document defines how CRM Operations Platform should prepare for backend implementation without starting backend too early.

The current phase is still frontend-first and behavior-first.

Backend should only be introduced after the domain model is stable enough.

---

# Current Architecture Position

The project currently is:

- frontend-first
- mock/local
- Zustand-based
- behavior-driven
- operational-first
- MVP-oriented

This is intentional.

The current product is validating:

- operational workflow
- campaign coordination
- execution intelligence
- coordination awareness
- planning pressure
- workspace behavior

before validating infrastructure.

---

# Why Backend Is Not Yet The Priority

Backend is not the current priority because the product is still validating:

- domain semantics
- UX behavior
- workflow perception
- operational coordination
- execution awareness
- workspace structure

Starting backend too early may create:

- premature schema lock-in
- overengineering
- wrong persistence model
- unnecessary API complexity
- backend-driven product decisions

---

# What Backend Readiness Means

Backend readiness means:

- entities are documented
- relationships are understood
- persisted data is separated from derived intelligence
- commercial boundaries are anticipated
- frontend types are aligned with domain concepts
- architecture decisions are explicit

Backend readiness does NOT mean:

- implementing NestJS
- creating Prisma schema
- setting up PostgreSQL
- building auth
- creating APIs
- implementing realtime
- adding persistence

---

# Backend Should Eventually Support

Future backend should support:

- organizations
- workspaces
- users
- squads
- campaigns
- workflow stages
- blockers
- handoffs
- notes
- attachments
- activity history
- integrations
- billing later

But not all at once.

---

# Backend Should NOT Become

- workflow engine
- orchestration system
- SLA engine
- AI runtime
- BPM platform
- task management backend
- analytics warehouse

---

# Initial Backend Candidate Modules

When backend starts, likely first modules:

## 1. Campaigns

Core operational entity.

## 2. Users

Operational actors.

## 3. Squads

Operational teams.

## 4. Activities

Operational timeline.

## 5. Blockers

Execution friction.

## 6. Handoffs

Operational continuity.

---

# Deferred Backend Modules

Do not implement early:

- billing
- advanced permissions
- realtime presence
- integrations
- analytics warehouse
- AI assistant
- notification engine
- automation engine

---

# Persistence Philosophy

Persist facts.

Derive intelligence.

Persist:

- campaign status
- due date
- owner
- squad
- blockers
- handoffs
- notes
- activities

Derive:

- execution health
- SLA state
- operational risk
- coordination state
- planning pressure
- workflow continuity

---

# API Philosophy

Future APIs should be:

- simple
- resource-oriented
- domain-aligned
- operationally meaningful

Avoid:

- generic CRUD-only thinking
- over-normalized endpoints
- workflow runtime APIs
- orchestration APIs
- abstract enterprise APIs

---

# Suggested Future API Boundaries

Potential future endpoints:

```txt
GET /campaigns
POST /campaigns
GET /campaigns/:id
PATCH /campaigns/:id

GET /campaigns/:id/activities
POST /campaigns/:id/notes

POST /campaigns/:id/blockers
PATCH /campaigns/:id/blockers/:blockerId

POST /campaigns/:id/handoffs
PATCH /campaigns/:id/handoffs/:handoffId

# Multi-Tenancy Future

Because CRM Operations Platform may become a commercial SaaS product, the future backend must be designed with multi-tenancy in mind.

Multi-tenancy means that multiple customer companies can use the same platform while keeping their data isolated.

In the future, the system will likely need:

- organizations
- workspaces
- memberships
- user roles
- data isolation
- organization-level settings
- workspace-level operational context

---

## Organization

An Organization represents a customer company.

Examples:

- a marketing agency
- an internal CRM team
- a consulting company
- an enterprise marketing department

Organization will likely become the highest-level commercial boundary.

Most future persisted records should eventually belong to an organization.

Examples:

- users
- workspaces
- squads
- campaigns
- billing
- integrations

---

## Workspace

A Workspace represents an operational environment inside an organization.

Examples:

- CRM Brazil
- CRM LATAM
- Lifecycle Team
- Growth Squad
- Client A Operations
- Client B Operations

A single organization may have multiple workspaces.

Campaigns should likely belong to a workspace.

---

## Membership

Membership connects users to organizations and workspaces.

A user may belong to:

- one organization
- multiple organizations
- one workspace
- multiple workspaces

Membership should eventually define:

- user access
- operational visibility
- workspace participation
- basic role assignment

---

## Future Tenant Boundaries

Future backend entities should consider these boundaries:

```txt
Organization
  └── Workspace
        └── Campaign
              ├── Activities
              ├── Blockers
              ├── Handoffs
              ├── Notes
              └── Attachments

              
Por enquanto é **só documentação**. Não mexa no frontend, store, types ou componentes por causa disso agora.
---

# Current Readiness Implementation

This section supersedes the earlier note that backend readiness was documentation-only.

The current frontend now includes lightweight domain type modules under:

```txt
frontend/src/types/domain/
```

This is backend readiness only.

It does NOT mean backend has started.

No database, API, persistence, auth, multi-tenancy runtime, Prisma or NestJS implementation exists in this phase.

Runtime behavior should remain:

- frontend-only
- mock/local
- Zustand for shared operational state
- derived utility functions for operational intelligence

Compatibility exports should remain while the MVP validates behavior.
