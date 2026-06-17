# Roadmap

## Current Focus

Campaign Workspace Facts Endpoint

## Current Sprint Result

- Campaign Workspace Facts Endpoint implemented
- `GET /campaigns/:campaignId/workspace` exposed
- Campaign existence validated
- Campaign facts composed
- owner reference facts composed or returned as `null`
- squad reference facts composed or returned as `null`
- Campaign Blockers composed
- Campaign Notes composed
- Campaign Decision Context composed
- Campaign Activities composed
- Campaign Handoffs composed
- empty arrays returned for empty child resource lists
- preserve existing Campaign APIs
- preserve existing Campaign Blockers API
- preserve existing Campaign Notes API
- preserve existing Campaign Decision Context API
- preserve existing Campaign Activities API
- preserve existing Campaign Handoffs API
- preserve existing Reference Data APIs
- preserve backend health endpoint
- preserve frontend lint/build behavior
- avoid frontend integration, auth, Docker, workflow engine, timeline generation, command center logic, derived intelligence persistence and AI behavior

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
- Campaign Workspace Facts Endpoint: completed

## Still Deferred

- frontend API client implementation
- frontend mappers implementation
- frontend mock replacement
- authentication implementation
- authorization
- RBAC
- command center backend logic
- timeline generation
- timeline presentation persistence
- derived intelligence persistence
- execution health backend calculation
- operational risk backend calculation
- coordination state backend calculation
- workflow continuity backend calculation
- dashboard warning backend calculation
- automatic activity creation
- automatic Campaign status transitions
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
