# Reference Data API Contract

## Purpose

This document defines the API contract for Reference Data Implementation.

It covers only:

- workspaces
- users
- squads

These are the first backend API contracts implemented in the project.

---

# Contract Philosophy

Reference data APIs expose stable facts needed by future Campaign persistence and Campaign Workspace rendering.

They are:

- simple
- read-only
- REST-first
- Prisma-backed
- frontend-contract compatible

They do not introduce product workflows.

---

# Standard List Response

```ts
type ListResponse<T> = {
  data: T[];
};
```

# Standard Detail Response

```ts
type DetailResponse<T> = {
  data: T;
};
```

# Standard Error Response

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

# WorkspaceDto

```ts
type WorkspaceDto = {
  id: string;
  organizationId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
```

Do not include billing, subscription, tenant settings, permissions or analytics.

---

# UserDto

```ts
type UserDto = {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  roleLabel?: string;
  createdAt: string;
  updatedAt: string;
};
```

Users are reference data only.

Do not include passwords, auth providers, sessions, permissions or RBAC roles.

---

# SquadDto

```ts
type SquadDto = {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};
```

Do not include squad pressure, capacity score, workload summary or overload state.

These remain derived later.

---

# Implemented Endpoints

```txt
GET /workspaces
GET /workspaces/:workspaceId
GET /users
GET /users/:userId
GET /squads
GET /squads/:squadId
```

No write endpoints are part of this contract.
