# ADR-008: Lightweight Collaboration Before Realtime

## Status

Accepted

---

# Context

CRM Operations Platform already supports:

- operational planning
- execution intelligence
- coordination awareness
- handoff visibility
- workflow continuity
- operational timeline
- domain entities
- backend readiness

The product now needs a way to preserve human operational context.

However, implementing realtime collaboration, chat, threads or notifications would be premature.

---

# Decision

We will implement lightweight collaboration and decision context before realtime collaboration.

The current collaboration model should focus on:

- operational notes
- decision context
- resolution notes
- handoff context
- risk clarification

We will not implement realtime collaboration yet.

---

# Why

The product needs to explain why operational changes happened.

But it should not become:

- chat
- Slack replacement
- ticket comments
- Jira clone
- threaded discussion platform

The goal is operational memory, not conversation volume.

---

# What We Will Do Now

We may introduce lightweight local/mock support for:

- CampaignNote improvements
- DecisionContext type
- collaboration note types
- decision/context panel
- timeline integration for meaningful decisions

All behavior remains:

- frontend-only
- mock/local
- incremental
- campaign-scoped

---

# What We Will Not Do Now

We will not implement:

- backend persistence
- realtime sync
- websockets
- comment threads
- replies
- mentions
- notifications
- permissions
- rich text editor
- external sharing
- collaboration audit log

---

# Architectural Principle

Collaboration should attach to operational context.

It should not become a separate communication product.

---

# Timeline Relationship

Important collaboration entries may appear in Operational Timeline.

But not every note becomes a timeline event.

Timeline should remain meaningful and low-noise.

---

# Future Revisit

This decision should be revisited when:

- backend foundation exists
- persistence exists
- multi-user usage becomes real
- organization/workspace model is implemented
- collaboration needs are validated with users

---

# Final Decision

The project will introduce lightweight operational collaboration before realtime collaboration.

Collaboration should preserve decision context, not create chat.