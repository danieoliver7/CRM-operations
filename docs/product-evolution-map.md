# Product Evolution Map

## Purpose

This document defines the intended evolution path of CRM Operations Platform.

It helps humans and AI agents understand:

- what has already been built
- what should come next
- what should remain deferred
- how the product should mature without overengineering

---

# Evolution Path

## 1. Operational Planning

Status: validated

Focus:

- campaign planning
- calendar visibility
- future workload
- owner pressure
- squad pressure
- capacity perception

---

## 2. Execution Intelligence

Status: validated

Focus:

- execution health
- blockers
- overdue awareness
- SLA awareness
- operational risk

---

## 3. Operational Coordination

Status: validated

Focus:

- handoff visibility
- waiting states
- next responsible area
- ownership awareness
- workflow continuity

---

## 4. Operational Timeline

Status: validated

Focus:

- campaign history
- meaningful operational events
- workflow movement
- blocker history
- handoff events
- execution story

---

## 5. Operational Memory

Status: validated

Focus:

- decision context
- rationale
- risk notes
- resolution notes
- handoff notes
- preserved operational reasoning

---

## 6. Operational Workspace Consolidation

Status: validated

Focus:

- consolidate Campaign Workspace as the single operational hub
- improve hierarchy between execution, coordination, timeline and decisions
- reduce duplicated or scattered context
- make Workspace feel cohesive
- make other views navigate into Workspace clearly

This phase should NOT introduce major new domain concepts.

---

## 7. Backend Foundation Planning

Status: validated

Focus:

- persistence boundaries
- entity relationships
- API boundaries
- first backend scope
- deferred backend scope
- backend risks
- planning before implementation

Do not implement backend code during this phase.

---

## 8. Backend Foundation Design

Status: validated

Focus:

- modular monolith direction
- campaign-centered backend architecture
- REST-first API direction
- PostgreSQL-compatible persistence direction
- backend layering and module boundaries
- schema design guidelines
- implementation sequence
- stack candidates and tradeoffs
- backend risks before implementation

Do not create backend code during this phase.

Do not lock final framework, ORM, hosting, auth provider or cloud provider decisions yet.

---

## 9. Backend Foundation Architecture Review

Status: validated

Focus:

- challenge backend assumptions before implementation
- validate Campaign aggregate direction
- review Organization -> Workspace -> Campaign hierarchy
- review persistence and derived intelligence boundaries
- review entity relationships and API ownership
- review implementation sequence
- document risks and open questions

Do not implement backend code during this phase.

The goal is more confidence, fewer assumptions and lower implementation risk.

---

## 10. Backend MVP Definition

Status: validated

Focus:

- define smallest useful backend scope
- separate required, optional and deferred backend capabilities
- clarify single default workspace assumption
- clarify conditional auth timing
- define first schema review checklist
- approve scope before technical execution

Do not implement backend code during this phase.

The goal is scope clarity before implementation.

---

## 11. Backend Stack Decision

Status: validated

Focus:

- select recommended Backend V1 stack direction
- document stack selection criteria
- define NestJS, Prisma and PostgreSQL guardrails
- keep stack decision subordinate to Backend MVP scope
- avoid implementation before stack decision is approved

Do not implement backend code during this phase.

The approved direction is NestJS + Prisma + PostgreSQL + REST-first API + Modular Monolith.

---

## 12. Frontend Backend Contract Preparation

Status: validated

Focus:

- define API DTO direction before backend implementation
- clarify DTO to View Model mapping
- define Campaign Workspace contract as the first backend-facing surface
- protect derived intelligence from premature persistence
- prevent current mock/UI compatibility fields from becoming schema by accident
- align frontend API patterns with backend API boundaries

Do not implement backend, API clients, Prisma schema, routes or migrations during this phase.

The goal is contract clarity before technical execution.

---

## 13. Backend Implementation Planning

Status: validated

Focus:

- define first Backend V1 implementation cuts
- define module plan for NestJS modular monolith
- define first Prisma schema plan
- define Backend V1 API implementation plan
- recommend Campaign Workspace endpoint strategy
- define validation plan before backend code
- preserve contracts and derived intelligence boundaries
- avoid backend implementation before planning is approved

Do not implement backend, API clients, Prisma schema, routes or migrations during this phase.

The goal is to make the first real backend sprint safe, small and obvious.

---

## 14. Backend Foundation Implementation

Status: future

Focus:

- persistence
- API
- database
- backend service
- campaign data storage
- activities storage
- notes storage

Do not start before Backend Implementation Planning is approved.

---

## 15. Commercial SaaS Foundation

Status: future

Focus:

- organization
- workspace
- membership
- basic roles
- tenant boundaries
- customer-ready data model

---

## 16. Realtime Collaboration

Status: future

Focus:

- live updates
- multi-user presence
- realtime collaboration

Only after backend and persistence exist.

---

## 17. Integrations

Status: future

Focus:

- Salesforce Marketing Cloud
- HubSpot
- Braze
- Adobe
- campaign execution platforms

Only after the core operational product is validated.

## 18. Backend Skeleton Implementation

Status: validated

Focus:

- maintain the first backend runtime foundation
- keep the minimal NestJS backend skeleton small
- validate backend start/build behavior before future cuts
- preserve existing frontend behavior
- avoid Prisma, database, Campaign APIs and auth
- prepare for Prisma and database foundation in the next backend cut

This phase has created backend runtime code, but it has not created product backend behavior.

## 19. Prisma And Database Foundation

Status: validated

Focus:

- maintain Prisma setup
- keep the first Prisma schema aligned with persistence boundaries
- configure PostgreSQL datasource through local environment and Prisma config
- keep Prisma Client generation working
- keep first migration SQL ready
- keep safe reference seed ready
- preserve health endpoint and frontend behavior
- avoid Campaign APIs, auth and frontend integration

This phase introduces persistence foundation, but it does not implement product backend behavior.

---

## 20. Reference Data Implementation

Status: current phase

Focus:

- maintain read-only reference data APIs
- expose seeded workspaces, users and squads
- validate Prisma read access through backend services
- prepare future Campaign persistence references
- avoid Campaign APIs, frontend integration, auth and write APIs

This phase introduces read-only reference data product APIs, but it does not introduce Campaign backend behavior.

---

# Current Rule

The current phase is:

Reference Data Implementation

The goal is not to build Campaign API routes, Campaign Workspace endpoints, auth, Docker or frontend API clients.

The goal is to expose stable reference facts for future Campaign persistence through a small read-only backend cut.

---

# What Should Remain Deferred

Do not implement now:

- Campaign product APIs
- Campaign APIs
- Campaign Workspace endpoint
- Campaign child resource APIs
- write APIs for reference data
- frontend API clients
- auth
- realtime
- permissions
- Docker
- integrations
- billing
- workflow automation
- AI prediction
- notifications

---

# Final Principle

The product should evolve from operational clarity to commercial infrastructure.

Not the opposite.
