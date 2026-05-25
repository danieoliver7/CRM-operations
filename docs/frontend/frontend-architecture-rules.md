# Frontend Architecture Rules

## Purpose

This document defines frontend architecture rules for CRM Operations Platform.

These rules exist to keep the frontend simple, domain-oriented and AI-maintainable.

---

# Core Architecture Principle

The frontend should remain:

- modular
- incremental
- domain-oriented
- behavior-first
- operational-first
- easy for AI agents to understand

Avoid architecture that feels enterprise before the product requires it.

---

# Responsibility Rules

## Pages

Pages orchestrate.

Pages may:

- compose modules
- connect hooks
- arrange layouts
- pass data into components

Pages should NOT:

- contain heavy business logic
- calculate derived intelligence directly
- become large state managers
- become workflow engines

---

## Components

Components render.

Components may:

- display UI
- receive props
- trigger callbacks
- compose smaller UI pieces

Components should NOT:

- own business rules
- calculate complex operational intelligence
- mutate global state directly unless explicitly designed
- contain hidden workflow logic

---

## Hooks

Hooks connect behavior.

Hooks may:

- connect state
- encapsulate local behavior
- prepare data for UI
- expose callbacks

Hooks should NOT:

- become runtime engines
- hide complex orchestration
- replace domain utilities

---

## Stores

Stores share state.

Stores may:

- hold shared operational state
- update campaign facts
- expose simple actions

Stores should NOT:

- become backend replacement
- become workflow engine
- become activity database
- become orchestration layer
- store derived intelligence as primary truth

---

## Utils

Utils derive intelligence.

Utils may calculate:

- execution health
- SLA state
- operational risk
- coordination state
- timeline events
- planning pressure
- workflow continuity

Utils should remain:

- deterministic
- transparent
- testable
- simple

Utils should NOT:

- depend on UI
- mutate state
- become services
- become hidden engines

---

## Types

Types define domain.

Types should represent:

- persisted facts
- derived references
- UI-only state boundaries
- future backend readiness

Types should NOT become:

- runtime architecture
- validation framework
- persistence layer

---

## Docs

Docs define behavior.

When in doubt, implementation should follow:

- product docs
- domain docs
- frontend docs
- architecture docs
- ADRs

Docs are part of the architecture.

---

# Derived Intelligence Rule

Derived intelligence must live in utilities.

Examples:

- executionHealthMetrics
- capacityMetrics
- coordinationMetrics
- operationalTimeline
- collaborationContext

Do not calculate these directly inside large components.

---

# State Rule

Zustand is for shared operational state only.

Use Zustand for:

- campaign state
- shared operational updates
- cross-screen coordination

Do not use Zustand for:

- backend simulation
- persistence
- timeline database
- UI-only temporary state
- workflow runtime
- orchestration

---

# Component Size Rule

Avoid giant components.

If a component mixes:

- layout
- calculation
- state mutation
- rendering
- business rules

Split it.

---

# Feature Addition Rule

Before adding a new feature, check:

1. Does it support operational clarity?
2. Does it improve campaign execution understanding?
3. Does it belong in the Workspace?
4. Is it already represented by an existing concept?
5. Does it violate MVP boundaries?

If unclear, do not add it.

---

# Anti-Patterns

Avoid:

- runtime managers
- event buses
- entity managers
- repository patterns
- orchestration layers
- hidden engines
- generic enterprise abstractions
- complex state machines
- excessive abstractions

---

# Final Principle

The frontend should make operational behavior clear.

Architecture should support the product, not become the product.