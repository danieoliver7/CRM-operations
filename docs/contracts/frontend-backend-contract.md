# Frontend Backend Contract

## Purpose

This document defines how the future backend should expose operational facts and how the frontend should consume them before backend implementation begins.

This is contract planning only. It is not backend implementation, an OpenAPI specification, a Prisma schema, or frontend API client code.

---

# Current Phase

Frontend Backend Contract Preparation

The project has already validated the operational product model, Backend MVP scope, Backend V1 stack direction, and frontend layout stability. The next step is to protect the interface between frontend and backend before technical execution starts.

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

API boundaries define resource ownership.

Contracts define response and request shape direction.

Implementation planning should not begin until these boundaries are understood.
