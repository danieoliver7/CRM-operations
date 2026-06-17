# ADR-028: Frontend Workspace Integration Planning

## Status

Accepted

---

# Context

CRM Operations Platform has completed the Backend V1 fact foundation for Campaign Workspace.

The backend now has:

- Campaign Persistence API
- Campaign Blockers API
- Campaign Notes API
- Campaign Decision Context API
- Campaign Activities API
- Campaign Handoffs API
- Campaign Workspace Facts Endpoint

The endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

returns composed persisted facts for Campaign Workspace.

The frontend still uses mock/local operational state.

The next step should not immediately replace the UI without planning.

---

# Decision

Before implementing runtime frontend integration, we will define a Frontend Workspace Integration Planning phase.

This phase documents:

- API client direction
- DTO type direction
- mapper direction
- View Model direction
- mock replacement strategy
- loading/error/empty behavior
- derived intelligence preservation
- frontend boundaries
- what the next implementation sprint may and may not do

---

# Why

Campaign Workspace already contains significant operational intelligence in the frontend.

Connecting backend facts directly to components without a mapping plan could cause:

- backend DTO leakage into UI
- loss of derived execution intelligence
- broken mock compatibility
- duplicated domain logic
- accidental frontend redesign
- accidental backend schema changes for UI convenience

A planning phase reduces this risk.

---

# What We Will Do

We will create documentation for:

- Frontend Workspace Integration Planning
- Campaign Workspace API Client Plan
- Campaign Workspace DTO Mapping Plan
- Campaign Workspace Integration Validation
- Frontend API Patterns

---

# What We Will Not Do

This planning phase will not implement:

- frontend API client runtime code
- frontend mapper runtime code
- component integration
- mock replacement
- React Query
- SWR
- auth
- RBAC
- backend changes
- UI redesign
- AI/Copilot behavior

---

# Integration Boundary

The future implementation should follow:

```txt
Backend facts
  -> API client
  -> DTOs
  -> mapper
  -> View Model
  -> derived intelligence
  -> components
```

Components should not render raw backend DTOs directly.

Recommended future locations:

- API client: `frontend/src/modules/campaigns/services/campaign-workspace.service.ts`
- DTO types: `frontend/src/modules/campaigns/types/campaign-workspace-api.ts`
- View Model types: `frontend/src/modules/campaigns/types/campaign-workspace.ts`
- Mapper: `frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts`
- Workspace orchestration point: `frontend/src/pages/CampaignDetails.tsx`

Because the current Campaign Workspace already lives inside the Campaigns domain, this ADR does not approve a separate `frontend/src/modules/campaign-workspace/` module.

---

# Derived Intelligence Boundary

The following remain frontend-derived:

- executionHealth
- SLA state
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- dashboard warnings
- progress display
- next operational action

The backend endpoint remains fact-based.

---

# Mock Replacement Boundary

Mocks should be replaced gradually.

The future implementation should avoid:

- replacing all mocks at once
- breaking dashboard/kanban/calendar
- silently mixing incompatible mock/backend data
- deleting fallback data before backend mapping is validated

---

# Fetching Library Boundary

Default direction:

```txt
native fetch first
```

Do not add React Query, SWR, Axios or similar libraries unless explicitly approved.

---

# Consequences

## Positive

- frontend integration becomes safer
- Campaign Workspace UI can preserve existing operational intelligence
- DTO/ViewModel boundary becomes explicit
- future implementation sprint becomes easier to control

## Negative

- no runtime integration happens during this planning phase
- backend endpoint remains unused by frontend until the next sprint

These tradeoffs are accepted.

---

# Final Decision

Frontend Workspace Integration Planning is required before Campaign Workspace frontend runtime integration begins.
