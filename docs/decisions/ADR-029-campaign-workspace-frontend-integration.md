# ADR-029: Campaign Workspace Frontend Integration

## Status

Accepted

---

# Context

CRM Operations Platform completed:

- Backend V1 fact foundation
- Campaign Workspace Facts Endpoint
- Frontend Workspace Integration Planning

The backend endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

returns persisted Campaign Workspace facts.

The frontend currently renders Campaign Workspace from:

```txt
frontend/src/pages/CampaignDetails.tsx
```

using mock/store data through:

```txt
useCampaigns()
```

and local workspace behavior through:

```txt
useCampaignWorkspaceState(sourceCampaign)
```

The planning phase decided to keep the integration inside:

```txt
frontend/src/modules/campaigns/
```

instead of creating a parallel `campaign-workspace` module.

---

# Decision

We will implement Campaign Workspace Frontend Integration.

This integration may create:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
frontend/src/modules/campaigns/types/campaign-workspace.ts
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

It may update:

```txt
frontend/src/pages/CampaignDetails.tsx
```

It may update exports/barrels under:

```txt
frontend/src/modules/campaigns/
```

---

# Why

The backend now provides a composed fact endpoint.

The Campaign Workspace is the main product surface.

Connecting this one workspace route first provides backend durability without forcing all screens to migrate.

---

# Integration Boundary

The integration must follow:

```txt
Backend facts
  -> API client
  -> DTO types
  -> mapper
  -> View Model / compatible Campaign model
  -> existing derived intelligence
  -> components
```

Components must not render raw backend DTOs directly.

---

# Scope

This sprint is allowed to connect only:

```txt
frontend/src/pages/CampaignDetails.tsx
```

to:

```txt
GET /campaigns/:campaignId/workspace
```

---

# Non-Scope

This sprint must not connect:

- Dashboard
- Kanban
- Calendar
- Campaign List

This sprint must not add:

- React Query
- SWR
- Axios
- auth
- RBAC
- AI/Copilot
- backend writes
- backend schema changes
- UI redesign

---

# Derived Intelligence Position

The following remain frontend-derived:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- command center content
- timeline presentation
- progress display
- dashboard warnings
- next operational action

Backend DTOs must not be expected to provide these fields.

---

# Mock Position

Mocks should not be removed globally.

Existing mocks may remain for:

- Dashboard
- Kanban
- Calendar
- Campaign List
- fallback paths if needed

Only CampaignDetails workspace loading should move toward backend facts in this sprint.

---

# Fetching Library Position

Use native fetch first.

Do not add React Query, SWR or Axios.

The product does not yet need a fetching framework.

---

# Consequences

## Positive

- Campaign Workspace starts using durable backend data
- backend facts become useful in the main product surface
- DTO/ViewModel boundary becomes real
- existing UI intelligence can be preserved

## Negative

- other screens remain mock-driven
- local workspace actions may still be local-only
- no auth yet
- no global data-fetching framework yet

These tradeoffs are accepted.

---

# Final Decision

Implement the minimal safe Campaign Workspace frontend integration without broad frontend migration or architecture expansion.