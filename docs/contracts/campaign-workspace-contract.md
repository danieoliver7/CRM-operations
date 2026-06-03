# Campaign Workspace Contract

## Purpose

This document defines the contract required to make Campaign Workspace durable in Backend V1.

Campaign Workspace is the center of the product experience. Backend V1 should prioritize the data needed by this surface before expanding to secondary screens.

---

# Workspace Contract Goal

The Campaign Workspace contract should allow the frontend to load all operational facts needed to render:

- CampaignWorkspaceHeader
- CampaignOperationalCommandCenter
- CampaignOperationalTimeline
- CampaignDecisionContext
- CampaignActivityFeed
- CampaignSquadPanel
- CampaignQuickActions
- CampaignChecklist
- CampaignAttachments placeholder or metadata
- execution intelligence
- coordination awareness
- operational memory

The contract should not return derived command center summaries as backend truth.

---

# Suggested Endpoint Direction

Possible future composed endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

Candidate response:

```ts
type CampaignWorkspaceResponseDto = {
  campaign: CampaignDto;
  owner?: UserDto;
  squad?: SquadDto;
  activities: CampaignActivityDto[];
  blockers: BlockerDto[];
  handoffs: HandoffDto[];
  notes: CampaignNoteDto[];
  decisionContext: DecisionContextDto[];
};
```

Alternative future resource endpoints:

```txt
GET /campaigns/:campaignId
GET /campaigns/:campaignId/activities
GET /campaigns/:campaignId/blockers
GET /campaigns/:campaignId/handoffs
GET /campaigns/:campaignId/notes
GET /campaigns/:campaignId/decision-context
```

Both directions remain valid for planning. The implementation planning sprint should decide whether Backend V1 starts with a composed workspace endpoint, separate resource endpoints, or a small hybrid.

---

# Required Workspace Facts

## Campaign

Required facts:

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

Campaign facts power identity, workflow state, planning context and derived intelligence.

Do not persist `progress`, `sla`, execution health, coordination state or command center summary as campaign facts.

---

## Owner

Required as reference data when `ownerId` exists:

- id
- name
- avatarUrl
- roleLabel

Owner reference data powers workspace header, squad panel, operational ownership and next action display.

Auth is not implied.

---

## Squad

Required as reference data when `squadId` exists:

- id
- name
- description

Squad reference data powers workspace header and operational context.

Squad pressure remains derived.

---

## Activities

Required facts:

- id
- campaignId
- actorUserId
- type
- category
- message
- metadata
- createdAt
- updatedAt

Activities power activity feed, operational history and timeline derivation.

Activities must not become event sourcing.

---

## Blockers

Required facts:

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

Blockers power execution intelligence, operational risks, command center attention and timeline derivation.

Blockers must not become tickets.

---

## Handoffs

Required facts:

- id
- campaignId
- fromStatus
- toStatus
- fromOwnerId
- toOwnerId
- fromSquadId
- toSquadId
- status
- reason
- completedAt
- canceledAt
- createdAt
- updatedAt

Handoffs power coordination awareness, workflow continuity, next responsible area and timeline derivation.

Handoffs must not become dependency graph runtime.

---

## Notes

Required facts:

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

Notes preserve operational memory.

Notes must not become chat, replies or threaded comments.

---

## Decision Context

Required facts:

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

Decision Context explains why execution changed.

Decision Context must not become a comment system.

---

## Attachments

Backend MVP may include attachment metadata only if needed for workspace durability.

Allowed planning facts:

- id
- campaignId
- name
- type
- url or storage reference
- uploadedByUserId
- createdAt

File upload and storage remain deferred unless a later implementation sprint explicitly approves them.

---

# What The Workspace Contract Must Not Include

Do not include these as backend truth:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timeline presentation events
- SLA label
- planning pressure
- owner pressure
- squad pressure

The frontend derives these from campaign facts and related operational records.

---

# Empty States

The workspace contract should allow the frontend to handle:

- no blockers
- no activities
- no notes
- no decision context
- no active handoffs
- no attachment metadata

These should not be backend errors.

The frontend should display calm operational empty states instead of generic missing-data messages.

---

# Other Screens

## Dashboard

Can be derived from campaign lists and operational facts.

## Kanban

Can be derived from campaigns grouped by status.

## Calendar

Can be derived from campaign dates.

## Campaigns List

Can be derived from campaign list responses.

Do not create special Backend V1 contracts for these screens unless implementation planning proves they are needed.
