# Technical Blueprint

## Purpose

This document defines a technical blueprint for the future backend.

It should guide implementation later without creating backend code now.

---

# Recommended Backend Shape

The first backend should be planned as:

- modular monolith
- resource-oriented
- campaign-centered
- REST-first
- simple persistence layer
- PostgreSQL-backed
- Prisma-supported

This is a stack direction.

It is still not backend implementation.

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

This decision is documented in:

```txt
/docs/backend/backend-stack-decision.md
/docs/backend/stack-selection-criteria.md
/docs/backend/backend-v1-stack-guardrails.md
/docs/decisions/ADR-012-backend-stack-decision.md
```

---

# Why Modular Monolith

A modular monolith gives:

- clear module boundaries
- simple deployment
- easier debugging
- faster development
- enough structure for future SaaS growth

Avoid microservices until there is real operational scale.

---

# Proposed Backend Layers

## API Layer

Receives HTTP requests.

Should remain simple and resource-oriented.

## Application Layer

Coordinates use cases.

Should not become orchestration engine.

## Domain Layer

Defines operational concepts.

Should align with existing domain docs.

## Persistence Layer

Stores facts.

Should not store derived intelligence as primary truth.

---

# Proposed Module Structure

Possible future structure:

```txt
backend/
  src/
    modules/
      campaigns/
      activities/
      blockers/
      handoffs/
      notes/
      decision-context/
      users/
      squads/
      workspaces/
      organizations/
    shared/
    main.ts
```

This is a possible implementation shape, not a created directory plan for the current sprint.

---

# Module Boundary Principles

## Campaigns

Owns campaign facts and campaign lifecycle updates.

Should remain the primary aggregate boundary.

## Activities

Stores meaningful operational activity.

Should not become event sourcing, audit-log infrastructure or notification runtime.

## Blockers

Stores operational impediments attached to campaigns.

Should not become ticketing or incident management.

## Handoffs

Stores lightweight operational transitions.

Should not become dependency graph orchestration.

## Notes And Decision Context

Stores operational memory and reasoning.

Should not become chat, threaded comments or document collaboration.

## Users And Squads

Provide reference data for ownership and coordination.

Should not imply authentication, RBAC or identity-provider decisions yet.

## Workspaces And Organizations

Prepare future SaaS boundaries.

Should not force tenant runtime, billing or enterprise permissions into Phase 1.

---

# Persistence Direction

The persistence model should be relational first.

Likely facts:

- Campaign belongs to Workspace.
- Campaign may have Owner User.
- Campaign may belong to Squad.
- Campaign has many Activities.
- Campaign has many Blockers.
- Campaign has many Handoffs.
- Campaign has many Notes.
- Campaign has many Decision Context entries.

Derived intelligence should stay outside persistence as primary truth:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- planning pressure

---

## NestJS

Selected because it provides explicit modules, dependency injection and predictable REST structure.

Risk: can encourage enterprise ceremony before the product needs it.

## Express Or Fastify

Valid alternatives, but deferred for Backend V1.

Risk: module boundaries must be kept intentionally by convention.

## PostgreSQL

Selected for relational campaign data, workspace scoping and future SaaS growth.

## Prisma

Selected for developer speed, schema readability and TypeScript integration.

Risk: schema design should still follow the domain, not only ORM convenience.

## Drizzle

Valid alternative, but deferred for Backend V1.

Risk: may require more discipline around migrations and query composition.

---

# API Direction

The first backend should likely expose REST resources.

Resource boundaries should align with persisted facts:

- campaigns
- campaign activities
- campaign blockers
- campaign handoffs
- campaign notes
- campaign decision context
- users
- squads
- workspaces
- organizations

Do not expose orchestration endpoints as the first backend shape.

---

# Design Decisions Still Open

The stack direction is selected, but these decisions remain open until implementation planning:

- auth timing based on deployment target
- auth provider if auth is required
- database hosting provider
- deployment provider
- file storage provider
- exact API route shape
- first schema proposal

Do not reopen NestJS vs Express/Fastify or Prisma vs Drizzle unless a concrete implementation blocker is found.

---

# Blueprint Guardrail

This blueprint should make future implementation obvious.

It should not create backend files, schemas, migrations or runtime infrastructure during this sprint.

---

# Architecture Review Notes

The architecture review did not identify a need to replace the modular monolith direction.

It did identify constraints for implementation:

- keep module boundaries shallow and campaign-centered
- do not create backend-derived intelligence endpoints in the first backend
- do not treat Activity as event sourcing
- do not persist TimelineEvent as presentation state
- keep Workspace scoping simple before advanced tenancy
- decide auth timing based on deployment target
