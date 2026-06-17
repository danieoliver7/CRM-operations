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

# Implemented Endpoint Direction

Backend V1 now allows the composed Campaign Workspace Facts Endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

This endpoint should return persisted facts needed by Campaign Workspace.

It should not return derived command center summaries as backend truth.

Expected response direction:

```ts
type CampaignWorkspaceFactsResponse = {
  data: {
    campaign: CampaignDto;
    owner: UserDto | null;
    squad: SquadDto | null;
    blockers: CampaignBlockerDto[];
    notes: CampaignNoteDto[];
    decisionContext: CampaignDecisionContextDto[];
    activities: CampaignActivityDto[];
    handoffs: CampaignHandoffDto[];
  };
};
```

Existing individual resource endpoints remain valid:

```txt
GET /campaigns/:campaignId
GET /campaigns/:campaignId/blockers
GET /campaigns/:campaignId/notes
GET /campaigns/:campaignId/decision-context
GET /campaigns/:campaignId/activities
GET /campaigns/:campaignId/handoffs
```

The composed endpoint exists to reduce future frontend read orchestration.

It must not replace write endpoints.

It must not introduce frontend integration by itself.

---

# Frontend Integration Planning Direction

The backend endpoint is implemented.

Frontend integration remains deferred until planning is complete.

The frontend should consume:

```txt
GET /campaigns/:campaignId/workspace
```

through a frontend API client, not directly inside visual components.

The response should be mapped into a Campaign Workspace View Model before rendering.

Recommended future frontend integration target:

```txt
frontend/src/pages/CampaignDetails.tsx
  -> frontend/src/modules/campaigns/services/campaign-workspace.service.ts
  -> frontend/src/modules/campaigns/types/campaign-workspace-api.ts
  -> frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
  -> frontend/src/modules/campaigns/types/campaign-workspace.ts
```

The existing Campaign Workspace visual components should continue receiving UI-ready props and should not fetch the endpoint directly.

The frontend must continue deriving:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timeline presentation events
- SLA label
- progress display
- dashboard warnings

This contract does not authorize runtime frontend implementation by itself.

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
- actorId
- type
- category
- message
- metadata
- relatedBlockerId
- relatedNoteId
- relatedDecisionContextId
- relatedHandoffId
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
- status
- fromStage
- toStage
- fromOwnerId
- toOwnerId
- fromSquadId
- toSquadId
- reason
- completedAt
- cancelledAt
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
- timelineEvents
- SLA label
- planning pressure
- owner pressure
- squad pressure
- dashboard warnings
- next best action
- recommended action
- AI summary
- Copilot insight

The frontend derives these from campaign facts and related operational records.

A future backend intelligence layer may be evaluated later, but it is not part of the Campaign Workspace Facts Endpoint.

# Campaign Workspace Facts Endpoint Boundary

The Campaign Workspace Facts Endpoint is a read-only composition endpoint.

It may compose:

- Campaign facts
- owner reference facts
- squad reference facts
- Blockers
- Notes
- Decision Context
- Activities
- Handoffs

It must not:

- create records
- update records
- generate timeline events
- calculate command center summaries
- calculate execution health
- calculate operational risk
- calculate coordination state
- calculate workflow continuity
- call AI
- return recommendations
- connect frontend

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

During frontend integration, these empty arrays should map into calm operational empty states, not generic broken data states.

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
