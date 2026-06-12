# Roadmap

## Current Focus

Campaign Activities Implementation

## Current Sprint Goals

- implement Campaign Activities API
- implement ActivitiesModule
- implement ActivitiesController
- implement ActivitiesService
- expose `GET /campaigns/:campaignId/activities`
- expose `POST /campaigns/:campaignId/activities`
- validate Campaign existence for all activity operations
- validate User reference when actorId is provided
- validate accepted related references when provided
- preserve existing Campaign APIs
- preserve existing Campaign Blockers API
- preserve existing Campaign Notes API
- preserve existing Campaign Decision Context API
- preserve existing Reference Data APIs
- preserve backend health endpoint
- preserve frontend lint/build behavior
- avoid Handoffs API, Campaign Workspace endpoint, frontend integration, auth, Docker, workflow engine, event sourcing, timeline generation and AI behavior

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
- Campaign Decision Context Implementation: completed
- Campaign Activities Implementation: completed
- Campaign Handoffs Implementation: deferred
- Campaign Workspace Facts Endpoint: deferred

## Next Expected Cut

Campaign Handoffs Implementation, if explicitly approved.

## Still Deferred

- Campaign Workspace API
- Handoff API
- automatic activity creation from other resources
- automatic timeline generation
- activity replay
- event sourcing
- audit log platform
- projections
- notification feed
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
- CQRS
- microservices
- Docker
- CI/CD complexity
- workflow orchestration
- AI prediction
- integrations
- billing
