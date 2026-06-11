# Campaign Persistence Implementation

## Purpose

This document records the Campaign Persistence Implementation sprint.

This sprint implements basic Campaign persistence APIs.

It does not implement Campaign Workspace, campaign child resources, frontend integration or auth.

---

# Current Phase

Campaign Persistence Implementation

The backend already has:

- NestJS runtime
- `GET /health`
- Prisma and PostgreSQL foundation
- PrismaService and PrismaModule
- safe reference seed
- Reference Data APIs for workspaces, users and squads

This sprint adds basic Campaign persistence on top of that foundation.

---

# Implemented Scope

Implemented:

- CampaignsModule
- CampaignsController
- CampaignsService
- CampaignDto
- request parsing helpers
- response mapper
- DTO/request tests

Implemented endpoints:

```txt
GET /campaigns
GET /campaigns/:campaignId
POST /campaigns
PATCH /campaigns/:campaignId
PATCH /campaigns/:campaignId/status
PATCH /campaigns/:campaignId/priority
PATCH /campaigns/:campaignId/owner
PATCH /campaigns/:campaignId/squad
```

---

# Persistence Behavior

Campaign APIs persist and return Campaign facts only:

- workspaceId
- ownerId
- squadId
- name
- description
- objective
- status
- channel
- priority
- dueDate
- plannedDate
- campaignType
- audience
- segmentation
- tags
- content
- metricsTarget
- estimatedComplexity
- createdAt
- updatedAt

The API does not persist or return derived operational intelligence as backend truth.

---

# Reference Validation

Campaign writes validate references before persistence:

- `workspaceId` must reference an existing Workspace
- `ownerId` must reference an existing User when provided
- `squadId` must reference an existing Squad when provided
- `campaignId` must reference an existing Campaign before update

Expected error codes:

```txt
CAMPAIGN_NOT_FOUND
WORKSPACE_NOT_FOUND
USER_NOT_FOUND
SQUAD_NOT_FOUND
INVALID_CAMPAIGN_INPUT
```

Referenced records are not created automatically.

---

# Prisma Usage

CampaignsService uses PrismaService directly.

Allowed Prisma behavior in this cut:

- `findMany`
- `findUnique`
- `create`
- `update`
- simple `select`
- simple `orderBy`

No repository abstraction, unit of work, domain event bus, workflow runtime or orchestration layer was introduced.

---

# Explicit Non-Goals

This sprint did not implement:

- Campaign Workspace endpoint
- Campaign Activity API
- Blocker API
- Handoff API
- Notes API
- Decision Context API
- automatic activity creation
- timeline event creation
- handoff creation
- frontend API client
- auth
- Docker
- workflow engine
- event sourcing
- derived intelligence persistence

---

# Final Principle

Campaign persistence makes Campaign durable.

It does not make the backend responsible for Campaign Workspace intelligence yet.
