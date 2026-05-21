# Collaboration UI Rules

## Purpose

This document defines how lightweight collaboration should appear in CRM Operations Platform.

Collaboration UI exists to preserve operational context and decisions.

It should not become chat, comments-heavy UI or ticket discussion.

---

# UI Philosophy

Collaboration UI should be:

- compact
- contextual
- operational
- calm
- embedded in the workspace

It should not be:

- noisy
- conversational-first
- thread-heavy
- notification-driven
- visually dominant

---

# Where Collaboration Should Appear

Collaboration should appear mainly inside Campaign Workspace.

Recommended areas:

- near workflow context
- near blockers
- near handoffs
- near timeline
- near next actions
- inside a compact decision/context panel

Do not spread collaboration UI across every page too early.

---

# Collaboration Information Hierarchy

Priority order:

1. decision context
2. blocker resolution context
3. handoff context
4. risk clarification
5. general operational note

Generic notes should not dominate the UI.

---

# Visual Rules

Use:

- compact cards
- small author context
- concise timestamp
- subtle type labels
- calm visual hierarchy
- operational category badges

Avoid:

- chat bubbles
- large text areas everywhere
- colorful comment threads
- notification counters
- excessive avatars
- dense comment lists

---

# Input Rules

If adding an input, keep it simple.

Allowed:

- single textarea
- note type selector
- save/cancel
- lightweight validation

Avoid:

- rich text editor
- markdown editor
- mentions
- file upload
- emoji reactions
- threaded replies
- realtime typing indicators

---

# Decision Context UI

Decision context should be visually more important than generic notes.

It should answer:

- what was decided?
- why was it decided?
- what operational impact does it have?

It should stay concise.

Current workspace implementation uses a compact Decision Context panel.

It should show:

- decision title
- operational rationale
- note type
- author context
- timestamp
- importance
- related workflow stage when useful

---

# Timeline Integration

Only meaningful collaboration entries should appear in timeline.

Examples:

- decision recorded
- resolution note added
- handoff note added
- risk note added

Do not show every generic note in timeline.

---

# Empty State

If there is no collaboration context, show an operational empty state.

Example:

No decision context recorded yet.

Avoid empty states that feel like social media or chat.

---

# MVP Boundaries

Do not implement:

- realtime comments
- threads
- replies
- mentions
- notifications
- rich text
- permissions
- external sharing

---

# Final Principle

Collaboration UI should help operators understand decisions faster.

It should not create another place to talk.
