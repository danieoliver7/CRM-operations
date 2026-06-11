# Roadmap

## Current Focus

Campaign Persistence Implementation

## Current Sprint Goals

- maintain implemented basic Campaign API
- maintain CampaignsModule
- maintain CampaignsController
- maintain CampaignsService
- expose Campaign list/detail/create/update endpoints
- expose dedicated status, priority, owner and squad fact updates
- validate workspaceId, ownerId and squadId references before writes
- preserve simple `{ data }` response wrappers
- preserve explicit operational error codes
- preserve reference data APIs
- preserve backend health endpoint
- preserve frontend lint/build behavior
- avoid Campaign Workspace endpoint, campaign child resource APIs, frontend integration, auth, Docker and workflow engine behavior

## Still Deferred

- Campaign Workspace API
- Campaign Activity API
- Blocker API
- Handoff API
- Notes API
- Decision Context API
- timeline generation
- activity creation
- blocker creation
- handoff creation
- decision context creation
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
