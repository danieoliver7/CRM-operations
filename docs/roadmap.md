# Roadmap

## Current Focus

Campaign Workspace Frontend Integration

## Current Sprint Result

- typed frontend API client for `GET /campaigns/:campaignId/workspace` implemented
- Campaign Workspace backend DTO types implemented
- Campaign Workspace compatible View Model mapping implemented
- DTO to View Model mapper implemented
- only `frontend/src/pages/CampaignDetails.tsx` connected to backend workspace facts
- existing Campaign Workspace layout preserved
- existing derived intelligence utilities preserved
- minimal loading state preserved
- minimal error state added for missing id, not found, backend unavailable and unexpected response
- empty child resource arrays handled without crashing
- Dashboard, Kanban, Calendar and Campaign List remain mock-driven
- global mock replacement avoided
- React Query, SWR, Axios, auth, RBAC, redesign, backend changes and AI behavior avoided
- minimal Vite development proxy added for `/campaigns` to support local browser integration without backend changes

## Completed Backend V1 Fact Foundation

- Campaign Persistence API: completed
- Campaign Blockers API: completed
- Campaign Notes API: completed
- Campaign Decision Context API: completed
- Campaign Activities API: completed
- Campaign Handoffs API: completed
- Campaign Workspace Facts Endpoint: completed

## Completed Frontend Planning

- Frontend Workspace Integration Planning: completed
- Campaign Workspace API Client Plan: completed
- Campaign Workspace DTO Mapping Plan: completed
- Campaign Workspace Integration Validation Plan: completed
- Frontend API Patterns: completed

## Current Implementation Status

- Campaign Workspace Frontend Integration: implemented for CampaignDetails only

## Still Deferred

- dashboard backend integration
- kanban backend integration
- calendar backend integration
- campaign list backend integration
- backend-connected workspace writes
- global frontend mock replacement
- backend writes from workspace actions
- authentication implementation
- authorization
- RBAC
- React Query
- SWR
- Axios
- command center backend logic
- timeline generation backend
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
