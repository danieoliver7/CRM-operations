# Timeline UI Rules

## Purpose

This document defines how operational timeline UI should behave inside CRM Operations Platform.

Timeline UI exists to explain campaign execution history.

It should not become chat, audit log, notification feed or system logs.

---

# Timeline Hierarchy

Timeline should prioritize:

1. critical blockers and overdue events
2. stalled workflow and missing ownership
3. handoffs and waiting states
4. workflow movement
5. ownership and priority changes
6. due date context
7. collaboration notes

Low-impact metadata should stay out of the timeline.

---

# Visual Rules

Use:

- compact event cards
- category icons
- subtle connector lines
- small importance badges
- clear timestamps
- concise operational messages

Avoid:

- large alert blocks for every event
- excessive colors
- dashboard-style metrics inside timeline items
- dense audit-log formatting
- chat-style message bubbles

---

# Importance Rules

Use critical importance only for:

- overdue campaign
- high-severity blocker
- workflow stalled near delivery
- urgent campaign without operational owner

Use high importance for:

- handoff pending
- SLA due soon
- execution risk detected
- blocker affecting delivery

Use normal or low importance for routine workflow and planning context.

---

# Noise Rules

Never show UI-only activity such as:

- modal open
- filter change
- tab change
- search term update
- hover
- local component state

---

# Final Principle

Timeline should make the campaign story easier to understand.

If an event does not help explain execution, it should not be shown.
