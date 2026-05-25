# Schema Design Guidelines

## Purpose

This document defines schema design guidelines for the future backend.

It is not a database schema.

Do not create SQL, Prisma, Drizzle or migration files from this document during the design sprint.

---

# Schema Philosophy

Persist facts.

Derive intelligence.

Ignore UI state.

The schema should make operational campaign facts durable without turning derived awareness into stored truth.

---

# Entity Direction

Future schema design should keep Campaign as the central operational aggregate.

Likely core tables later:

- organizations
- workspaces
- memberships
- users
- squads
- campaigns
- workflow_stages
- campaign_activities
- blockers
- handoffs
- campaign_notes
- decision_context
- attachments
- campaign_metrics

This list is directional, not a schema commitment.

---

# Relationship Direction

Recommended future hierarchy:

```txt
Organization
  -> Workspace
    -> Campaign
      -> Activities
      -> Blockers
      -> Handoffs
      -> Notes
      -> Decision Context
      -> Attachments
      -> Metrics
```

Recommended ownership references:

- Campaign may reference owner user.
- Campaign may reference squad.
- Squad may reference lead user.
- Activity may reference actor user.
- Blocker may reference creator and resolver users.
- Handoff may reference from/to owners and squads.
- Notes and decision context may reference author user.

Avoid deep dependency graphs.

Avoid generic task/project relationships.

---

# Tenant Boundary Direction

The likely SaaS boundary is:

```txt
Organization
  -> Workspace
    -> Campaign
```

Guidelines:

- Campaign should eventually be workspace-scoped.
- Squad should eventually be workspace-scoped.
- Membership should connect users to organizations and optionally workspaces.
- Organization should represent the commercial customer boundary.

Do not implement advanced tenant runtime during the first backend.

Do not implement billing or enterprise RBAC as part of schema foundation.

---

# ID Strategy

Use stable string IDs or UUID-compatible IDs.

Guidelines:

- IDs should not encode business meaning.
- IDs should remain safe for API usage.
- Frontend mock IDs should not dictate final database ID strategy.

Final ID generation strategy remains open until implementation.

---

# Timestamp Strategy

Most persisted entities should support:

- createdAt
- updatedAt

Entities with lifecycle completion may also support:

- resolvedAt
- completedAt
- capturedAt

Do not use timestamps to create hidden workflow automation.

Timestamps should support operational history and explainability.

---

# Status Field Guidelines

Status fields should use small explicit enums.

Examples:

- campaign status
- blocker status
- handoff status
- membership status later

Avoid large enterprise taxonomies.

Avoid status proliferation that duplicates derived intelligence.

---

# JSON Usage Guidelines

JSON fields may be useful for bounded metadata.

Good candidates:

- activity metadata
- campaign content fields
- metric target payloads
- integration payload snapshots later

Avoid using JSON to hide core relationships that should be queryable:

- campaign owner
- campaign squad
- campaign workspace
- blocker status
- handoff status
- due dates

JSON should support flexibility, not replace domain modeling.

---

# Derived Intelligence Boundary

Do not store these as primary persisted fields:

- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- planningPressure
- ownerPressure
- squadPressure
- commandCenterSummary

These should be calculated from persisted facts for now.

If snapshots are needed later, create a separate architectural decision.

---

# UI State Boundary

Never model UI-only state as backend schema:

- modal open state
- selected filters
- active tabs
- search terms
- collapsed sections
- hover state
- temporary form drafts
- scroll position

URL filters and local UI behavior should remain frontend concerns.

---

# Normalization Guidelines

Normalize durable relationships that matter operationally:

- users
- squads
- workspaces
- campaigns
- campaign child records

Do not over-normalize early:

- tags can remain simple until reporting needs prove otherwise
- campaign content can remain structured but pragmatic
- workflow stages can start as reference data
- metrics can stay narrow until analytics needs mature

The schema should support the product, not impress the architecture.

---

# Final Principle

Schema design should preserve operational clarity.

It should not turn CRM Operations Platform into a generic project management database.

---

# Architecture Review Notes

The architecture review validates the schema direction with these cautions:

- Activity records may be persisted, but they must not become an event store.
- Timeline presentation state should remain derived.
- Workspace scoping should be present early enough to avoid painful tenant migration later.
- Organization and Membership should not become advanced RBAC in the first backend.
- JSON metadata should not hide queryable operational relationships.
- Integration ownership remains intentionally open until integrations are planned.
