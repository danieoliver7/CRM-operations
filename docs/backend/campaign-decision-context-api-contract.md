# Campaign Decision Context API Contract

## Purpose

This document defines the API contract for Campaign Decision Context Implementation.

It covers only Campaign Decision Context.

It does not cover Activities, Handoffs or Campaign Workspace.

---

# Contract Philosophy

Decision Context APIs should expose campaign-scoped operational reasoning facts.

They should be:

- simple
- REST-first
- Prisma-backed
- campaign-scoped
- operationally meaningful
- frontend-contract compatible
- useful for future operational memory

They should not expose chat, comments, approvals, knowledge base behavior, AI summaries or derived intelligence as backend truth.

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

# Decision Context DTO

Implemented shape:

```ts
type CampaignDecisionContextDto = {
  id: string;
  campaignId: string;
  authorId: string | null;
  type: CampaignNoteType;
  title: string;
  body: string;
  relatedWorkflowStage: CampaignStatus | null;
  relatedBlockerId: string | null;
  relatedActivityId: string | null;
  relatedHandoffId: string | null;
  createdAt: string;
  updatedAt: string;
};
```

The API maps Prisma fields into cleaner DTO names:

```txt
authorUserId -> authorId
content      -> body
```

`relatedStatus` is not part of this contract because the current Prisma schema does not persist it.

Do not include:

- replies
- mentions
- reactions
- approval status
- sign-off state
- document hierarchy
- AI summary
- AI recommendation
- Copilot insight
- raw Prisma internals

---

# Create Decision Context Request

Implemented shape:

```ts
type CreateCampaignDecisionContextRequest = {
  type: CampaignNoteType;
  title: string;
  body: string;
  authorId?: string | null;
  relatedWorkflowStage?: CampaignStatus | null;
  relatedBlockerId?: string | null;
  relatedActivityId?: string | null;
  relatedHandoffId?: string | null;
};
```

Rules:

- `type` is required.
- `title` is required.
- `body` is required.
- `authorId` is optional.
- campaignId comes from route param.
- campaign must exist.
- authorId must exist if provided.
- relatedWorkflowStage is optional.
- relatedBlockerId is optional and must belong to the route campaign when provided.
- relatedActivityId is optional and must belong to the route campaign when provided.
- relatedHandoffId is optional and must belong to the route campaign when provided.
- relatedStatus is not accepted.

Do not invent enum values.

Use existing Prisma/schema/domain enum language.

---

# Update Decision Context Request

Implemented shape:

```ts
type UpdateCampaignDecisionContextRequest = Partial<{
  type: CampaignNoteType;
  title: string;
  body: string;
  relatedWorkflowStage: CampaignStatus | null;
  relatedBlockerId: string | null;
  relatedActivityId: string | null;
  relatedHandoffId: string | null;
}>;
```

Rules:

- decision context must exist.
- decision context must belong to campaignId.
- campaign must exist.
- do not update campaignId through this request.
- do not update createdAt directly.
- do not update authorId unless there is a clear existing implementation pattern requiring it.
- do not update raw database `content`; use `body`.
- do not accept `relatedStatus` because it is not persisted by the current schema.

---

# Endpoints

Allowed:

```txt
GET /campaigns/:campaignId/decision-context
POST /campaigns/:campaignId/decision-context
PATCH /campaigns/:campaignId/decision-context/:decisionContextId
```

---

# GET /campaigns/:campaignId/decision-context

Returns:

```ts
type CampaignDecisionContextListResponse =
  ListResponse<CampaignDecisionContextDto>;
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

# POST /campaigns/:campaignId/decision-context

Creates decision context.

Returns:

```ts
type CreateCampaignDecisionContextResponse =
  DetailResponse<CampaignDecisionContextDto>;
```

Possible errors:

- CAMPAIGN_NOT_FOUND
- USER_NOT_FOUND
- BLOCKER_NOT_FOUND
- ACTIVITY_NOT_FOUND
- HANDOFF_NOT_FOUND
- INVALID_DECISION_CONTEXT_INPUT

---

# PATCH /campaigns/:campaignId/decision-context/:decisionContextId

Updates decision context facts.

Returns:

```ts
type UpdateCampaignDecisionContextResponse =
  DetailResponse<CampaignDecisionContextDto>;
```

Possible errors:

- CAMPAIGN_NOT_FOUND
- DECISION_CONTEXT_NOT_FOUND
- BLOCKER_NOT_FOUND
- ACTIVITY_NOT_FOUND
- HANDOFF_NOT_FOUND
- INVALID_DECISION_CONTEXT_INPUT

---

# Error Codes

Allowed decision-context-related error codes:

```txt
CAMPAIGN_NOT_FOUND
DECISION_CONTEXT_NOT_FOUND
USER_NOT_FOUND
BLOCKER_NOT_FOUND
ACTIVITY_NOT_FOUND
HANDOFF_NOT_FOUND
INVALID_DECISION_CONTEXT_INPUT
```

Do not create broad enterprise error catalogs in this sprint.

---

# What Not To Return

Do not return:

- replies
- mentions
- reactions
- thread state
- chat state
- realtime state
- approval state
- sign-off status
- document hierarchy
- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
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
GET /decision-context
GET /decision-context/:decisionContextId
POST /decision-context
PATCH /decision-context/:decisionContextId
DELETE /decision-context/:decisionContextId
```

Decision Context must be campaign-scoped.

Do not implement:

```txt
GET /campaigns/:campaignId/workspace
GET /campaigns/:campaignId/activities
GET /campaigns/:campaignId/handoffs
```

These belong to later sprints.

Do not implement:

- approvals
- sign-offs
- comments
- replies
- mentions
- threads
- reactions
- knowledge base hierarchy
- document collaboration
- AI summary
- semantic search

---

# Final Principle

Decision Context API should make campaign operational reasoning durable.

It should not create comments, approval workflow, documentation platform or AI behavior.
