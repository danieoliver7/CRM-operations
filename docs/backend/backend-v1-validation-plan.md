# Backend V1 Validation Plan

## Purpose

This document defines how Backend V1 implementation should be validated.

It exists to prevent backend code from violating product, domain, contract and MVP decisions.

---

# Validation Philosophy

Backend V1 should be validated against:

- Backend MVP scope
- stack guardrails
- persistence boundaries
- first schema checklist
- frontend-backend contracts
- API boundaries
- product anti-patterns

Backend correctness is not only technical. It must also preserve product architecture.

---

# Pre-Implementation Validation

Before backend code starts, confirm:

- Backend Implementation Plan exists
- Backend V1 Module Plan exists
- First Prisma Schema Plan exists
- Backend V1 API Implementation Plan exists
- Backend V1 Validation Plan exists
- ADR for implementation planning exists
- current phase is Backend Implementation Planning
- no backend runtime code has been created during planning

---

# Schema Validation

Before creating `schema.prisma`, validate against:

- `/docs/backend/first-schema-review-checklist.md`
- `/docs/backend/first-prisma-schema-plan.md`
- `/docs/backend/persistence-boundaries.md`
- `/docs/backend/entity-relationships.md`
- `/docs/contracts/dto-to-view-model-mapping.md`
- `/docs/contracts/campaign-workspace-contract.md`

The first schema must prove that it does not persist:

- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timeline presentation events
- progress as primary truth
- SLA label as primary truth
- UI state

---

# Module Validation

Validate that first modules match the module plan:

- workspaces
- users
- squads
- campaigns
- activities
- blockers
- handoffs
- notes
- decision-context
- shared

Reject modules such as:

- ExecutionHealthModule
- OperationalRiskModule
- CoordinationStateModule
- WorkflowContinuityModule
- CommandCenterModule
- TimelinePresentationModule
- WorkflowEngineModule

---

# API Validation

Validate that APIs:

- expose persisted facts
- follow REST-first resource boundaries
- remain campaign-centered
- align with DTO contracts
- support Campaign Workspace durability

Validate that Backend V1 does not create:

- workflow runtime APIs
- derived intelligence APIs
- orchestration endpoints
- generic project management APIs
- AI prediction APIs

---

# Contract Validation

Validate:

- DTOs map cleanly to frontend View Models
- Campaign Workspace response provides required facts
- empty arrays are valid success responses
- errors can become operational messages
- mock/UI compatibility fields do not become schema by accident

Key compatibility fields to protect:

- owner
- squad
- progress
- sla

---

# Frontend Compatibility Validation

Backend implementation should not require rewriting the frontend.

Validate that the future integration can remain incremental:

```txt
API DTO
  -> mapper
  -> View Model
  -> component
```

Frontend-derived utilities should continue to own:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- timeline presentation
- command center summary
- dashboard warnings
- planning pressure
- owner pressure
- squad pressure

---

# Non-Goal Validation

Every Backend V1 implementation PR should confirm it did not introduce:

- auth too early
- Docker too early
- microservices
- CQRS
- event sourcing
- workflow engine behavior
- orchestration layer
- realtime
- notifications
- integrations
- AI
- billing
- advanced RBAC
- analytics warehouse

---

# Planning Sprint Validation

For this planning sprint specifically, validate:

- `git diff --check` passes
- Markdown fences are balanced
- no `backend/src` exists
- no `server` folder was created
- no `prisma/schema.prisma` exists
- no migrations folder exists
- no API runtime files were created
- no `.env` file was created

If runtime code is touched accidentally, run frontend lint/build and explain why.

---

# Final Principle

Backend V1 validation should protect the product from accidental architecture drift.

It should be easier to reject premature complexity than to remove it later.
