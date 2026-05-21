# Collaboration Model

## Purpose

This document defines the lightweight collaboration model for CRM Operations Platform.

The goal is to support operational collaboration without turning the product into chat, project management or ticketing software.

---

# Collaboration Philosophy

Collaboration in CRM Operations Platform should happen through operational context.

The product should help teams collaborate by showing:

- who owns the campaign
- who needs to act
- what decision was made
- why execution changed
- what blocker needs resolution
- what handoff is pending
- what context should be remembered

Collaboration should NOT be centered around generic conversation.

---

# Collaboration Should Support

- operational notes
- decision context
- resolution notes
- handoff context
- blocker context
- workflow clarification
- campaign execution memory

---

# Collaboration Should NOT Become

- chat
- Slack replacement
- comment thread platform
- task management
- ticket system
- approval engine
- realtime collaboration system
- document editor

---

# Core Collaboration Concepts

## Campaign Note

A lightweight note attached to campaign context.

Use for:

- clarifications
- operational reminders
- execution observations

## Decision Context

A note that explains a meaningful operational decision.

Use for:

- why status changed
- why priority changed
- why due date changed
- why handoff happened
- why blocker was resolved

## Resolution Note

A note explaining how an operational issue was resolved.

Use for:

- blocker resolution
- QA resolution
- approval clarification
- missing asset resolution

## Handoff Note

A note supporting transition between stages or teams.

Use for:

- briefing to copy context
- copy to approval context
- development to QA context
- QA to scheduled context

---

# Collaboration Entity Direction

During the MVP, collaboration can be represented by lightweight local/mock entities.

Possible future shape:

- id
- campaignId
- authorUserId
- type
- content
- relatedStage
- relatedBlockerId
- relatedHandoffId
- importance
- createdAt
- updatedAt

---

# Collaboration Types

Recommended lightweight types:

- note
- decision
- clarification
- risk-note
- resolution-note
- handoff-note

Keep this list small.

Do not create enterprise taxonomy.

---

# Collaboration Importance

Use simple importance:

- low
- normal
- high

Avoid critical unless tied to actual blockers, overdue state or urgent operational risk.

---

# Collaboration And Timeline

Some collaboration entries may become timeline events.

Examples:

- decision recorded
- blocker resolution explained
- handoff context added
- risk note added

But not every note should appear in timeline.

Timeline should stay meaningful.

---

# Collaboration And Activity

Collaboration may generate lightweight activity types such as:

- note_added
- decision_recorded
- risk_note_added
- resolution_note_added
- handoff_note_added

Do not turn this into an audit log.

---

# MVP Boundaries

Do not implement:

- realtime sync
- comment threads
- replies
- mentions
- notifications
- permissions
- rich text editor
- file collaboration
- external sharing
- email notifications

---

# UX Philosophy

Collaboration UI should feel:

- contextual
- lightweight
- operational
- embedded in workflow
- useful for execution memory

It should NOT feel:

- like chat
- like Jira comments
- like a document editor
- like enterprise ticket notes

---

# Final Principle

Collaboration should improve operational clarity.

If a collaboration feature does not improve execution context, it should not be added.

---

# Current MVP Implementation

The current MVP supports lightweight, local decision context inside Campaign Workspace.

It uses:

- CampaignNote type extensions
- DecisionContext type
- derived/mock collaboration context
- compact Decision Context panel
- selective timeline integration

It does not include:

- comment threads
- replies
- chat
- realtime sync
- persistence
- notification behavior
