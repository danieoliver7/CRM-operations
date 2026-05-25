# ADR-011: Backend MVP Definition Before Implementation

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Foundation Planning
- Backend Foundation Design
- Backend Foundation Architecture Review

The architecture has been reviewed and validated directionally.

The next risk is starting backend implementation without a precise Backend MVP scope.

---

# Decision

We will define Backend MVP scope before backend implementation.

The Backend MVP must be the smallest backend that makes the validated product durable.

---

# Why

Backend implementation without a precise MVP scope could lead to:

- premature auth
- premature multi-tenancy
- premature framework decisions
- overbuilt schema
- persisted derived intelligence
- generic project-management backend
- infrastructure before product durability

---

# What Backend MVP Means

Backend MVP means:

- campaign persistence
- workspace-compatible campaign scope
- user and squad reference data
- activities
- blockers
- handoffs
- notes
- decision context

Backend MVP does not mean:

- full SaaS platform
- billing
- advanced RBAC
- realtime
- integrations
- AI
- workflow automation

---

# Required Principle

Persist facts.

Derive intelligence.

Ignore UI state.

---

# Auth Position

Auth timing is conditional.

If the first backend is local/internal, auth may be deferred.

If the first backend is hosted/shared, basic auth should be introduced earlier.

Enterprise RBAC remains deferred.

---

# What We Will Do

We will document:

- Backend MVP definition
- Backend MVP scope
- Backend decision matrix
- first schema review checklist

---

# What We Will Not Do

We will not create:

- backend server
- API routes
- database schema
- migrations
- framework setup
- ORM setup
- auth implementation
- Docker setup

---

# Final Decision

Backend MVP scope must be explicitly defined before any backend implementation begins.