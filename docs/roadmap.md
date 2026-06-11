# Roadmap

## Current Focus

Campaign Notes Implementation

## Current Sprint Goals

- implement Campaign Notes API
- implement NotesModule
- implement NotesController
- implement NotesService
- expose `GET /campaigns/:campaignId/notes`
- expose `POST /campaigns/:campaignId/notes`
- expose `PATCH /campaigns/:campaignId/notes/:noteId`
- validate Campaign existence for all note operations
- validate note belongs to campaign
- validate User reference when authorId is provided
- preserve existing Campaign APIs
- preserve existing Campaign Blockers API
- preserve existing Reference Data APIs
- preserve backend health endpoint
- preserve frontend lint/build behavior
- avoid Decision Context API, Activities API, Handoffs API, Campaign Workspace endpoint, frontend integration, auth, Docker, workflow engine and AI behavior

## Approved Child Resource Order

1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint

## Current Implementation Status

- Campaign Blockers Implementation: completed
- Campaign Notes Implementation: current
- Campaign Decision Context Implementation: deferred
- Campaign Activities Implementation: deferred
- Campaign Handoffs Implementation: deferred
- Campaign Workspace Facts Endpoint: deferred

## Still Deferred

- Campaign Workspace API
- Campaign Decision Context API
- Campaign Activity API
- Handoff API
- automatic activity creation
- timeline generation
- decision context creation
- handoff creation
- chat behavior
- comments system
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
