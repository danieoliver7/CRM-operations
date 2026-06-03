# Current State

## Current Phase
Frontend Backend Contract Preparation

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
- lightweight collaboration context
- decision context
- operational memory

## Current Architecture
- React
- TypeScript
- Zustand
- Tailwind
- frontend-only
- mock/local operational state

## Current Priorities
- prepare frontend-backend contracts before backend implementation planning
- define API response shapes for Backend V1 resources
- define DTO to View Model mapping rules
- define Campaign Workspace contract
- clarify which current frontend fields are compatibility/view fields
- protect derived intelligence from becoming backend primary truth
- avoid backend implementation, Prisma schema, API routes and frontend API client code

## Workspace Consolidation Capabilities
- workspace header communicates status, priority, health, SLA and coordination state
- operational command center combines execution health, blockers, risks, coordination and next action
- timeline and decision context continue the execution story instead of competing with current-state cards
- sidebar focuses on actions, checklist, squad context and lightweight activity
- no new domain concept, backend, realtime or collaboration system was introduced

## Backend Foundation Design Capabilities
- backend design direction is documented before implementation
- modular monolith is validated as the initial backend architecture direction
- schema design guidelines exist without creating database schema
- backend implementation sequence is defined
- stack candidates were evaluated before Backend V1 stack approval
- backend implementation remains deferred until design is approved

## Backend Foundation Architecture Review Capabilities
- backend assumptions are challenged before implementation
- Campaign aggregate direction is validated
- Organization, Workspace and Campaign hierarchy is reviewed for SaaS readiness
- persistence boundaries are reviewed against activity, timeline, notes, metrics and attachments
- API boundaries are reviewed for ownership and boundary leaks
- architecture risks are documented before backend code exists

## Backend MVP Definition

Status: validated

Focus:

- define the smallest useful backend scope
- identify required vs optional backend capabilities
- decide workspace scoping assumption
- clarify auth timing
- prepare first schema review checklist
- avoid backend implementation before scope is approved

## Backend MVP Definition Capabilities
- Backend MVP is defined as the smallest backend needed to make Campaign Workspace durable
- Backend MVP scope separates required, optional and deferred backend capabilities
- Auth timing is documented as conditional based on deployment target
- first schema review checklist exists before schema creation
- Backend MVP protects derived intelligence from premature persistence
- implementation remains deferred until MVP scope is approved

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

## Operational Collaboration Capabilities
- campaign workspace explains why operational changes happened
- decision context captures rationale, clarification, risk notes, resolution notes and handoff notes
- meaningful decision context can appear in the operational timeline
- collaboration remains local/mock and campaign-scoped
- no chat, comment threads, realtime or notification system exists

## Backend Stack Decision Capabilities
- Backend V1 stack direction is documented as NestJS + Prisma + PostgreSQL
- REST-first modular monolith remains the approved architecture direction
- stack selection criteria are documented
- stack guardrails prevent NestJS, Prisma and PostgreSQL from expanding product scope
- framework choice remains subordinate to product domain and Backend MVP scope
- implementation remains deferred until stack decision is approved

## Frontend Layout Stabilization Capabilities
- responsive layout rules are documented before implementation
- Kanban horizontal scroll behavior is documented
- AppShell, sidebar and main content width behavior are treated as product quality concerns
- stabilization is explicitly scoped to layout fixes, not redesign
- backend implementation remains deferred until layout stability improves

## Frontend Backend Contract Capabilities
- frontend-backend contract rules are documented before implementation
- API response shapes are planned without creating routes
- DTO to View Model mapping rules are documented
- Campaign Workspace data contract is defined as the first priority
- current mock/UI compatibility fields are prevented from becoming backend schema by accident
- derived intelligence remains frontend-derived from persisted facts

## Avoid Right Now
- backend implementation
- API routes
- database schema
- migrations
- backend framework setup
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
Frontend-backend contract preparation without backend implementation.
