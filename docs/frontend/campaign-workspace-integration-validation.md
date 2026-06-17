# Campaign Workspace Frontend Integration Validation

## Purpose

This document defines validation rules for the future Campaign Workspace frontend integration sprint.

This is planning only.

Do not implement runtime code during this planning sprint.

---

# Validation Goal

Validate that the Campaign Workspace frontend can consume backend facts safely without losing existing operational intelligence.

The integration should connect to:

```txt
GET /campaigns/:campaignId/workspace
```

---

# Required Pre-Implementation Checks

Before implementation, confirm:

- backend is running
- `GET /health` works
- `GET /campaigns/:campaignId/workspace` works
- workspace endpoint returns expected facts
- frontend currently builds
- current Campaign Workspace UI works with mocks
- current derived intelligence utilities are identified
- current mock data dependencies are identified

Current paths to inspect before implementation:

```txt
frontend/src/pages/CampaignDetails.tsx
frontend/src/modules/campaigns/hooks/useCampaigns.ts
frontend/src/modules/campaigns/hooks/useCampaignWorkspaceState.ts
frontend/src/modules/campaigns/mock/campaigns.mock.ts
frontend/src/stores/campaigns.store.ts
frontend/src/modules/campaigns/utils/executionHealthMetrics.ts
frontend/src/modules/campaigns/utils/coordinationMetrics.ts
frontend/src/modules/campaigns/utils/operationalTimeline.ts
frontend/src/modules/campaigns/utils/collaborationContext.ts
frontend/src/modules/campaigns/utils/campaignWorkflow.ts
```

---

# Required Frontend Validation Commands

Run from `/frontend`:

```bash
npm run lint
npm run build
```

If tests exist:

```bash
npm run test
```

Do not add test framework complexity if it does not exist.

---

# Required Backend Regression Validation

Run from `/backend`:

```bash
npm run lint
npm run test
npm run build
```

Also validate:

```txt
GET /health
GET /campaigns/:campaignId/workspace
```

Frontend integration should not require backend changes unless a contract mismatch is found.

---

# UI Validation Checklist

Validate Campaign Workspace still renders:

- workspace header
- campaign title/status/priority
- owner display or unassigned state
- squad display or unassigned state
- operational command center
- blockers/risk section
- decision context
- activity feed
- handoff/coordination information
- timeline presentation
- quick actions/checklist/sidebar if present

---

# Data Validation Checklist

Validate mapped backend data supports:

- campaign identity
- campaign status
- priority
- owner
- squad
- blockers
- notes
- decision context
- activities
- handoffs

Validate derived frontend data still supports:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- command center items
- timeline presentation
- progress display

---

# Empty State Validation

Validate a campaign with empty child resources:

```txt
blockers: []
notes: []
decisionContext: []
activities: []
handoffs: []
```

The UI should show calm operational empty states.

It should not crash.

It should not show raw JSON.

It should not show generic broken data messages.

---

# Error State Validation

Validate:

- backend unavailable
- campaign not found
- unexpected response shape

Expected behavior:

- show operational error state
- preserve app shell
- avoid blank page
- avoid raw stack traces
- avoid unhandled promise errors

---

# Loading State Validation

Validate:

- loading while workspace data is being fetched
- no layout jump that breaks the page
- no premature "No data" before fetch completes

Loading should preserve the operational workspace feeling.

---

# Mock Replacement Validation

Validate:

- only intended mock dependencies are replaced
- unrelated pages remain stable
- dashboard/kanban/calendar are not accidentally connected
- no global state regression is introduced

The first integration should target Campaign Workspace only:

```txt
frontend/src/pages/CampaignDetails.tsx
```

Do not accidentally connect:

- Dashboard
- Kanban
- Calendar
- Campaigns list

Those screens still depend on the existing Zustand/mock campaign state and should remain stable until separately planned.

---

# Forbidden Regression

The integration fails if:

- components render raw backend DTOs directly
- derived intelligence disappears
- execution health is expected from backend
- timeline is expected from backend
- command center summary is expected from backend
- mock removal breaks unrelated screens
- API client contains UI logic
- mapper performs fetch calls
- backend schema is changed for frontend convenience
- auth is added unexpectedly
- React Query/SWR is added without approval
- AI/Copilot behavior is introduced

---

# Success Criteria

The future implementation sprint succeeds if:

- Campaign Workspace loads backend workspace facts
- DTOs are mapped before rendering
- existing UI layout remains stable
- derived intelligence remains frontend-derived
- empty states work
- loading state works
- error states work
- frontend lint/build pass
- backend remains stable
- no unrelated screens are connected
- no auth or AI is introduced

---

# Recommended Future File Validation

If the next sprint creates runtime files, validate that they stay in the planned Campaigns module locations:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
frontend/src/modules/campaigns/types/campaign-workspace.ts
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

Optional hook if needed:

```txt
frontend/src/modules/campaigns/hooks/useCampaignWorkspaceFacts.ts
```

Reject implementations that create a large parallel module or place fetching inside visual components.

---

# Final Principle

Frontend integration is successful only if backend facts improve durability without reducing the operational intelligence already present in the frontend.
