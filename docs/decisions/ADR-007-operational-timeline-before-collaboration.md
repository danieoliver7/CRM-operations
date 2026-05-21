# ADR-007: Operational Timeline Before Collaboration

## Status

Accepted

## Context

CRM Operations Platform now communicates planning pressure, execution health and coordination awareness.

The Campaign Workspace can show current state, risks, blockers and next actions, but users also need to understand how a campaign reached its current operational state.

The product is not ready for backend persistence, realtime collaboration, comments or audit logs.

## Decision

Introduce a lightweight Operational Timeline and Activity Model before implementing collaboration infrastructure.

The timeline will be:

- frontend-only
- mock/local
- partially derived from Campaign state
- based on simple domain types
- visible in Campaign Workspace
- prepared for future backend activity history

The timeline will not be:

- event sourcing
- audit log
- realtime comments
- notification center
- chat
- backend persistence

## Rationale

The MVP needs campaign execution history before it needs collaboration infrastructure.

Timeline behavior helps validate:

- which operational events matter
- how users understand workflow continuity
- how blockers and handoffs should be explained
- how campaign history should appear inside the workspace

This reduces backend risk later because the product can learn the activity model before committing to storage or realtime architecture.

## Consequences

- Campaign activity types become more explicit.
- Timeline event categories and importance levels are introduced.
- Campaign Workspace gains operational history context.
- Zustand remains shared operational state only.
- No backend, persistence, realtime or event sourcing is introduced.

## Guardrails

Do not implement:

- ActivityRuntime
- TimelineEngine
- EventStore
- AuditLogEngine
- EventSourcingLayer
- realtime collaboration
- comments system
- backend activity persistence

The correct approach remains lightweight operational timeline behavior.
