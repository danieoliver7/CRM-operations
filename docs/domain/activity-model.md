# Activity Model

## Purpose

This document defines the activity model for CRM Operations Platform.

Activity represents meaningful operational events related to campaign execution.

The goal is to support future operational timeline behavior without implementing backend persistence too early.

---

# Activity Philosophy

Activities should represent operational facts.

They should help explain:

- workflow movement
- ownership changes
- blockers
- handoffs
- notes
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

---

# Current Activity Types

The current MVP supports activity types that can power both a lightweight activity feed and the operational timeline:

- campaign_created
- status_changed
- priority_changed
- owner_changed
- blocker_created
- blocker_resolved
- handoff_started
- handoff_completed
- note_added
- due_date_changed
- execution_risk_detected
- sla_due_soon
- campaign_overdue
- workflow_stalled

This list is intentionally small.

Do not expand it into a workflow engine or audit log taxonomy.

---

# Activity vs Timeline

Activity is the domain event shape.

Timeline is the workspace presentation of meaningful activity and derived operational context.

During the MVP, timeline events may be:

- mock-based
- derived from Campaign state
- derived from execution health
- derived from coordination context
- derived from SLA and risk signals

They should not become persisted event sourcing records.

---

# Frontend Type Mapping

Current frontend types live in:

```txt
frontend/src/types/domain/activity.ts
frontend/src/types/domain/timeline.ts
```

CampaignActivity represents lightweight activity semantics.

TimelineEvent represents the operational timeline presentation model.

Both are backend-ready concepts, but no backend exists in the current phase.

---

# Final Principle

Activities should help explain campaign execution.

They should not make the product feel bureaucratic, noisy or technical.
