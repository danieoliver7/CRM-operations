# Persistence Boundaries

## Purpose

This document defines what future backend persistence should store, what should remain derived and what should remain UI-only.

This is a planning document.

No database schema should be created in this phase.

---

# Persistence Rule

Persist facts.

Derive intelligence.

Ignore UI state.

---

# Persisted Domain Data

Future backend persistence may store these operational facts.

## Campaign

Campaign is the central operational aggregate.

Persist:

- id
- workspaceId
- name
- description
- objective
- status
- channel
- priority
- ownerId
- squadId
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

Do not persist compatibility-only display fields as permanent backend shape:

- owner object used by current frontend mock
- squad string used by current frontend mock
- progress as UI display unless later validated as persisted fact
- SLA display string

## User

Persist:

- id
- name
- email
- avatarUrl
- role
- squadId
- isActive
- createdAt
- updatedAt

Do not implement authentication in the first planning scope.

## Squad

Persist:

- id
- workspaceId
- name
- description
- leadUserId
- createdAt
- updatedAt

## WorkflowStage

Persist as reference/configuration data if needed:

- id
- key
- label
- order
- description
- defaultResponsibleArea

Do not implement workflow runtime.

## CampaignActivity

Persist meaningful operational activity:

- id
- campaignId
- actorUserId
- type
- category
- message
- metadata
- createdAt
- updatedAt

Do not persist UI activity such as filters, modal state or tab changes.

## Blocker

Persist:

- id
- campaignId
- title
- description
- severity
- status
- createdByUserId
- resolvedByUserId
- resolvedAt
- createdAt
- updatedAt

## Handoff

Persist:

- id
- campaignId
- fromStage
- toStage
- fromOwnerId
- toOwnerId
- fromSquadId
- toSquadId
- status
- completedAt
- createdAt
- updatedAt

## CampaignNote

Persist:

- id
- campaignId
- authorUserId
- type
- title
- content
- relatedWorkflowStage
- relatedBlockerId
- relatedHandoffId
- relatedActivityId
- importance
- createdAt
- updatedAt

Do not create comments, replies or threads yet.

## DecisionContext

Persist:

- id
- campaignId
- authorUserId
- type
- title
- content
- relatedWorkflowStage
- relatedBlockerId
- relatedHandoffId
- relatedActivityId
- importance
- createdAt
- updatedAt

Decision context is operational reasoning, not chat.

## Attachment

Persist later:

- id
- campaignId
- name
- url
- type
- uploadedByUserId
- createdAt
- updatedAt

File storage itself is deferred.

## CampaignMetric

Persist later:

- id
- campaignId
- metricType
- value
- source
- capturedAt
- createdAt
- updatedAt

Do not build analytics warehouse in the first backend.

## Commercial Entities

Prepare for later:

- Organization
- Workspace
- Membership

These are future commercial boundaries.

Do not implement tenant runtime, billing or advanced permissions in the first backend.

---

# Derived Operational Intelligence

Do not persist as primary truth:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- planning pressure
- owner pressure
- squad pressure
- overloaded day state
- overloaded owner state
- overloaded squad state
- delayed workflow stage state
- blocker count
- risk count
- days until due
- command center summary

These should be recalculated from persisted facts.

Current frontend utility examples:

- executionHealthMetrics
- coordinationMetrics
- capacityMetrics
- operationalTimeline
- collaborationContext
- campaignWorkflow

---

# Timeline Boundary

Persist activity facts.

Do not persist timeline presentation state as primary truth.

Timeline event cards may be derived from:

- activities
- campaign facts
- blockers
- handoffs
- decision context
- SLA and due dates

If timeline snapshots are ever needed later, that should be a separate decision.

---

# UI-Only State

Never persist as domain data:

- modal open state
- selected filters
- active tabs
- search terms
- collapsed sections
- hover state
- temporary form drafts
- local sorting
- scroll position
- command menu state

UI state can remain local or URL-based.

---

# Backend Planning Guardrail

If a value exists only to render a current component, it is not automatically a backend field.

Backend fields should represent durable operational facts.

---

# Final Principle

Persistence should make operational facts durable without freezing derived intelligence too early.
