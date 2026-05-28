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

Status: current phase

Focus:

- select recommended Backend V1 stack direction
- document stack selection criteria
- define NestJS, Prisma and PostgreSQL guardrails
- keep stack decision subordinate to Backend MVP scope
- avoid implementation before stack decision is approved

Do not implement backend code during this phase.

The approved direction is NestJS + Prisma + PostgreSQL + REST-first API + Modular Monolith.

---

## 12. Backend Foundation Implementation

Status: future

Focus:

- persistence
- API
- database
- backend service
- campaign data storage
- activities storage
- notes storage

Do not start before Backend Stack Decision is complete.

---

## 13. Commercial SaaS Foundation

Status: future

Focus:

- organization
- workspace
- membership
- basic roles
- tenant boundaries
- customer-ready data model

---

## 14. Realtime Collaboration

Status: future

Focus:

- live updates
- multi-user presence
- realtime collaboration

Only after backend and persistence exist.

---

## 15. Integrations

Status: future

Focus:

- Salesforce Marketing Cloud
- HubSpot
- Braze
- Adobe
- campaign execution platforms

Only after the core operational product is validated.

---

# Current Rule

The next phase is:

Backend Stack Decision

The goal is not to build backend infrastructure.

The goal is to approve stack direction before implementation planning.

---

# What Should Remain Deferred

Do not implement now:

- backend implementation
- auth
- database
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
