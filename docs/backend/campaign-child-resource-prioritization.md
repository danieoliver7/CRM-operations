# Campaign Child Resource Prioritization

## Purpose

This document defines the implementation priority for Campaign child resources.

It explains why each resource should be implemented in a specific order.

---

# Approved Child Resource Order

```txt
1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint
```

---

# Prioritization Rationale

## 1. Campaign Blockers Implementation

Blockers come first because they represent the most direct operational friction around a campaign.

They help the backend support visible execution risk without introducing workflow automation.

Guardrail:

- Blockers are impediments, not tickets or incidents.

## 2. Campaign Notes Implementation

Notes come second because they preserve lightweight operational memory around the campaign.

They support context without requiring chat, threads or realtime collaboration.

Guardrail:

- Notes are short operational records, not a comment system.

## 3. Campaign Decision Context Implementation

Decision Context comes after Notes because it is more specific operational reasoning.

It explains why execution changed without becoming approvals or documentation.

Guardrail:

- Decision Context is rationale, not workflow approval.

## 4. Campaign Activities Implementation

Activities come after blockers, notes and decision context because activities should record meaningful events once the product has facts worth recording.

Guardrail:

- Activities are meaningful records, not event sourcing or audit logging.

## 5. Campaign Handoffs Implementation

Handoffs come after the main operational facts because they represent continuity between stages, owners or squads.

Guardrail:

- Handoffs are lightweight transition facts, not dependency graphs or orchestration.

## 6. Campaign Workspace Facts Endpoint

The composed Workspace Facts Endpoint comes last because it should aggregate persisted facts after those facts exist.

Guardrail:

- The endpoint returns facts only, not derived command center summaries or timeline presentation.

---

# Final Principle

Implement the facts before composing the workspace.
