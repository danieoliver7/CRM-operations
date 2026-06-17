# Campaign Workspace API Client Plan

## Status

Implemented

This plan was approved as input for Campaign Workspace Frontend Integration.

Runtime implementation created:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
```

## Purpose

This document defines the planned frontend API client direction for Campaign Workspace integration.

Runtime API client code is now implemented for the CampaignDetails route only.

The implementation uses native `fetch`, unwraps `{ data }`, returns `CampaignWorkspaceFactsDto` and normalizes workspace load errors.

Local development uses a minimal Vite proxy for `/campaigns` when `VITE_API_BASE_URL` is not provided. This keeps browser integration working without changing backend code.

---

# Target Endpoint

The frontend should eventually consume:

```txt
GET /campaigns/:campaignId/workspace
```

This endpoint returns Campaign Workspace facts.

---

# Client Responsibility

The frontend API client should:

- call the workspace facts endpoint
- parse JSON response
- return typed DTO data
- surface backend errors in a predictable shape
- avoid UI logic
- avoid derived intelligence
- avoid component-specific formatting

The API client should not:

- derive execution health
- derive SLA state
- derive timeline
- derive command center items
- mutate response into component props
- contain UI fallback labels
- import React components
- update Zustand directly unless explicitly planned

---

# Suggested Client Shape

Future direction:

```ts
async function getCampaignWorkspaceFacts(
  campaignId: string
): Promise<CampaignWorkspaceFactsDto> {
  // fetch GET /campaigns/:campaignId/workspace
}
```

Return the inner `data` payload to callers if that matches project conventions.

Alternatively, return the full API response if the project prefers response wrappers.

Choose one convention and document it in implementation.

---

# Suggested File Location

Recommended location based on the current repository structure:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
```

Export from:

```txt
frontend/src/modules/campaigns/services/index.ts
```

Reason:

- Campaign API services currently live in `frontend/src/modules/campaigns/services/`.
- Campaign Workspace is currently rendered from `frontend/src/pages/CampaignDetails.tsx`.
- Existing Campaign Workspace components already live in `frontend/src/modules/campaigns/components/`.
- A separate `frontend/src/modules/campaign-workspace/` module would add structure before the product needs it.

Do not create this file during planning.

---

# DTO Types

The API client should use DTO types that mirror backend transport shapes.

Recommended DTO type location:

```txt
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
```

Export from:

```txt
frontend/src/modules/campaigns/types/index.ts
```

Keep these as transport DTOs only.

DTO types must not contain frontend-derived fields.

Do not include:

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

---

# Error Handling Direction

The client should normalize errors into simple frontend-safe outcomes.

Expected backend error:

```txt
CAMPAIGN_NOT_FOUND
```

Frontend handling direction:

```txt
CAMPAIGN_NOT_FOUND -> workspace not found state
network error -> backend unavailable state
invalid response -> workspace load error state
```

Do not expose raw backend stack traces.

Do not expose raw Prisma errors.

---

# Environment / Base URL Direction

The implementation sprint should check existing project conventions before adding environment variables.

If no API base URL convention exists, use a minimal one such as:

```txt
VITE_API_BASE_URL
```

Do not introduce complex environment management.

Do not introduce Docker.

Do not introduce proxy configuration unless required and explicitly documented.

The current frontend has:

```txt
frontend/src/services/mockClient.ts
frontend/src/modules/campaigns/services/campaigns.service.ts
```

No backend API base URL runtime convention is currently implemented.

The next implementation sprint should introduce the smallest possible base URL handling, likely local to the API client first or through a small shared helper if more than one backend client is introduced.

---

# Fetching Library Decision

Default direction:

```txt
Use native fetch first.
```

Do not add React Query, SWR, Axios or another library unless explicitly approved.

Reason:

- current integration is one endpoint
- MVP should avoid dependency expansion
- loading/error states can be handled simply first

A future decision may introduce React Query after multiple backend reads exist.

---

# Auth Boundary

Do not implement auth.

Do not add bearer token handling.

Do not add session handling.

Do not add refresh token logic.

Auth remains deferred.

---

# Runtime Boundary

This document does not authorize runtime implementation.

It only defines the next sprint direction.

---

# Expected Future Function Contract

Future implementation direction:

```ts
async function getCampaignWorkspaceFacts(
  campaignId: string,
): Promise<CampaignWorkspaceFactsDto>;
```

The function should:

- call `GET /campaigns/:campaignId/workspace`
- unwrap `{ data }`
- return `CampaignWorkspaceFactsDto`
- throw or return normalized frontend-safe errors
- avoid UI labels
- avoid derived intelligence
- avoid Zustand writes

Do not implement this function during this planning sprint.

---

# Final Principle

The API client should fetch backend facts.

It should not become a domain mapper, state manager, intelligence engine or UI layer.
