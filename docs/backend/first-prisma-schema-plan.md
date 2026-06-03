# First Prisma Schema Plan

## Purpose

This document defines the planned first Prisma schema direction for Backend V1.

It is not a `schema.prisma` file.

It is not a migration.

It is not database implementation.

This plan must be reviewed before any schema is created.

---

# Schema Goal

The first Prisma schema should support Campaign Workspace durability.

It should persist operational facts required by Backend MVP and avoid persisting derived intelligence.

---

# Schema Principles

Follow:

```txt
Persist facts.
Derive intelligence.
Ignore UI state.
```

The schema should be campaign-centered, workspace-compatible and PostgreSQL-friendly.

---

# Planned Models

Backend V1 schema planning includes:

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

These models support Campaign Workspace durability without implementing full SaaS infrastructure.

---

# Model Direction

## Organization

Purpose:

- future commercial boundary
- parent for workspaces

Backend V1 may seed one default organization.

Do not add billing, plan, subscription or advanced tenant settings in the first schema.

---

## Workspace

Purpose:

- scope campaigns and squads
- support single default workspace now
- keep future multi-workspace direction possible

Backend V1 should be workspace-compatible, not full multi-tenant runtime.

---

## User

Purpose:

- owner reference
- author reference
- activity actor reference

Do not add password, sessions, providers or RBAC fields unless auth timing changes for deployment.

---

## Squad

Purpose:

- campaign squad reference
- workspace planning context

Do not persist squad pressure, capacity state or workload summaries.

---

## Campaign

Purpose:

- central operational aggregate
- persisted campaign facts

Likely facts:

- id
- workspaceId
- ownerId
- squadId
- name
- description
- objective
- status
- channel
- priority
- dueDate
- plannedDate
- campaignType
- audience
- segmentation
- tags
- content
- metricsTarget
- estimatedComplexity
- createdAt
- updatedAt

Implementation planning should decide which optional fields use scalar columns and which use bounded JSON.

Do not persist:

- progress as primary truth
- SLA label as primary truth
- execution health
- operational risk
- coordination state
- workflow continuity
- command center summary

---

## CampaignActivity

Purpose:

- meaningful operational activity record
- activity feed input
- timeline derivation input

Do not design this as event sourcing or a full audit log.

---

## Blocker

Purpose:

- lightweight operational impediment
- execution intelligence input
- risk derivation input

Do not model blockers as tickets or incidents.

---

## Handoff

Purpose:

- coordination transition fact
- workflow continuity input
- next responsible area context

Do not model handoffs as dependency graphs or orchestration runtime.

---

## CampaignNote

Purpose:

- lightweight operational memory
- note, risk note, resolution note and handoff note facts

Do not model notes as chat, replies or threaded comments.

---

## DecisionContext

Purpose:

- operational reasoning
- why a campaign changed, slowed or was redirected

Do not model decision context as a comments system.

---

# Relationships

Expected direction:

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

Keep relationships direct and understandable. Avoid deep dependency graphs.

---

# JSON Usage

Bounded JSON may be acceptable for:

- campaign content
- metrics target
- activity metadata

JSON should not become a dumping ground for unclear domain concepts.

If a JSON field becomes heavily queried or central to product behavior, it should be reconsidered before implementation.

---

# Values Not To Persist As Primary Truth

Do not persist:

- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timeline presentation events
- progress as primary truth
- sla label as primary truth
- UI state
- filters
- tabs
- modal state
- search terms

---

# Schema Review Gate

Before `schema.prisma` is created, the proposed schema must pass:

- `/docs/backend/first-schema-review-checklist.md`
- `/docs/backend/persistence-boundaries.md`
- `/docs/backend/entity-relationships.md`
- `/docs/contracts/dto-to-view-model-mapping.md`
- `/docs/contracts/campaign-workspace-contract.md`

---

# Final Principle

The first schema should make Campaign Workspace durable.

It should not encode every future SaaS ambition.
