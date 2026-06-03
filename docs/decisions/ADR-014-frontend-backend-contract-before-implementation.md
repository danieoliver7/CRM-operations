# ADR-014: Frontend Backend Contract Before Implementation

## Status

Accepted

## Context

CRM Operations Platform has validated the frontend operational experience, Backend MVP scope and Backend V1 stack direction.

The frontend still runs on mock/local data, and some fields in the current frontend model exist for UI compatibility rather than backend persistence.

If backend implementation starts without a contract layer, there is a risk that:

- mock fields become database schema by accident
- backend DTOs leak directly into components
- derived intelligence becomes persisted primary truth
- Campaign Workspace receives incomplete operational facts
- frontend and backend evolve incompatible shapes

## Decision

Before backend implementation begins, the project will define frontend-backend contracts.

The contract direction is:

```txt
Backend persisted facts
  -> API DTOs
  -> frontend mappers
  -> frontend View Models
  -> derived intelligence
  -> operational UI
```

Backend V1 should expose persisted operational facts.

The frontend should map DTOs and derive execution health, SLA state, operational risk, coordination state, workflow continuity, pressure indicators and timeline presentation.

## Consequences

Backend implementation planning can proceed with clearer response shape expectations.

Campaign Workspace becomes the first contract priority.

Current UI compatibility fields such as `owner`, `squad`, `progress` and `sla` are explicitly protected from becoming backend schema fields without review.

No backend code, Prisma schema, API route or frontend API client is approved by this ADR.

## Guardrails

Do not implement backend during contract preparation.

Do not create API client code during contract preparation.

Do not persist derived intelligence as Backend V1 truth.

Do not treat contract docs as final OpenAPI specs.

Do not expand product scope while preparing contracts.
