# Entity Relationships

## Purpose

This document defines future backend entity relationships for CRM Operations Platform.

This is not a database schema.

It is a planning map for future persistence.

---

# Relationship Philosophy

Keep relationships simple.

Campaign should remain the central operational aggregate.

Avoid deep dependency graphs and generic project management structures.

---

# Future Commercial Boundary

The likely future commercial hierarchy is:

```txt
Organization
  Workspaces
    Campaigns
```

## Organization

Organization represents a customer company.

Relationships:

- Organization has many Workspaces
- Organization has many Memberships
- Organization may have many Users through Memberships

Do not implement billing or advanced organization settings in the first backend.

## Workspace

Workspace represents an operational environment inside an organization.

Relationships:

- Workspace belongs to Organization
- Workspace has many Campaigns
- Workspace has many Squads
- Workspace has many Memberships

Workspace should eventually scope campaign data.

## Membership

Membership connects users to organizations and workspaces.

Relationships:

- Membership belongs to Organization
- Membership may belong to Workspace
- Membership belongs to User

Membership may later support simple roles.

Do not build enterprise RBAC early.

---

# Core Operational Relationships

## Campaign

Campaign is the central operational aggregate.

Relationships:

- Campaign belongs to Workspace
- Campaign may belong to Squad
- Campaign may have Owner User
- Campaign has many Activities
- Campaign has many Blockers
- Campaign has many Handoffs
- Campaign has many Notes
- Campaign has many Decision Context entries
- Campaign has many Attachments
- Campaign has many Metrics

Campaign should remain the primary destination for operational understanding.

---

# People And Team Relationships

## User

User represents an operator.

Relationships:

- User may belong to Squad
- User may own Campaigns
- User may create Activities
- User may create Notes
- User may create Decision Context
- User may create or resolve Blockers
- User may participate in Handoffs
- User may have Memberships

User should not imply authentication implementation yet.

## Squad

Squad represents an operational team.

Relationships:

- Squad belongs to Workspace
- Squad has many Users
- Squad has many Campaigns
- Squad may have Lead User
- Squad may participate in Handoffs

Squad pressure should remain derived from campaign facts.

---

# Campaign Child Entities

## CampaignActivity

Relationships:

- Activity belongs to Campaign
- Activity may have Actor User
- Activity may reference Blocker, Handoff, Note or Decision Context through metadata or explicit reference later

Activity should not become event sourcing.

## Blocker

Relationships:

- Blocker belongs to Campaign
- Blocker may have Creator User
- Blocker may have Resolver User
- Blocker may be referenced by Decision Context

Blocker should not become a ticket.

## Handoff

Relationships:

- Handoff belongs to Campaign
- Handoff references fromStage and toStage
- Handoff may reference fromOwner and toOwner
- Handoff may reference fromSquad and toSquad
- Handoff may be referenced by Decision Context

Handoff should not become dependency graph runtime.

## CampaignNote

Relationships:

- Note belongs to Campaign
- Note may have Author User
- Note may reference WorkflowStage
- Note may reference Blocker
- Note may reference Handoff
- Note may reference Activity

Note should not become comment thread.

## DecisionContext

Relationships:

- Decision Context belongs to Campaign
- Decision Context may have Author User
- Decision Context may reference WorkflowStage
- Decision Context may reference Blocker
- Decision Context may reference Handoff
- Decision Context may reference Activity

Decision Context explains why execution changed.

It should not become chat or documentation.

## Attachment

Relationships:

- Attachment belongs to Campaign
- Attachment may have Uploaded By User

File storage and upload infrastructure are deferred.

## CampaignMetric

Relationships:

- Metric belongs to Campaign

Metrics should support operational learning later.

They should not become BI warehouse early.

---

# Reference Entities

## WorkflowStage

WorkflowStage may be stored as reference data.

Relationships:

- Campaign has current WorkflowStage through status
- Handoff references fromStage and toStage
- Notes and Decision Context may reference relatedWorkflowStage

WorkflowStage should not become workflow engine.

---

# Relationship Map

```txt
Organization
  -> Workspaces
  -> Memberships

Workspace
  -> Campaigns
  -> Squads
  -> Memberships

User
  -> Campaign ownership
  -> Activities
  -> Notes
  -> Decision Context
  -> Blocker creation/resolution

Squad
  -> Users
  -> Campaigns
  -> Handoffs

Campaign
  -> Activities
  -> Blockers
  -> Handoffs
  -> Notes
  -> Decision Context
  -> Attachments
  -> Metrics
```

---

# Avoid

Do not create early:

- dependency graph engine
- workflow runtime graph
- generic task relationships
- nested comment threads
- organization permission graph
- event sourcing relationship model

---

# Final Principle

Relationships should help retrieve and understand campaign execution.

They should not turn the product into a generic workflow platform.
