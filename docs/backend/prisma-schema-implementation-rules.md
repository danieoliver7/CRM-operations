# Prisma Schema Implementation Rules

## Purpose

This document defines implementation rules for the first `schema.prisma`.

It exists to prevent schema drift during the Prisma And Database Foundation sprint.

---

# Core Rule

The Prisma schema must persist facts.

It must not persist derived intelligence.

```txt
Persist facts.
Derive intelligence.
Ignore UI state.
```

---

# Implemented Schema Boundary

The first schema includes operational facts for:

- Organization
- Workspace
- User
- Squad
- Campaign
- CampaignActivity
- Blocker
- Handoff
- CampaignNote
- DecisionContext

This is enough for future Campaign Workspace durability planning.

---

# Derived Intelligence Not Persisted

The schema must not include:

- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- planningPressure
- ownerPressure
- squadPressure
- dashboardWarnings

These remain derived from persisted facts.

---

# UI Compatibility Fields Not Persisted

The schema must not copy current frontend compatibility fields as backend truth:

- `owner`
- `squad`
- `progress`
- `sla`

Backend direction:

- persist `ownerId`
- persist `squadId`
- derive progress from status
- derive SLA state/label from dates and workflow context

---

# JSON Usage

Bounded JSON is allowed for:

- campaign content
- campaign metrics target
- activity metadata

JSON should not become a dumping ground.

Queryable facts should remain explicit columns.

---

# Enum Rule

Enums should follow current frontend/domain language.

Do not create enterprise statuses or workflow engine states.

Implemented enums are limited to campaign status/channel/priority/complexity and lightweight operational records.

---

# Relationship Rule

Keep relationships direct:

```txt
Organization
  -> Workspace
    -> Campaign
    -> Squad

User
  -> Campaign owner
  -> Activity actor
  -> Note author
  -> DecisionContext author

Campaign
  -> CampaignActivity
  -> Blocker
  -> Handoff
  -> CampaignNote
  -> DecisionContext
```

Avoid polymorphic relationships, generic workflow tables and dependency graphs.

---

# Final Rule

If a schema field cannot be explained as a persisted operational fact, it should not enter the first schema.
