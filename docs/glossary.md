# Glossary

## Campaign
Operational CRM entity.

## Workflow
Operational progression of campaign execution.

## Workspace
Operational environment for campaign coordination.

## Squad
Operational group responsible for campaign execution.

## Operational Planning
Visualization and coordination of future operational workload.

## Capacity
Operational pressure or overload perception.

## Overload
High operational concentration in a stage, squad or time period.

## Execution Health
Derived perception of campaign execution quality.

## Blocker
Lightweight operational impediment affecting campaign execution.

## SLA
Operational timing expectation used for visibility, not enforcement.

## Operational Risk
Execution signal that may affect campaign delivery.

## Coordination Awareness
Derived perception of who or what needs to act next.

## Handoff
Lightweight operational transition between workflow stages or responsible areas.

## Workflow Continuity
Perception that a campaign has a clear next step, owner and handoff path.

## Waiting State
Operational pause where a campaign is waiting for a person, squad or validation step.

## Persisted Domain Data
Operational facts that may become backend records later.

## Derived Operational Intelligence
Operational awareness recalculated from persisted facts, such as health, risk, pressure and continuity.

## UI-Only State
Temporary interface state such as modal visibility, filters, tabs and form drafts.

## Backend Readiness
Domain preparation for future backend work without implementing backend infrastructure now.

## Backend Foundation Planning
Documentation phase that defines persistence boundaries, entity relationships, API boundaries and backend risks before technical design.

## Backend Foundation Design
Documentation phase that turns backend planning into architecture direction, module boundaries, schema guidelines, implementation sequence and stack candidates without creating backend code.

## Backend Foundation Architecture Review
Documentation phase that challenges backend assumptions, validates boundaries and records implementation risks before backend code begins.

## Architecture Risk
Known weakness or uncertainty that could force redesign if ignored during future backend implementation.

## Modular Monolith
Likely first backend architecture direction where modules are clearly separated inside one deployable backend instead of distributed microservices.

## REST-First
Likely first API direction where resource-oriented endpoints expose persisted operational facts before orchestration or graph APIs are considered.

## Activity
Meaningful operational event related to campaign execution, coordination, planning or collaboration.

## Activity Model
Domain structure used to describe operational events without introducing event sourcing or audit log infrastructure.

## Operational Timeline
Workspace view that explains the campaign execution history through meaningful operational events.

## Timeline Event
Presentation model for a timeline item, including category, importance, message, actor and timestamp.

## Event Sourcing
Deferred architecture pattern that should not be implemented during the MVP.

## Decision Context
Operational reasoning that explains why something changed in campaign execution.

## Operational Memory
Lightweight campaign context that preserves decisions, rationale, risk notes, resolution notes and handoff notes.

## Resolution Note
Operational note explaining how a blocker, QA issue or execution friction was resolved.

## Handoff Note
Operational note explaining the context behind transition between workflow stages or responsible areas.
