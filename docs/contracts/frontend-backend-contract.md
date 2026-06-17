# Frontend Backend Contract

## Purpose

This document defines how the backend exposes operational facts and how the frontend consumes them through DTO, mapper and View Model boundaries.

This is not an OpenAPI specification, Prisma schema or backend implementation document.

---

# Current Phase

Campaign Workspace Frontend Integration

The backend Campaign Workspace Facts Endpoint is implemented.

Frontend Workspace Integration Planning is complete.

The current implementation phase connects:

```txt
frontend/src/pages/CampaignDetails.tsx
```

to:

```txt
GET /campaigns/:campaignId/workspace
```

using:

```txt
API client
DTO types
mapper
View Model / compatible Campaign model
existing derived intelligence utilities
```

---

# Contract Goal

The contract prepares the flow between persisted facts and operational UI:

```txt
Backend persisted facts
  -> API DTOs
  -> frontend mappers
  -> frontend View Models
  -> derived intelligence
  -> operational UI
```

The goal is to prevent backend schemas from being copied from mock UI fields and to prevent frontend components from depending directly on backend DTOs.

---

# Core Principle

Backend V1 exposes persisted operational facts.

Frontend utilities derive operational intelligence.

```txt
Persist facts.
Map DTOs.
Derive intelligence.
Render operational UI.
```

---

# Current Integration Direction

Campaign Workspace frontend integration follows:

```txt
Backend Workspace Facts Endpoint
  -> frontend API client
  -> DTO types
  -> mapper
  -> Campaign Workspace View Model
  -> derived intelligence
  -> Campaign Workspace components
```

The endpoint should not be consumed directly inside visual components.

Backend DTOs should not become component props without mapping.

Implemented frontend locations:

- `frontend/src/pages/CampaignDetails.tsx` remains the Campaign Workspace orchestration point.
- `frontend/src/modules/campaigns/services/campaign-workspace.service.ts` should own the workspace facts API call.
- `frontend/src/modules/campaigns/types/campaign-workspace-api.ts` should define transport DTO types.
- `frontend/src/modules/campaigns/types/campaign-workspace.ts` should define UI-ready Campaign Workspace View Model types.
- `frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts` should map backend facts into View Models.

These paths keep the future integration inside the existing Campaigns domain instead of creating a parallel Campaign Workspace module prematurely.

# Current Runtime Boundary

Only Campaign Workspace route integration is allowed.

Dashboard, Kanban, Calendar and Campaign List remain out of scope.

The frontend must not render raw backend DTOs directly.

The backend must not be changed for UI convenience.

Derived intelligence remains frontend-derived.

---

# Contract Responsibilities

## Backend

Backend V1 should return facts such as:

- campaign identity and operational fields
- owner and squad reference data
- activities
- blockers
- handoffs
- notes
- decision context
- attachment metadata when included in scope
- metric facts when included in scope

Backend V1 should not return derived operational summaries as persisted truth.

## Frontend

The frontend should:

- map DTOs before rendering
- create View Models suited to the existing UI
- derive execution health, SLA state, risk, coordination, pressure and timeline presentation
- convert empty arrays into useful empty states
- keep mock compatibility fields out of future backend schema decisions

---

# DTO Boundary

DTOs are API transport shapes. They should be stable enough for the frontend to consume, but they are not UI component props and not database tables.

DTOs should carry facts:

- ids
- timestamps
- status values
- ownerId and squadId
- text fields
- operational records
- simple metadata

DTOs should avoid:

- display labels that can be derived
- command center summaries
- presentation-only timeline cards
- dashboard-ready widgets
- frontend filter state
- modal state

---

# View Model Boundary

View Models are frontend-facing shapes prepared for components.

View Models may combine:

- CampaignDto
- UserDto
- SquadDto
- derived labels
- derived progress display
- derived SLA label
- derived operational warnings
- fallback values for empty or missing facts

View Models should not be sent back to the backend as persistence payloads.

---

# Current Mock Compatibility Warnings

The current frontend campaign type includes fields that help the existing mock UI render smoothly:

- `owner`
- `squad`
- `progress`
- `sla`

These are compatibility or presentation fields in the current frontend. They should not automatically become Backend V1 database fields.

Future backend direction:

- `ownerId` is persisted as the owner reference.
- `squadId` is persisted as the squad reference.
- owner and squad display objects are joined or composed into responses.
- progress is derived from workflow status.
- SLA labels are derived from dates and workflow context.

---

# Derived Intelligence Protection

Do not persist these as primary backend truth in Backend V1:

- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timeline presentation events
- planning pressure
- owner pressure
- squad pressure
- dashboard warning summaries

These values remain derived from persisted facts until a later product decision says otherwise.

---

# Empty State Contract

Empty arrays are valid backend responses.

Examples:

- `blockers: []` means no operational blockers are currently known.
- `handoffs: []` means no handoff records are currently known.
- `notes: []` means no operational memory has been recorded yet.
- `decisionContext: []` means no decision rationale has been recorded yet.
- `activities: []` means no activity history is available yet.

The frontend should convert these facts into operational empty states. They are not backend errors.

---

# Contract Documents

Use these documents together:

- `/docs/contracts/api-response-shapes.md`
- `/docs/contracts/dto-to-view-model-mapping.md`
- `/docs/contracts/campaign-workspace-contract.md`
- `/docs/frontend/api-patterns.md`
- `/docs/backend/api-boundaries.md`
- `/docs/frontend/frontend-workspace-integration-planning.md`
- `/docs/frontend/campaign-workspace-api-client-plan.md`
- `/docs/frontend/campaign-workspace-dto-mapping-plan.md`
- `/docs/frontend/campaign-workspace-integration-validation.md`

API boundaries define resource ownership.

Contracts define response and request shape direction.

Implementation planning should not begin until these boundaries are understood.
