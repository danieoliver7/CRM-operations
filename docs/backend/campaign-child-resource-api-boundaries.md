# Campaign Child Resource API Boundaries

## Purpose

This document defines API boundaries for Campaign child resources.

It is a planning document.

It does not implement routes.

---

# General API Rule

All child resource APIs must be campaign-scoped.

Preferred route shape:

```txt
/campaigns/:campaignId/{resource}
```

Every child resource API must validate that the Campaign exists before reading or writing child records.

---

# Approved Implementation Order

```txt
1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint
```

---

# API Boundaries

## Campaign Blockers

Implemented routes:

```txt
GET /campaigns/:campaignId/blockers
POST /campaigns/:campaignId/blockers
PATCH /campaigns/:campaignId/blockers/:blockerId
POST /campaigns/:campaignId/blockers/:blockerId/resolve
```

Boundary:

- Blockers capture operational impediments.
- Blockers do not create tickets, incidents or escalations.
- Blockers do not automatically create activities, timeline events, handoffs or decision context.

## Campaign Notes

Implemented routes:

```txt
GET /campaigns/:campaignId/notes
POST /campaigns/:campaignId/notes
PATCH /campaigns/:campaignId/notes/:noteId
```

Boundary:

- Notes preserve lightweight operational memory.
- Notes do not create chat, replies, mentions or threaded comments.
- Notes do not automatically create activities, timeline events or decision context.

## Campaign Decision Context

Implemented routes:

```txt
GET /campaigns/:campaignId/decision-context
POST /campaigns/:campaignId/decision-context
PATCH /campaigns/:campaignId/decision-context/:decisionContextId
```

Boundary:

- Decision Context explains operational reasoning.
- Decision Context does not create approval workflow or documentation systems.
- Decision Context does not automatically create notes, activities, timeline events or handoffs.

## Campaign Activities

Potential future routes:

```txt
GET /campaigns/:campaignId/activities
POST /campaigns/:campaignId/activities
```

Boundary:

- Activities record meaningful operational events.
- Activities do not become event sourcing, audit log infrastructure or timeline presentation backend.

## Campaign Handoffs

Potential future routes:

```txt
GET /campaigns/:campaignId/handoffs
POST /campaigns/:campaignId/handoffs
PATCH /campaigns/:campaignId/handoffs/:handoffId
POST /campaigns/:campaignId/handoffs/:handoffId/complete
POST /campaigns/:campaignId/handoffs/:handoffId/cancel
```

Boundary:

- Handoffs capture transition facts between workflow stages, owners or squads.
- Handoffs do not become workflow engines, dependency graphs or BPM runtime.

## Campaign Workspace Facts Endpoint

Potential future route:

```txt
GET /campaigns/:campaignId/workspace
```

Boundary:

- The endpoint should compose persisted facts.
- The endpoint should not return derived intelligence as backend truth.
- The endpoint should come after child facts exist.

---

# Response Boundary

Child resource APIs should follow the existing response style:

```ts
type ListResponse<T> = {
  data: T[];
};

type DetailResponse<T> = {
  data: T;
};
```

Errors should follow:

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

# Final Principle

Expose campaign-scoped facts.

Do not expose orchestration, derived intelligence or presentation state as API truth.
