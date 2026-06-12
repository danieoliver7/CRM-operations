# Campaign Handoffs API Contract

## Purpose

This document defines the API contract for Campaign Handoffs Implementation.

It covers only Campaign Handoffs.

It does not cover Campaign Workspace.

It does not cover workflow engine behavior.

---

# Contract Philosophy

Handoffs APIs should expose campaign-scoped lightweight operational transition facts.

They should be:

- simple
- REST-first
- Prisma-backed
- campaign-scoped
- operationally meaningful
- frontend-contract compatible
- useful for future workflow continuity and Campaign Workspace composition

They should not expose workflow engine behavior, dependency graph, orchestration, task management or derived intelligence as backend truth.

---

# Standard List Response

Use:

```ts
type ListResponse<T> = {
  data: T[];
};
```

Pagination is not required in this sprint.

Do not add pagination unless clearly needed.

---

# Standard Detail Response

Use:

```ts
type DetailResponse<T> = {
  data: T;
};
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

Keep errors simple.

Do not expose raw Prisma errors.

---

# Handoff DTO

Implemented shape:

```ts
type CampaignHandoffDto = {
  id: string;
  campaignId: string;

  status: HandoffStatus;

  fromStage: CampaignStatus | null;
  toStage: CampaignStatus | null;

  fromOwnerId: string | null;
  toOwnerId: string | null;

  fromSquadId: string | null;
  toSquadId: string | null;

  reason: string | null;
  completedAt: string | null;
  cancelledAt: string | null;

  createdAt: string;
  updatedAt: string;
};
```

Use the current Prisma schema as source of truth.

Current implementation note:

- The current schema does not persist `requestedById`, `completedById`, `cancelledById`, `notes` or `dueAt`.
- The API does not accept or return those fields in this implementation.
- `fromStage` and `toStage` use the existing `CampaignStatus` enum.
- `status` uses the existing `HandoffStatus` enum: `pending`, `completed`, `cancelled`.
- A created handoff must have at least one destination: `toStage`, `toOwnerId` or `toSquadId`.

Do not include:

- workflow graph
- dependency graph
- task tree
- approval state
- escalation state
- orchestration state
- notification status
- timeline presentation fields
- AI summary
- AI recommendation
- Copilot insight
- raw Prisma internals

---

# Create Handoff Request

Implemented shape:

```ts
type CreateCampaignHandoffRequest = {
  fromStage?: string | null;
  toStage?: string | null;

  fromOwnerId?: string | null;
  toOwnerId?: string | null;

  fromSquadId?: string | null;
  toSquadId?: string | null;

  reason?: string | null;
};
```

Rules:

- campaignId comes from route param.
- campaign must exist.
- at least one destination must be provided: `toStage`, `toOwnerId` or `toSquadId`.
- fromOwnerId must exist if provided.
- toOwnerId must exist if provided.
- fromSquadId must exist if provided.
- toSquadId must exist if provided.
- `requestedById`, `notes` and `dueAt` are not accepted because the current schema does not persist them.

Do not invent enum values.

Use existing Prisma/schema/domain enum language if stage/status enums exist.

---

# Update Handoff Request

Suggested shape:

```ts
type UpdateCampaignHandoffRequest = Partial<{
  fromStage: string | null;
  toStage: string | null;

  fromOwnerId: string | null;
  toOwnerId: string | null;

  fromSquadId: string | null;
  toSquadId: string | null;

  reason: string | null;
}>;
```

Rules:

- handoff must exist.
- handoff must belong to campaignId.
- campaign must exist.
- do not update campaignId through this request.
- do not update createdAt directly.
- do not complete/cancel through generic PATCH.
- status should change only through complete/cancel endpoints unless current schema requires another safe approach.
- after update, the handoff must still have at least one destination: `toStage`, `toOwnerId` or `toSquadId`.
- `notes` and `dueAt` are not accepted because the current schema does not persist them.

---

# Complete Handoff Request

Suggested shape:

```ts
type CompleteCampaignHandoffRequest = {
};
```

Rules:

- handoff must exist.
- handoff must belong to campaignId.
- campaign must exist.
- should set status to completed.
- should set completedAt if schema supports it.
- should not change Campaign status automatically.
- should not create Activity automatically.
- `completedById` and `notes` are not accepted because the current schema does not persist them.

---

# Cancel Handoff Request

Suggested shape:

```ts
type CancelCampaignHandoffRequest = {
  reason?: string | null;
};
```

Rules:

- handoff must exist.
- handoff must belong to campaignId.
- campaign must exist.
- should set status to cancelled.
- should set cancelledAt if schema supports it.
- may update reason because the current schema persists it.
- should not change Campaign status automatically.
- should not create Activity automatically.
- `cancelledById` is not accepted because the current schema does not persist it.

---

# Endpoints

Allowed:

```txt
GET /campaigns/:campaignId/handoffs
POST /campaigns/:campaignId/handoffs
PATCH /campaigns/:campaignId/handoffs/:handoffId
POST /campaigns/:campaignId/handoffs/:handoffId/complete
POST /campaigns/:campaignId/handoffs/:handoffId/cancel
```

---

# GET /campaigns/:campaignId/handoffs

Returns:

```ts
type CampaignHandoffsListResponse =
  ListResponse<CampaignHandoffDto>;
```

Validation:

- campaign must exist

If campaign does not exist:

```ts
type ApiErrorResponse = {
  error: {
    code: "CAMPAIGN_NOT_FOUND";
    message: "Campaign not found.";
  };
};
```

---

# POST /campaigns/:campaignId/handoffs

Creates a handoff.

Returns:

```ts
type CreateCampaignHandoffResponse =
  DetailResponse<CampaignHandoffDto>;
```

Possible errors:

- CAMPAIGN_NOT_FOUND
- USER_NOT_FOUND
- SQUAD_NOT_FOUND
- INVALID_HANDOFF_INPUT

---

# PATCH /campaigns/:campaignId/handoffs/:handoffId

Updates handoff facts.

Returns:

```ts
type UpdateCampaignHandoffResponse =
  DetailResponse<CampaignHandoffDto>;
```

Possible errors:

- CAMPAIGN_NOT_FOUND
- HANDOFF_NOT_FOUND
- USER_NOT_FOUND
- SQUAD_NOT_FOUND
- INVALID_HANDOFF_INPUT

---

# POST /campaigns/:campaignId/handoffs/:handoffId/complete

Completes a handoff.

Returns:

```ts
type CompleteCampaignHandoffResponse =
  DetailResponse<CampaignHandoffDto>;
```

Possible errors:

- CAMPAIGN_NOT_FOUND
- HANDOFF_NOT_FOUND
- USER_NOT_FOUND
- INVALID_HANDOFF_INPUT

---

# POST /campaigns/:campaignId/handoffs/:handoffId/cancel

Cancels a handoff.

Returns:

```ts
type CancelCampaignHandoffResponse =
  DetailResponse<CampaignHandoffDto>;
```

Possible errors:

- CAMPAIGN_NOT_FOUND
- HANDOFF_NOT_FOUND
- USER_NOT_FOUND
- INVALID_HANDOFF_INPUT

---

# Error Codes

Allowed handoff-related error codes:

```txt
CAMPAIGN_NOT_FOUND
HANDOFF_NOT_FOUND
USER_NOT_FOUND
SQUAD_NOT_FOUND
INVALID_HANDOFF_INPUT
```

Do not create broad enterprise error catalogs in this sprint.

---

# What Not To Return

Do not return:

- workflow graph
- dependency graph
- task tree
- orchestration state
- approval state
- escalation state
- notification state
- timelinePresentation
- timeline position
- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- dashboardWarnings
- progress
- slaLabel
- AI summary
- AI recommendation
- Copilot insight
- raw Prisma internals

---

# What Not To Implement

Do not implement:

```txt
GET /handoffs
GET /handoffs/:handoffId
POST /handoffs
PATCH /handoffs/:handoffId
DELETE /handoffs/:handoffId
```

Handoffs must be campaign-scoped.

Do not implement:

```txt
GET /campaigns/:campaignId/workspace
GET /campaigns/:campaignId/workflow
GET /campaigns/:campaignId/dependencies
GET /campaigns/:campaignId/timeline
```

These belong outside this sprint.

Do not implement:

- workflow engine
- dependency graph
- automatic status transition
- automatic activity creation
- notification feed
- approvals
- task management
- orchestration
- semantic search
- AI summary

---

# Final Principle

Handoffs API should make campaign operational transitions durable.

It should not create workflow engine, dependency graph, task management, orchestration or automatic workflow behavior.
