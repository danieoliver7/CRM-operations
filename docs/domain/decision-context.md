# Decision Context

## Purpose

Decision Context represents the operational reasoning behind campaign execution.

It exists to help CRM teams understand:

- why something changed
- why a campaign was delayed
- why a blocker matters
- why a handoff happened
- why a priority changed
- what operational decision was made
- what should be remembered later

Decision Context is not chat.

Decision Context is not a comment system.

Decision Context is not documentation software.

Decision Context is not an approval workflow.

It is lightweight operational reasoning attached to campaign execution.

---

# Decision Context Philosophy

The product should not only show what happened.

It should help explain why it happened.

Operational Timeline explains:

- what happened
- when it happened
- who acted

Decision Context explains:

- why it happened
- what was decided
- what changed operationally
- what should be remembered later

---

# Examples

Good decision context examples:

- Audience validation was postponed because segmentation changed.
- QA was delayed because creative assets were not final.
- Campaign priority was increased due to business urgency.
- Approval moved back to copy because CTA needed revision.
- Send date changed because owner workload was overloaded.
- Campaign launch moved because the blocker impacted QA time.
- Delay was accepted because audience quality was more important than speed.

Bad examples:

- “ok”
- “checking”
- “done”
- “please see”
- random chat messages
- generic comments without operational value
- approval-only messages
- knowledge base documentation

---

# Decision Context Should Capture

A decision context entry may capture:

- campaignId
- authorUserId
- type
- title
- content
- relatedWorkflowStage
- relatedBlockerId
- relatedHandoffId
- relatedActivityId
- createdAt
- updatedAt

Use the current backend schema as source of truth.

API contracts may expose cleaner names such as:

- authorId
- body

when mapping internal persistence fields to external DTOs.

Current backend API maps:

```txt
authorUserId -> authorId
content      -> body
```

`relatedStatus` is not currently persisted by the schema and should not be exposed as Backend V1 truth.

---

# Decision Context Types

## decision

A meaningful operational decision.

Example:

- Send date moved to protect QA quality.

## rationale

The reason behind an action or change.

Example:

- Approval delayed because legal review was requested.

## clarification

Operational clarification that reduces ambiguity.

Example:

- Audience should exclude inactive subscribers from the last 180 days.

## risk-note

A note explaining operational risk.

Example:

- QA window is compressed because development started late.

## resolution-note

A note explaining how something was resolved.

Example:

- Missing links were added and QA can continue.

---

# Decision Context Versus Notes

Notes preserve lightweight operational memory.

Decision Context explains why an operational decision happened.

Notes can record:

- Audience file expected tomorrow.
- QA owner is waiting for final image.
- CRM squad asked for updated segmentation.

Decision Context should explain:

- Campaign launch was moved because audience validation depends on the revised segmentation file.
- Priority was increased because the campaign supports an active media push.
- QA was delayed because blocker resolution happened after the cutoff time.

Do not merge Notes and Decision Context into a generic comment system.

Do not automatically create Notes from Decision Context.

Do not automatically create Decision Context from Notes.

---

# What Decision Context Is NOT

Decision Context should NOT become:

- chat
- Slack replacement
- comment thread system
- document editor
- approval workflow
- sign-off system
- incident postmortem
- knowledge base
- realtime collaboration
- AI-generated explanation store

---

# Decision Context And Timeline

Important decision context entries may appear in the Operational Timeline later.

Timeline should show decision context only when it helps explain campaign execution.

Examples:

- priority changed + decision rationale
- blocker resolved + resolution rationale
- due date changed + rationale
- handoff completed + decision rationale

Do not show every decision context record in the timeline.

Do not generate timeline presentation events from Decision Context in the backend during the current sprint.

Timeline remains derived later from facts.

---

# Decision Context And Workspace

Decision Context should eventually appear near:

- workflow context
- next actions
- blockers
- handoffs
- timeline
- execution intelligence

It should help users understand operational reasoning without leaving the Campaign Workspace.

However, Campaign Workspace endpoint remains deferred until child facts exist.

---

# Backend Implementation Status

During Backend V1, Decision Context moves from frontend/mock validation to backend persistence.

Current allowed backend direction:

- campaign-scoped Decision Context API
- list decision context by campaign
- create decision context for a campaign
- update decision context
- validate campaign existence
- validate author user reference when provided
- validate accepted related references when provided
- persist operational reasoning facts only

Current disallowed backend direction:

- comments
- replies
- threads
- mentions
- approvals
- knowledge base
- automatic activities
- automatic timeline events
- frontend integration
- AI features

---

# Operational Copilot Future

Decision Context may become important future input for a CRM Operations Copilot.

A future Copilot may use Decision Context to answer questions such as:

- why did this campaign delay?
- why did priority change?
- why was this blocker accepted?
- why was this campaign moved?
- what decision changed the campaign direction?

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

AI-ready means Decision Context is clean, contextual and campaign-scoped.

AI-ready does not mean AI implementation.

---

# Current Frontend Implementation

Current frontend types live in:

```txt
frontend/src/types/domain/decision-context.ts
frontend/src/types/domain/note.ts
```

Frontend implementations may continue deriving presentation and timeline context from persisted facts.
