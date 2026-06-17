# Campaign Workspace Facts API Contract

## Purpose

This document defines the API contract for the Campaign Workspace Facts Endpoint.

It covers only the composed read endpoint for Campaign Workspace facts.

It does not cover frontend integration.

It does not cover derived intelligence.

It does not cover timeline generation.

It does not cover command center logic.

---

# Contract Philosophy

The Campaign Workspace Facts Endpoint should return persisted operational facts needed by the Campaign Workspace.

It should compose existing resources.

It should not calculate operational intelligence.

It should not return presentation models.

It should not create a new source of truth.

---

# Endpoint

Allowed endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

No other workspace endpoints are allowed in this sprint.

---

# Standard Detail Response

Use:

```ts
type DetailResponse<T> = {
  data: T;
};
```

The endpoint should return:

```ts
type CampaignWorkspaceFactsResponse =
  DetailResponse<CampaignWorkspaceFactsDto>;
```

---

# Standard Error Response

Use:

```ts
type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};
```

Do not expose raw Prisma errors.

---

# Campaign Workspace Facts DTO

Suggested shape:

```ts
type CampaignWorkspaceFactsDto = {
  campaign: CampaignDto;

  owner?: UserDto | null;
  squad?: SquadDto | null;

  blockers: CampaignBlockerDto[];
  notes: CampaignNoteDto[];
  decisionContext: CampaignDecisionContextDto[];
  activities: CampaignActivityDto[];
  handoffs: CampaignHandoffDto[];
};
```

Use existing DTO shapes when available.

Do not expose raw Prisma entities.

Do not invent frontend view models.

---

# Campaign Facts

`campaign` should use the existing Campaign DTO.

Expected role:

- identity
- planning facts
- ownership ids
- status
- priority
- dates
- campaign attributes
- timestamps

Do not add derived fields to Campaign DTO for this endpoint.

Do not add:

- progress
- sla
- executionHealth
- coordinationState
- operationalRisk
- commandCenterSummary

---

# Owner Facts

`owner` should be loaded from reference users when `campaign.ownerId` exists.

If ownerId is null:

```ts
owner: null
```

If ownerId exists but the referenced user is missing, prefer preserving existing data integrity behavior from Campaign APIs.

Do not implement auth.

Do not expose private user data.

Use existing public User DTO/reference shape.

---

# Squad Facts

`squad` should be loaded from reference squads when `campaign.squadId` exists.

If squadId is null:

```ts
squad: null
```

Use existing public Squad DTO/reference shape.

Do not calculate squad pressure.

---

# Blockers

`blockers` should contain campaign-scoped blocker facts.

Use existing Blocker DTO mapping.

Expected empty state:

```ts
blockers: []
```

Do not return tickets, SLA engine data or escalation workflows.

---

# Notes

`notes` should contain campaign-scoped note facts.

Use existing Note DTO mapping.

Expected empty state:

```ts
notes: []
```

Do not return chat, replies, mentions or threaded comment behavior.

---

# Decision Context

`decisionContext` should contain campaign-scoped decision context facts.

Use existing Decision Context DTO mapping.

Expected empty state:

```ts
decisionContext: []
```

Do not return approvals, knowledge base hierarchy or AI-generated rationale.

---

# Activities

`activities` should contain campaign-scoped activity facts.

Use existing Activity DTO mapping.

Expected empty state:

```ts
activities: []
```

Do not return event sourcing metadata, audit log data, replay data or timeline presentation.

---

# Handoffs

`handoffs` should contain campaign-scoped handoff facts.

Use existing Handoff DTO mapping.

Expected empty state:

```ts
handoffs: []
```

Do not return workflow graph, dependency graph, task tree or workflow continuity score.

---

# Ordering Rules

Suggested ordering:

- blockers: most recently updated or created first
- notes: most recently updated or created first
- decisionContext: most recently updated or created first
- activities: most recent first
- handoffs: most recently updated or created first

Keep ordering simple.

Do not introduce ranking, scoring or intelligence.

---

# Error Codes

Allowed workspace-related error codes:

```txt
CAMPAIGN_NOT_FOUND
```

Do not create new error catalogs unless truly necessary.

If child collections are empty, return empty arrays.

Empty child collections are not errors.

---

# What Not To Return

Do not return:

```txt
executionHealth
slaState
slaLabel
operationalRisk
coordinationState
workflowContinuity
commandCenterSummary
dashboardWarnings
planningPressure
ownerPressure
squadPressure
timeline
timelineEvents
timelinePresentation
nextBestAction
recommendedAction
AI summary
AI recommendation
Copilot insight
raw Prisma internals
```

---

# What Not To Implement

Do not implement:

```txt
POST /campaigns/:campaignId/workspace
PATCH /campaigns/:campaignId/workspace
GET /campaigns/:campaignId/workspace/timeline
GET /campaigns/:campaignId/workspace/command-center
GET /campaigns/:campaignId/workspace/intelligence
GET /campaigns/:campaignId/workspace/copilot
```

Do not implement:

- frontend API client
- frontend mappers
- auth
- RBAC
- timeline generation
- command center logic
- intelligence engine
- AI/Copilot
- workflow engine
- dependency graph
- automatic activity creation

---

# Example Response

```json
{
  "data": {
    "campaign": {
      "id": "campaign-id",
      "workspaceId": "workspace-id",
      "name": "June CRM campaign",
      "status": "PLANNING",
      "priority": "HIGH",
      "ownerId": "user-id",
      "squadId": "squad-id",
      "createdAt": "2026-06-08T00:00:00.000Z",
      "updatedAt": "2026-06-08T00:00:00.000Z"
    },
    "owner": {
      "id": "user-id",
      "name": "CRM Owner"
    },
    "squad": {
      "id": "squad-id",
      "name": "CRM Squad"
    },
    "blockers": [],
    "notes": [],
    "decisionContext": [],
    "activities": [],
    "handoffs": []
  }
}
```

Exact fields should follow existing DTOs.

Do not invent DTO fields unsupported by current code.

---

# Final Principle

The Campaign Workspace Facts API should reduce read orchestration.

It must not become a backend intelligence layer.