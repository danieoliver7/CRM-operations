# ADR-021: Campaign Blockers Implementation

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Skeleton Implementation
- Prisma And Database Foundation
- Reference Data Implementation
- Campaign Persistence Implementation
- Campaign Child Resources Planning

The backend now has:

- NestJS runtime
- Prisma/PostgreSQL
- Reference Data APIs
- Campaign Persistence APIs

Campaign is durable.

The approved child resource order starts with Campaign Blockers.

---

# Decision

We will implement Campaign Blockers as the first Campaign child resource.

This sprint may implement:

- BlockersModule
- BlockersController
- BlockersService
- Blocker DTOs
- Blocker request helpers
- Blocker response mapper
- Blocker validation tests

Allowed endpoints:

```txt
GET /campaigns/:campaignId/blockers
POST /campaigns/:campaignId/blockers
PATCH /campaigns/:campaignId/blockers/:blockerId
POST /campaigns/:campaignId/blockers/:blockerId/resolve
```

---

# Rationale

Blockers are the safest first Campaign child resource because they already exist in the product language as lightweight operational impediments.

They support Campaign Workspace durability without requiring:

- notes
- decision context
- activities
- handoffs
- composed workspace response
- frontend integration
- auth
- workflow automation

This keeps the first child resource implementation small, campaign-scoped and operational.

---

# Guardrails

Campaign Blockers must:

- remain scoped under Campaign
- persist facts only
- validate Campaign existence
- validate User references when provided
- use simple REST-first response wrappers
- keep derived intelligence out of backend truth

Campaign Blockers must not become:

- ticketing system
- incident system
- escalation workflow
- SLA engine
- workflow automation
- activity generator
- timeline presentation backend

---

# Consequences

After this decision:

- Blockers can be persisted in PostgreSQL through Prisma.
- Campaign Workspace has its first durable child resource.
- Notes, Decision Context, Activities and Handoffs remain deferred.
- Campaign Workspace endpoint remains deferred until more child facts exist.
- Frontend integration remains deferred.

---

# Non-Decisions

This ADR does not approve:

- Notes API
- Decision Context API
- Activities API
- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- auth
- Docker
- realtime
- event sourcing
- workflow engine
- ticketing behavior
- SLA engine
