# Backend Stack Decision

## Purpose

This document records the recommended backend stack direction for CRM Operations Platform Backend V1.

This is a stack decision document.

It does not start backend implementation.

---

# Current Phase

Backend Stack Decision

The project has already completed:

- Backend Foundation Planning
- Backend Foundation Design
- Backend Foundation Architecture Review
- Backend MVP Definition

The next step is to approve the most appropriate stack for Backend V1.

---

# Selected Backend V1 Stack

The selected Backend V1 stack direction is:

```txt
NestJS
Prisma
PostgreSQL
REST-first API
Modular Monolith
```

This decision approves a stack direction for implementation planning.

It does not approve backend code, schema files, API routes, auth, Docker or deployment infrastructure.

---

# Why NestJS

NestJS is selected for Backend V1 because it supports:

- TypeScript continuity with the frontend
- clear module boundaries
- modular monolith organization
- predictable controllers/services/modules structure
- AI-assisted development with consistent conventions
- future SaaS compatibility without requiring microservices

## NestJS Risk

NestJS can add ceremony and encourage enterprise patterns too early.

## NestJS Guardrail

Use NestJS simply.

Do not use NestJS to introduce:

- microservices
- CQRS
- event sourcing
- workflow orchestration
- generic repository architecture by default
- excessive decorators or framework magic

---

# Why Prisma

Prisma is selected for Backend V1 because it supports:

- fast schema iteration
- readable schema definition
- migration workflow
- TypeScript integration
- developer productivity
- a good first-backend feedback loop

## Prisma Risk

Prisma can encourage schema-first drift where ORM convenience shapes the domain.

## Prisma Guardrail

Prisma schema must follow:

- domain entities
- persistence boundaries
- Backend MVP scope
- first schema review checklist

Prisma must not persist derived intelligence as source of truth.

---

# Why PostgreSQL

PostgreSQL is selected for Backend V1 because the domain is relational:

- campaigns belong to workspaces
- campaigns have owners and squads
- campaigns have activities, blockers, handoffs, notes and decision context
- future SaaS needs organization and workspace scoping
- bounded JSON can support operational metadata where appropriate

## PostgreSQL Risks

PostgreSQL can be misused through:

- over-normalization
- JSON dumping ground
- premature analytics warehouse design
- complex permission graphs too early

## PostgreSQL Guardrail

PostgreSQL stores operational facts.

It should not store:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- timeline presentation state
- command center summaries

---

# Why REST-First

REST-first is selected because Backend V1 is resource-oriented.

The first backend should expose persisted facts through simple resources:

- campaigns
- activities
- blockers
- handoffs
- notes
- decision-context
- users
- squads
- workspaces

## REST-First Guardrail

Do not create first-backend APIs for:

- workflow runtime
- orchestration
- AI prediction
- execution health
- operational risk
- coordination state
- command center summaries

Derived intelligence should remain derived from persisted facts.

---

# Why Modular Monolith

Modular monolith remains the approved architecture because Backend V1 needs:

- one deployable backend
- clear internal module boundaries
- simple operational model
- fast iteration
- enough structure for future SaaS growth

It does not need:

- microservices
- distributed systems
- event sourcing
- CQRS
- queues
- orchestration runtime

---

# Why Not Express/Fastify For V1

Express and Fastify remain valid alternatives.

They are not selected for Backend V1 because:

- module boundaries rely more on team discipline
- structure can drift faster during AI-assisted development
- the project already values docs-driven modularity
- NestJS better matches the desired modular monolith shape

They should only be reconsidered if NestJS creates a concrete implementation blocker.

---

# Why Not Drizzle For V1

Drizzle remains a valid alternative.

It is not selected for Backend V1 because:

- Prisma is faster for first schema iteration
- Prisma gives a more direct TypeScript productivity path
- Prisma migration workflow is sufficient for this stage

Drizzle should only be reconsidered if Prisma creates a concrete schema or operational blocker.

---

# Decisions Still Open

This stack decision does not decide:

- auth provider
- hosting provider
- database hosting provider
- storage provider
- exact API route shape
- first schema proposal
- local development setup
- deployment strategy

Those belong to future implementation planning.

---

# Final Principle

The stack exists to serve the Backend MVP.

It must not expand the product scope.
