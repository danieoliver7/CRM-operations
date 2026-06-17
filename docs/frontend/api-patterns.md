# Frontend API Patterns

## Purpose

This document defines lightweight frontend API patterns for CRM Operations Platform.

It exists to keep frontend API integration simple, typed and separated from UI components.

---

# Core Principle

API clients fetch facts.

Mappers prepare View Models.

Domain utilities derive intelligence.

Components render UI.

```txt
API client
  -> DTO
  -> mapper
  -> View Model
  -> derived intelligence
  -> component
```

---

# API Client Rules

API clients should:

- call backend endpoints
- parse response JSON
- return typed DTOs
- normalize known error responses
- remain framework-light
- avoid UI logic

API clients should not:

- import React components
- call React hooks
- mutate Zustand directly unless explicitly planned
- derive execution intelligence
- build timeline presentation
- build command center content
- create fallback UI labels
- perform backend writes not in scope

---

# Fetching Library Direction

Default MVP direction:

```txt
native fetch
```

Do not add Axios, React Query, SWR or similar libraries unless explicitly approved.

A future decision may add a fetching library after multiple backend-connected screens exist.

---

# Response Wrapper Rule

Backend responses commonly use:

```ts
type DetailResponse<T> = {
  data: T;
};

type ListResponse<T> = {
  data: T[];
};
```

Frontend API clients should parse these consistently.

---

# Error Handling Rule

Backend errors may use:

```ts
type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};
```

Frontend should map known error codes to operational UI states.

Do not expose raw technical errors in components.

---

# DTO Rule

DTOs mirror backend transport shapes.

DTOs should not contain:

- frontend labels
- progress display
- SLA labels
- timeline cards
- command center summaries
- component props
- modal state
- filter state
- AI summaries

---

# Mapper Rule

A mapper converts DTOs into View Models.

Mappers should:

- be pure when possible
- handle null references safely
- handle empty arrays
- preserve ids and timestamps
- create display fallbacks
- prepare component-friendly shapes

Mappers should not:

- fetch data
- mutate global state
- render components
- persist data
- call AI
- create fake backend facts

---

# Loading/Error/Empty Rule

Every backend-connected screen should plan for:

- loading
- loaded
- empty
- not found
- backend unavailable
- unexpected error

Empty facts are not automatically errors.

---

# Campaign Workspace Initial Pattern

For Campaign Workspace integration, the expected future flow is:

```txt
getCampaignWorkspaceFacts(campaignId)
  -> CampaignWorkspaceFactsDto
  -> mapCampaignWorkspaceFactsToViewModel(dto)
  -> CampaignWorkspaceViewModel
  -> existing Campaign Workspace components
```

Recommended future files for the first integration:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
frontend/src/modules/campaigns/types/campaign-workspace.ts
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
frontend/src/pages/CampaignDetails.tsx
```

Optional future hook:

```txt
frontend/src/modules/campaigns/hooks/useCampaignWorkspaceFacts.ts
```

Do not place fetch calls inside visual components.

Do not make components render raw `CampaignWorkspaceFactsDto`.

---

# Auth Boundary

Do not add auth handling until the auth sprint is explicitly approved.

No JWT.

No sessions.

No permissions.

No RBAC.

---

# Final Principle

Keep API integration boring.

Do not use the first frontend-backend integration as an excuse to add global architecture complexity.
