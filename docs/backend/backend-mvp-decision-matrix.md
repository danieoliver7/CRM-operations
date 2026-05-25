# Backend MVP Decision Matrix

## Purpose

This document defines decision rules for Backend MVP implementation choices.

It exists to prevent impulsive technology and scope decisions.

---

# Decision Status Legend

## Required Now

Must be part of Backend MVP.

## Optional

Can be included only if required for Campaign Workspace durability.

## Conditional

Depends on deployment target or first implementation context.

## Candidate

May be considered, but not locked yet.

## Deferred

Should not be part of Backend MVP.

## Explicitly Avoid

Should not be introduced without a future ADR.

---

# Product Scope Decisions

| Decision | Status | Rationale |
|---|---|---|
| Campaign persistence | Required Now | Core product durability depends on campaigns |
| Workspace-compatible scope | Required Now | Needed for future SaaS compatibility |
| Single default workspace | Required Now | Keeps MVP simple while preserving future scoping |
| Organization runtime | Deferred | Commercial boundary later |
| Full multi-tenancy | Deferred | Too early for Backend MVP |
| Auth | Conditional | Depends on deployment target |
| Advanced RBAC | Explicitly Avoid | Enterprise complexity too early |
| Realtime | Deferred | Persistence should come first |
| Integrations | Deferred | Core product must be durable first |
| Billing/subscriptions | Deferred | Not needed for Campaign Workspace durability |

---

# Data Decisions

| Decision | Status | Rationale |
|---|---|---|
| Persist Campaign | Required Now | Central aggregate |
| Persist User references | Required Now | Needed for ownership and authorship |
| Persist Squad references | Required Now | Needed for coordination and planning |
| Persist Activity facts | Required Now | Needed for operational history |
| Persist Blockers | Required Now | Needed for execution intelligence |
| Persist Handoffs | Required Now | Needed for coordination awareness |
| Persist Campaign Notes | Required Now | Needed for operational memory |
| Persist Decision Context | Required Now | Needed for rationale and decision memory |
| Persist Attachment metadata | Optional | Only if workspace durability needs attachment references |
| Persist Campaign metrics | Optional | Only if captured facts are needed in MVP |
| Persist Timeline presentation | Explicitly Avoid | Timeline should be derived |
| Persist Execution Health | Explicitly Avoid | Derived intelligence |
| Persist Operational Risk | Explicitly Avoid | Derived intelligence |
| Persist Coordination State | Explicitly Avoid | Derived intelligence |
| Persist UI state | Explicitly Avoid | Not domain data |

---

# Architecture Decisions

| Decision | Status | Rationale |
|---|---|---|
| Modular monolith | Candidate | Strong likely direction |
| REST-first API | Candidate | Simple and resource-oriented |
| PostgreSQL-compatible DB | Candidate | Fits relational domain |
| NestJS | Candidate | Structure, but may add ceremony |
| Express/Fastify | Candidate | Lightweight, but needs discipline |
| Prisma | Candidate | Fast schema/type workflow |
| Drizzle | Candidate | Explicit SQL-friendly approach |
| Microservices | Explicitly Avoid | Premature complexity |
| Event sourcing | Explicitly Avoid | Activities are not source of truth |
| CQRS | Explicitly Avoid | Not needed for MVP |
| Docker | Deferred | Not needed for scope definition |
| CI/CD complexity | Deferred | Not needed before backend implementation exists |

---

# Auth Decision Rule

If Backend MVP is local/dev/internal:

```txt
Auth may be deferred.
```

If Backend MVP is hosted/shared:

```txt
Basic auth should be introduced earlier.
```

Always defer:

- enterprise RBAC
- complex permission matrix
- SSO
- billing roles
- tenant admin permissions

Do not lock auth provider during Backend MVP Definition.

---

# Inclusion Test

A capability belongs in Backend MVP only if it passes all three checks:

1. Does it make Campaign Workspace durable?
2. Does it persist operational facts rather than derived intelligence?
3. Can it be implemented without expanding into SaaS, realtime, automation or enterprise architecture?

If any answer is no, it should be optional, deferred or explicitly avoided.
