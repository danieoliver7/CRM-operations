# Campaign Workspace Facts Endpoint Implementation

## Purpose

This document defines the Campaign Workspace Facts Endpoint implementation sprint.

This sprint implements the first composed read endpoint for Campaign Workspace.

It does not create a new operational child resource.

It does not implement frontend integration.

It does not implement derived intelligence.

It does not implement timeline generation.

It does not implement command center logic.

It does not implement AI.

---

# Current Phase

Campaign Workspace Facts Endpoint

The project already has:

- NestJS backend runtime
- Prisma/PostgreSQL persistence foundation
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API
- Campaign Notes API
- Campaign Decision Context API
- Campaign Activities API
- Campaign Handoffs API
- Campaign Child Resources Planning validated
- future Operational Copilot vision documented as non-MVP scope

The next backend cut is to implement a composed read endpoint for Campaign Workspace facts.

---

# Sprint Goal

Implement a simple composed read endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

This endpoint should return the persisted operational facts needed by Campaign Workspace.

It should compose existing backend facts.

It should not calculate or return derived intelligence as backend truth.

---

# Implemented Result

This sprint implements:

- CampaignWorkspaceModule
- CampaignWorkspaceController
- CampaignWorkspaceService
- Campaign Workspace Facts DTO
- Campaign Workspace response mapper/composer
- Campaign Workspace DTO validation test

Implemented endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

The endpoint composes persisted facts only and does not create, update or delete records.

---

# Why This Comes After Child Resources

Campaign Workspace needs durable facts before it can be safely composed.

The backend now has durable APIs for:

- Campaign
- Blockers
- Notes
- Decision Context
- Activities
- Handoffs
- Reference Data

Because the child facts now exist, the backend can expose a composed workspace read model.

This endpoint should reduce frontend request orchestration later, but it should not connect the frontend yet.

---

# Approved Scope

This sprint may create:

- CampaignWorkspaceModule
- CampaignWorkspaceController
- CampaignWorkspaceService
- Campaign Workspace Facts DTOs
- Campaign Workspace response mapper/composer
- validation tests for response shape/composition if practical

This sprint may register the module in:

```txt
backend/src/app.module.ts
```

This sprint may update:

```txt
backend/README.md
```

---

# Allowed Endpoint

Allowed endpoint:

```txt
GET /campaigns/:campaignId/workspace
```

No other Campaign Workspace endpoints are allowed in this sprint.

---

# Endpoint Intent

## GET /campaigns/:campaignId/workspace

Should:

- validate Campaign exists
- load Campaign facts
- load owner reference facts when campaign ownerId exists
- load squad reference facts when campaign squadId exists
- load campaign-scoped blockers
- load campaign-scoped notes
- load campaign-scoped decision context
- load campaign-scoped activities
- load campaign-scoped handoffs
- return a simple `{ data: {...} }` response
- return persisted facts only
- tolerate empty child resource lists

Should not:

- create or update anything
- calculate execution health
- calculate operational risk
- calculate coordination state
- calculate workflow continuity
- calculate command center summary
- generate timeline events
- generate dashboard warnings
- call AI
- infer recommendations
- mutate Campaign
- create Activities
- create Handoffs
- trigger workflow transitions

---

# Composed Facts

The endpoint may compose:

```txt
campaign
owner
squad
blockers
notes
decisionContext
activities
handoffs
```

The endpoint should not compose:

```txt
executionHealth
operationalRisk
coordinationState
workflowContinuity
commandCenterSummary
timelinePresentation
dashboardWarnings
slaLabel
planningPressure
ownerPressure
squadPressure
AI summary
Copilot insight
```

---

# Response Shape Direction

Preferred response shape:

```ts
type CampaignWorkspaceFactsResponse = {
  data: CampaignWorkspaceFactsDto;
};

type CampaignWorkspaceFactsDto = {
  campaign: CampaignDto;
  owner?: UserDto | null;
  squad?: SquadDto | null;
  blockers: CampaignBlockerDto[];
  notes: CampaignNoteDto[];
  decisionContext: CampaignDecisionContextDto[];
  activities: CampaignActivityDto[];
  handoffs: CampaignHandoffDto[];
};
```

Use existing DTOs and mappers where practical.

Do not expose raw Prisma internals.

Do not invent new domain truth.

---

# Empty State Rule

Empty child resource collections should return empty arrays.

These are valid responses:

```txt
blockers: []
notes: []
decisionContext: []
activities: []
handoffs: []
```

No blockers, notes, activities or handoffs is not an error.

The frontend should later decide how to present calm empty states.

---

# Reference Data Rule

The endpoint may include owner and squad reference facts when available.

If `ownerId` is null or missing:

```txt
owner: null
```

If `squadId` is null or missing:

```txt
squad: null
```

Reference data should remain read-only.

Do not create write APIs for reference data.

Do not implement auth.

---

# Derived Intelligence Boundary

The endpoint must not persist or return derived intelligence as backend truth.

Do not return:

- executionHealth
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- dashboardWarnings
- planningPressure
- ownerPressure
- squadPressure
- SLA label
- progress
- timeline presentation events
- AI summary
- AI recommendations
- Copilot insights

The frontend may continue deriving these from facts.

A future backend intelligence layer may be evaluated later, but not now.

---

# Timeline Boundary

Activities and other child facts may later feed timeline presentation.

This endpoint must not generate timeline events.

Do not return `timeline`.

Do not return `timelineEvents`.

Do not persist timeline presentation fields.

---

# Command Center Boundary

Campaign Workspace UI may have a command center.

This endpoint must not return a command center summary.

Do not return:

- commandCenterSummary
- nextBestAction
- recommendedAction
- operationalDiagnosis
- severityScore
- priorityScore

Those remain derived later.

---

# Operational Copilot Future Rule

Workspace facts may become useful for a future CRM Operations Copilot.

However, this sprint must not implement AI.

Do not create:

- embeddings
- vector database
- semantic search
- AI summaries
- Copilot insights
- prompt engine
- OpenAI API integration
- agent runtime

AI-ready means workspace facts are clean, explicit and composable.

AI-ready does not mean AI implementation.

---

# Prisma Usage Rule

CampaignWorkspaceService may use PrismaService directly and simply.

Allowed:

- findUnique for Campaign
- findUnique/findMany for owner/squad references
- findMany for child resources
- simple ordering for child lists
- simple mapping to existing DTOs

Avoid:

- repository abstraction
- unit of work abstraction
- domain event bus
- workflow engine
- derived intelligence service
- timeline engine
- command center service
- AI service
- generic composition framework
- GraphQL-like abstraction

---

# Performance Rule

This is an MVP endpoint.

Keep implementation simple.

Do not introduce:

- caching
- dataloader
- Redis
- query batching framework
- background jobs
- GraphQL
- complex include trees if mappers become unclear

Use straightforward Prisma reads.

---

# What This Sprint Must Not Implement

Do not implement:

- frontend API client
- frontend mappers
- frontend replacement of mocks
- auth
- RBAC
- Docker
- realtime
- notifications
- workflow engine
- dependency graph
- timeline generation
- automatic activity creation
- derived intelligence persistence
- analytics aggregation
- AI features

---

# Success Criteria

This sprint succeeds if:

- `GET /campaigns/:campaignId/workspace` works
- Campaign existence is validated
- response includes Campaign facts
- response includes owner reference facts or null
- response includes squad reference facts or null
- response includes blockers array
- response includes notes array
- response includes decisionContext array
- response includes activities array
- response includes handoffs array
- empty child lists return empty arrays
- existing individual APIs remain working
- backend validation passes
- frontend validation passes
- no frontend integration is created
- no derived intelligence is returned as backend truth
- no timeline generation is created
- no command center logic is created
- no AI behavior is created

---

# Final Principle

Campaign Workspace Facts Endpoint should compose persisted facts.

It should not become an intelligence engine, timeline engine, command center engine, workflow engine or frontend integration sprint.
