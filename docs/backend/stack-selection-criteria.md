# Stack Selection Criteria

## Purpose

This document defines the criteria used to select the Backend V1 stack.

The goal is to avoid technology choices based on hype, habit or generic best practices.

---

# Selection Criteria

## 1. Domain Fit

The stack must support:

- campaign-centered architecture
- modular monolith
- relational persistence
- resource-oriented APIs
- future workspace scoping
- derived intelligence boundaries

## 2. Backend MVP Fit

The stack must support the approved Backend MVP:

- Campaign persistence
- workspace-compatible scope
- User reference data
- Squad reference data
- Campaign activities
- Blockers
- Handoffs
- Campaign notes
- Decision context

The stack must not expand Backend MVP scope.

## 3. TypeScript Continuity

The backend should align with the current frontend ecosystem.

The product already uses:

- React
- TypeScript
- domain types
- TypeScript utility functions

A TypeScript backend reduces context switching and supports AI-assisted development.

## 4. Developer Speed

Backend V1 should help the product become durable quickly.

The stack should reduce friction around:

- schemas
- migrations
- API creation
- module organization
- local development

## 5. AI Maintainability

The stack should be easy for AI agents and future developers to navigate.

Prefer:

- explicit folders
- clear module boundaries
- consistent naming
- predictable patterns
- documentation alignment

Avoid:

- hidden magic
- overly custom abstractions
- unconventional architecture
- excessive framework customization

## 6. Low Operational Complexity

Backend V1 should avoid operational burden.

Prefer:

- one backend service
- one database
- simple deployment path
- no queues
- no microservices
- no realtime infrastructure

## 7. SaaS Compatibility Without SaaS Complexity

The stack should support future SaaS growth.

But it should not force:

- billing
- advanced RBAC
- tenant runtime
- enterprise permissions
- organization admin workflows

into Backend V1.

---

# Stack Comparison Summary

## NestJS

Strengths:

- module structure
- TypeScript-first
- good fit for modular monolith
- predictable architecture
- strong for AI-assisted navigation
- natural REST controller structure

Risks:

- can introduce ceremony
- can tempt enterprise abstractions

Decision:

Selected for Backend V1 with strict guardrails.

## Express/Fastify

Strengths:

- lightweight
- fast to start
- low ceremony

Risks:

- module boundaries rely more on discipline
- easier to drift into inconsistent structure
- more custom project structure decisions

Decision:

Deferred for Backend V1.

Reconsider only if NestJS creates a concrete blocker.

## Prisma

Strengths:

- fast iteration
- readable schema
- migrations
- TypeScript integration
- developer productivity

Risks:

- schema-first drift
- ORM convenience shaping domain

Decision:

Selected for Backend V1 with schema review guardrails.

## Drizzle

Strengths:

- explicit SQL-oriented modeling
- lightweight abstraction

Risks:

- more discipline required
- potentially slower for first backend iteration

Decision:

Deferred for Backend V1.

Reconsider only if Prisma creates a concrete blocker.

## PostgreSQL

Strengths:

- relational model fit
- workspace scoping
- future SaaS growth
- durable operational facts
- bounded JSON support when appropriate

Risks:

- over-normalization
- JSON misuse
- premature analytics design

Decision:

Selected for Backend V1.

---

# Final Recommendation

Recommended Backend V1 stack:

```txt
NestJS + Prisma + PostgreSQL + REST-first API + Modular Monolith
```

This is a stack approval.

It is not backend implementation.
