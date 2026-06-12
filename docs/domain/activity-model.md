# Activity Model

## Purpose

This document defines the activity model for CRM Operations Platform.

Activity represents meaningful operational events related to campaign execution.

Activities help explain:

- what happened
- when it happened
- who acted
- what operational movement occurred
- which fact changed the campaign story

Activities are campaign-scoped operational facts.

They are not event sourcing.

They are not audit logs.

They are not timeline presentation.

---

# Activity Philosophy

Activities should represent meaningful operational facts.

They should help explain:

- workflow movement
- ownership changes
- blockers
- handoffs
- notes
- decision context
- due date changes
- execution events

Activities should NOT represent:

- UI-only changes
- local component state
- filter changes
- hover events
- modal open/close
- search input changes
- tab changes
- technical debug logs
- every backend write
- every field update
- every validation failure

---

# Activity Categories

Activities should use lightweight categories so the UI can communicate context without creating a heavy event system.

## Workflow

Stage movement and workflow progression.

Examples:

- campaign_created
- status_changed
- workflow_stalled

## Coordination

Ownership, handoff and continuity events.

Examples:

- owner_changed
- handoff_started
- handoff_completed

## Execution

Health, blockers, SLA and risk events.

Examples:

- blocker_created
- blocker_resolved
- execution_risk_detected
- sla_due_soon
- campaign_overdue

## Planning

Planning context and campaign timing events.

Examples:

- priority_changed
- due_date_changed

## Collaboration

Lightweight human context.

Examples:

- note_added
- decision_recorded
- risk_note_added
- resolution_note_added
- handoff_note_added

---

# Current Activity Types

The current MVP supports activity types that can power both a lightweight activity feed and the future operational timeline:

- campaign_created
- status_changed
- priority_changed
- owner_changed
- blocker_created
- blocker_resolved
- handoff_started
- handoff_completed
- note_added
- decision_recorded
- risk_note_added
- resolution_note_added
- handoff_note_added
- due_date_changed
- execution_risk_detected
- sla_due_soon
- campaign_overdue
- workflow_stalled

This list is intentionally small.

Do not expand it into a workflow engine, audit log taxonomy or event sourcing catalog.

Use the current backend schema as the source of truth for exact enum values.

---

# Activity vs Timeline

Activity is a persisted operational fact.

Timeline is the workspace presentation of meaningful activity and derived operational context.

During the MVP, Timeline may later be derived from:

- activities
- Campaign state
- blockers
- notes
- decision context
- handoffs
- execution health
- coordination context
- SLA and risk signals

Activities should not become persisted timeline presentation records.

Do not store timeline UI fields in Activity records.

Do not implement timeline generation during Campaign Activities Implementation.

---

# Activity vs Event Sourcing

Activities are not event sourcing.

Do not use Activities to reconstruct current Campaign state.

Do not replay Activities to calculate state.

Do not create:

- aggregate versioning
- event sequence replay
- projections
- domain event bus
- event handlers
- CQRS
- event store

Campaign state remains stored directly in Campaign facts.

Activities explain meaningful operational movement.

---

# Activity Creation Scope

During Campaign Activities Implementation, Activities may be created only through the Activities API.

Do not automatically create activities from:

- Campaign create/update
- status changes
- priority changes
- owner changes
- squad changes
- blocker creation
- blocker resolution
- note creation
- note update
- decision context creation
- decision context update
- future handoff creation

Automatic activity creation may be evaluated later after the activity model is validated.

---

# Backend Implementation Status

During Backend V1, Activities have moved from frontend/mock validation to backend persistence.

Current implemented backend direction:

- campaign-scoped Activities API
- list activities by campaign
- create activity for a campaign
- validate campaign existence
- validate actor user reference when provided
- validate accepted related references when provided
- persist meaningful operational event facts only
- store optional related references through existing activity metadata

Current disallowed backend direction:

- event sourcing
- audit log platform
- automatic activity generation
- timeline generation
- activity replay
- projections
- notification feed
- workflow engine
- frontend integration
- AI features

---

# Operational Copilot Future

Activities may become important future input for a CRM Operations Copilot.

A future Copilot may use Activities to answer questions such as:

- what happened before this campaign delayed?
- who acted before the blocker appeared?
- which operational events usually precede delays?
- which campaigns had similar execution histories?

This is future vision only.

Do not implement now:

- embeddings
- vector database
- semantic search
- AI summaries
- Copilot insights
- prompt engine
- OpenAI API integration
- agent runtime

AI-ready means Activities are clean, contextual and campaign-scoped.

AI-ready does not mean AI implementation.

---

# Frontend Type Mapping

Current frontend types live in:

```txt
frontend/src/types/domain/activity.ts
frontend/src/types/domain/timeline.ts
```

CampaignActivity represents lightweight activity semantics.

TimelineEvent represents the operational timeline presentation model.

Frontend integration with the backend remains deferred.

---

# Do Not Implement Yet

Do not implement:

- frontend API client
- frontend replacement of mocks
- timeline generation
- automatic activity creation
- event sourcing
- audit logs
- activity replay
- notifications
- workflow engine
- permissions
- AI features

---

# Final Principle

Activities should help explain campaign execution.

They should not make the product feel bureaucratic, noisy, technical or overengineered.
