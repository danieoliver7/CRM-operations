# Frontend API Patterns

## Purpose

This document defines how the frontend should consume future backend APIs.

It exists to keep API usage consistent, simple and aligned with the product architecture.

---

# Current Status

The project does not yet have backend implementation.

The current phase is Frontend Backend Contract Preparation.

Do not create API clients, fetchers, React Query setup or real service integrations during this phase unless explicitly requested.

---

# Core Rule

Frontend components should not render raw API DTOs directly.

Recommended future flow:

```txt
API DTO
  -> feature mapper
  -> View Model
  -> component
```

Components render operational UI.

Hooks coordinate data usage.

Services/API clients fetch facts.

Mappers prepare View Models.

Utils derive intelligence.

---

# Component Boundary

Components should receive:

- View Models
- display labels
- derived state
- callbacks
- empty state copy

Components should not:

- call `fetch` directly
- know endpoint URLs
- parse backend DTOs
- calculate API errors
- persist operational intelligence

---

# Hook Boundary

Future hooks may coordinate API usage and local UI state.

Hooks may:

- call feature services
- invoke mappers
- expose loading/error/empty states
- combine mapped facts with derived intelligence

Hooks should not become backend replacements or orchestration runtimes.

---

# Service Boundary

Future API services should fetch backend facts and return DTOs or typed responses.

Services should not:

- render UI messages
- derive command center summaries
- create workflow engines
- hide product decisions behind generic CRUD utilities

---

# Mapper Boundary

Mappers convert DTOs to View Models.

They should handle:

- `ownerId` plus `UserDto` into owner display data
- `squadId` plus `SquadDto` into squad display data
- missing optional reference data
- DTO field naming differences
- fallback labels

Mappers should not persist data or call APIs.

---

# Error Handling Direction

Backend errors should become operational messages.

Examples:

- campaign not found
- workspace unavailable
- campaign could not be saved
- blocker could not be resolved

Avoid exposing raw framework errors to components.

---

# Empty State Direction

Empty arrays are valid successful responses.

Examples:

- no blockers
- no handoffs
- no notes
- no decision context
- no activities

The frontend should translate these into calm operational empty states, not backend errors.

---

# Derived Intelligence Boundary

The frontend continues to derive:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- planning pressure
- owner pressure
- squad pressure
- command center summary
- timeline presentation events

These should remain in feature/domain utilities unless a later backend product decision changes the boundary.

---

# Campaign Workspace Priority

Campaign Workspace is the first API consumption priority.

Future frontend API work should support:

```txt
CampaignWorkspaceResponseDto
  -> CampaignWorkspaceViewModel
  -> Campaign Workspace sections
```

Do not create separate screen-specific API clients for Dashboard, Kanban and Calendar until implementation planning proves they are needed.

---

# What Not To Build During Contract Preparation

Do not create:

- fetch clients
- axios clients
- React Query setup
- SWR setup
- real API hooks
- endpoint files
- DTO TypeScript files
- mapper runtime code

Documentation may suggest future locations, but this sprint should not create runtime implementation.
