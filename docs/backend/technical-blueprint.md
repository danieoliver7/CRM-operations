# Technical Blueprint

## Purpose

This document defines a technical blueprint for the future backend.

It should guide implementation later without creating backend code now.

---

# Recommended Backend Shape

The first backend should likely be:

- modular monolith
- resource-oriented
- campaign-centered
- API-first
- simple persistence layer
- PostgreSQL-compatible
- ORM-supported

This is a recommendation direction, not final implementation.

---

# Candidate Stack

The likely future stack may be:

- Node.js
- NestJS or Express/Fastify
- PostgreSQL
- Prisma or Drizzle
- REST API first

No final stack decision should be locked until implementation sprint.

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

# Candidate Stack Tradeoffs

## Node.js

Strong fit because the frontend is TypeScript and the team can share domain vocabulary.

## NestJS

Good candidate if the project wants explicit modules, dependency injection and stronger backend structure.

Risk: can encourage enterprise ceremony before the product needs it.

## Express Or Fastify

Good candidates if the project wants a smaller backend surface and faster iteration.

Risk: module boundaries must be kept intentionally by convention.

## PostgreSQL

Strong candidate for relational campaign data, workspace scoping and future SaaS growth.

## Prisma

Good candidate for developer speed and schema readability.

Risk: schema design should still follow the domain, not only ORM convenience.

## Drizzle

Good candidate for explicit SQL-oriented modeling and lighter abstraction.

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

Do not lock yet:

- NestJS vs Express vs Fastify
- Prisma vs Drizzle
- database hosting provider
- auth provider
- deployment provider
- file storage provider

These should be decided during implementation planning, not during documentation design.

---

# Blueprint Guardrail

This blueprint should make future implementation obvious.

It should not create backend files, schemas, migrations or runtime infrastructure during this sprint.
