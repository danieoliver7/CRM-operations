# API Boundaries

## Purpose

This document defines future API boundaries for CRM Operations Platform.

This is not a full API specification.

No API routes should be implemented in this phase.

---

# API Philosophy

Future APIs should expose persisted operational facts.

They should be:

- simple
- resource-oriented
- domain-aligned
- campaign-centered
- operationally meaningful

They should not become:

- orchestration APIs
- workflow runtime APIs
- generic CRUD-only project management APIs
- AI prediction APIs
- analytics warehouse APIs

---

# Boundary Rule

APIs should store and retrieve facts.

Derived intelligence can remain in frontend utilities for now.

Future backend may later calculate derived intelligence, but it should not be persisted as primary truth.

---

# Campaign APIs

Responsibilities:

- list campaigns
- retrieve campaign
- create campaign
- update campaign facts
- update status
- update priority
- assign owner
- assign squad

Possible future boundaries:

```txt
GET /campaigns
POST /campaigns
GET /campaigns/:campaignId
PATCH /campaigns/:campaignId
PATCH /campaigns/:campaignId/status
PATCH /campaigns/:campaignId/priority
PATCH /campaigns/:campaignId/owner
PATCH /campaigns/:campaignId/squad
```

Avoid workflow orchestration endpoints.

---

# Activity APIs

Responsibilities:

- list campaign activities
- create meaningful activity records

Possible future boundaries:

```txt
GET /campaigns/:campaignId/activities
POST /campaigns/:campaignId/activities
```

Activity APIs should not become event sourcing.

---

# Blocker APIs

Responsibilities:

- list campaign blockers
- create blocker
- update blocker
- resolve blocker

Possible future boundaries:

```txt
GET /campaigns/:campaignId/blockers
POST /campaigns/:campaignId/blockers
PATCH /campaigns/:campaignId/blockers/:blockerId
POST /campaigns/:campaignId/blockers/:blockerId/resolve
```

Blocker APIs should not become ticketing APIs.

---

# Handoff APIs

Responsibilities:

- list campaign handoffs
- create handoff
- update handoff
- complete handoff
- cancel handoff

Possible future boundaries:

```txt
GET /campaigns/:campaignId/handoffs
POST /campaigns/:campaignId/handoffs
PATCH /campaigns/:campaignId/handoffs/:handoffId
POST /campaigns/:campaignId/handoffs/:handoffId/complete
POST /campaigns/:campaignId/handoffs/:handoffId/cancel
```

Handoff APIs should not become dependency orchestration.

---

# Notes APIs

Responsibilities:

- list campaign notes
- create note
- update note

Possible future boundaries:

```txt
GET /campaigns/:campaignId/notes
POST /campaigns/:campaignId/notes
PATCH /campaigns/:campaignId/notes/:noteId
```

Do not implement replies or threads early.

---

# Decision Context APIs

Responsibilities:

- list campaign decision context
- create decision context
- update decision context

Possible future boundaries:

```txt
GET /campaigns/:campaignId/decision-context
POST /campaigns/:campaignId/decision-context
PATCH /campaigns/:campaignId/decision-context/:decisionContextId
```

Decision Context APIs should preserve operational reasoning.

They should not become comments or chat.

---

# User APIs

Responsibilities:

- list users
- retrieve user
- provide owner reference data

Possible future boundaries:

```txt
GET /users
GET /users/:userId
```

Authentication and identity provider integration are deferred.

---

# Squad APIs

Responsibilities:

- list squads
- retrieve squad
- provide squad reference data

Possible future boundaries:

```txt
GET /squads
GET /squads/:squadId
```

Squad pressure should remain derived.

---

# Workspace APIs

Responsibilities:

- list workspaces
- retrieve workspace
- scope campaigns and squads later

Possible future boundaries:

```txt
GET /workspaces
GET /workspaces/:workspaceId
GET /workspaces/:workspaceId/campaigns
GET /workspaces/:workspaceId/squads
```

Workspace APIs should not introduce complex tenant runtime early.

---

# Organization APIs

Responsibilities:

- retrieve organization
- list organization workspaces later
- support commercial boundary later

Possible future boundaries:

```txt
GET /organizations
GET /organizations/:organizationId
GET /organizations/:organizationId/workspaces
```

Billing and advanced organization settings are deferred.

---

# Attachment APIs

Likely later, not first backend:

```txt
GET /campaigns/:campaignId/attachments
POST /campaigns/:campaignId/attachments
PATCH /campaigns/:campaignId/attachments/:attachmentId
```

File upload and storage are deferred.

---

# Metric APIs

Likely later, not first backend:

```txt
GET /campaigns/:campaignId/metrics
POST /campaigns/:campaignId/metrics
```

Do not build analytics warehouse early.

---

# Derived Intelligence Boundary

Do not create first-backend endpoints like:

```txt
GET /campaigns/:campaignId/execution-health
GET /campaigns/:campaignId/operational-risk
GET /campaigns/:campaignId/coordination-state
GET /campaigns/:campaignId/workflow-continuity
GET /campaigns/:campaignId/command-center-summary
```

These may be derived client-side from campaign facts for now.

If backend-derived intelligence becomes necessary later, it should be introduced as a deliberate product decision.

---

# Contract Preparation Relationship

API boundaries define resource ownership.

Contracts define request and response shapes.

This document should not be treated as a full API specification.

For frontend-backend contract planning, use:

- `/docs/contracts/frontend-backend-contract.md`
- `/docs/contracts/api-response-shapes.md`
- `/docs/contracts/dto-to-view-model-mapping.md`
- `/docs/contracts/campaign-workspace-contract.md`

Backend implementation should not start until contract preparation is approved.

## Boundary vs Contract

This document answers:

- which resources the future API may expose
- which domain area owns each resource
- which resource boundaries should be avoided early

Contract documents answer:

- what DTOs may look like
- what a composed Campaign Workspace response may include
- what the frontend should map before rendering
- what should remain derived intelligence

API boundaries should not be treated as final route implementation instructions.

Contract shapes should not be treated as database schema.

## Campaign Workspace Relationship

The Campaign Workspace contract may use either:

- a composed workspace response, or
- separate campaign-scoped resource responses.

Both options still follow the same resource ownership boundaries.

The implementation planning sprint should choose the simplest approach that makes Campaign Workspace durable without adding orchestration APIs.

# Final Principle

API boundaries should make operational facts accessible.

They should not create backend complexity before the product needs it.
