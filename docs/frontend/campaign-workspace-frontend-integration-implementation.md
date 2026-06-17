# Campaign Workspace Frontend Integration Implementation

## Purpose

This document defines the implementation sprint for connecting the Campaign Workspace frontend to the backend Campaign Workspace Facts Endpoint.

This sprint implements runtime frontend integration.

It follows the completed Frontend Workspace Integration Planning phase.

It must connect only the Campaign Workspace route/page.

It must not connect Dashboard, Kanban, Calendar or Campaign List.

It must not redesign the UI.

It must not add React Query, SWR, Axios, auth, RBAC or AI.

---

# Current Phase

Campaign Workspace Frontend Integration

Runtime integration is implemented for `frontend/src/pages/CampaignDetails.tsx`.

The backend has:

- Campaign Persistence API
- Campaign Blockers API
- Campaign Notes API
- Campaign Decision Context API
- Campaign Activities API
- Campaign Handoffs API
- Campaign Workspace Facts Endpoint

The backend endpoint is:

```txt
GET /campaigns/:campaignId/workspace
```

The frontend currently renders Campaign Workspace from:

```txt
frontend/src/pages/CampaignDetails.tsx
```

Current data source:

```txt
useCampaigns()
  -> useCampaignsStore()
  -> MOCK_CAMPAIGNS
```

Current local workspace behavior:

```txt
useCampaignWorkspaceState(sourceCampaign)
```

This sprint should connect `CampaignDetails.tsx` to backend workspace facts while preserving existing operational UI behavior.

---

# Sprint Goal

Implement the minimum safe frontend runtime integration for:

```txt
GET /campaigns/:campaignId/workspace
```

The integration should introduce:

- DTO types for workspace facts
- API client for workspace endpoint
- mapper from backend DTO to frontend View Model/current-compatible campaign model
- minimal loading state
- minimal error state
- minimal empty state handling
- CampaignDetails orchestration update

---

# Implementation Result

Implemented files:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
frontend/src/modules/campaigns/types/campaign-workspace.ts
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
frontend/src/modules/campaigns/mappers/index.ts
```

Updated files:

```txt
frontend/src/pages/CampaignDetails.tsx
frontend/src/modules/campaigns/hooks/useCampaignWorkspaceState.ts
frontend/src/modules/campaigns/services/index.ts
frontend/src/modules/campaigns/types/index.ts
frontend/src/modules/campaigns/index.ts
frontend/vite.config.ts
```

Implemented runtime flow:

```txt
route campaign id
  -> getCampaignWorkspaceFacts(campaignId)
  -> CampaignWorkspaceFactsDto
  -> mapCampaignWorkspaceFactsToViewModel(dto)
  -> CampaignWorkspaceViewModel with compatible Campaign
  -> useCampaignWorkspaceState(mapped campaign)
  -> existing Campaign Workspace components
```

The implementation keeps Dashboard, Kanban, Calendar and Campaign List mock/store-driven.

The implementation adds a minimal Vite development proxy for `/campaigns` so the frontend can consume the local backend without changing backend CORS behavior. `VITE_API_BASE_URL` remains available as an override.

No backend files, Prisma schema, auth, React Query, SWR, Axios, UI redesign or AI behavior were added.

---

# Integration Flow

The implementation must follow:

```txt
GET /campaigns/:campaignId/workspace
  -> frontend API client
  -> CampaignWorkspaceFactsDto
  -> mapper
  -> CampaignWorkspaceViewModel / compatible Campaign model
  -> existing derived intelligence utilities
  -> existing Campaign Workspace components
```

Do not render raw backend DTOs directly inside components.

---

# Allowed Runtime Files

This sprint may create:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
frontend/src/modules/campaigns/types/campaign-workspace.ts
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

This sprint may update existing barrel exports if they exist:

```txt
frontend/src/modules/campaigns/services/index.ts
frontend/src/modules/campaigns/types/index.ts
frontend/src/modules/campaigns/mappers/index.ts
frontend/src/modules/campaigns/index.ts
```

This sprint may update:

```txt
frontend/src/pages/CampaignDetails.tsx
```

This sprint may update:

```txt
frontend/src/modules/campaigns/hooks/useCampaignWorkspaceState.ts
```

only if required to accept the mapped campaign/view model without breaking existing local workflow behavior.

---

# Files To Avoid

Do not touch unrelated screens:

```txt
frontend/src/pages/Dashboard.tsx
frontend/src/pages/Kanban.tsx
frontend/src/pages/Calendar.tsx
frontend/src/pages/Campaigns.tsx
```

Do not replace global mock data broadly.

Do not refactor all Campaign components.

Do not change backend files unless a blocking contract mismatch is discovered and documented before implementation.

---

# API Client Scope

Create a small API client for:

```txt
GET /campaigns/:campaignId/workspace
```

Expected future function:

```ts
async function getCampaignWorkspaceFacts(
  campaignId: string,
): Promise<CampaignWorkspaceFactsDto>;
```

The client should:

- use native fetch
- call the backend endpoint
- unwrap `{ data }`
- return `CampaignWorkspaceFactsDto`
- normalize or throw frontend-safe errors
- avoid UI logic
- avoid Zustand writes
- avoid derived intelligence
- avoid component imports

The client should not:

- use React Query
- use SWR
- use Axios
- implement auth
- update store
- render fallback labels

---

# API Base URL

If no existing backend base URL convention exists, introduce the smallest safe local approach.

Preferred direction:

```txt
VITE_API_BASE_URL
```

Fallback direction for local development may be documented in code only if needed.

Do not introduce complex environment management.

Do not introduce Docker or proxy configuration unless truly required.

---

# DTO Types Scope

Create DTO types that mirror backend transport facts.

Recommended location:

```txt
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
```

Expected DTO:

```ts
export type CampaignWorkspaceFactsDto = {
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

DTOs must not contain:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- progress
- sla
- dashboardWarnings
- AI summaries
- Copilot insights

---

# Mapper Scope

Create a mapper:

```txt
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

The mapper should convert:

```txt
CampaignWorkspaceFactsDto
  -> CampaignWorkspaceViewModel
```

or, if safer for current compatibility:

```txt
CampaignWorkspaceFactsDto
  -> existing Campaign-compatible View Model
```

The mapper should bridge backend facts into the current UI shape.

Current frontend `Campaign` compatibility fields include:

- owner
- squad
- progress
- sla

These should be composed/derived in the frontend.

Do not require the backend to return those fields.

---

# CampaignDetails Integration Scope

Update:

```txt
frontend/src/pages/CampaignDetails.tsx
```

The page may:

- read `id` from route params
- call workspace facts API
- manage local loading/error state with React primitives
- map DTO into View Model
- pass mapped data into existing `CampaignWorkspace`
- preserve existing shell and layout
- preserve existing local workflow interactions where possible

The page should not:

- become a large data engine
- calculate complex derived intelligence inline
- render raw DTOs
- connect Dashboard/Kanban/Calendar
- introduce global state complexity

---

# useCampaignWorkspaceState Boundary

Current hook:

```txt
useCampaignWorkspaceState(sourceCampaign)
```

This hook currently manages:

- local checklist
- local activity feed
- local feedback toast
- local workflow actions
- local priority/status interactions

This sprint should preserve this behavior unless a small adaptation is needed.

Do not rewrite it into a backend sync engine.

Do not make it perform backend writes.

Do not turn it into a workflow runtime.

---

# Derived Intelligence Preservation

The frontend must continue deriving:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- command center items
- timeline presentation
- progress display
- next operational action

Use existing utilities under:

```txt
frontend/src/modules/campaigns/utils/
```

Do not move these calculations to backend.

Do not expect these fields from backend DTOs.

---

# Loading State

The integration must include a simple loading state.

Current page already has:

```txt
Loading campaign context...
```

It may be reused or slightly adjusted.

Do not redesign loading UI.

Do not introduce skeleton systems.

---

# Error State

The integration must handle:

- campaign not found
- backend unavailable
- unexpected load failure

Expected mapping:

```txt
CAMPAIGN_NOT_FOUND -> Campaign not found / Workspace unavailable
network failure -> Backend unavailable
unexpected response -> Unable to load campaign workspace
```

Do not expose raw technical errors.

Do not show stack traces.

---

# Empty States

Backend empty arrays are valid:

```txt
blockers: []
notes: []
decisionContext: []
activities: []
handoffs: []
```

The mapper or View Model should preserve empty arrays or map them to existing calm empty UI behavior.

Empty arrays must not break the workspace.

---

# Mock Replacement Scope

This sprint may replace CampaignDetails data loading for the workspace route.

It must not remove all campaign mocks globally.

Do not break:

- Dashboard
- Kanban
- Calendar
- Campaign List

These screens may continue using existing mock/store data.

Do not remove:

```txt
frontend/src/modules/campaigns/mock/campaigns.mock.ts
```

unless no other screen needs it, which is not expected in this sprint.

---

# What This Sprint Must Not Implement

Do not implement:

- Dashboard backend integration
- Kanban backend integration
- Calendar backend integration
- Campaign List backend integration
- frontend auth
- RBAC
- React Query
- SWR
- Axios
- global API cache
- new Zustand backend cache
- backend writes from workspace interactions
- timeline backend
- command center backend
- derived intelligence backend
- AI/Copilot
- UI redesign

---

# Backend Boundary

Do not change backend code in this sprint.

If a blocking contract mismatch is discovered:

- stop
- document the mismatch
- do not patch backend casually
- report the exact DTO or endpoint mismatch

Backend is considered stable for this integration.

---

# Success Criteria

This sprint succeeds if:

- CampaignDetails can load a campaign workspace from backend facts
- API client exists and is typed
- DTO types exist and remain fact-only
- mapper exists and protects components from raw DTOs
- existing Campaign Workspace layout remains stable
- derived intelligence remains frontend-derived
- loading state works
- error state works
- empty child resources do not break the UI
- Dashboard/Kanban/Calendar remain untouched
- frontend lint/build pass
- backend remains untouched or regression passes if checked

---

# Final Principle

Connect only the Campaign Workspace to backend facts.

Do not use this integration as an excuse to redesign the frontend or create a new frontend architecture platform.
