# ADR-020: Campaign Child Resources Planning

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Skeleton Implementation
- Prisma And Database Foundation
- Reference Data Implementation
- Campaign Persistence Implementation

The backend now has:

- NestJS runtime
- Prisma/PostgreSQL
- Reference Data APIs
- Campaign Persistence APIs

Campaign is now durable.

The next product area is Campaign child resources, but they must be planned before implementation.

---

# Decision

We will perform Campaign Child Resources Planning before implementing child resource APIs.

The approved child resource implementation order is:

```txt
1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint
```

Campaign Blockers Implementation is the next likely implementation cut.

Campaign Workspace Facts Endpoint comes after child facts exist.

---

# Rationale

Child resources are essential for Campaign Workspace durability, but each resource has a strong drift risk:

- blockers can become tickets or incidents
- notes can become chat or comments
- decision context can become approvals or documentation
- activities can become event sourcing or audit logs
- handoffs can become workflow engines or dependency graphs
- workspace facts can become derived intelligence APIs

Planning first makes those risks explicit before backend code exists.

---

# Consequences

The project may document:

- child resource order
- child resource API boundaries
- validation expectations
- guardrails

The project must not implement child resource runtime behavior during this planning phase.

---

# Non-Goals

This decision does not approve:

- BlockersModule
- NotesModule
- DecisionContextModule
- ActivitiesModule
- HandoffsModule
- CampaignWorkspaceModule
- controllers
- services
- routes
- DTO files
- request files
- mapper files
- Prisma schema changes
- migrations
- seed changes
- frontend integration
- auth
- RBAC
- Docker
- workflow engine
- event sourcing
- realtime
- notifications

---

# Final Principle

Plan campaign-scoped facts first.

Implement them only after their boundaries are clear.
