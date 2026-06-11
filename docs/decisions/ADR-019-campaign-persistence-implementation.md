# ADR-019: Campaign Persistence Implementation

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Skeleton Implementation
- Prisma And Database Foundation
- Reference Data Implementation
- Backend Implementation Planning
- Frontend Backend Contract Preparation
- Backend Stack Decision

The backend now has:

- NestJS runtime
- health endpoint
- Prisma setup
- PostgreSQL connection
- first schema
- migration
- seed
- Reference Data APIs for workspaces, users and squads

The next step is to make Campaign records durable.

---

# Decision

Implement basic Campaign persistence before Campaign Workspace backend.

Approved endpoints:

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

Campaign APIs must:

- persist Campaign facts through Prisma/PostgreSQL
- validate workspace, owner and squad references before writes
- return simple list/detail response wrappers
- return explicit operational error codes
- avoid derived intelligence as backend truth

---

# Consequences

Campaign becomes the first central product aggregate with basic persistence.

The frontend remains mock/local until a later integration sprint.

Campaign Workspace still requires a separate planning or implementation cut.

Campaign child resources remain separate future cuts.

---

# Guardrails

Do not implement in this decision:

- Campaign Workspace endpoint
- Campaign Activity API
- Blocker API
- Handoff API
- Notes API
- Decision Context API
- automatic activity creation
- timeline event generation
- handoff creation
- workflow automation
- auth
- frontend API integration
- Docker
- event sourcing
- repository abstraction by default

---

# Final Principle

Persist Campaign facts first.

Keep execution intelligence, coordination awareness and workspace narrative derived until the product explicitly needs backend-owned versions.
