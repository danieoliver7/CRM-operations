# ADR-009: Backend Foundation Planning

## Status

Accepted

---

# Context

The product has reached:

- Operational Planning
- Execution Intelligence
- Operational Coordination
- Operational Timeline
- Operational Memory
- Workspace Consolidation

The domain is now mature enough to begin backend planning.

---

# Decision

We will perform backend planning before backend implementation.

---

# Why

The product already defines:

- entities
- relationships
- workspace behavior
- derived intelligence

Backend should emerge from the domain.

---

# What We Will Do

Document:

- persistence boundaries
- entity relationships
- API boundaries
- backend responsibilities
- first backend scope
- deferred backend scope
- backend risks

Protect:

- derived intelligence from premature persistence
- frontend-first validation from backend-driven product decisions

---

# What We Will Not Do

- build backend
- create database
- create API
- choose framework
- choose ORM
- choose cloud provider
- create schema files
- create migrations
- create backend folders
- create API controllers

---

# Persistence Position

The future backend should persist operational facts.

It should not persist derived intelligence as primary truth.

Persist later:

- Campaign
- User
- Squad
- WorkflowStage
- CampaignActivity
- Blocker
- Handoff
- CampaignNote
- DecisionContext
- Attachment
- CampaignMetric
- Organization
- Workspace
- Membership

Derive:

- Execution Health
- SLA State
- Operational Risk
- Coordination State
- Workflow Continuity
- Planning Pressure
- Owner Pressure
- Squad Pressure
- Timeline presentation state
- Command Center summary

---

# Architectural Principle

Discovery before implementation.

Planning before infrastructure.

Domain before technology.

---

# Final Decision

Backend planning must precede backend implementation.
