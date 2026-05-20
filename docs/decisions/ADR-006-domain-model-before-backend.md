# ADR-006: Domain Model Before Backend

## Status

Accepted

## Context

CRM Operations Platform is still a frontend-first MVP.

The product is validating operational behavior, workflow coordination, execution intelligence and workspace UX before infrastructure.

At the same time, the domain is now stable enough to organize frontend types around future backend entities.

## Decision

Create lightweight frontend domain type modules before implementing backend infrastructure.

The domain model should separate:

- persisted domain data
- derived operational intelligence
- UI-only state
- future commercial readiness entities

This does NOT authorize backend implementation.

## Scope

Allowed now:

- TypeScript domain entity types
- compatibility exports for existing UI imports
- lightweight Organization, Workspace and Membership reference types
- documentation updates

Not allowed now:

- NestJS
- Prisma
- PostgreSQL
- API routes
- authentication
- persistence
- localStorage
- realtime
- multi-tenant runtime
- permission system

## Consequences

The frontend becomes easier to evolve toward backend implementation later.

Derived intelligence remains in utility functions and is not persisted as source of truth.

The current UI remains compatible with existing mocks and Zustand state.
