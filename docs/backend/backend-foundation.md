# Backend Foundation

## Purpose

This document defines the future backend foundation for CRM Operations Platform.

This is planning only.

No backend implementation should be created in this phase.

---

# Current Phase

The current phase is:

```txt
Backend Foundation Design
```

The planning phase clarified:

- what should be persisted
- what should remain derived
- what should stay UI-only
- how entities relate
- what API boundaries may exist later
- what should remain deferred

The design phase now turns those boundaries into an implementation-ready blueprint without creating backend code.

---

# Current Product Context

The frontend has validated the main operational behaviors:

- operational planning
- execution intelligence
- coordination awareness
- workflow continuity
- operational timeline
- operational memory
- decision context
- consolidated Campaign Workspace

The Campaign Workspace is now the main operational hub.

Backend planning should support this hub.

---

# Backend Foundation Goal

The first backend should eventually make the operational MVP durable.

It should store facts that are currently represented by mock/local frontend state.

It should not introduce new product behavior before the backend is needed.

---

# Future First Backend Scope

The likely first backend should include:

## Campaign Persistence

Store core campaign facts:

- name
- description
- objective
- status
- channel
- priority
- owner
- squad
- due date
- planned date
- audience
- segmentation
- campaign type
- tags
- content fields
- metric targets
- estimated complexity

## User And Squad Reference Data

Store operational actors and teams:

- users
- squads
- basic membership to squads

This should not become advanced RBAC.

## Activities

Store meaningful operational activity:

- status changed
- owner changed
- priority changed
- blocker created or resolved
- handoff started or completed
- decision recorded
- note added

This should not become event sourcing.

## Blockers

Store operational impediments:

- title
- description
- severity
- status
- creator
- resolver
- resolution timing

This should not become incident management.

## Handoffs

Store operational transitions:

- from stage
- to stage
- from owner
- to owner
- from squad
- to squad
- status
- completion timing

This should not become a dependency graph engine.

## Notes And Decision Context

Store operational memory:

- notes
- decisions
- rationale
- clarifications
- risk notes
- resolution notes
- handoff notes

This should not become chat, threads or a document editor.

---

# Future Second Scope

After the first backend is stable, consider:

- attachments
- captured campaign metrics
- organization
- workspace
- membership
- basic tenant boundaries

These should support commercial readiness but should not dominate the first backend.

---

# Deferred Backend Scope

Do not include in the first backend:

- billing
- advanced permissions
- realtime presence
- websocket updates
- notifications
- integrations
- AI features
- analytics warehouse
- workflow automation
- approval engine
- queue systems
- audit-log architecture

---

# Backend Must Not Store As Primary Truth

The backend should not store these as primary facts:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- planning pressure
- owner pressure
- squad pressure
- timeline presentation state
- command center summary

These should remain derived from persisted facts.

---

# Current Frontend Source Of Truth

Today the frontend source of truth is:

```txt
frontend/src/stores/campaigns.store.ts
```

The store holds mock campaign state and simple campaign mutations.

Derived intelligence lives in:

```txt
frontend/src/modules/campaigns/utils/
```

Future backend should replace mock persistence gradually.

It should not replace the derived utility philosophy prematurely.

---

# First Backend Success Criteria

A future first backend succeeds if it can:

- persist campaigns
- retrieve campaign workspace data
- store operational activity
- store blockers and handoffs
- store notes and decision context
- provide users and squads as reference data
- keep derived intelligence outside persisted primary truth

It fails if it becomes:

- generic project management backend
- workflow engine
- realtime collaboration platform
- analytics warehouse
- enterprise permissions system

---

# Final Principle

Backend foundation should make the validated MVP durable.

It should not make the product heavier than the domain requires.
