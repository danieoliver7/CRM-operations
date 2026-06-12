# Workflow Domain

## Workflow Philosophy

Workflow exists to guide operational coordination.

The workflow should remain:
- simple
- contextual
- operational
- understandable

Avoid:
- workflow engines
- state machine complexity
- excessive branching
- enterprise orchestration

## Workflow Stages

briefing → copy → approval → development → qa → scheduled → sent → completed

## Workflow Behavior

Each stage provides:
- contextual actions
- contextual risks
- next operational steps
- operational guidance

## Workflow Rules

Workflow should:
- guide operations
- clarify responsibility
- expose blockers
- improve coordination

Workflow should NOT:
- become automation-heavy
- require complex orchestration
- become BPM software

## Contextual Actions

Actions depend on:
- current status
- operational context

Not every action changes status.

## Workflow Philosophy

The workflow exists to support humans operating CRM campaigns.

## Workflow Continuity Philosophy

Workflow continuity exists to show whether a campaign has a clear path to the next operational step.

It should communicate:
- who needs to act
- which stage is waiting
- which handoff is pending
- whether ownership is clear

It should NOT:
- automate progression
- create dependency graphs
- become orchestration
- become BPM software

## Handoff Philosophy

Handoffs are lightweight operational transitions between workflow stages, owners or squads.

Examples:

- briefing to copy
- copy to approval
- approval to development
- development to QA
- QA to scheduling
- CRM to media
- media to CRM
- owner to owner
- squad to squad

Handoffs should clarify responsibility and continuity.

Handoffs should be visual, contextual and operational.

Handoffs should not be enforced by runtime workflow logic.

During Backend V1, Handoffs may become persisted campaign-scoped facts.

They must not become:

- workflow engine
- dependency graph
- BPM
- task management
- orchestration layer
- automatic Campaign status transition system
- automatic activity creation system
- notification engine

A handoff may support future workflow continuity, but workflow continuity must remain derived from facts.

## Waiting State Philosophy

Waiting states should explain operational pause:
- waiting for approval owner
- waiting for QA validation
- waiting for segmentation definition
- waiting for implementation handoff

Waiting states should guide attention without creating a task system.

## Backend Handoff Boundary

The backend may persist handoff facts.

The backend must not enforce workflow progression through handoffs.

Creating, completing or cancelling a handoff must not automatically move Campaign status.

Creating, completing or cancelling a handoff must not automatically create activities or timeline events during the initial Handoffs implementation.

Campaign Workspace may later compose Handoff facts into workflow continuity, but that remains deferred.