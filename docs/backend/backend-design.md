# Backend Design

## Purpose

This document defines the backend design direction for CRM Operations Platform.

This is a design document.

It is NOT implementation.

Do not create backend code from this document alone.

---

# Current Phase

Backend Foundation Design

The previous phase defined:

- backend principles
- persistence boundaries
- entity relationships
- API boundaries
- backend planning risks

This phase should transform planning into a technical blueprint.

---

# Backend Design Goal

The backend should make the validated operational MVP durable.

It should support:

- campaign persistence
- operational activity history
- blockers
- handoffs
- notes
- decision context
- users
- squads
- workspace scope

Without introducing unnecessary complexity.

---

# Architecture Direction

The recommended direction is:

## Modular Monolith

The first backend should likely be a modular monolith.

It should NOT be:

- microservices
- event sourcing
- CQRS
- distributed system
- workflow engine
- orchestration platform

A modular monolith is enough because the product still needs:

- simple persistence
- clear domain boundaries
- low operational complexity
- fast iteration
- one deployable unit
- room to enforce module boundaries without distributed system cost

This is a direction, not a final framework decision.

## Why Not Microservices

Microservices would add operational complexity before the product has:

- validated backend scale requirements
- multiple independent teams owning backend domains
- proven deployment bottlenecks
- infrastructure maturity

The current need is durability for a campaign-centered product, not distributed ownership.

## Why Not Event Sourcing

Operational activity and timeline are important, but the product does not yet need event sourcing.

The first backend should persist meaningful activity facts.

It should not reconstruct campaign state from an event stream.

Event sourcing would make the MVP harder to reason about and could turn timeline into infrastructure instead of product context.

## Why Not CQRS

The current product has simple read/write needs:

- list campaigns
- retrieve workspace context
- update campaign facts
- create blockers, handoffs, notes and decisions

Separate command/query models are premature until query complexity, scale or consistency needs prove otherwise.

## Why REST-First

The first API should likely be REST-first because the product boundaries are resource-oriented:

- campaigns
- activities
- blockers
- handoffs
- notes
- decision context
- users
- squads
- workspaces

REST keeps the first backend explicit and easy to validate.

GraphQL can be revisited later if workspace composition becomes painful.

## Why PostgreSQL-Compatible

PostgreSQL is a strong future candidate because the domain needs:

- relational ownership
- campaign child records
- workspace scoping
- timestamps and audit-friendly facts
- optional JSON metadata for bounded operational context

This does not lock the implementation to PostgreSQL yet.

It only says the design should remain compatible with a relational database.

---

# Core Backend Modules

Expected future modules:

## Campaigns

Owns campaign persistence and campaign facts.

## Activities

Owns operational activity records.

## Blockers

Owns operational impediments.

## Handoffs

Owns operational transitions.

## Notes

Owns lightweight operational notes.

## Decision Context

Owns operational reasoning and memory.

## Users

Provides operator reference data.

## Squads

Provides team reference data.

## Workspaces

Provides future workspace scope.

## Organizations

Provides future commercial boundary.

---

# Aggregate Direction

Campaign should remain the central operational aggregate.

Most operational child records belong to Campaign:

- activities
- blockers
- handoffs
- notes
- decision context
- attachments
- metrics

Avoid designing backend modules that force operational context away from Campaign.

---

# Derived Intelligence Boundary

Backend design should not persist these as source of truth:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- planning pressure
- command center summary

These should remain derived from persisted facts.

---

# First Backend Design Scope

The first backend design may include:

- Campaign model
- User model
- Squad model
- Activity model
- Blocker model
- Handoff model
- CampaignNote model
- DecisionContext model
- Workspace model
- Organization model

But implementation should come later.

The design should treat Workspace and Organization as future SaaS boundaries.

They can be represented early in diagrams and relationships without forcing full multi-tenancy runtime, billing or enterprise permissions.

---

# Deferred Design Scope

Do not design deeply yet:

- billing
- advanced RBAC
- realtime
- notifications
- integrations
- AI features
- analytics warehouse
- workflow automation
- approval engine
- audit-log architecture

---

# Backend Risks

Watch for:

- over-normalizing campaign child entities
- persisting derived intelligence as source of truth
- designing a generic project management backend
- turning workflow into an engine
- adding advanced RBAC before basic auth and membership are needed
- introducing microservices before one backend has real pressure
- letting framework conventions reshape the product domain
- building realtime before durable persistence exists

---

# Design Output Expected

This phase should produce:

- recommended backend architecture
- module boundaries
- entity design direction
- schema design guidelines
- implementation sequence
- risks and tradeoffs
- technology recommendation candidates

This phase should NOT produce:

- backend code
- API routes
- Prisma schema
- migrations
- Docker
- auth implementation
- database setup

---

# Final Principle

Backend design should make future implementation obvious without starting implementation prematurely.
