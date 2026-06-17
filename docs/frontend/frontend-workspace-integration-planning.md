# Frontend Workspace Integration Planning

## Status

Validated

Frontend Workspace Integration Planning is complete.

The next phase, Campaign Workspace Frontend Integration, has been implemented for `CampaignDetails.tsx`.

Runtime implementation remains limited to the boundaries defined by:

- `/docs/frontend/campaign-workspace-frontend-integration-implementation.md`
- `/docs/frontend/campaign-workspace-frontend-integration-contract.md`
- `/docs/frontend/campaign-workspace-frontend-integration-validation.md`
- `/docs/decisions/ADR-029-campaign-workspace-frontend-integration.md`

## Purpose

This document defines the planning phase for integrating the Campaign Workspace frontend with the backend Campaign Workspace Facts Endpoint.

This was a planning sprint.

It did not implement frontend runtime code by itself.

It does not replace mocks yet.

It does not introduce React Query, SWR or any data-fetching library.

It does not change UI behavior.

It defines how the next implementation sprint should connect the existing Campaign Workspace experience to:

```txt
GET /campaigns/:campaignId/workspace
```

---

# Current Context

The backend now has:

- Campaign Persistence API
- Blockers API
- Notes API
- Decision Context API
- Activities API
- Handoffs API
- Campaign Workspace Facts Endpoint

The composed endpoint returns:

- campaign
- owner
- squad
- blockers
- notes
- decisionContext
- activities
- handoffs

The frontend currently still uses local/mock operational state.

The next work should prepare a safe integration path.

---

# Frontend Structure Inspected

The current frontend structure places Campaign Workspace inside the existing Campaigns domain.

Relevant current files:

- `frontend/src/pages/CampaignDetails.tsx`
- `frontend/src/modules/campaigns/components/`
- `frontend/src/modules/campaigns/hooks/useCampaigns.ts`
- `frontend/src/modules/campaigns/hooks/useCampaignWorkspaceState.ts`
- `frontend/src/modules/campaigns/services/campaigns.service.ts`
- `frontend/src/modules/campaigns/mock/campaigns.mock.ts`
- `frontend/src/modules/campaigns/types/`
- `frontend/src/modules/campaigns/utils/`
- `frontend/src/stores/campaigns.store.ts`
- `frontend/src/types/campaign.ts`
- `frontend/src/types/domain/`

Current Campaign Workspace route/page:

```txt
frontend/src/pages/CampaignDetails.tsx
```

Current workspace data source:

```txt
useCampaigns()
  -> useCampaignsStore()
  -> MOCK_CAMPAIGNS
```

Current workspace local interaction state:

```txt
useCampaignWorkspaceState(sourceCampaign)
```

Current mock campaign source:

```txt
frontend/src/modules/campaigns/mock/campaigns.mock.ts
```

Current derived intelligence utilities:

```txt
frontend/src/modules/campaigns/utils/executionHealthMetrics.ts
frontend/src/modules/campaigns/utils/coordinationMetrics.ts
frontend/src/modules/campaigns/utils/operationalTimeline.ts
frontend/src/modules/campaigns/utils/collaborationContext.ts
frontend/src/modules/campaigns/utils/campaignWorkflow.ts
```

Because Campaign Workspace already lives inside the Campaigns domain, the safest future integration path is to add API, DTO and mapper code under `frontend/src/modules/campaigns/` rather than creating a parallel `campaign-workspace` module.

---

# Planning Goal

Define how frontend integration should happen without breaking the current Campaign Workspace UI.

This planning phase should define:

- which backend endpoint will be consumed
- where API client code should live
- where DTO types should live
- where mappers should live
- how DTOs become frontend View Models
- which current mock fields must remain frontend-derived
- how loading states should behave
- how error states should behave
- how empty child resources should map into calm empty states
- how to preserve existing derived intelligence
- what must not be connected yet

---

# Integration Target

Primary endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

This endpoint should be consumed by the Campaign Workspace frontend in a future implementation sprint.

The endpoint returns facts only.

The frontend must continue deriving:

- executionHealth
- SLA state
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- dashboard warnings
- next action labels
- progress display

---

# Non-Goal

This planning phase must not implement:

- frontend API client runtime code
- fetch calls
- React Query
- SWR
- service hooks
- component integration
- mock replacement
- route changes
- backend changes
- auth
- RBAC
- design changes
- UI redesign
- AI behavior

---

# Required Frontend Boundary

Frontend should not render backend DTOs directly.

Correct flow:

```txt
Backend Workspace Facts DTO
  -> frontend API client
  -> DTO types
  -> mapper
  -> Campaign Workspace View Model
  -> derived intelligence utilities
  -> components
```

Components should continue receiving UI-ready View Models, not raw backend transport shapes.

---

# Backend Facts To Consume

The frontend integration should consume:

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

Exact fields must follow the implemented backend DTOs.

Do not invent frontend-only fields in DTO types.

---

# View Model Direction

The frontend mapper should eventually produce a Campaign Workspace View Model that can support existing UI sections:

- workspace header
- operational command center
- timeline
- decision context
- activity feed
- squad panel
- quick actions
- checklist
- blocker/risk surfaces
- handoff/coordination surfaces

The View Model may include derived/presentation fields such as:

- owner display object
- squad display object
- progress display
- SLA label
- execution health
- operational risks
- coordination state
- workflow continuity
- command center items
- timeline presentation events
- empty state messages

These must be derived in frontend code.

They must not be added to backend DTOs.

---

# Mock Replacement Strategy

Do not replace all mocks at once without a mapping layer.

Recommended staged integration:

## Stage 1: API client and DTO types

Create typed client for:

```txt
GET /campaigns/:campaignId/workspace
```

No component integration yet.

## Stage 2: Mapper

Map backend DTO into an internal CampaignWorkspaceViewModel.

No UI behavior change yet.

## Stage 3: Workspace container integration

Use the mapped ViewModel inside the Campaign Workspace route/container.

Preserve existing component props as much as possible.

## Stage 4: Empty/loading/error states

Add calm operational states.

Avoid generic "No data" or broken UI states.

## Stage 5: Remove unused mock dependency

Only remove mocks that were safely replaced by backend data.

Keep unrelated mock data until explicitly replaced.

---

# Derived Intelligence Preservation

Existing frontend intelligence must remain frontend-derived.

Do not move these to backend:

- executionHealth
- sla
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- dashboardWarnings
- nextBestAction
- recommendedAction

Frontend utilities may derive them from:

- campaign status
- campaign dates
- blockers
- activities
- handoffs
- notes
- decision context
- owner/squad facts

---

# Loading State Direction

The integration should eventually support:

- initial loading
- successful loaded workspace
- not found
- backend unavailable
- unexpected error

Loading state should not redesign the workspace.

Use lightweight placeholders or existing shell layout.

---

# Error State Direction

Expected error mapping:

```txt
CAMPAIGN_NOT_FOUND -> campaign not found / workspace unavailable
network failure -> backend unavailable
unexpected response -> unable to load workspace facts
```

Error states should be operational and calm.

Do not expose raw technical errors to the UI.

---

# Empty State Direction

Backend empty arrays are valid:

```txt
blockers: []
notes: []
decisionContext: []
activities: []
handoffs: []
```

Frontend should map them into meaningful empty states:

- no blockers detected
- no notes recorded yet
- no decisions recorded yet
- no activity history yet
- no handoffs recorded yet

Empty arrays must not break the UI.

---

# API Client Placement Direction

Recommended future location based on the current frontend structure:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
```

Then export it from:

```txt
frontend/src/modules/campaigns/services/index.ts
```

Reason:

- Campaign services already live under `frontend/src/modules/campaigns/services/`.
- Campaign Workspace is currently rendered by `CampaignDetails.tsx` through `modules/campaigns`.
- Keeping the client inside the Campaigns domain avoids a premature new module.

Optional shared helper for a later implementation sprint, only if needed:

```txt
frontend/src/services/apiClient.ts
```

Do not create runtime files during this planning sprint.

---

# Mapper Placement Direction

Recommended future location:

```txt
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

Optional mapper barrel:

```txt
frontend/src/modules/campaigns/mappers/index.ts
```

The mapper should not live inside visual components.

The mapper should be tested or at least structured as a pure function in the implementation sprint.

Recommended DTO type location:

```txt
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
```

Recommended View Model type location:

```txt
frontend/src/modules/campaigns/types/campaign-workspace.ts
```

These should be exported from:

```txt
frontend/src/modules/campaigns/types/index.ts
```

---

# Feature Flag / Fallback Direction

The implementation sprint may keep a safe fallback to mock data while validating backend integration.

Possible approach:

- keep mock path available during transition
- use backend workspace data when endpoint succeeds
- show operational error state when endpoint fails
- avoid silently mixing incompatible mock/backend data

Do not implement fallback in this planning sprint.

---

# Future Workspace Consumption Point

The next implementation sprint should connect the mapped workspace data at the route/container level:

```txt
frontend/src/pages/CampaignDetails.tsx
```

The page currently:

- reads the route `id`
- calls `useCampaigns()`
- finds the campaign in Zustand/mock state
- passes the campaign to the local `CampaignWorkspace`
- uses `useCampaignWorkspaceState(sourceCampaign)` for local workflow/checklist/activity interactions

Future implementation should preserve this page as the orchestration point and avoid pushing fetch logic into visual components such as:

- `CampaignWorkspaceHeader`
- `CampaignOperationalCommandCenter`
- `CampaignOperationalTimeline`
- `CampaignDecisionContext`
- `CampaignActivityFeed`
- `CampaignSquadPanel`

If a hook is useful, prefer a small campaign-domain hook such as:

```txt
frontend/src/modules/campaigns/hooks/useCampaignWorkspaceFacts.ts
```

That hook may own loading/error state in the implementation sprint, but it should not become a global state runtime or backend cache.

---

# What The Next Implementation Sprint Should Do

The next implementation sprint may:

- create frontend DTO types
- create workspace API client
- create mapper from CampaignWorkspaceFactsDto to CampaignWorkspaceViewModel
- connect Campaign Workspace container/page to backend data
- preserve frontend-derived intelligence
- add loading/error/empty handling
- keep existing UI layout stable
- validate frontend lint/build

---

# What The Next Implementation Sprint Must Not Do

The next implementation sprint must not:

- redesign Campaign Workspace
- rewrite all components
- remove derived intelligence utilities
- move execution health/risk/SLA/coordination calculation to backend
- add auth
- add React Query/SWR unless explicitly approved
- add global state complexity unnecessarily
- connect all dashboard/kanban/calendar pages
- introduce realtime
- introduce AI/Copilot
- modify backend scope unless a blocking contract mismatch exists

---

# Success Criteria For This Planning Phase

This planning phase succeeds if the project has clear docs for:

- integration boundary
- API client direction
- DTO mapping direction
- View Model direction
- mock replacement strategy
- loading/error/empty strategy
- what must stay derived
- what the next implementation sprint should and should not do

---

# Final Principle

Frontend Workspace Integration should connect the UI to backend facts without damaging the operational intelligence already derived in the frontend.
