# Backend V1 API Implementation Plan

## Purpose

This document defines the planned Backend V1 API implementation direction.

It is not route implementation, controller code, or an OpenAPI specification.

---

# API Goal

Backend V1 APIs should expose persisted operational facts needed by the frontend.

APIs should be:

- REST-first
- resource-oriented
- campaign-centered
- simple
- aligned with frontend-backend contracts

APIs should not expose derived intelligence as backend truth.

---

# Contract References

API planning must follow:

- `/docs/contracts/frontend-backend-contract.md`
- `/docs/contracts/api-response-shapes.md`
- `/docs/contracts/dto-to-view-model-mapping.md`
- `/docs/contracts/campaign-workspace-contract.md`
- `/docs/backend/api-boundaries.md`

---

# Response Philosophy

APIs return DTOs.

Frontend maps DTOs into View Models.

Frontend derives intelligence.

```txt
API DTO
  -> mapper
  -> View Model
  -> derived intelligence
  -> operational UI
```

---

# First API Groups

Backend V1 should plan these API groups:

- workspaces
- users
- squads
- campaigns
- campaign activities
- blockers
- handoffs
- notes
- decision context

These groups expose operational facts required by Campaign Workspace durability.

---

# Recommended API Order

## 1. Workspace Reference

Purpose:

- provide default workspace context
- prepare workspace-compatible scoping

Possible routes:

```txt
GET /workspaces
GET /workspaces/:workspaceId
```

Do not implement tenant runtime.

---

## 2. Users Reference

Purpose:

- provide owner and author reference data

Possible routes:

```txt
GET /users
GET /users/:userId
```

Do not implement auth in the first local/internal validation cut.

---

## 3. Squads Reference

Purpose:

- provide squad reference data

Possible routes:

```txt
GET /squads
GET /squads/:squadId
```

Do not expose squad pressure as backend truth.

---

## 4. Campaigns

Purpose:

- persist and expose campaign facts

Possible routes:

```txt
GET /campaigns
GET /campaigns/:campaignId
POST /campaigns
PATCH /campaigns/:campaignId
PATCH /campaigns/:campaignId/status
PATCH /campaigns/:campaignId/priority
PATCH /campaigns/:campaignId/owner
PATCH /campaigns/:campaignId/squad
```

Keep status, priority, owner and squad changes as fact updates.

Do not create workflow orchestration endpoints.

---

## 5. Campaign Workspace Response

Recommended first strategy:

```txt
GET /campaigns/:campaignId/workspace
```

This endpoint should return a composed `CampaignWorkspaceResponseDto`:

```txt
campaign
owner
squad
activities
blockers
handoffs
notes
decisionContext
```

Why composed first:

- Campaign Workspace is the central product surface.
- The frontend needs a coherent set of facts to render the workspace.
- A composed read endpoint lowers frontend integration risk.
- It avoids a burst of parallel frontend calls during the first backend integration.
- It does not prevent separate resource endpoints for writes or later optimization.

Guardrail:

The composed endpoint must return facts only. It must not return command center summaries, execution health, risk state, SLA labels, workflow continuity or timeline presentation events as backend truth.

---

## 6. Campaign Child Resources

These endpoints should support fact reads/writes around the Campaign Workspace.

Activities:

```txt
GET /campaigns/:campaignId/activities
POST /campaigns/:campaignId/activities
```

Blockers:

```txt
GET /campaigns/:campaignId/blockers
POST /campaigns/:campaignId/blockers
PATCH /campaigns/:campaignId/blockers/:blockerId
POST /campaigns/:campaignId/blockers/:blockerId/resolve
```

Handoffs:

```txt
GET /campaigns/:campaignId/handoffs
POST /campaigns/:campaignId/handoffs
PATCH /campaigns/:campaignId/handoffs/:handoffId
POST /campaigns/:campaignId/handoffs/:handoffId/complete
POST /campaigns/:campaignId/handoffs/:handoffId/cancel
```

Notes:

```txt
GET /campaigns/:campaignId/notes
POST /campaigns/:campaignId/notes
PATCH /campaigns/:campaignId/notes/:noteId
```

Decision Context:

```txt
GET /campaigns/:campaignId/decision-context
POST /campaigns/:campaignId/decision-context
PATCH /campaigns/:campaignId/decision-context/:decisionContextId
```

Do not create chat, comments, event sourcing, dependency graph or workflow runtime behavior.

---

# Workspace Endpoint Recommendation

Backend V1 should start with a composed Campaign Workspace read endpoint plus separate resource endpoints for writes where needed.

Recommended first read:

```txt
GET /campaigns/:campaignId/workspace
```

Recommended write direction:

```txt
POST/PATCH campaign child resources
```

This hybrid keeps the first frontend integration simple while preserving REST resource clarity.

Separate-only reads may become useful later for caching, partial refreshes or large data volumes, but they add integration complexity too early.

---

# API Shapes To Avoid

Do not implement first-backend endpoints like:

```txt
GET /campaigns/:campaignId/execution-health
GET /campaigns/:campaignId/operational-risk
GET /campaigns/:campaignId/coordination-state
GET /campaigns/:campaignId/workflow-continuity
GET /campaigns/:campaignId/command-center-summary
GET /campaigns/:campaignId/timeline-events
```

These remain derived from persisted facts.

---

# Final Principle

API implementation should make operational facts available.

It should not move frontend-derived intelligence into backend truth.
