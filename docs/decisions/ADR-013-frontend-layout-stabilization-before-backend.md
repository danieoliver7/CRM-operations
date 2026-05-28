# ADR-013: Frontend Layout Stabilization Before Backend

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Operational Planning
- Execution Intelligence
- Operational Coordination
- Operational Timeline
- Operational Memory
- Workspace Consolidation
- Backend Foundation Planning
- Backend Foundation Design
- Backend Foundation Architecture Review
- Backend MVP Definition
- Backend Stack Decision

The project is ready to approach backend implementation planning.

However, current frontend layout issues were identified:

- the application is not responsive enough
- Kanban columns/cards can be visually clipped
- Kanban horizontal scrolling is not properly contained
- global layout overflow affects the product experience

These issues affect perceived product quality.

---

# Decision

Before continuing into backend implementation planning, we will run a frontend stabilization sprint focused on:

- responsiveness
- AppShell layout
- Kanban horizontal scroll
- global overflow cleanup
- layout stability

---

# Why

Backend implementation will increase system complexity.

Fixing layout issues first reduces confusion between:

- backend bugs
- frontend state bugs
- layout bugs
- data loading bugs

It also protects the premium operational feel of the product.

---

# What We Will Do

We will improve:

- responsive layout behavior
- AppShell width handling
- sidebar/content interaction
- topbar responsiveness
- Kanban horizontal scroll
- Kanban column and card visibility
- global overflow behavior

---

# What We Will Not Do

We will not implement:

- backend
- API
- database
- Prisma
- NestJS
- auth
- Docker
- drag and drop
- new product features
- redesign
- new visual identity
- workflow automation

---

# Scope Rule

This is a stabilization sprint.

It should fix broken layout behavior without expanding product scope.

---

# Final Decision

Frontend layout stability is required before backend implementation planning continues.
