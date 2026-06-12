# Campaign Child Resource Validation

## Purpose

This document defines validation expectations for Campaign child resource planning and future implementation.

It should be used to validate each child resource sprint.

---

# Planning Sprint Validation

For Campaign Child Resources Planning, validate:

- docs define the current phase as Campaign Child Resources Planning
- docs do not claim child resource APIs are implemented
- child resource order is consistent
- guardrails are explicit
- Campaign Workspace Facts Endpoint remains deferred
- no backend runtime files are created
- no frontend runtime files are modified
- no Prisma schema or migration is created

Required command:

```bash
git diff --check
```

If only docs changed, backend/frontend build commands are not required.

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

# Future Implementation Validation

Every child resource implementation must validate:

- Campaign exists
- references exist when provided
- response shape follows `{ data }`
- errors follow the standard error wrapper
- no derived intelligence is persisted
- no frontend integration is introduced unless explicitly scoped
- no auth/RBAC is introduced unless explicitly scoped
- no workflow engine behavior is introduced

---

# Campaign Blockers Implementation Validation

Campaign Blockers is the first implemented Campaign child resource.

Validate:

- only Blockers API endpoints are implemented
- blockers remain campaign-scoped
- blocker create/update/resolve operations persist facts only
- Campaign existence is validated
- blocker ownership by Campaign is validated
- `createdById` and `resolvedById` references are validated when provided
- no other child resource API is introduced
- no Campaign Workspace endpoint is introduced
- no automatic activity, timeline, handoff or decision context is created
- no ticketing, incident, escalation or SLA engine behavior is introduced

---

# Campaign Notes Implementation Validation

Campaign Notes is the second implemented Campaign child resource.

Validate:

- only Notes API endpoints are implemented in this cut
- notes remain campaign-scoped
- note create/update operations persist facts only
- Campaign existence is validated
- note ownership by Campaign is validated
- `authorId` reference is validated when provided
- no Decision Context API is introduced
- no Activities API is introduced
- no Handoffs API is introduced
- no Campaign Workspace endpoint is introduced
- no automatic activity, timeline or decision context is created
- no chat/comment/reply/thread/mention behavior is introduced
- no AI/Copilot behavior is introduced

---

# Campaign Decision Context Implementation Validation

Campaign Decision Context is the third implemented Campaign child resource.

Validate:

- only Decision Context API endpoints are implemented in this cut
- decision context remains campaign-scoped
- decision context create/update operations persist facts only
- Campaign existence is validated
- decision context ownership by Campaign is validated
- `authorId` reference is validated when provided
- accepted related references are validated when provided
- no Activities API is introduced
- no Handoffs API is introduced
- no Campaign Workspace endpoint is introduced
- no automatic activity, timeline, note or handoff is created
- no comment/approval/knowledge-base behavior is introduced
- no AI/Copilot behavior is introduced

---

# Future Backend Commands

For future implementation sprints, run from `/backend`:

```bash
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run test
npm run build
```

For this documentation-only sprint, these commands are not required unless runtime files are touched.

---

# Resource-Specific Guardrails

## Blockers

Reject implementations that turn blockers into:

- ticket system
- incident system
- escalation engine
- SLA engine

## Notes

Reject implementations that turn notes into:

- chat
- comments
- threads
- mentions
- collaboration platform

## Decision Context

Reject implementations that turn decision context into:

- approval workflow
- comment system
- knowledge base
- documentation platform

## Activities

Reject implementations that turn activities into:

- event sourcing
- audit log platform
- automatic log of everything
- timeline presentation backend
- notification feed

## Handoffs

Reject implementations that turn handoffs into:

- workflow engine
- dependency graph
- BPM runtime
- orchestration layer

## Campaign Workspace Facts Endpoint

Reject implementations that turn workspace facts into:

- command center backend
- derived intelligence API
- timeline presentation API
- dashboard summary API

---

# Final Principle

Validation should keep Campaign child resources useful, small and campaign-scoped.
