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

Handoffs are lightweight operational transitions between workflow stages.

Examples:
- briefing to copy
- copy to approval
- approval to development
- development to QA
- QA to scheduling

Handoffs should be visual and contextual, not enforced by runtime logic.

## Waiting State Philosophy

Waiting states should explain operational pause:
- waiting for approval owner
- waiting for QA validation
- waiting for segmentation definition
- waiting for implementation handoff

Waiting states should guide attention without creating a task system.
