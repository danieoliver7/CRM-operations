# Domain Entities

## Purpose

This document defines the core domain entities of CRM Operations Platform.

The goal is to prepare the product for future backend implementation without introducing backend complexity too early.

This document is NOT a database schema.

It is a product-domain reference.

---

# Entity Philosophy

Entities should represent real operational concepts from CRM operations.

Entities should NOT be created only because the UI needs a component.

The domain model must support:

- campaign planning
- workflow coordination
- execution intelligence
- operational blockers
- handoffs
- ownership
- squad visibility
- operational continuity
- future persistence

---

# Core Entity: Campaign

Campaign is the central entity of the platform.

Everything revolves around Campaign.

A Campaign represents:

- operational context
- workflow state
- owner responsibility
- squad involvement
- execution health
- blockers
- risk
- SLA awareness
- planning pressure
- coordination continuity

## Campaign Should Contain

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
- campaignType
- audience
- segmentation
- tags
- createdAt
- updatedAt

## Campaign Should NOT Contain

- derived execution health as persisted truth
- derived risk as persisted truth
- derived coordination state as persisted truth
- UI-only state
- modal state
- temporary filter state

---

# Entity: User / Operator

Represents a person operating campaigns.

This may be:

- CRM analyst
- copywriter
- designer
- QA analyst
- marketing automation developer
- manager
- approver

## User Should Contain

- id
- name
- email
- avatarUrl
- role
- squadId
- isActive
- createdAt
- updatedAt

## User Should NOT Contain Yet

- complex permissions
- enterprise RBAC
- authentication logic
- billing data
- organization-level security policies

---

# Entity: Squad

Represents an operational team responsible for campaign execution.

Examples:

- Lifecycle
- Growth
- Retention
- Acquisition
- CRM Ops
- Marketing Automation
- Design
- Copy

## Squad Should Contain

- id
- name
- description
- leadUserId
- createdAt
- updatedAt

## Squad Should Support

- ownership visibility
- capacity perception
- operational pressure
- handoff context

---

# Entity: Workflow Stage

Represents a campaign execution stage.

Current stages:

- briefing
- copy
- approval
- development
- qa
- scheduled
- sent
- completed

## Workflow Stage Should Contain

- id
- key
- label
- order
- description
- defaultResponsibleArea

## Workflow Stage Should NOT Become

- workflow engine
- state machine runtime
- BPM system
- automation layer

---

# Entity: Campaign Activity

Represents an operational event related to a campaign.

Examples:

- status changed
- priority changed
- blocker added
- owner changed
- handoff completed
- campaign created
- due date changed

## Campaign Activity Should Contain

- id
- campaignId
- actorUserId
- type
- message
- metadata
- createdAt

## Activity Should NOT Become

- realtime event bus
- audit system
- analytics pipeline
- notification engine

---

# Entity: Blocker

Represents operational friction preventing or delaying execution.

Examples:

- missing assets
- missing approval
- missing owner
- missing segmentation
- QA blocked
- approval delayed

## Blocker Should Contain

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

## Blocker Should NOT Become

- ticket system
- incident management
- Jira clone
- escalation workflow

---

# Entity: Handoff

Represents an operational transition between workflow stages or responsible areas.

Examples:

- briefing to copy
- copy to approval
- approval to development
- development to QA
- QA to scheduled

## Handoff Should Contain

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

## Handoff Should NOT Become

- dependency graph engine
- workflow orchestrator
- automation runtime

---

# Entity: Campaign Note

Represents contextual operational notes inside a campaign workspace.

## Campaign Note Should Contain

- id
- campaignId
- authorUserId
- content
- createdAt
- updatedAt

## Campaign Note Should NOT Become

- chat replacement
- realtime collaboration system
- document editor

---

# Entity: Attachment

Represents campaign-related operational assets.

Examples:

- briefing file
- copy document
- creative asset
- QA evidence
- implementation link

## Attachment Should Contain

- id
- campaignId
- name
- url
- type
- uploadedByUserId
- createdAt

## Attachment Should NOT Become

- asset management platform
- file storage architecture
- DAM system

---

# Entity: Campaign Metric

Represents performance or delivery metrics.

This is not the focus of the current MVP.

## Campaign Metric May Contain Later

- id
- campaignId
- metricType
- value
- source
- capturedAt

## Campaign Metric Should NOT Become Yet

- BI layer
- analytics platform
- reporting engine
- attribution system

---

# Derived Concepts

The following concepts should remain derived for now:

- execution health
- SLA state
- operational risk
- coordination state
- planning pressure
- owner pressure
- squad pressure
- workflow continuity
- delayed workflow stages

They should NOT be persisted as primary truth during the MVP.

---

# Entity Priority For Future Backend

## Priority 1

- Campaign
- User
- Squad
- WorkflowStage

## Priority 2

- CampaignActivity
- Blocker
- Handoff
- CampaignNote

## Priority 3

- Attachment
- CampaignMetric

---

# Final Rule

Persist real operational facts.

Derive operational intelligence from those facts.

Do not persist derived awareness too early.

---

# Current Frontend Domain Type Organization

The frontend now keeps domain reference types in:

```txt
frontend/src/types/domain/
```

Current modules:

- base
- campaign
- user
- squad
- workflow
- activity
- blocker
- handoff
- note
- attachment
- metric
- commercial
- derived
- ui-state

This organization prepares the frontend domain model for future backend implementation.

It does NOT introduce backend, persistence, database schema or API behavior.

## Compatibility Rule

The existing frontend may continue importing from:

```txt
frontend/src/types/campaign.ts
```

That file remains a compatibility export while the domain model stabilizes.

## Derived Intelligence Rule

The following remain derived in utilities:

- execution health
- SLA state
- operational risk
- coordination state
- planning pressure
- workflow continuity

They should not become persisted entity fields during the MVP.
