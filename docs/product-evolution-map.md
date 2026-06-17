# Product Evolution Map

## Purpose

This document defines the intended evolution path of CRM Operations Platform.

It helps humans and AI agents understand:

- what has already been built
- what should come next
- what should remain deferred
- how the product should mature without overengineering

---

# Evolution Path

## 1. Operational Planning

Status: validated

Focus:

- campaign planning
- calendar visibility
- future workload
- owner pressure
- squad pressure
- capacity perception

---

## 2. Execution Intelligence

Status: validated

Focus:

- execution health
- blockers
- overdue awareness
- SLA awareness
- operational risk

---

## 3. Operational Coordination

Status: validated

Focus:

- handoff visibility
- waiting states
- next responsible area
- ownership awareness
- workflow continuity

---

## 4. Operational Timeline

Status: validated

Focus:

- campaign history
- meaningful operational events
- workflow movement
- blocker history
- handoff events
- execution story

---

## 5. Operational Memory

Status: validated

Focus:

- decision context
- rationale
- risk notes
- resolution notes
- handoff notes
- preserved operational reasoning

---

## 6. Operational Workspace Consolidation

Status: validated

Focus:

- consolidate Campaign Workspace as the single operational hub
- improve hierarchy between execution, coordination, timeline and decisions
- reduce duplicated or scattered context
- make Workspace feel cohesive
- make other views navigate into Workspace clearly

This phase should NOT introduce major new domain concepts.

---

## 7. Backend Foundation Planning

Status: validated

Focus:

- persistence boundaries
- entity relationships
- API boundaries
- first backend scope
- deferred backend scope
- backend risks
- planning before implementation

Do not implement backend code during this phase.

---

## 8. Backend Foundation Design

Status: validated

Focus:

- modular monolith direction
- campaign-centered backend architecture
- REST-first API direction
- PostgreSQL-compatible persistence direction
- backend layering and module boundaries
- schema design guidelines
- implementation sequence
- stack candidates and tradeoffs
- backend risks before implementation

Do not create backend code during this phase.

Do not lock final framework, ORM, hosting, auth provider or cloud provider decisions yet.

---

## 9. Backend Foundation Architecture Review

Status: validated

Focus:

- challenge backend assumptions before implementation
- validate Campaign aggregate direction
- review Organization -> Workspace -> Campaign hierarchy
- review persistence and derived intelligence boundaries
- review entity relationships and API ownership
- review implementation sequence
- document risks and open questions

Do not implement backend code during this phase.

The goal is more confidence, fewer assumptions and lower implementation risk.

---

## 10. Backend MVP Definition

Status: validated

Focus:

- define smallest useful backend scope
- separate required, optional and deferred backend capabilities
- clarify single default workspace assumption
- clarify conditional auth timing
- define first schema review checklist
- approve scope before technical execution

Do not implement backend code during this phase.

The goal is scope clarity before implementation.

---

## 11. Backend Stack Decision

Status: validated

Focus:

- select recommended Backend V1 stack direction
- document stack selection criteria
- define NestJS, Prisma and PostgreSQL guardrails
- keep stack decision subordinate to Backend MVP scope
- avoid implementation before stack decision is approved

Do not implement backend code during this phase.

The approved direction is NestJS + Prisma + PostgreSQL + REST-first API + Modular Monolith.

---

## 12. Frontend Backend Contract Preparation

Status: validated

Focus:

- define API DTO direction before backend implementation
- clarify DTO to View Model mapping
- define Campaign Workspace contract as the first backend-facing surface
- protect derived intelligence from premature persistence
- prevent current mock/UI compatibility fields from becoming schema by accident
- align frontend API patterns with backend API boundaries

Do not implement backend, API clients, Prisma schema, routes or migrations during this phase.

The goal is contract clarity before technical execution.

---

## 13. Backend Implementation Planning

Status: validated

Focus:

- define first Backend V1 implementation cuts
- define module plan for NestJS modular monolith
- define first Prisma schema plan
- define Backend V1 API implementation plan
- recommend Campaign Workspace endpoint strategy
- define validation plan before backend code
- preserve contracts and derived intelligence boundaries
- avoid backend implementation before planning is approved

Do not implement backend, API clients, Prisma schema, routes or migrations during this phase.

The goal is to make the first real backend sprint safe, small and obvious.

---

## 14. Backend Foundation Implementation

Status: future

Focus:

- persistence
- API
- database
- backend service
- campaign data storage
- activities storage
- notes storage

Do not start before Backend Implementation Planning is approved.

---

## 15. Commercial SaaS Foundation

Status: future

Focus:

- organization
- workspace
- membership
- basic roles
- tenant boundaries
- customer-ready data model

---

## 16. Realtime Collaboration

Status: future

Focus:

- live updates
- multi-user presence
- realtime collaboration

Only after backend and persistence exist.

---

## 17. Integrations

Status: future

Focus:

- Salesforce Marketing Cloud
- HubSpot
- Braze
- Adobe
- campaign execution platforms

Only after the core operational product is validated.

## 18. Backend Skeleton Implementation

Status: validated

Focus:

- maintain the first backend runtime foundation
- keep the minimal NestJS backend skeleton small
- validate backend start/build behavior before future cuts
- preserve existing frontend behavior
- avoid Prisma, database, Campaign APIs and auth
- prepare for Prisma and database foundation in the next backend cut

This phase has created backend runtime code, but it has not created product backend behavior.

## 19. Prisma And Database Foundation

Status: validated

Focus:

- maintain Prisma setup
- keep the first Prisma schema aligned with persistence boundaries
- configure PostgreSQL datasource through local environment and Prisma config
- keep Prisma Client generation working
- keep first migration SQL ready
- keep safe reference seed ready
- preserve health endpoint and frontend behavior
- avoid Campaign APIs, auth and frontend integration

This phase introduces persistence foundation, but it does not implement product backend behavior.

---

## 20. Reference Data Implementation

Status: validated

Focus:

- maintain read-only reference data APIs
- expose seeded workspaces, users and squads
- validate Prisma read access through backend services
- prepare future Campaign persistence references
- avoid Campaign APIs, frontend integration, auth and write APIs

This phase introduces read-only reference data product APIs, but it does not introduce Campaign backend behavior.

---

## 21. Campaign Persistence Implementation

Status: validated

Focus:

- implement basic Campaign persistence APIs
- create, list, retrieve and update Campaign facts
- validate workspace, owner and squad references
- preserve reference data APIs
- avoid Campaign Workspace endpoint
- avoid campaign child resources
- avoid frontend integration and auth

---

## 22. Campaign Child Resources Planning

Status: validated

Focus:

- plan Campaign child resources before implementation
- define implementation order
- define API boundaries
- define validation expectations
- protect child resources from becoming generic project management concepts
- prepare Campaign Blockers Implementation as the next likely implementation cut

Approved implementation order:

```txt
1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint
```

## 23. Campaign Blockers Implementation

Status: validated

Focus:

- implement Campaign Blockers as the first Campaign child resource
- expose campaign-scoped blocker APIs
- support blocker list, create, update and resolve operations
- validate Campaign and User references
- keep blockers as operational impediments
- avoid ticketing, escalation workflow, automatic activities and Campaign Workspace endpoint

## 24. Campaign Notes Implementation

Status: validated

Focus:

- implement Campaign Notes as the second Campaign child resource
- expose campaign-scoped note APIs
- support note list, create and update operations
- validate Campaign and User references
- keep notes as lightweight operational memory
- avoid chat, comments, replies, mentions, automatic activities and Campaign Workspace endpoint

## 25. Campaign Decision Context Implementation

Status: validated

Focus:

- implement Campaign Decision Context as the third Campaign child resource
- expose campaign-scoped decision context APIs
- support decision context list, create and update operations
- validate Campaign and User references
- keep decision context as operational reasoning
- avoid comments, approvals, knowledge base, automatic activities and Campaign Workspace endpoint

## 26. Campaign Activities Implementation

Status: validated

Focus:

- implement Campaign Activities as the fourth Campaign child resource
- expose campaign-scoped activity APIs
- support activity list and create operations
- validate Campaign and User references
- validate accepted related references when provided
- keep activities as meaningful operational events
- avoid event sourcing, audit logs, automatic activity creation, timeline generation and Campaign Workspace endpoint

## 27. Campaign Handoffs Implementation

Status: validated

Focus:

- implement Campaign Handoffs as the fifth Campaign child resource
- expose campaign-scoped handoff APIs
- support handoff list, create, update, complete and cancel operations
- validate Campaign, User and Squad references
- keep handoffs as lightweight operational transitions
- avoid workflow engine, dependency graph, task management, automatic activity creation, timeline generation and Campaign Workspace endpoint

## 28. Campaign Workspace Facts Endpoint

Status: validated

Focus:

- maintain `GET /campaigns/:campaignId/workspace`
- compose persisted Campaign facts
- compose owner and squad reference facts
- compose Blockers, Notes, Decision Context, Activities and Handoffs
- return empty arrays for missing child resources
- keep endpoint as read-only fact composition
- avoid frontend integration, derived intelligence, timeline generation, command center logic and AI behavior

---

# Current Rule

The current phase is:

Campaign Workspace Facts Endpoint

The goal is to compose persisted Campaign Workspace facts only.

The goal is not to build frontend integration, workflow engine, dependency graph, task management, auth, Docker, timeline generation, command center backend logic, notifications or AI/Copilot features.

---

# What Should Remain Deferred

Do not implement now:

- Campaign Workspace write endpoints
- automatic activity, timeline, decision context or handoff creation
- derived intelligence persistence
- write APIs for reference data
- frontend API clients
- auth
- realtime
- permissions
- Docker
- integrations
- billing
- workflow automation
- AI prediction
- notifications

---

# Final Principle

The product should evolve from operational clarity to commercial infrastructure.

Not the opposite.


---

## Future Strategic Layer: CRM Operations Copilot

Status: future vision only

Focus:

- learn from operational history
- analyze Campaign facts
- analyze blockers
- analyze notes
- analyze decision context
- analyze activities
- analyze handoffs
- analyze timeline
- support future operational recommendations
- help explain why campaigns delayed, changed or should be revisited

This is not MVP scope.

This is not current roadmap scope.

Do not implement AI features now.

Do not create:

- embeddings
- vector database
- OpenAI API integration
- LLM provider
- RAG pipeline
- prompt engine
- agent runtime
- Copilot UI
- AI recommendations
- semantic search
- AI automations

Current implication:

- keep operational facts clean
- preserve decision context
- preserve blockers
- preserve notes
- preserve activities
- preserve handoffs
- avoid derived intelligence persistence
- avoid UI state persistence
- keep Campaign as the central operational aggregate
