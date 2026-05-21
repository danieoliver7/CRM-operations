# Current State

## Current Phase
Operational Timeline & Activity Model

## Current Product State
Frontend-first CRM Operations SaaS MVP focused on operational workflow and campaign coordination.

## Current Capabilities
- operational dashboard
- contextual workflows
- campaign workspace
- operational coordination
- shared operational state
- workflow contextual actions
- operational planning
- overload indicators
- operational calendar
- capacity perception
- owner and squad planning visibility
- execution health
- operational blockers
- SLA awareness
- operational risk visibility
- coordination awareness
- handoff visibility
- workflow continuity perception
- ownership awareness
- organized frontend domain model
- persisted vs derived state separation
- backend readiness without backend implementation
- operational timeline
- campaign execution history
- activity model for workflow, coordination, execution, planning and collaboration events

## Current Architecture
- React
- TypeScript
- Zustand
- Tailwind
- frontend-only
- mock/local operational state

## Current Priorities
- operational timeline clarity
- activity model consistency
- campaign execution history
- preserving lightweight derived intelligence
- avoiding event sourcing, audit log and backend implementation

## Operational Planning Capabilities
- campaign creation captures planning context before execution
- calendar communicates future campaign concentration
- dashboard surfaces planning pressure and upcoming warnings
- capacity indicators remain derived from campaign state

## Operational Execution Intelligence Capabilities
- dashboard communicates execution health, overdue campaigns and blockers
- campaign workspace surfaces health, SLA and risk context
- workflow next actions include blocker and risk signals
- execution intelligence remains derived from campaign state

## Operational Coordination Capabilities
- dashboard communicates campaigns waiting action and pending handoffs
- kanban cards expose continuity, owner/action awareness and health
- campaign workspace surfaces current owner, next responsible area and handoff context
- coordination intelligence remains derived from campaign state and workflow context

## Domain Readiness Capabilities
- core entities are represented as frontend domain types
- Campaign remains compatible with the current UI while aligning with future backend facts
- derived intelligence types are separated from persisted entity types
- commercial future entities exist as lightweight reference types only

## Operational Timeline Capabilities
- campaign workspace explains recent operational history
- timeline events are categorized by workflow, coordination, execution, planning and collaboration
- timeline importance is visual but lightweight
- events can be derived from campaign status, due date, owner, blockers, risks, SLA and coordination signals
- activity history remains local/mock and does not introduce persistence or event sourcing

## Avoid Right Now
- backend
- realtime
- websocket
- workflow engine
- AI features
- complex automation
- persistence
- auth

## MVP Philosophy
Prioritize:
1. operational behavior
2. workflow validation
3. UX coordination
4. domain clarity

Before:
- scalability
- infrastructure
- enterprise architecture

## Current Risks
- overengineering
- workflow explosion
- Zustand becoming backend
- too much abstraction
- premature infrastructure

## Current UX Direction
Operational-first experience.
The system should feel like a CRM operations workspace, not a generic dashboard.

## Current Domain Focus
Operational timeline, activity model clarity and campaign execution history without backend implementation.
