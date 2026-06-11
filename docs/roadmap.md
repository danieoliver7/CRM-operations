# Roadmap

## Current Focus

Campaign Blockers Implementation

## Current Sprint Goals

- implement Campaign Blockers API
- implement BlockersModule
- implement BlockersController
- implement BlockersService
- expose `GET /campaigns/:campaignId/blockers`
- expose `POST /campaigns/:campaignId/blockers`
- expose `PATCH /campaigns/:campaignId/blockers/:blockerId`
- expose `POST /campaigns/:campaignId/blockers/:blockerId/resolve`
- validate Campaign existence for all blocker operations
- validate blocker belongs to campaign
- validate User references when provided
- preserve existing Campaign APIs
- preserve existing Reference Data APIs
- preserve backend health endpoint
- preserve frontend lint/build behavior
- avoid Notes API, Decision Context API, Activities API, Handoffs API, Campaign Workspace endpoint, frontend integration, auth, Docker and workflow engine behavior

## Approved Child Resource Order
1. Campaign Blockers Implementation
2. Campaign Notes Implementation
3. Campaign Decision Context Implementation
4. Campaign Activities Implementation
5. Campaign Handoffs Implementation
6. Campaign Workspace Facts Endpoint

## Still Deferred

- Campaign Workspace API
- Campaign Activity API
- Handoff API
- Notes API
- Decision Context API
- timeline generation
- activity creation
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
