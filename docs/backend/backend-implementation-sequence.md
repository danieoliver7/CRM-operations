# Backend Implementation Sequence

## Current Planning Relationship

Backend Implementation Sequence defines the long-term order of backend implementation.

Backend Implementation Planning defines the immediate Backend V1 implementation plan.

Use this document together with:

- `/docs/backend/backend-implementation-plan.md`
- `/docs/backend/backend-v1-module-plan.md`
- `/docs/backend/first-prisma-schema-plan.md`
- `/docs/backend/backend-v1-api-implementation-plan.md`
- `/docs/backend/backend-v1-validation-plan.md`

Do not start backend implementation until Backend Implementation Planning is approved.

## Purpose

This document defines a recommended future backend implementation sequence.

It should prevent premature infrastructure and keep implementation aligned with product value.

---

# Phase 1: Minimal Persistence Foundation

Goal:

Make core campaign data durable.

This phase should follow the Backend MVP definition before implementation begins.

See:

- `/docs/backend/backend-mvp-definition.md`
- `/docs/backend/backend-mvp-scope.md`
- `/docs/backend/backend-mvp-decision-matrix.md`
- `/docs/backend/first-schema-review-checklist.md`

Possible scope:

- backend project setup
- database connection
- campaigns persistence
- users reference data
- squads reference data
- basic campaign read/write APIs

Do not include:

- auth
- realtime
- integrations
- billing
- advanced permissions

---

# Phase 2: Workspace Persistence

Goal:

Make campaign data explicitly workspace-scoped.

Possible scope:

- workspace model
- workspace-scoped campaigns
- workspace-scoped squads
- workspace campaign listing

This phase should introduce workspace boundaries without turning multi-tenancy into the dominant project.

---

# Phase 3: Campaign Workspace Persistence

Goal:

Persist data needed by the Campaign Workspace.

Possible scope:

- activities
- blockers
- handoffs
- notes
- decision context

This phase should make the Workspace durable.

---

# Phase 4: Organization Boundaries

Goal:

Prepare commercial SaaS structure.

Possible scope:

- organizations
- workspaces
- memberships
- workspace-scoped campaigns
- simple user membership

Avoid advanced RBAC.

---

# Phase 5: Auth And Access Basics

Goal:

Allow real users to access the platform.

Possible scope:

- authentication
- basic session handling
- basic membership checks

Avoid enterprise permission systems.

---

# Phase 6: Attachments And Metrics

Goal:

Support richer campaign context.

Possible scope:

- attachments metadata
- campaign metrics
- captured performance data

Avoid analytics warehouse.

---

# Phase 7: Realtime Or Notifications

Only after persistence and real multi-user behavior are validated.

Possible scope:

- lightweight notifications
- limited realtime updates
- presence

Avoid realtime-first architecture.

---

# Phase 8: Integrations

Only after core operational behavior is proven.

Possible integrations:

- Salesforce Marketing Cloud
- HubSpot
- Braze
- Adobe

---

# Sequence Summary

Recommended top-level order:

```txt
Campaign Persistence
  -> Workspace Persistence
  -> Organization Boundaries
  -> Auth Basics
  -> Attachments And Metrics
  -> Realtime Or Notifications
  -> Integrations
```

Campaign Workspace child records may be introduced during or immediately after campaign persistence depending on implementation size.

The important rule is to make operational facts durable before adding commercial infrastructure or realtime behavior.

---

# Implementation Guardrails

Do not implement:

- workflow engine
- orchestration layer
- event sourcing
- CQRS
- microservices
- analytics warehouse
- AI prediction
- advanced RBAC

---

# Backend MVP Gate

Do not start backend implementation until the Backend MVP scope is approved.

Before any schema is created, the first schema proposal must pass:

```txt
/docs/backend/first-schema-review-checklist.md
```

The first implementation should optimize for Campaign Workspace durability, not complete SaaS infrastructure.

---

# Final Principle

Implement backend in the order that makes the product durable, not in the order that makes architecture impressive.

---

# Architecture Review Notes

The architecture review keeps the sequence direction but adds two cautions:

## Auth Timing

Auth can stay after workspace and organization boundaries only for local or internal backend validation.

If the first backend is deployed to a shared hosted environment, basic auth may need to move earlier.

## Workspace Timing

Workspace persistence should remain simple.

It should scope campaigns and squads without pulling in advanced tenant runtime, billing or enterprise permissions.
