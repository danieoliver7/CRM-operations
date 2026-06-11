# Campaign Notes Implementation

## Purpose

This document records the Campaign Notes Implementation sprint.

This sprint implements the second Campaign child resource.

It introduces campaign-scoped notes as persisted operational memory.

It does not implement Decision Context, Activities, Handoffs or Campaign Workspace endpoint.

It does not implement frontend integration, auth, chat/comment behavior or AI/Copilot behavior.

---

# Current Phase

Campaign Notes Implementation

The project already has:

- NestJS backend runtime
- Prisma/PostgreSQL persistence foundation
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API
- Campaign Child Resources Planning validated
- Operational Copilot future vision documented as non-MVP scope

This backend cut implements campaign-scoped notes.

---

# Implemented Scope

Implemented:

- NotesModule
- NotesController
- NotesService
- CampaignNoteDto
- request parsing helpers
- response mapper
- DTO/request tests

Implemented endpoints:

```txt
GET /campaigns/:campaignId/notes
POST /campaigns/:campaignId/notes
PATCH /campaigns/:campaignId/notes/:noteId
```

---

# Persistence Behavior

Note APIs persist and return lightweight note facts only:

- id
- campaignId
- authorId
- type
- body
- createdAt
- updatedAt

The API maps:

```txt
authorId -> authorUserId
body -> content
```

No Prisma schema change was required.

---

# Validation Behavior

Note operations validate:

- Campaign exists
- Note exists and belongs to the route campaign
- `authorId` exists when provided

Expected error codes:

```txt
CAMPAIGN_NOT_FOUND
NOTE_NOT_FOUND
USER_NOT_FOUND
INVALID_NOTE_INPUT
```

---

# Update Behavior

Update is a simple fact update.

Allowed update fields:

- type
- body

Update does not allow changing:

- campaignId
- authorId
- authorUserId
- createdAt
- updatedAt
- raw database `content`
- chat/comment metadata
- AI/Copilot metadata

---

# Explicit Non-Goals

This sprint did not implement:

- Decision Context API
- Activities API
- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- auth
- RBAC
- Docker
- event sourcing
- workflow engine
- chat system
- comments system
- replies
- threads
- mentions
- reactions
- realtime collaboration
- AI/Copilot behavior
- embeddings
- semantic search
- derived intelligence persistence

---

# Final Principle

Notes are campaign-scoped operational memory.

They are not chat, comments, Decision Context or AI behavior.
