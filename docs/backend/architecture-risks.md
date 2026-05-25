# Backend Architecture Risks

## Purpose

This document records architecture risks identified during the Backend Foundation Architecture Review.

It exists to reduce implementation risk before backend code is created.

---

# Risk Categories

## 1. Aggregate Drift

Risk:

Campaign could stop being the operational center if Workspace, Workflow, Activity or integrations begin driving product behavior.

Impact:

The product could drift into generic project management, workflow tooling or integration middleware.

Mitigation:

Keep Campaign as the operational aggregate.

Keep Organization and Workspace as commercial/scoping boundaries.

Keep Workflow as guidance, not runtime.

---

## 2. Derived Intelligence Persistence

Risk:

Execution health, SLA state, operational risk, coordination state or command center summaries could be stored as primary truth.

Impact:

The system could produce stale intelligence, hidden logic and difficult migrations.

Mitigation:

Persist facts.

Derive intelligence.

If snapshots become necessary later, create a specific ADR.

---

## 3. Activity Becoming Event Sourcing

Risk:

CampaignActivity could become an event store or audit-log architecture.

Impact:

Backend complexity would grow before the product needs it.

Mitigation:

Persist meaningful activity facts only.

Do not reconstruct campaign state from activity.

Do not store UI events.

---

## 4. Timeline Presentation Persistence

Risk:

Timeline events could be persisted as presentation data.

Impact:

The timeline could become noisy, stale and hard to evolve.

Mitigation:

Persist activity facts and operational records.

Derive timeline presentation from those records.

---

## 5. Premature Multi-Tenancy

Risk:

Organization, Workspace and Membership could become a full tenant runtime too early.

Impact:

Implementation could stall around permissions, billing, roles and tenant administration before campaign persistence exists.

Mitigation:

Start with workspace-compatible data shape.

Defer advanced tenant runtime, billing and enterprise RBAC.

---

## 6. Auth Timing Risk

Risk:

Auth could be introduced too late for a shared hosted prototype or too early for local backend validation.

Impact:

Too late creates unsafe shared usage.

Too early slows persistence validation.

Mitigation:

Decide auth timing based on deployment target.

Local/internal prototype may defer auth.

Hosted shared usage should introduce basic auth earlier.

---

## 7. Over-Normalization

Risk:

Tags, content fields, metrics, workflow references and collaboration context could be normalized before access patterns are proven.

Impact:

Schema becomes harder to evolve and slows MVP iteration.

Mitigation:

Normalize durable relationships.

Keep flexible fields pragmatic until query needs are proven.

---

## 8. JSON Dumping Ground

Risk:

Activity metadata or campaign content JSON could hide important domain relationships.

Impact:

Queries, reporting and migrations become harder later.

Mitigation:

Use JSON only for bounded metadata.

Keep owner, squad, workspace, status and dates queryable.

---

## 9. Workflow Engine Temptation

Risk:

WorkflowStage, Handoff and SLA could become workflow automation.

Impact:

The product could turn into BPM instead of an operational CRM workspace.

Mitigation:

Keep workflow contextual.

Keep handoffs lightweight.

Keep SLA informational.

---

## 10. Generic Project Management Drift

Risk:

Blockers, notes and handoffs could become tickets, comments and tasks.

Impact:

The product loses CRM Operations specificity.

Mitigation:

Keep all child entities campaign-scoped and operationally meaningful.

Avoid generic task APIs and nested discussions.

---

## 11. Realtime Before Durability

Risk:

Realtime collaboration could be implemented before durable persistence.

Impact:

The system becomes harder to reason about and debug.

Mitigation:

Implement persistence first.

Add realtime only after multi-user behavior is validated.

---

## 12. Integration Boundary Ambiguity

Risk:

Future integrations may not have clear ownership.

Impact:

Integration data could leak into Campaign, Workspace and Organization inconsistently.

Mitigation:

Before integrations begin, decide whether each integration is organization-level, workspace-level or campaign-execution-level.

Do not add integration schema during backend foundation.

---

# Highest Priority Risks

The highest priority risks before implementation are:

1. persisting derived intelligence too early
2. over-building multi-tenancy before campaign persistence
3. turning activities into event sourcing
4. letting framework choice reshape the domain
5. creating generic project-management abstractions

---

# Final Principle

The architecture should remain strong because it is constrained.

Do not remove the constraints to feel more enterprise-ready.
