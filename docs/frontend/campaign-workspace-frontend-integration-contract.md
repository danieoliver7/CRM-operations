# Campaign Workspace Frontend Integration Contract

## Purpose

This document defines the runtime integration contract for connecting Campaign Workspace frontend to backend workspace facts.

It translates the planning docs into implementation boundaries.

---

# Runtime Contract

The runtime integration connects:

```txt
frontend/src/pages/CampaignDetails.tsx
```

to:

```txt
GET /campaigns/:campaignId/workspace
```

through:

```txt
frontend/src/modules/campaigns/services/campaign-workspace.service.ts
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

---

# Required Data Flow

Implemented flow:

```txt
Route param campaignId
  -> getCampaignWorkspaceFacts(campaignId)
  -> CampaignWorkspaceFactsDto
  -> mapCampaignWorkspaceFactsToViewModel(dto)
  -> CampaignWorkspaceViewModel
  -> CampaignWorkspace components
```

Components must not consume `CampaignWorkspaceFactsDto` directly.

The implemented mapper returns a `CampaignWorkspaceViewModel` containing a current-compatible frontend `Campaign` plus child resource arrays/activity feed view data.

Local development may route `/campaigns` through the Vite dev proxy. This is a frontend development bridge only and does not change backend API ownership.

---

# DTO Contract

DTO types represent backend transport facts.

DTOs may include:

- campaign
- owner
- squad
- blockers
- notes
- decisionContext
- activities
- handoffs

DTOs must not include:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- progress
- sla
- dashboardWarnings
- nextBestAction
- AI summary
- Copilot insight

---

# View Model Contract

View Models may include frontend-composed and frontend-derived data.

View Models may include:

- owner display
- squad display
- progress display
- SLA display
- execution health
- operational risk
- coordination state
- workflow continuity
- command center items
- timeline presentation events
- empty state labels

These are frontend concerns.

---

# Campaign Compatibility Contract

Current Campaign Workspace components expect a frontend-compatible campaign shape.

The mapper may produce a current-compatible `Campaign` or a `CampaignWorkspaceViewModel`.

If producing a compatible `Campaign`, it must preserve required UI compatibility fields:

- owner
- squad
- progress
- sla
- content
- metricsTarget
- segmentation

When backend facts are missing, use calm fallback values.

Do not create fake persisted facts.

Fallbacks are presentation compatibility only.

---

# Owner/Squad Contract

Backend returns:

```ts
owner: UserDto | null;
squad: SquadDto | null;
```

Frontend maps:

```txt
owner DTO/null -> owner display object/unassigned display
squad DTO/null -> squad display/no squad assigned display
```

Do not require backend to return frontend labels.

---

# Activities Contract

Backend activities are facts.

Current sidebar activity feed expects display-oriented activity items.

The mapper or workspace state may convert backend activities into activity feed items.

Do not treat backend Activities as event sourcing.

Do not ask backend for timeline events.

---

# Timeline Contract

Timeline presentation remains frontend-derived.

Frontend may derive timeline from:

- campaign
- blockers
- notes
- decisionContext
- activities
- handoffs

Backend must not be expected to return:

```txt
timeline
timelineEvents
timelinePresentation
```

---

# Command Center Contract

Command center remains frontend-derived.

Frontend may derive command center from:

- campaign status
- priority
- dates
- blockers
- handoffs
- activities
- decision context

Backend must not be expected to return:

```txt
commandCenterSummary
nextBestAction
recommendedAction
operationalDiagnosis
```

---

# Error Contract

Known error mapping:

```txt
CAMPAIGN_NOT_FOUND -> not found workspace state
network error -> backend unavailable state
unknown error -> unable to load workspace state
```

Do not expose raw errors to visual components.

---

# Loading Contract

Loading should preserve the current page simplicity.

A minimal loading state is enough.

Do not introduce a skeleton system.

---

# Scope Boundary

This contract applies only to Campaign Workspace route/page.

Implemented route/page:

```txt
frontend/src/pages/CampaignDetails.tsx
```

It does not apply to:

- Dashboard
- Kanban
- Calendar
- Campaign List

Those remain mock/store-driven until explicitly integrated.

---

# Final Principle

Runtime integration should make backend facts usable by the existing Campaign Workspace without leaking backend DTOs into UI components.
