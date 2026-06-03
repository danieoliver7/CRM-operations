# Backend Implementation Plan

## Purpose

This document defines the planned first backend implementation path for CRM Operations Platform.

It is not backend code.

It is not a NestJS project.

It is not a Prisma schema.

It is the implementation plan that must be approved before backend code begins.

---

# Current Context

The project has completed:

- Backend Foundation Planning
- Backend Foundation Design
- Backend Foundation Architecture Review
- Backend MVP Definition
- Backend Stack Decision
- Frontend Backend Contract Preparation

The approved Backend V1 stack direction is:

```txt
NestJS
Prisma
PostgreSQL
REST-first API
Modular Monolith
```

Backend V1 should now be planned as a small, controlled implementation that makes Campaign Workspace facts durable.

---

# Implementation Goal

Backend V1 should start as a minimal persistence layer for Campaign Workspace durability.

The first backend implementation should:

- persist operational facts
- expose simple REST resources
- support Campaign Workspace data loading
- keep frontend-derived intelligence in the frontend
- stay compatible with a single default workspace assumption
- avoid full SaaS infrastructure

Backend V1 should not become a workflow engine, project management backend, realtime system or enterprise platform.

---

# Implementation Cuts

## Cut 1: Backend Skeleton

Goal:

Create the smallest NestJS backend skeleton needed to support later modules.

Planned scope:

- NestJS app setup
- health/check endpoint if needed
- shared config pattern
- module structure conventions
- local development script direction

Non-goals:

- auth
- Docker
- CI/CD
- controllers for product resources
- database schema
- migrations

Why first:

The project needs a predictable backend shell before persistence and routes are added, but the shell must stay intentionally small.

---

## Cut 2: Prisma And Database Foundation

Goal:

Introduce Prisma and PostgreSQL-compatible persistence only after the schema plan passes review.

Planned scope:

- Prisma setup
- database connection
- first migration
- seed direction for default workspace/reference data
- minimal environment variable requirements

Non-goals:

- analytics schema
- event sourcing tables
- auth tables
- billing tables
- permission model

Why second:

Persistence should enter only after backend structure exists and the first schema has been checked against persistence boundaries.

---

## Cut 3: Reference Data

Goal:

Persist and expose reference facts needed by Campaign Workspace.

Planned scope:

- default workspace
- users as reference data
- squads as reference data
- workspace-compatible ownership

Non-goals:

- real authentication
- RBAC
- organization switcher
- advanced tenant runtime

Why third:

Campaigns need owner and squad references. Reference data first prevents the backend from copying current frontend display fields into campaign records.

---

## Cut 4: Campaign Persistence

Goal:

Make campaign facts durable.

Planned scope:

- Campaign model
- campaign list
- campaign detail
- campaign create
- campaign update
- status/priority/owner/squad updates as simple fact changes

Non-goals:

- workflow automation
- command center summaries
- persisted progress
- persisted SLA labels

Why fourth:

Campaign remains the central operational aggregate. Durable campaign facts are the smallest useful backend value.

---

## Cut 5: Campaign Workspace Facts

Goal:

Persist and expose the child facts needed by Campaign Workspace.

Planned scope:

- activities
- blockers
- handoffs
- notes
- decision context
- composed Campaign Workspace response if selected

Non-goals:

- chat
- comments/replies
- event sourcing
- dependency graph runtime
- incident management

Why fifth:

Campaign Workspace becomes durable only when its supporting operational facts are available.

---

## Cut 6: Frontend Integration Planning

Goal:

Plan frontend integration after backend facts exist.

Planned scope:

- decide incremental API client placement
- define DTO to View Model mapper files
- plan mock-to-backend replacement order
- verify existing UI still derives intelligence locally

Non-goals:

- rewriting Campaign Workspace
- replacing Zustand as shared operational state during first integration
- moving derived intelligence into backend responses

Why sixth:

Frontend integration should happen after backend facts and contracts exist, not before.

---

# Validated Sequence

The sequence remains correct:

```txt
Backend Skeleton
  -> Prisma And Database Foundation
  -> Reference Data
  -> Campaign Persistence
  -> Campaign Workspace Facts
  -> Frontend Integration Planning
```

This order minimizes schema risk and keeps Campaign Workspace durability as the main product value.

---

# First Implementation Cut Recommendation

The first real backend sprint should implement only:

```txt
Cut 1: Backend Skeleton
```

It may prepare placeholders for module boundaries, but it should not implement product routes or schema in the same cut unless explicitly approved.

---

# What Remains Deferred

Do not implement in Backend V1 initial cuts:

- auth
- advanced RBAC
- billing
- realtime
- websocket
- notifications
- integrations
- AI
- workflow automation
- event sourcing
- CQRS
- microservices
- analytics warehouse
- Docker or CI/CD complexity

---

# Final Principle

The first backend implementation should make the next product fact durable.

It should not try to prove architectural ambition.
