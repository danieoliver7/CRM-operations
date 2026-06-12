# Handoffs

## Purpose

Handoffs represent lightweight operational transitions in CRM campaign execution.

They help teams understand:

- who needs to act next
- which squad or owner is receiving work
- where the campaign is waiting
- which workflow stage is being transferred
- whether ownership is clear
- why coordination may be blocked

Handoffs are campaign-scoped operational facts.

They are not workflow automation.

They are not dependency graphs.

They are not BPM.

---

# Handoff Philosophy

Handoffs exist to improve operational coordination.

They should make responsibility visible.

They should help answer:

```txt
Who owns the next step?
```

```txt
Which team is waiting?
```

```txt
What was transferred?
```

```txt
Why is this campaign paused?
```

```txt
Where did execution continuity break?
```

Handoffs should be simple, contextual and human-readable.

---

# Common Handoff Examples

Examples:

- briefing to copy
- copy to approval
- approval to development
- development to QA
- QA to scheduling
- CRM to media
- media to CRM
- owner to owner
- squad to squad

---

# Handoff Facts

A handoff may capture:

- campaignId
- status
- fromStage
- toStage
- fromOwnerId
- toOwnerId
- fromSquadId
- toSquadId
- reason
- completedAt
- cancelledAt
- createdAt
- updatedAt

Use the current backend schema as source of truth.

API contracts may expose cleaner names when mapping internal persistence fields to external DTOs.

Current Backend V1 implementation does not persist `requestedById`, `completedById`, `cancelledById`, `notes` or `dueAt`.

Do not accept those fields until the schema explicitly adds them.

---

# Handoff Status

Handoff status should remain simple.

Conceptual statuses:

- pending
- completed
- cancelled

Do not introduce complex workflow states.

Do not introduce multi-step approvals.

Do not introduce dependency graph state.

Do not introduce escalation flows unless explicitly planned later.

---

# Handoffs Versus Workflow

Workflow guides campaign execution.

Handoff records an operational transition.

A handoff may indicate that work moved from one stage, person or squad to another.

However, Handoffs must not enforce workflow movement.

Do not automatically change Campaign status when a handoff is created.

Do not automatically move Campaign to the next workflow stage when a handoff is completed.

Do not create a workflow runtime.

---

# Handoffs Versus Activities

Activities record meaningful operational events.

Handoffs record coordination transitions.

A handoff may later generate or appear as an activity, but that is not part of the initial Handoffs implementation.

Do not automatically create activities from handoffs during Campaign Handoffs Implementation.

---

# Handoffs Versus Timeline

Handoffs are persisted operational facts.

Timeline is a future workspace presentation layer.

A handoff may later appear in the timeline when it helps explain campaign execution.

Do not generate timeline events during Campaign Handoffs Implementation.

Do not store timeline UI fields in Handoffs.

---

# What Handoffs Are NOT

Handoffs are not:

- workflow engine
- dependency graph
- BPM software
- task management system
- approval workflow
- SLA engine
- notification feed
- orchestration layer
- automation runtime
- state machine runtime
- AI planner

---

# Backend Implementation Direction

During Backend V1, Handoffs may become backend-persisted campaign-scoped facts.

Allowed backend direction:

- list handoffs by campaign
- create handoff for a campaign
- update handoff facts
- complete handoff
- cancel handoff
- validate campaign existence
- validate handoff belongs to campaign
- validate user references when provided
- validate squad references when provided
- reject unsupported ownership/completion fields that cannot be persisted safely

Disallowed backend direction:

- workflow engine
- dependency graph
- automatic campaign status changes
- automatic activity creation
- automatic timeline generation
- notifications
- task management
- frontend integration
- AI features

---

# Operational Copilot Future

Handoffs may become important future input for a CRM Operations Copilot.

A future Copilot may use Handoffs to answer questions such as:

- where does execution usually stall?
- which squad receives too many delayed handoffs?
- which transitions slow down campaign execution?
- which workflow stages create operational bottlenecks?
- where does ownership become unclear?

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

AI-ready means Handoffs are clean, contextual and campaign-scoped.

AI-ready does not mean AI implementation.

---

# Final Principle

Handoffs should clarify operational responsibility.

They should not create workflow bureaucracy, dependency graph complexity or automation overengineering.
