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

Status: current phase

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

## 8. Backend Foundation Implementation

Status: future

Focus:

- persistence
- API
- database
- backend service
- campaign data storage
- activities storage
- notes storage

Do not start before Backend Foundation Planning is complete.

---

## 9. Commercial SaaS Foundation

Status: future

Focus:

- organization
- workspace
- membership
- basic roles
- tenant boundaries
- customer-ready data model

---

## 10. Realtime Collaboration

Status: future

Focus:

- live updates
- multi-user presence
- realtime collaboration

Only after backend and persistence exist.

---

## 11. Integrations

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

Backend Foundation Planning

The goal is not to build backend infrastructure.

The goal is to document what future backend should store, expose and avoid.

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
