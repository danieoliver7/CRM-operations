# Campaign Blockers API Contract

## Purpose

This document defines the API contract for Campaign Blockers Implementation.

It covers only Campaign Blockers.

It does not cover Notes, Decision Context, Activities, Handoffs or Campaign Workspace.

---

# Contract Philosophy

Blocker APIs expose campaign-scoped impediment facts.

They should be:

- simple
- REST-first
- Prisma-backed
- campaign-scoped
- operationally meaningful
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

# BlockerDto

```ts
type BlockerDto = {
  id: string;
  campaignId: string;
  createdById: string | null;
  resolvedById: string | null;
  title: string;
  description: string | null;
  severity: BlockerSeverity;
  status: BlockerStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
};
```

The DTO uses API-facing `createdById` and `resolvedById` names while the database keeps `createdByUserId` and `resolvedByUserId`.

The DTO must not include:

- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- dashboardWarnings
- ticket status
- escalation state
- queue state

---

# Create Blocker Request

```ts
type CreateBlockerRequest = {
  title: string;
  description?: string | null;
  severity: BlockerSeverity;
  createdById?: string | null;
};
```

Rules:

- `campaignId` comes from the route
- `title` is required
- `severity` is required
- `createdById` must reference an existing User when provided
- status defaults to `open` through the existing Prisma schema

---

# Update Blocker Request

```ts
type UpdateBlockerRequest = Partial<{
  title: string;
  description: string | null;
  severity: BlockerSeverity;
  status: BlockerStatus;
}>;
```

Rules:

- Campaign must exist
- Blocker must exist under the route Campaign
- `campaignId` cannot be updated
- `createdById` cannot be updated
- `resolvedById` cannot be updated through the generic patch endpoint
- `resolvedAt` cannot be updated directly

---

# Resolve Blocker Request

```ts
type ResolveBlockerRequest = {
  resolvedById?: string | null;
};
```

Rules:

- Campaign must exist
- Blocker must exist under the route Campaign
- `resolvedById` must reference an existing User when provided
- resolve sets status to `resolved`
- resolve sets `resolvedAt`
- resolve sets `resolvedById` when provided

---

# Implemented Endpoints

```txt
GET /campaigns/:campaignId/blockers
POST /campaigns/:campaignId/blockers
PATCH /campaigns/:campaignId/blockers/:blockerId
POST /campaigns/:campaignId/blockers/:blockerId/resolve
```

No global blocker endpoints are part of this contract.

No other Campaign child resource endpoint is part of this contract.
