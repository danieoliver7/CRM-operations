# Current State

## Current Phase
Campaign Workspace Facts Endpoint

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
- operational timeline
- campaign execution history
- activity model for workflow, coordination, execution, planning and collaboration events
- lightweight collaboration context
- decision context
- operational memory
- backend NestJS runtime
- Prisma/PostgreSQL persistence foundation
- read-only reference data APIs
- basic Campaign persistence APIs
- campaign-scoped Blockers API
- campaign-scoped Notes API
- campaign-scoped Decision Context API
- campaign-scoped Activities API
- campaign-scoped Handoffs API
- campaign-scoped Campaign Workspace Facts endpoint

## Current Architecture
- React
- TypeScript
- Zustand
- Tailwind
- mock/local operational frontend state
- NestJS backend
- Prisma
- PostgreSQL
- REST-first API
- modular monolith
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API
- Campaign Notes API
- Campaign Decision Context API
- Campaign Activities API
- Campaign Handoffs API
- Campaign Workspace Facts endpoint

## Current Priorities

- maintain Campaign Workspace Facts Endpoint as the composed read endpoint for Campaign Workspace
- expose `GET /campaigns/:campaignId/workspace`
- compose Campaign facts with owner, squad, blockers, notes, decision context, activities and handoffs
- validate Campaign existence
- return empty arrays for empty child resources
- preserve Campaign as the central operational aggregate
- keep derived intelligence out of backend truth
- avoid frontend integration, auth, Docker, workflow engine, timeline generation, command center logic, derived intelligence persistence and AI behavior

## Campaign Workspace Facts Endpoint Capabilities

- Campaign Workspace Facts Endpoint implementation is complete
- Campaign Workspace Facts Endpoint is the composed read endpoint after all planned child resources
- Campaign Workspace Facts Endpoint exposes `GET /campaigns/:campaignId/workspace`
- the endpoint validates Campaign existence
- the endpoint composes Campaign facts
- the endpoint composes owner reference facts or `null`
- the endpoint composes squad reference facts or `null`
- the endpoint composes Blockers
- the endpoint composes Notes
- the endpoint composes Decision Context
- the endpoint composes Activities
- the endpoint composes Handoffs
- child resource empty states return empty arrays
- the endpoint returns persisted facts only
- the endpoint does not return derived intelligence as backend truth
- the endpoint does not generate timeline presentation
- the endpoint does not calculate command center summary
- the endpoint does not connect frontend
- auth remains deferred
- AI features remain deferred

## Campaign Handoffs Implementation Capabilities

- Campaign Handoffs implementation is complete
- Handoffs are the fifth implemented Campaign child resource
- Handoffs remain campaign-scoped
- Handoffs can be listed, created, updated, completed and cancelled through REST endpoints
- Handoff writes validate campaign existence
- Handoff writes validate user references when provided
- Handoff writes validate squad references when provided
- Handoff writes validate handoff ownership by route campaign
- Handoff responses expose only persisted transition facts supported by the current schema
- Handoff API does not accept `requestedById`, `completedById`, `cancelledById`, `notes` or `dueAt` until the schema supports them
- Handoffs preserve lightweight operational transitions
- Handoffs must not become workflow engine, dependency graph, task management, BPM or orchestration
- Handoff operations must not automatically change Campaign status
- Handoff operations must not automatically create activities, timeline events, notes or decision context
- Campaign Workspace Facts Endpoint is implemented after Handoffs
- frontend integration remains deferred
- auth remains deferred
- AI features remain deferred

## Campaign Activities Implementation Capabilities

- Campaign Activities implementation is complete
- Activities are the fourth implemented Campaign child resource
- Activities remain campaign-scoped
- Activities can be listed and created through REST endpoints
- Activity writes validate campaign existence
- Activity writes validate actor user reference when provided
- Activity writes validate accepted related references when provided
- Activity related references are stored through existing activity metadata instead of schema expansion
- Activities preserve meaningful operational events
- Activities must not become event sourcing, audit logs, notification feed or timeline backend
- Activity operations must not automatically create timeline events, notes, decision context or handoffs
- Handoffs API is implemented after Activities
- Campaign Workspace Facts Endpoint is implemented after Activities and Handoffs
- frontend integration remains deferred
- auth remains deferred
- AI features remain deferred

## Campaign Decision Context Implementation Capabilities

- Campaign Decision Context implementation is complete
- Decision Context is the third implemented Campaign child resource
- Decision Context remains campaign-scoped
- Decision Context can be listed, created and updated through REST endpoints
- Decision Context writes validate campaign existence
- Decision Context writes validate author user reference when provided
- Decision Context writes validate accepted related references when provided
- Decision Context responses expose persisted operational reasoning facts only
- Decision Context preserves operational reasoning
- Decision Context must not become chat, comments, approval workflow or knowledge base
- Decision Context operations must not automatically create activities, notes or timeline events
- Activities API is implemented after Decision Context
- Handoffs API is implemented after Activities
- Campaign Workspace Facts Endpoint is implemented after Handoffs
- frontend integration remains deferred
- auth remains deferred
- AI features remain deferred

## Campaign Notes Implementation Capabilities

- Campaign Notes implementation is complete
- Notes are the second implemented Campaign child resource
- Notes remain campaign-scoped
- Notes can be listed, created and updated through REST endpoints
- Note writes validate campaign existence
- Note writes validate author user reference when provided
- Note responses expose lightweight persisted note facts only
- Notes preserve lightweight operational memory
- Notes must not become chat, comments, replies, mentions or threaded discussions
- Note operations must not automatically create activities, decision context or timeline events
- Decision Context API is implemented after Notes
- Activities API is implemented after Decision Context
- Handoffs API is implemented after Activities
- Campaign Workspace Facts Endpoint is implemented after Handoffs
- frontend integration remains deferred
- auth remains deferred
- AI features remain deferred

## Campaign Blockers Implementation Capabilities

- Campaign Blockers implementation is complete
- Blockers are the first implemented Campaign child resource
- Blockers remain campaign-scoped
- Blockers can be listed, created, updated and resolved through REST endpoints
- Blocker writes validate campaign existence
- Blocker writes validate user references when provided
- Blocker responses expose persisted blocker facts only
- Blocker resolution sets `status`, `resolvedAt` and optional `resolvedById`
- Blockers must not become tickets, incidents, escalation workflows or SLA engine
- Blocker operations must not automatically create activities or timeline events
- Notes and Decision Context APIs are implemented after Blockers
- Activities API is implemented after Decision Context
- Handoffs API is implemented after Activities
- Campaign Workspace Facts Endpoint is implemented after Handoffs
- frontend integration remains deferred
- auth remains deferred

## Campaign Child Resources Planning Capabilities

- Campaign child resources planning is validated
- approved implementation order is Campaign Blockers, Campaign Notes, Campaign Decision Context, Campaign Activities, Campaign Handoffs, Campaign Workspace Facts Endpoint
- child resources must remain campaign-scoped
- child resources must persist facts only
- Campaign Blockers API is implemented as the first child resource
- Campaign Notes API is implemented as the second child resource
- Campaign Decision Context API is implemented as the third child resource
- Campaign Activities API is implemented as the fourth child resource
- Campaign Handoffs API is implemented as the fifth child resource
- Campaign Workspace Facts Endpoint is implemented as the composed read endpoint
- Blockers must not become ticketing
- Notes must not become chat or threaded comments
- Decision Context must not become approval workflow
- Activities must not become event sourcing or audit log
- Handoffs must not become workflow engine or dependency graph
- Campaign Workspace Facts Endpoint must not become derived intelligence backend
- frontend integration remains deferred
- auth remains deferred

## Campaign Persistence Implementation Capabilities

- basic Campaign API is implemented
- Campaign records can be created, listed, retrieved and updated
- Campaign status and priority can be updated as simple facts
- Campaign ownerId and squadId can be updated as simple reference facts
- Campaign writes validate workspace, user and squad references
- Campaign API persists facts through Prisma/PostgreSQL
- Campaign API returns simple `{ data }` response wrappers
- Campaign API does not return derived operational intelligence as backend truth
- Campaign Workspace Facts Endpoint is implemented separately from Campaign write APIs
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
- Campaign Workspace Facts Endpoint is implemented later as a composed read endpoint
- frontend integration remains deferred
- auth remains deferred

## Avoid Right Now

- frontend API client
- frontend mock replacement
- auth
- RBAC
- Docker
- Campaign Workspace intelligence backend
- command center backend logic
- timeline generation
- timeline presentation persistence
- derived intelligence persistence
- executionHealth as backend truth
- operationalRisk as backend truth
- coordinationState as backend truth
- workflowContinuity as backend truth
- commandCenterSummary as backend truth
- dashboardWarnings as backend truth
- automatic activity creation from workspace endpoint
- automatic Campaign status transitions
- workflow engine
- dependency graph
- BPM
- task management system
- orchestration layer
- state machine runtime
- notification feed
- event sourcing
- audit log platform
- projections
- CQRS
- comments system
- approval workflow
- knowledge base
- chat behavior
- replies
- mentions
- threaded discussions
- AI features
- embeddings
- semantic search
- write APIs for reference data
- realtime
- websocket
- complex automation
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

Campaign Workspace Facts Endpoint as a composed read endpoint that returns persisted facts only, without frontend integration, derived intelligence, timeline generation or AI behavior.
