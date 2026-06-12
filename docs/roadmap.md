# Roadmap

## Current Focus

Campaign Decision Context Implementation

## Current Sprint Goals

- implement Campaign Decision Context API
- implement DecisionContextModule
- implement DecisionContextController
- implement DecisionContextService
- expose `GET /campaigns/:campaignId/decision-context`
- expose `POST /campaigns/:campaignId/decision-context`
- expose `PATCH /campaigns/:campaignId/decision-context/:decisionContextId`
- validate Campaign existence for all decision context operations
- validate decision context belongs to campaign
- validate User reference when authorId is provided
- preserve existing Campaign APIs
- preserve existing Campaign Blockers API
- preserve existing Campaign Notes API
- preserve existing Reference Data APIs
- preserve backend health endpoint
- preserve frontend lint/build behavior
- avoid Activities API, Handoffs API, Campaign Workspace endpoint, frontend integration, auth, Docker, workflow engine and AI behavior

## Approved Child Resource Order

1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint

## Current Implementation Status

- Campaign Blockers Implementation: completed
- Campaign Notes Implementation: completed
- Campaign Decision Context Implementation: current
- Campaign Activities Implementation: deferred
- Campaign Handoffs Implementation: deferred
- Campaign Workspace Facts Endpoint: deferred

## Still Deferred

- Campaign Workspace API
- Campaign Activity API
- Handoff API
- automatic activity creation
- timeline generation
- note creation from decision context
- handoff creation
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
- frontend API client implementation
- frontend mappers implementation
- authentication implementation
- authorization
- RBAC
- realtime
- websocket
- event sourcing
- CQRS
- microservices
- Docker
- CI/CD complexity
- workflow orchestration
- AI prediction
- integrations
- billing