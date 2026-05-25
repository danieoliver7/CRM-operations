# Campaign Workspace

## Purpose

The Campaign Workspace is the central operational hub of CRM Operations Platform.

It is not a detail page.

It is not a CRUD screen.

It is not a dashboard.

It is the place where campaign execution is understood, coordinated and contextualized.

---

# Workspace Definition

The Campaign Workspace should bring together:

- current campaign state
- workflow context
- execution intelligence
- coordination awareness
- blockers
- risks
- next actions
- operational timeline
- decision context

The Workspace should help the user answer:

- what is happening now?
- what needs attention?
- what is blocked?
- who needs to act?
- what happened before?
- why did it happen?
- what should happen next?

---

# Workspace Role In The Product

Other screens help users find operational context.

The Workspace helps users understand and act on operational context.

## Dashboard

Surfaces what needs attention.

## Kanban

Shows workflow distribution and continuity.

## Calendar

Shows planning and timing pressure.

## Campaigns

Shows campaign inventory.

## Workspace

Explains and coordinates campaign execution.

---

# Workspace Information Hierarchy

The Workspace should prioritize:

1. Current workflow state
2. Blockers
3. Execution health
4. Operational risk
5. SLA awareness
6. Coordination state
7. Next actions
8. Operational timeline
9. Decision context
10. Supporting campaign metadata

---

# Workspace Core Sections

## 1. Workspace Header

Should communicate:

- campaign name
- status
- priority
- channel
- owner
- squad
- execution health
- SLA state
- coordination state

## 2. Workflow Context

Should communicate:

- current stage
- next stage
- current operational state
- pending handoff
- waiting state

## 3. Execution Intelligence

Should communicate:

- health
- blockers
- risks
- overdue state
- SLA signals

## 4. Coordination Context

Should communicate:

- current owner
- next responsible area
- handoff status
- workflow continuity

## 5. Next Actions

Should communicate:

- what should happen next
- why it matters
- who likely needs to act
- what risk exists if nothing happens

## 6. Operational Timeline

Should communicate:

- meaningful operational history
- workflow changes
- blocker history
- handoff events
- timeline of execution context

## 7. Decision Context

Should communicate:

- why decisions were made
- why execution changed
- what future operators should know
- risk/resolution/handoff notes

---

# Workspace Consolidation Philosophy

Operational Workspace Consolidation should focus on:

- reducing fragmentation
- improving hierarchy
- connecting related signals
- removing duplicated context
- making the page feel cohesive
- making the Workspace feel like one operational surface

It should NOT focus on:

- adding many new features
- adding more panels without hierarchy
- creating chat
- creating comment threads
- creating analytics overload
- creating workflow automation

---

# Current Consolidation Implementation

The current Workspace consolidates the immediate execution narrative through a single operational command center.

The command center brings together:

- workflow state
- execution health
- SLA state
- coordination state
- next action
- next responsible area
- blockers
- operational risks

This reduces the need for operators to mentally connect separate execution, coordination and next-action cards.

Timeline and Decision Context remain below the current execution surface because they explain:

- what happened before
- why it happened
- what operational memory should be preserved

The sidebar should remain focused on:

- quick workflow actions
- checklist
- squad context
- lightweight activity

It should not repeat the same execution story already shown in the command center.

---

# What The Workspace Should Feel Like

The Workspace should feel:

- premium
- operational
- calm
- contextual
- diagnostic
- execution-oriented
- coordinated

It should NOT feel:

- like Jira
- like a ticket page
- like a CRM record
- like a BI dashboard
- like a Notion document
- like a chat room

---

# Navigation Principle

All operational signals should eventually lead to the Workspace.

Examples:

- dashboard warning → workspace
- kanban card → workspace
- calendar campaign → workspace
- campaign row → workspace
- coordination queue → workspace
- risk signal → workspace

The Workspace is the destination for operational understanding.

---

# What Should Not Enter The Workspace Yet

Do not add:

- chat
- threaded comments
- realtime presence
- notification center
- approval engine
- workflow builder
- automation builder
- analytics-heavy charts
- billing information
- organization settings
- permissions UI

---

# Final Principle

The Campaign Workspace should be the single operational hub for understanding, coordinating and preserving the execution context of a campaign.
