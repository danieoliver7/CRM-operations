# Campaign Workspace DTO Mapping Plan

## Status

Implemented

This mapping plan was approved as input for Campaign Workspace Frontend Integration.

Runtime implementation created:

```txt
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
frontend/src/modules/campaigns/types/campaign-workspace.ts
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

## Purpose

This document defines how Campaign Workspace backend DTOs should be mapped into frontend View Models.

Runtime mapper code is now implemented for the CampaignDetails route only.

---

# Mapping Goal

The backend returns facts.

The frontend renders operational UI.

A mapper is needed between these layers.

Correct flow:

```txt
CampaignWorkspaceFactsDto
  -> mapCampaignWorkspaceFactsToViewModel()
  -> CampaignWorkspaceViewModel
  -> derived intelligence utilities
  -> Campaign Workspace components
```

Current workspace rendering starts at:

```txt
frontend/src/pages/CampaignDetails.tsx
```

Current Campaign Workspace components live under:

```txt
frontend/src/modules/campaigns/components/
```

Current derived utilities live under:

```txt
frontend/src/modules/campaigns/utils/
```

---

# Source DTO

The source DTO is returned by:

```txt
GET /campaigns/:campaignId/workspace
```

Expected shape:

```ts
type CampaignWorkspaceFactsDto = {
  campaign: CampaignDto;
  owner: UserDto | null;
  squad: SquadDto | null;
  blockers: CampaignBlockerDto[];
  notes: CampaignNoteDto[];
  decisionContext: CampaignDecisionContextDto[];
  activities: CampaignActivityDto[];
  handoffs: CampaignHandoffDto[];
};
```

Exact fields must follow backend DTOs.

---

# Target View Model

The target View Model should support the existing Campaign Workspace UI.

Suggested direction:

```ts
type CampaignWorkspaceViewModel = {
  campaign: CampaignViewModel;
  owner: OwnerViewModel | null;
  squad: SquadViewModel | null;

  blockers: BlockerViewModel[];
  notes: NoteViewModel[];
  decisionContext: DecisionContextViewModel[];
  activities: ActivityViewModel[];
  handoffs: HandoffViewModel[];

  emptyStates: CampaignWorkspaceEmptyStates;
};
```

Derived intelligence may be attached by existing utilities or a separate derivation layer.

Do not force one large mega View Model if existing frontend structure is cleaner.

---

# Required Mapping Decisions

## Campaign

Map backend campaign facts into the existing frontend campaign shape carefully.

Backend facts:

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
- dates
- createdAt
- updatedAt

Frontend compatibility fields must be derived or composed:

- owner
- squad
- progress
- sla

Do not require backend to return these compatibility fields.

---

## Owner

Map:

```txt
campaign.ownerId + owner DTO -> owner display View Model
```

If owner is null:

- show unassigned state
- do not break header
- do not create fake backend owner

---

## Squad

Map:

```txt
campaign.squadId + squad DTO -> squad display View Model
```

If squad is null:

- show no squad assigned state
- do not calculate squad pressure from backend
- do not create fake backend squad

---

## Blockers

Map blocker facts into existing blocker/risk surfaces.

Derived risk labels may be computed in frontend.

Do not ask backend for operationalRisk.

---

## Notes

Map note facts into operational memory cards.

Do not turn notes into comments, chat or replies.

---

## Decision Context

Map decision context facts into rationale/decision cards.

Do not ask backend for AI-generated explanation.

---

## Activities

Map activity facts into activity feed items.

Timeline presentation must remain derived.

Do not ask backend for timelineEvents.

---

## Handoffs

Map handoff facts into coordination/handoff UI.

Workflow continuity must remain derived.

Do not ask backend for workflowContinuity.

---

# Derived Fields That Stay Frontend-Side

The mapper or derivation utilities may create:

- progress display
- SLA label/state
- execution health
- operational risk
- coordination state
- workflow continuity
- command center items
- timeline presentation events
- empty state labels
- next operational action text

These must not be added to backend DTOs.

---

# Empty State Mapping

Backend empty arrays:

```txt
blockers: []
notes: []
decisionContext: []
activities: []
handoffs: []
```

Should map to calm operational empty states:

- no blockers detected
- no operational notes yet
- no decision context recorded
- no activity history yet
- no handoffs recorded

Do not render broken UI.

Do not show generic "No data" when a more operational message exists.

---

# Error Mapping

Backend/API errors should map into workspace-level UI states.

Expected mapping:

```txt
CAMPAIGN_NOT_FOUND -> Workspace not found
network failure -> Backend unavailable
invalid response -> Workspace data could not be loaded
```

Do not expose raw technical error details to users.

---

# Mapper Placement Direction

Recommended future location based on the current Campaigns module:

```txt
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

Optional barrel:

```txt
frontend/src/modules/campaigns/mappers/index.ts
```

The mapper should be a pure function where possible.

It should be testable independently from React components.

Recommended View Model type location:

```txt
frontend/src/modules/campaigns/types/campaign-workspace.ts
```

Recommended DTO type location:

```txt
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
```

The existing `frontend/src/types/campaign.ts` currently contains UI compatibility fields such as `owner`, `squad`, `progress` and `sla`. The mapper should bridge backend facts into compatible View Models without asking the backend to return those fields.

---

# What Not To Do In Mapper

The mapper must not:

- perform fetch calls
- mutate Zustand directly
- call React hooks
- import visual components
- call backend writes
- generate AI summaries
- create fake backend facts
- silently swallow invalid required facts
- persist anything

---

# Current Mock Compatibility Dependencies

The future mapper must account for the current mock-driven workspace shape.

Current mock source:

```txt
frontend/src/modules/campaigns/mock/campaigns.mock.ts
```

Current shared operational state:

```txt
frontend/src/stores/campaigns.store.ts
```

Current workspace hook:

```txt
frontend/src/modules/campaigns/hooks/useCampaignWorkspaceState.ts
```

Current route:

```txt
frontend/src/pages/CampaignDetails.tsx
```

Mock compatibility fields currently expected by components/utilities include:

- `campaign.owner.name`
- `campaign.owner.avatar`
- `campaign.squad`
- `campaign.progress`
- `campaign.sla`
- `campaign.metricsTarget.expectedKpi`
- `campaign.content.subject`
- `campaign.content.preheader`
- `campaign.content.cta`

The future mapper should provide these through View Models or compatibility adapters while preserving backend DTO purity.

---

# Planning Output

The next implementation sprint should decide exact file locations based on existing frontend structure.

This document defines the intended boundary, not final file paths.

---

# Final Principle

DTO mapping protects both sides:

- backend stays fact-based
- frontend keeps operational intelligence and presentation logic
