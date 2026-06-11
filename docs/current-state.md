# Current State

## Current Phase
Campaign Persistence Implementation

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
- basic Campaign persistence APIs

## Current Architecture
- React
- TypeScript
- Zustand
- Tailwind
- mock/local operational state
- minimal NestJS backend skeleton
- Prisma database foundation
- read-only backend reference data APIs
- basic Campaign persistence APIs

## Campaign Persistence Implementation Capabilities

- basic Campaign API is implemented
- Campaign records can be created, listed, retrieved and updated
- Campaign status and priority can be updated as simple facts
- Campaign ownerId and squadId can be updated as simple reference facts
- Campaign writes validate workspace, user and squad references
- Campaign API persists facts through Prisma/PostgreSQL
- Campaign API returns simple `{ data }` response wrappers
- Campaign API does not return derived operational intelligence as backend truth
- Campaign Workspace endpoint remains deferred
- campaign child resource APIs remain deferred
- frontend integration remains deferred
- auth remains deferred

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

## Backend Implementation Planning Capabilities
- Backend V1 implementation plan is documented before code
- module plan defines planned NestJS modular monolith boundaries
- first Prisma schema plan defines schema direction without schema creation
- API implementation plan defines first REST resource direction without routes
- Campaign Workspace endpoint strategy is recommended as a composed read endpoint plus resource writes
- validation plan protects contracts, persistence boundaries and derived intelligence rules
- backend implementation remains deferred until planning is approved

## Backend Skeleton Implementation Capabilities
- backend skeleton implementation is complete
- minimal NestJS backend app exists under `/backend`
- `GET /health` exists only for skeleton validation
- backend build/start/lint/test scripts are configured
- Campaign Workspace and campaign child modules remain deferred
- auth, Docker, frontend integration and advanced Campaign APIs remain deferred

## Prisma And Database Foundation Capabilities
- Prisma is installed and configured in the backend
- Prisma 7 config uses `backend/prisma.config.ts`
- first `schema.prisma` exists for approved Backend V1 facts
- first migration is applied locally through `npx prisma migrate dev`
- Prisma Client can be generated
- safe idempotent seed exists and loads default organization, workspace, users and squads
- PrismaService and PrismaModule support the approved read-only reference data cut
- Campaign Workspace and campaign child resource APIs remain deferred
- auth, frontend integration, Docker and advanced infrastructure remain deferred

## Reference Data Implementation Capabilities
- read-only Workspaces API is implemented
- read-only Users API is implemented
- read-only Squads API is implemented
- reference data is read from PostgreSQL through Prisma
- endpoints use simple `{ data }` response wrappers
- not-found responses use explicit operational error codes
- reference APIs support future Campaign ownerId, squadId and workspaceId relationships
- basic Campaign APIs are implemented separately from reference data APIs
- Campaign Workspace endpoint remains deferred
- frontend integration remains deferred
- auth remains deferred

## Avoid Right Now
- Campaign Workspace endpoint
- Campaign child resource APIs
- Campaign Workspace backend behavior
- automatic activity, timeline or handoff creation
- derived intelligence persistence
- write APIs for reference data
- frontend integration
- auth
- realtime
- websocket
- workflow engine
- AI features
- complex automation
- Docker
- advanced infrastructure

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
Campaign persistence APIs without Campaign Workspace backend behavior.
