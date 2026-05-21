# Operational Timeline

## Purpose

The Operational Timeline represents the meaningful operational history of a campaign.

It exists to help CRM teams understand:

- what happened
- when it happened
- who acted
- what changed
- what blocked progress
- what handoff occurred
- what decision shaped execution

The timeline is not a generic activity feed.

It is an operational continuity layer.

---

# Timeline Philosophy

The timeline should communicate operational progression.

It should help users answer:

- how did this campaign evolve?
- where did execution slow down?
- when did ownership change?
- what blockers appeared?
- what handoffs happened?
- what operational decisions were made?

The timeline should NOT become:

- realtime chat
- audit log
- notification center
- analytics stream
- incident timeline
- event sourcing system

---

# Timeline Events

Timeline events should represent meaningful operational changes.

Examples:

- campaign created
- status changed
- owner changed
- priority changed
- blocker detected
- blocker resolved
- handoff started
- handoff completed
- due date changed
- note added
- execution risk detected
- SLA became due soon
- campaign became overdue

---

# Timeline Event Categories

## Workflow Events

Events related to campaign stage movement.

Examples:

- briefing started
- copy moved to approval
- QA completed
- campaign scheduled

## Coordination Events

Events related to ownership, handoff and continuity.

Examples:

- owner changed
- handoff pending
- next responsible area changed
- campaign became stalled

## Execution Events

Events related to execution health, blockers and risks.

Examples:

- blocker created
- blocker resolved
- campaign became overdue
- operational risk increased

## Planning Events

Events related to campaign scheduling and operational pressure.

Examples:

- due date changed
- planned date changed
- campaign added to overloaded day

## Collaboration Events

Events related to notes or lightweight human input.

Examples:

- note added
- decision recorded

---

# Timeline Is Derived + Local For Now

During the MVP, timeline behavior should remain:

- frontend-only
- mock/local
- derived when possible
- lightweight
- contextual

Do not introduce:

- backend
- database
- persistence
- event sourcing
- realtime
- websocket
- audit log architecture

---

# Current Frontend Implementation

The current MVP represents timeline behavior with:

```txt
frontend/src/types/domain/timeline.ts
frontend/src/modules/campaigns/utils/operationalTimeline.ts
frontend/src/modules/campaigns/components/CampaignOperationalTimeline.tsx
```

The timeline utility derives operational events from:

- Campaign facts
- workflow status
- owner and squad context
- priority
- due date
- execution health
- blockers
- risks
- SLA state
- coordination state
- handoff context

This implementation is intentionally local and transparent.

It is not an event store, backend adapter or audit log.

---

# Timeline vs Activity Feed

## Activity Feed

Shows recent actions.

## Operational Timeline

Explains campaign execution history and continuity.

The product should gradually evolve from generic feed to operational timeline.

---

# Timeline Event Importance

Events should have lightweight importance levels:

- low
- normal
- high
- critical

Critical should be used sparingly.

Examples of critical events:

- campaign overdue
- high-severity blocker
- missing owner during urgent execution
- stalled workflow near due date

---

# Timeline Event Visibility

Timeline should prioritize:

1. blockers
2. overdue state
3. handoffs
4. ownership changes
5. workflow movement
6. due date changes
7. notes
8. low-impact metadata changes

---

# What Should Not Appear In Timeline

Avoid adding noise such as:

- hover events
- filter changes
- modal open/close
- local UI changes
- tab changes
- search input changes
- purely decorative system messages

---

# Timeline UX Philosophy

Timeline should feel:

- operational
- chronological
- contextual
- lightweight
- useful for execution review

Timeline should not feel:

- noisy
- bureaucratic
- audit-heavy
- like Jira history
- like system logs

---

# Final Principle

The timeline should make campaign execution easier to understand.

It should not make the product feel heavier.
