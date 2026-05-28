# Backend V1 Stack Guardrails

## Purpose

This document defines what the selected Backend V1 stack must not become.

The stack is selected to support product durability.

It must not expand product scope.

---

# Guardrail 1: NestJS Must Stay Simple

Use NestJS for:

- modules
- controllers
- services/providers
- dependency injection
- clear organization

Do not use NestJS for:

- microservices
- CQRS
- event sourcing
- workflow orchestration
- complex enterprise module architecture
- unnecessary custom decorators
- generic repository abstraction by default

---

# Guardrail 2: Prisma Must Follow Domain Boundaries

Prisma schema must follow:

- persistence boundaries
- entity relationships
- Backend MVP scope
- first schema review checklist

Do not allow Prisma schema to persist:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- command center summary
- timeline presentation state
- UI state

---

# Guardrail 3: PostgreSQL Must Stay Operational

Use PostgreSQL for:

- durable operational facts
- relational campaign data
- workspace-compatible campaign scope
- users and squads reference data
- campaign child entities

Do not use PostgreSQL to create:

- analytics warehouse
- event store
- reporting mart
- complex permission graph
- workflow engine tables

---

# Guardrail 4: REST Must Stay Resource-Oriented

REST APIs should expose facts.

Examples:

- campaigns
- activities
- blockers
- handoffs
- notes
- decision-context
- users
- squads
- workspaces

Do not create first-backend endpoints for:

- execution-health
- operational-risk
- coordination-state
- workflow-continuity
- command-center-summary

These remain derived.

---

# Guardrail 5: Backend V1 Must Remain Campaign-Centered

Campaign remains the operational aggregate.

Most backend modules should support Campaign Workspace durability.

Avoid creating independent systems for:

- generic tasks
- tickets
- comments
- workflow automation
- incidents
- analytics

---

# Guardrail 6: Auth Remains Conditional

Auth timing depends on deployment target.

If local/dev/internal:

- auth may be deferred

If hosted/shared:

- basic auth should enter earlier

Do not implement:

- enterprise RBAC
- SSO
- permission matrix
- billing roles
- tenant admin permissions

---

# Guardrail 7: No Infrastructure Expansion

Backend V1 should not include:

- Docker unless required by the implementation environment
- Redis
- queues
- websocket
- realtime
- CI/CD complexity
- Kubernetes
- cloud architecture
- observability stack

---

# Guardrail 8: First Schema Must Be Reviewed

Before creating or accepting the first schema, use:

```txt
/docs/backend/first-schema-review-checklist.md
```

The first schema must pass the checklist before implementation proceeds.

---

# Guardrail 9: Stack Does Not Expand Scope

The selected stack does not approve:

- backend beyond Backend MVP
- full SaaS runtime
- billing
- advanced RBAC
- integrations
- workflow automation
- analytics warehouse
- project management features

---

# Final Principle

NestJS, Prisma and PostgreSQL are tools for Campaign Workspace durability.

They should not reshape the product into enterprise architecture.
