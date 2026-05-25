# Product Principles

## Purpose

This document defines the core product principles of CRM Operations Platform.

These principles should guide every product, design, frontend, backend and AI-assisted implementation decision.

They are part of the product source of truth.

---

# Principle 1: Guide Operators, Do Not Replace Operators

The product exists to support CRM operators.

It should:

- guide decisions
- clarify context
- surface risks
- expose blockers
- improve coordination

It should NOT:

- replace human judgment
- automate decisions too early
- control execution
- force workflow behavior
- pretend to be an AI operator

---

# Principle 2: Persist Facts, Derive Intelligence

The product should persist operational facts.

Examples:

- campaign status
- owner
- squad
- due date
- blockers
- handoffs
- notes
- activities

The product should derive operational intelligence.

Examples:

- execution health
- SLA state
- operational risk
- coordination state
- workflow continuity
- planning pressure

Derived intelligence should remain transparent and explainable.

---

# Principle 3: Coordination Before Automation

The product should first help teams coordinate better.

Prioritize:

- handoff clarity
- next actions
- ownership visibility
- workflow continuity
- decision context

Before:

- automation engines
- workflow builders
- orchestration layers
- AI automation

---

# Principle 4: Workspace Before Dashboards

The Campaign Workspace is the core operational surface of the product.

Dashboards, Kanban, Calendar and Campaigns list exist to help users reach the right operational context.

The Workspace should remain the place where execution is understood and coordinated.

---

# Principle 5: Explanation Before Prediction

The product should explain what is happening and why.

Prioritize:

- operational timeline
- decision context
- blockers
- risks
- SLA awareness
- workflow continuity

Before:

- predictive AI
- machine learning
- hidden scoring
- probabilistic systems

---

# Principle 6: Operational Context Before Analytics

The product is not a BI dashboard.

Analytics should support operational decisions.

Analytics should NOT dominate the experience.

Operational context is more important than generic reporting.

---

# Principle 7: Behavior Before Infrastructure

Validate operational behavior before adding infrastructure.

Prioritize:

- UX behavior
- domain clarity
- workflow usefulness
- workspace quality
- operational understanding

Before:

- backend
- persistence
- realtime
- Docker
- microservices
- CI/CD complexity

---

# Principle 8: Simplicity Before Enterprise Architecture

Avoid enterprise complexity until necessary.

Do not introduce:

- workflow engines
- orchestration layers
- runtime managers
- event sourcing
- complex RBAC
- dependency graph engines

Unless the product behavior proves it is necessary.

---

# Principle 9: Campaign Is The Center

Campaign is the central operational entity.

Everything should orbit around Campaign:

- workflow
- execution
- blockers
- handoffs
- timeline
- decision context
- planning
- coordination

Avoid creating disconnected operational concepts.

---

# Principle 10: Low Noise, High Signal

The product should reduce operational noise.

Avoid:

- warning pollution
- excessive badges
- excessive red surfaces
- generic alerts
- decorative metrics
- noisy activity streams

Every signal should help users understand or act.

---

# Final Principle

CRM Operations Platform should feel like it understands real CRM operations.

It should never feel like a generic dashboard, ticket system or project management clone.