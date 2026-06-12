# Campaign Activities API Contract

## Purpose

This document defines the API contract for Campaign Activities Implementation.

It covers only Campaign Activities.

It does not cover Handoffs or Campaign Workspace.

---

# Contract Philosophy

Activities APIs should expose campaign-scoped meaningful operational event facts.

They should be:

- simple
- REST-first
- Prisma-backed
- campaign-scoped
- operationally meaningful
- frontend-contract compatible
- useful for future operational timeline composition

They should not expose event sourcing, audit log, notifications, timeline presentation, workflow engine or derived intelligence as backend truth.

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

# Activity DTO

Implemented shape:

```ts
type CampaignActivityDto = {
  id: string;
  campaignId: string;

  actorId: string | null;

  type: CampaignActivityType;
  category: CampaignActivityCategory | null;

  message: string;
  metadata: Record<string, unknown> | null;

  relatedBlockerId: string | null;
  relatedNoteId: string | null;
  relatedDecisionContextId: string | null;
  relatedHandoffId: string | null;

  createdAt: string;
  updatedAt: string;
};
```

Use the current Prisma schema as source of truth.

Current mapping:

- `actorUserId` maps to `actorId`
- `message` remains the public activity message
- `metadata` remains the existing flexible activity fact container
- `relatedBlockerId`, `relatedNoteId`, `relatedDecisionContextId` and `relatedHandoffId` are exposed from metadata

The API does not expose `occurredAt` in this implementation because the current schema does not have a separate occurrence timestamp. `createdAt` remains the persisted activity creation timestamp.

Do not include:

- event sequence number
- replay metadata
- aggregate version
- projection version
- notification status
- timeline presentation fields
- AI summary
- AI recommendation
- Copilot insight
- raw Prisma internals

---

# Create Activity Request

Implemented shape:

```ts
type CreateCampaignActivityRequest = {
  type: CampaignActivityType;
  category?: CampaignActivityCategory | null;

  message: string;
  metadata?: Record<string, unknown> | null;

  actorId?: string | null;

  relatedBlockerId?: string | null;
  relatedNoteId?: string | null;
  relatedDecisionContextId?: string | null;
  relatedHandoffId?: string | null;
};
```

Rules:

- `type` is required.
- `message` is required.
- `actorId` is optional.
- `metadata` is optional and must be an object or null.
- campaignId comes from route param.
- campaign must exist.
- actorId must exist if provided.
- optional related references are validated directly through Prisma when provided.
- related references are persisted in the existing metadata field.
- metadata must not contain reserved related reference keys; related references must be sent through the top-level request fields so validation cannot be bypassed.

Do not invent enum values.

Use existing Prisma/schema/domain enum language.

Do not accept `title`, `description` or `occurredAt` in this implementation because the current schema does not persist those fields separately.

---

# Endpoints

Allowed:

```txt
GET /campaigns/:campaignId/activities
POST /campaigns/:campaignId/activities
```

---

# GET /campaigns/:campaignId/activities

Returns:

```ts
type CampaignActivitiesListResponse =
  ListResponse<CampaignActivityDto>;
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

# POST /campaigns/:campaignId/activities

Creates an activity.

Returns:

```ts
type CreateCampaignActivityResponse =
  DetailResponse<CampaignActivityDto>;
```

Possible errors:

- CAMPAIGN_NOT_FOUND
- USER_NOT_FOUND
- BLOCKER_NOT_FOUND
- NOTE_NOT_FOUND
- DECISION_CONTEXT_NOT_FOUND
- HANDOFF_NOT_FOUND
- INVALID_ACTIVITY_INPUT

Only return related-reference errors for related references implemented in the request contract.

---

# Error Codes

Allowed activity-related error codes:

```txt
CAMPAIGN_NOT_FOUND
USER_NOT_FOUND
BLOCKER_NOT_FOUND
NOTE_NOT_FOUND
DECISION_CONTEXT_NOT_FOUND
HANDOFF_NOT_FOUND
INVALID_ACTIVITY_INPUT
```

Do not create broad enterprise error catalogs in this sprint.

---

# What Not To Return

Do not return:

- event replay data
- aggregate version
- projection version
- audit log state
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
GET /activities
GET /activities/:activityId
POST /activities
PATCH /activities/:activityId
DELETE /activities/:activityId
```

Activities must be campaign-scoped.

Do not implement:

```txt
PATCH /campaigns/:campaignId/activities/:activityId
DELETE /campaigns/:campaignId/activities/:activityId
GET /campaigns/:campaignId/timeline
GET /campaigns/:campaignId/workspace
GET /campaigns/:campaignId/handoffs
```

These belong outside this sprint.

Do not implement:

- automatic activity creation
- activity replay
- event sourcing
- audit log platform
- notification feed
- workflow orchestration
- timeline generation
- semantic search
- AI summary

---

# Final Principle

Activities API should make campaign operational events durable.

It should not create event sourcing, audit logging, workflow orchestration, notification feed or timeline backend behavior.
