# ADR-027: Campaign Workspace Facts Endpoint

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Skeleton Implementation
- Prisma And Database Foundation
- Reference Data Implementation
- Campaign Persistence Implementation
- Campaign Child Resources Planning
- Campaign Blockers Implementation
- Campaign Notes Implementation
- Campaign Decision Context Implementation
- Campaign Activities Implementation
- Campaign Handoffs Implementation

The backend now has:

- NestJS runtime
- Prisma/PostgreSQL
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API
- Campaign Notes API
- Campaign Decision Context API
- Campaign Activities API
- Campaign Handoffs API

Campaign is durable and has all planned child resource APIs for Backend V1.

The approved child resource order places Campaign Workspace Facts Endpoint after Handoffs.

---

# Decision

We will implement a composed Campaign Workspace facts endpoint.

Allowed endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

This endpoint will return persisted operational facts needed by Campaign Workspace.

---

# Why

The Campaign Workspace is the main product surface.

After implementing all child resource APIs, the backend can now provide a composed read model for the workspace.

This reduces future frontend orchestration while keeping backend intelligence out of scope.

The endpoint should aggregate facts, not calculate meaning.

---

# What We Will Do

We will compose:

- Campaign facts
- Owner reference facts
- Squad reference facts
- Blocker facts
- Note facts
- Decision Context facts
- Activity facts
- Handoff facts

We will return them through a simple `{ data }` response.

---

# What We Will Not Do

We will not implement:

- frontend API client
- frontend mappers
- frontend mock replacement
- auth
- RBAC
- Docker
- realtime
- notifications
- workflow engine
- dependency graph
- timeline generation
- command center logic
- derived intelligence persistence
- automatic activity creation
- AI features
- semantic search
- embeddings

---

# Facts Boundary

The endpoint returns facts only.

It must not return derived intelligence as backend truth.

Forbidden backend truth includes:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- dashboardWarnings
- planningPressure
- ownerPressure
- squadPressure
- SLA label
- progress
- AI summary
- Copilot insight

---

# Timeline Boundary

Timeline remains a presentation layer.

Activities, blockers, notes, decision context and handoffs may later feed timeline derivation.

This endpoint must not generate timeline events.

Do not return `timeline`.

Do not return `timelineEvents`.

---

# Command Center Boundary

Command Center remains derived.

This endpoint must not calculate or return:

- commandCenterSummary
- nextBestAction
- recommendedAction
- operationalDiagnosis
- severityScore
- priorityScore

---

# Frontend Boundary

This sprint does not connect the frontend.

No frontend API client should be implemented.

No mock replacement should happen.

No React components should be changed to consume this endpoint.

---

# Operational Copilot Position

Workspace facts may become useful future input for a CRM Operations Copilot.

This sprint must not implement AI.

AI-ready means facts are clean and composable.

AI-ready does not mean embeddings, prompts, semantic search or Copilot UI.

---

# Response Position

Preferred response:

```ts
type CampaignWorkspaceFactsResponse = {
  data: {
    campaign: CampaignDto;
    owner?: UserDto | null;
    squad?: SquadDto | null;
    blockers: CampaignBlockerDto[];
    notes: CampaignNoteDto[];
    decisionContext: CampaignDecisionContextDto[];
    activities: CampaignActivityDto[];
    handoffs: CampaignHandoffDto[];
  };
};
```

Use existing DTO mappers when practical.

Do not expose raw Prisma internals.

---

# Consequences

## Positive

- Backend can now serve the main Campaign Workspace surface with one composed fact endpoint
- Future frontend integration becomes easier
- All child resource APIs remain independently usable
- Product keeps fact/derived intelligence boundary clean

## Negative

- No frontend integration yet
- No command center backend logic yet
- No timeline backend yet
- No AI behavior yet

These tradeoffs are accepted.

---

# Guardrails

Do not expand this sprint into frontend integration.

Do not calculate derived intelligence.

Do not create timeline backend.

Do not create command center backend.

Do not add auth.

Do not create AI behavior.

---

# Final Decision

Campaign Workspace Facts Endpoint completes the Backend V1 fact composition layer for Campaign Workspace while preserving intelligence, presentation and frontend integration for later sprints.