# Campaign API Contract

## Purpose

This document defines the API contract for Campaign Persistence Implementation.

It covers only basic Campaign persistence.

It does not cover Campaign Workspace or campaign child resources.

---

# Contract Philosophy

Campaign APIs expose persisted Campaign facts.

They should be:

- simple
- REST-first
- Prisma-backed
- campaign-centered
- reference-data aware
- frontend-contract compatible

They should not expose derived intelligence as backend truth.

---

# Standard Responses

List response:

```ts
type ListResponse<T> = {
  data: T[];
};
```

Detail response:

```ts
type DetailResponse<T> = {
  data: T;
};
```

Error response:

```ts
type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};
```

---

# CampaignDto

```ts
type CampaignDto = {
  id: string;
  workspaceId: string;
  ownerId: string | null;
  squadId: string | null;
  name: string;
  description: string | null;
  objective: string | null;
  status: CampaignStatus;
  channel: CampaignChannel;
  priority: CampaignPriority;
  dueDate: string;
  plannedDate: string | null;
  campaignType: string | null;
  audience: string | null;
  segmentation: string | null;
  tags: string[];
  content: unknown | null;
  metricsTarget: unknown | null;
  estimatedComplexity: CampaignComplexity | null;
  createdAt: string;
  updatedAt: string;
};
```

The DTO must not include:

- owner label
- squad label
- progress
- SLA label
- execution health
- operational risk
- coordination state
- workflow continuity
- command center summary
- timeline presentation state

---

# Create Campaign Request

Required:

- workspaceId
- name
- channel
- dueDate

Optional:

- ownerId
- squadId
- description
- objective
- status
- priority
- plannedDate
- campaignType
- audience
- segmentation
- tags
- content
- metricsTarget
- estimatedComplexity

Default behavior:

- status defaults to `briefing`
- priority defaults to `medium`
- tags default to `[]`

---

# Update Campaign Request

General update may change persisted Campaign facts only.

It may not update:

- id
- createdAt
- updatedAt

Dedicated endpoints exist for status, priority, owner and squad changes because those are common operational fact updates.

---

# Implemented Endpoints

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

No Campaign Workspace endpoint is part of this contract.

No campaign child resource endpoint is part of this contract.
