# DTO To View Model Mapping

## Purpose

This document defines how future API DTOs should be mapped into frontend View Models.

It exists to prevent backend DTOs from leaking directly into UI components and to prevent UI compatibility fields from becoming backend schema by accident.

---

# Core Rule

Components render View Models.

APIs return DTOs.

Domain utilities derive intelligence.

```txt
API DTO
  -> mapper
  -> View Model
  -> derived intelligence
  -> component
```

---

# Terms

## DTO

Transport shape returned by the backend.

DTOs should expose persisted or reference facts.

## View Model

Frontend shape prepared for components.

View Models may include labels, display fallbacks, joined owner/squad data and derived fields.

## Domain Model

Frontend domain type representing operational concepts and current MVP compatibility.

The current `Campaign` type contains both future backend-aligned facts and temporary UI compatibility fields.

## Derived Model

Calculated operational intelligence such as execution health, SLA state, risk, coordination state and workflow continuity.

## UI Compatibility Field

Temporary field used to keep the current mock UI working while backend contracts are prepared.

Examples:

- `owner`
- `squad`
- `progress`
- `sla`

---

# Mapping Decisions

## ownerId to owner View Model

Backend fact:

```txt
campaign.ownerId
```

Frontend mapping:

```txt
CampaignDto + UserDto -> owner display object
```

The backend may compose owner reference data in `CampaignWorkspaceResponseDto`, but components should still receive a mapped owner View Model.

## squadId to squad View Model

Backend fact:

```txt
campaign.squadId
```

Frontend mapping:

```txt
CampaignDto + SquadDto -> squad display object or squad label
```

Squad pressure remains derived and should not be stored as a squad field.

## dueDate to SLA Display

Backend fact:

```txt
campaign.dueDate
```

Frontend derivation:

```txt
dueDate + status + current date -> SLA state and SLA label
```

The backend should not persist `sla` labels as source of truth.

## status to Workflow Display

Backend fact:

```txt
campaign.status
```

Frontend derivation:

```txt
status -> workflow label, progress display, next action, handoff context
```

The backend should not persist `progress` as a primary campaign field.

## activities, blockers, handoffs and decisionContext to Timeline

Backend facts:

```txt
activities
blockers
handoffs
decisionContext
notes
campaign dates
campaign status
```

Frontend derivation:

```txt
facts -> operational timeline presentation events
```

Timeline cards are presentation models. They should not be persisted as Backend V1 truth.

---

# Campaign Mapping Direction

Recommended future mapping:

```txt
CampaignWorkspaceResponseDto
  -> CampaignWorkspaceViewModel
  -> CampaignWorkspace components
```

The View Model may include:

- campaign identity
- owner display
- squad display
- workflow display
- execution health
- SLA state
- operational risks
- coordination state
- command center items
- timeline presentation events
- decision context cards
- empty state messages

Only the DTO facts should be sent back to the backend.

---

# Mock Compatibility Warnings

Do not convert current mock fields into backend schema fields without review.

| Current frontend field | Future interpretation |
| --- | --- |
| `owner` | View Model composed from `ownerId` and `UserDto` |
| `squad` | View Model composed from `squadId` and `SquadDto` |
| `progress` | Derived from workflow status |
| `sla` | Derived from dates and workflow context |
| command center summary | Derived from campaign facts, blockers and handoffs |
| timeline event card | Presentation derived from facts |

---

# Mapper Placement

Frontend Workspace Integration Planning may define mapper placement.

Runtime mapper code should not be created during planning.

Recommended future direction based on the current frontend module structure:

```txt
frontend/src/modules/campaigns/mappers/mapCampaignWorkspaceFactsToViewModel.ts
```

Supporting future types:

```txt
frontend/src/modules/campaigns/types/campaign-workspace-api.ts
frontend/src/modules/campaigns/types/campaign-workspace.ts
```

The implementation sprint should choose the location that best matches the existing frontend structure.

The mapper should convert:

```txt
CampaignWorkspaceFactsDto
  -> CampaignWorkspaceViewModel
```

The mapper should not live inside visual components.

The current Campaign Workspace page is:

```txt
frontend/src/pages/CampaignDetails.tsx
```

The current Campaign Workspace components live in:

```txt
frontend/src/modules/campaigns/components/
```

---

# Campaign Workspace Mapping Planning

The current planning phase defines how the implemented backend workspace endpoint will map to frontend View Models.

The mapper should preserve:

- owner display
- squad display
- progress display
- SLA state
- execution health
- operational risk
- coordination state
- workflow continuity
- command center items
- timeline presentation events
- empty state messages

These remain frontend-derived or frontend-composed.

They must not be added to backend DTOs.

---

# Error And Empty Mapping

Backend errors should map into operational messages.

Empty arrays should map into calm operational empty states:

- no blockers detected
- no handoffs recorded
- no decision context recorded
- no activity history yet

Empty arrays should not produce broken UI or generic "No data" messages.
