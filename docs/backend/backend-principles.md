# Backend Principles

## Purpose

This document defines the backend principles for CRM Operations Platform.

The backend should emerge from the validated product domain.

The backend should not define the product.

This is a planning document. It does not start backend implementation.

---

# Principle 1: Persist Facts, Derive Intelligence

The backend should persist operational facts.

Examples:

- campaign status
- owner
- squad
- due date
- planned date
- priority
- blockers
- handoffs
- notes
- decision context
- activities
- attachments
- captured metrics

The backend should not persist derived operational intelligence as primary truth.

Do not persist as source of truth:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- planning pressure
- owner pressure
- squad pressure
- timeline presentation state
- command center summary

These should remain derived from persisted facts until there is a proven reason to store snapshots.

---

# Principle 2: Campaign Is The Operational Aggregate

Campaign should remain the central operational aggregate.

Most operational records should belong to a campaign:

- activities
- blockers
- handoffs
- notes
- decision context
- attachments
- metrics

Avoid creating disconnected backend concepts that force operators to leave the campaign context.

---

# Principle 3: Domain Before Technology

Backend implementation should follow the domain model.

Do not choose framework, ORM, database schema or infrastructure before the persistence boundaries and relationships are clear.

Future backend technology should support the product behavior already validated in the frontend.

It should not reshape the product into a generic project management system.

---

# Principle 4: Simple Resource Boundaries

Future APIs should expose resources that match operational concepts.

Examples:

- campaigns
- activities
- blockers
- handoffs
- notes
- decision-context
- users
- squads
- workspaces
- organizations

Avoid orchestration APIs, workflow runtime APIs and generic enterprise abstractions.

---

# Principle 5: Backend Supports Operators

The backend should support operational understanding.

It should make the product more reliable by storing facts.

It should not:

- automate decisions
- enforce complex workflow rules too early
- replace operator judgment
- become an SLA engine
- become a workflow engine
- become a ticket system

---

# Principle 6: Start With The Smallest Useful Backend

The first backend should focus on the minimum set needed to make the product real:

- campaign persistence
- user and squad reference data
- activities
- blockers
- handoffs
- notes
- decision context

Defer:

- billing
- advanced permissions
- realtime
- integrations
- AI
- notifications
- analytics warehouse
- workflow automation

---

# Principle 7: Avoid Enterprise Architecture Early

Do not introduce:

- microservices
- CQRS
- event sourcing
- domain event buses
- repository pattern for its own sake
- unit of work abstractions
- workflow engines
- orchestration layers
- tenant runtime engines
- permission engines

These are not justified during backend foundation planning.

---

# Principle 8: Keep Derived Intelligence Explainable

Derived intelligence must remain transparent.

If a derived value cannot be explained from persisted facts, it should not be introduced.

Backend should make facts available.

Frontend utilities may continue deriving intelligence during the MVP.

---

# Final Principle

The backend exists to support operational clarity.

It should make the validated product durable without adding unnecessary infrastructure complexity.
