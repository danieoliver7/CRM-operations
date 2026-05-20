# Data Model

## Purpose

This document defines how CRM Operations Platform should think about data before backend implementation.

The goal is to separate:

- persisted domain data
- derived operational intelligence
- temporary UI state
- future backend concerns

This document should guide future schema design without forcing premature backend implementation.

---

# Data Philosophy

The product should persist operational facts.

The product should derive operational awareness.

This means:

- Campaign data is persisted.
- Owner, squad, status and due dates are persisted.
- Execution health is derived.
- Operational risk is derived.
- Coordination state is derived.
- Planning pressure is derived.

---

# Data Categories

## 1. Persisted Domain Data

Data that represents real operational facts.

Examples:

- campaign name
- campaign status
- owner
- squad
- due date
- channel
- priority
- objective
- audience
- workflow stage
- blockers
- notes
- attachments
- activity history

---

## 2. Derived Operational Intelligence

Data calculated from persisted facts.

Examples:

- execution health
- SLA state
- operational risk
- coordination state
- planning pressure
- owner pressure
- squad pressure
- stalled workflow
- missing ownership
- pending handoff

Derived data should be recalculated.

It should not become source of truth too early.

---

## 3. UI State

Temporary interface state.

Examples:

- modal open/closed
- selected filter
- active tab
- search term
- collapsed section
- local hover state
- current calendar month

UI state should NOT be persisted as domain data.

---

## 4. Future System Data

Data that may exist later when the platform becomes commercial.

Examples:

- organization
- workspace
- billing
- permissions
- user invitations
- API integrations
- audit logs

These should NOT be implemented during the current MVP unless explicitly planned.

---

# Campaign Data Model

## Persisted Campaign Fields

- id
- name
- description
- objective
- channel
- status
- priority
- ownerId
- squadId
- dueDate
- plannedDate
- audience
- segmentation
- campaignType
- tags
- createdAt
- updatedAt

## Derived Campaign Fields

- executionHealth
- slaState
- operationalRisk
- coordinationState
- nextAction
- blockerCount
- riskCount
- daysUntilDue
- isOverdue
- workflowContinuity

## UI-Only Campaign Fields

- isSelected
- isExpanded
- isModalOpen
- currentTab
- temporaryFormValue

---

# User Data Model

## Persisted User Fields

- id
- name
- email
- avatarUrl
- role
- squadId
- isActive
- createdAt
- updatedAt

## Future User Fields

- organizationId
- permissions
- invitationStatus
- lastLoginAt

Do not implement enterprise RBAC in the MVP.

---

# Squad Data Model

## Persisted Squad Fields

- id
- name
- description
- leadUserId
- createdAt
- updatedAt

## Derived Squad Fields

- activeCampaigns
- overloadedState
- pressureLevel
- campaignsAtRisk
- blockedCampaigns

---

# Blocker Data Model

## Persisted Blocker Fields

- id
- campaignId
- title
- description
- severity
- status
- createdByUserId
- resolvedByUserId
- createdAt
- resolvedAt

## Derived Blocker Fields

- isBlockingExecution
- affectsSLA
- affectsCoordination
- priorityImpact

---

# Handoff Data Model

## Persisted Handoff Fields

- id
- campaignId
- fromStage
- toStage
- fromOwnerId
- toOwnerId
- fromSquadId
- toSquadId
- status
- createdAt
- completedAt

## Derived Handoff Fields

- isPending
- isDelayed
- isOwnerMissing
- nextResponsibleArea
- continuityRisk

---

# Activity Data Model

## Persisted Activity Fields

- id
- campaignId
- actorUserId
- type
- message
- metadata
- createdAt

## Activity Types

Examples:

- campaign_created
- status_changed
- priority_changed
- owner_changed
- blocker_created
- blocker_resolved
- handoff_started
- handoff_completed
- note_added
- due_date_changed

---

# Commercial Product Future Entities

These entities are expected later, not now.

## Organization

Represents a customer company.

## Workspace

Represents an operational environment inside an organization.

## Membership

Connects users to organizations/workspaces.

## Integration

Represents external platforms like SFMC, HubSpot, Braze or Adobe.

## Subscription

Represents billing and commercial plan.

---

# Current MVP Data Rule

The current MVP should continue using:

- mock data
- local frontend state
- Zustand for shared operational state
- derived utility functions

Do NOT introduce:

- database
- Prisma
- backend
- authentication
- multi-tenancy
- billing
- persistence

---

# Future Backend Readiness Rule

When backend starts, do not simply copy the frontend mock shape into the database.

First validate:

- domain entities
- relationships
- persisted vs derived fields
- commercial requirements
- multi-tenant boundaries

---

# Final Principle

The data model should make the product easier to evolve commercially.

It should not lock the product into premature technical decisions.

---

# Current Frontend Type Mapping

The MVP now mirrors this data model through lightweight TypeScript modules under:

```txt
frontend/src/types/domain/
```

## Persisted Domain References

- Campaign
- User
- Squad
- WorkflowStage
- CampaignActivity
- Blocker
- Handoff
- CampaignNote
- Attachment
- CampaignMetric

## Derived Operational References

- ExecutionHealthState
- SLAState
- OperationalRiskLevel
- CoordinationState
- PressureLevel
- DerivedCampaignIntelligence

These are references for derived utilities. They are not persisted state.

## UI-Only References

- ModalUIState
- FilterUIState
- FormDraftUIState

These clarify boundaries only. UI state should stay local unless it is truly shared operational state.

## Future Commercial References

- Organization
- Workspace
- Membership

These types exist only for backend readiness and should not drive UI, permissions or billing work during the MVP.
