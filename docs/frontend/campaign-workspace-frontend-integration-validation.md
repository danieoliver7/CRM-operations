# Campaign Workspace Frontend Integration Validation

## Status

Implemented for Campaign Workspace Frontend Integration

Use this validation plan during the runtime implementation sprint.

Additional implementation-specific validation is defined in:

- `/docs/frontend/campaign-workspace-frontend-integration-validation.md`

---

## Purpose

This document defines validation for the Campaign Workspace Frontend Integration sprint.

It validates runtime frontend integration with:

```txt
GET /campaigns/:campaignId/workspace
```

---

# Validation Goal

Validate that Campaign Workspace can load backend workspace facts without losing current operational UI behavior.

---

# Required Frontend Commands

Run from `/frontend`:

```bash
npm run lint
npm run build
```

If tests exist:

```bash
npm run test
```

Do not add a new test framework just for this sprint.

---

# Required Backend Commands

Backend should not be changed.

If backend is unchanged, at minimum validate runtime endpoint manually.

If backend files were touched by mistake, run from `/backend`:

```bash
npm run lint
npm run test
npm run build
```

---

# Required Backend Runtime Checks

Validate:

```txt
GET /health
GET /campaigns/:campaignId/workspace
```

---

# Required UI Checks

Validate that Campaign Workspace still renders:

- workspace header
- campaign title
- status
- priority
- owner display or unassigned fallback
- squad display or fallback
- operational command center
- briefing section
- copy section
- attachments section
- implementation context
- operational timeline
- decision context
- quick actions
- checklist
- squad panel
- activity feed

Implementation note:

- `CampaignDetails.tsx` now owns loading/error orchestration for backend workspace facts.
- Existing visual components still receive mapped frontend data, not raw backend DTOs.
- `useCampaignWorkspaceState` still owns local-only checklist, feedback and workflow action behavior.

---

# Data Loading Checks

Validate:

- valid campaign id loads backend data
- invalid campaign id shows not found/error state
- backend unavailable shows backend unavailable state
- loading state appears before data is available
- empty child arrays do not crash the UI

---

# DTO Boundary Checks

Validate that components do not receive raw backend DTOs directly.

Expected boundary:

```txt
API DTO -> mapper -> View Model / compatible Campaign model -> components
```

---

# Derived Intelligence Checks

Validate that these remain available in UI:

- execution health
- SLA state/label
- operational risk
- coordination state
- workflow continuity
- command center content
- timeline presentation
- progress display

Validate that backend DTOs are not expected to provide these directly.

---

# Scope Regression Checks

Confirm these screens remain out of scope:

- Dashboard
- Kanban
- Calendar
- Campaign List

Confirm mocks were not globally removed.

Confirm no global backend migration happened for all screens.

---

# Forbidden Additions Check

Confirm the sprint did not add:

- React Query
- SWR
- Axios
- auth
- RBAC
- new global API cache
- new Zustand backend cache
- backend writes from workspace actions
- AI/Copilot
- timeline backend
- command center backend
- dashboard integration
- kanban integration
- calendar integration

---

# Success Criteria

This sprint succeeds if:

- Campaign Workspace loads backend facts
- API client is typed
- mapper exists
- components remain protected from raw DTOs
- existing layout remains stable
- derived intelligence remains frontend-derived
- empty states work
- loading state works
- error states work
- frontend lint/build pass
- backend remains stable
- no unrelated screens are connected

---

# Failure Criteria

This sprint fails if:

- backend DTOs are rendered directly by components
- all mocks are removed globally
- Dashboard/Kanban/Calendar are connected accidentally
- React Query/SWR/Axios is added without approval
- backend schema is changed for UI convenience
- derived intelligence is moved to backend
- auth is introduced
- AI is introduced
- UI is redesigned instead of integrated

---

# Final Principle

Frontend integration is successful only when backend durability is added without damaging existing operational intelligence.
