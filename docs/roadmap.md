# Roadmap

## Current Focus

Campaign Handoffs Implementation

## Current Sprint Goals

- implement Campaign Handoffs API
- implement HandoffsModule
- implement HandoffsController
- implement HandoffsService
- expose `GET /campaigns/:campaignId/handoffs`
- expose `POST /campaigns/:campaignId/handoffs`
- expose `PATCH /campaigns/:campaignId/handoffs/:handoffId`
- expose `POST /campaigns/:campaignId/handoffs/:handoffId/complete`
- expose `POST /campaigns/:campaignId/handoffs/:handoffId/cancel`
- validate Campaign existence for all handoff operations
- validate handoff belongs to campaign
- validate User references when provided
- validate Squad references when provided
- preserve existing Campaign APIs
- preserve existing Campaign Blockers API
- preserve existing Campaign Notes API
- preserve existing Campaign Decision Context API
- preserve existing Campaign Activities API
- preserve existing Reference Data APIs
- preserve backend health endpoint
- preserve frontend lint/build behavior
- avoid Campaign Workspace endpoint, frontend integration, auth, Docker, workflow engine, dependency graph, task management, automatic activity creation, timeline generation and AI behavior

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
- Campaign Handoffs Implementation: completed
- Campaign Workspace Facts Endpoint: deferred

## Next Expected Cut

Campaign Workspace Facts Endpoint, if explicitly approved.

## Still Deferred

- Campaign Workspace API
- Campaign Workspace Facts Endpoint
- automatic Campaign status transitions from handoffs
- automatic activity creation from handoffs
- automatic timeline generation
- workflow engine
- dependency graph
- BPM
- task management
- orchestration layer
- state machine runtime
- notification feed
- event sourcing
- audit log platform
- projections
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
