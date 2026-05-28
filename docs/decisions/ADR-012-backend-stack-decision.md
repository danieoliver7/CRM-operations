# ADR-012: Backend Stack Decision

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Foundation Planning
- Backend Foundation Design
- Backend Foundation Architecture Review
- Backend MVP Definition

The Backend MVP is defined as:

```txt
A minimal persistence layer for Campaign Workspace durability.
```

The project now needs a recommended stack direction for Backend V1.

The selected stack must support:

- Campaign Workspace durability
- modular monolith architecture
- REST-first APIs
- relational persistence
- TypeScript continuity
- AI-assisted maintainability
- future SaaS compatibility

without expanding Backend MVP scope.

---

# Decision

The recommended Backend V1 stack is:

```txt
NestJS
Prisma
PostgreSQL
REST-first API
Modular Monolith
```

This decision approves stack direction only.

It does not approve backend implementation.

---

# Why

## NestJS

NestJS provides clear TypeScript module structure and predictable REST controller/service patterns.

This fits a modular monolith and helps AI-assisted development stay consistent.

## Prisma

Prisma provides fast schema iteration, readable schema definition, migration workflow and TypeScript integration.

This fits a first backend focused on durability.

## PostgreSQL

PostgreSQL fits the relational campaign-centered domain, workspace scoping and future SaaS direction.

Bounded JSON support can help with operational metadata without replacing core relationships.

## REST-first API

REST-first fits the resource-oriented Backend MVP:

- campaigns
- activities
- blockers
- handoffs
- notes
- decision context
- users
- squads
- workspaces

## Modular Monolith

The product needs one coherent backend with clear module boundaries.

It does not need microservices or distributed architecture for Backend V1.

---

# Alternatives Considered

## Express/Fastify

Valid alternatives.

Deferred because Backend V1 benefits from NestJS structure and predictable module boundaries.

Reconsider only if NestJS creates a concrete implementation blocker.

## Drizzle

Valid alternative.

Deferred because Prisma is better aligned with first-backend iteration speed and TypeScript productivity.

Reconsider only if Prisma creates a concrete schema or operational blocker.

---

# Risks

This decision introduces risks:

- NestJS ceremony
- Prisma schema-first drift
- PostgreSQL over-normalization
- JSON dumping ground
- REST endpoints expanding into orchestration
- framework conventions reshaping the product domain

---

# Guardrails

The stack must follow:

- Backend MVP scope
- persistence boundaries
- entity relationships
- first schema review checklist
- architecture risks
- product principles

Do not use the selected stack to introduce:

- backend beyond Backend MVP
- workflow engine
- event sourcing
- CQRS
- microservices
- advanced RBAC
- realtime
- integrations
- analytics warehouse
- generic project management backend

---

# What This Decision Does Not Approve

This ADR does not approve:

- NestJS app creation
- Prisma schema creation
- database connection
- migrations
- API routes
- auth setup
- Docker setup
- deployment setup

---

# Open Decisions

Still open:

- auth timing and provider
- hosting provider
- database hosting provider
- storage provider
- exact API route shape
- first schema proposal
- local development setup

---

# Final Decision

Backend V1 stack direction is approved as NestJS + Prisma + PostgreSQL + REST-first API + Modular Monolith.

Implementation remains deferred until an implementation sprint explicitly begins.
