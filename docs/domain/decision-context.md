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

Decision Context is not chat.

Decision Context is not a comment system.

Decision Context is not documentation software.

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

Bad examples:

- “ok”
- “checking”
- “done”
- “please see”
- random chat messages
- generic comments without operational value

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

## rationale

The reason behind an action or change.

Example:

- Approval was delayed because legal review was requested.

## risk-note

A note explaining operational risk.

Example:

- QA window is compressed because development started late.

## resolution-note

A note explaining how something was resolved.

Example:

- Missing links were added and QA can continue.

---

# What Decision Context Is NOT

Decision Context should NOT become:

- chat
- Slack replacement
- comment thread system
- document editor
- approval workflow
- incident postmortem
- knowledge base
- realtime collaboration

---

# Decision Context And Timeline

Important decision context entries may appear in the Operational Timeline.

Timeline should show decision context only when it helps explain campaign execution.

Examples:

- priority changed + decision note
- blocker resolved + resolution note
- due date changed + rationale
- handoff completed + decision note

Do not show every note in the timeline.

---

# Decision Context And Workspace

Decision Context should appear near:

- workflow context
- next actions
- blockers
- handoffs
- timeline
- execution intelligence

It should help users understand operational reasoning without leaving the Campaign Workspace.

---

# MVP Scope

During the MVP, Decision Context should remain:

- frontend-only
- mock/local
- lightweight
- contextual
- campaign-scoped

---

# Current Frontend Implementation

Current frontend types live in:

```txt
frontend/src/types/domain/decision-context.ts
frontend/src/types/domain/note.ts
```

Current lightweight context is derived/mock-based in:

```txt
frontend/src/modules/campaigns/utils/collaborationContext.ts
```

Current workspace UI is:

```txt
frontend/src/modules/campaigns/components/CampaignDecisionContext.tsx
```

This implementation validates operational memory before backend persistence or realtime collaboration.

Do not implement:

- backend persistence
- realtime comments
- threaded discussions
- mentions
- notifications
- permissions
- rich text editor
- approvals
- document collaboration

---

# Final Principle

Decision Context should preserve operational memory.

It should not create communication noise.
