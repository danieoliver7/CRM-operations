# ADR-023: Campaign Notes Implementation

## Status

Accepted

---

# Context

CRM Operations Platform has completed:

- Backend Skeleton Implementation
- Prisma And Database Foundation
- Reference Data Implementation
- Campaign Persistence Implementation
- Campaign Child Resources Planning
- Campaign Blockers Implementation
- Operational Copilot Future Vision documentation

The backend now has:

- NestJS runtime
- Prisma/PostgreSQL
- Reference Data APIs
- Campaign Persistence APIs
- Campaign Blockers API

Campaign is durable and already has its first child resource: Blockers.

The approved child resource order places Campaign Notes after Campaign Blockers.

---

# Decision

We will implement Campaign Notes as the second Campaign child resource.

This sprint may implement:

- NotesModule
- NotesController
- NotesService
- Note DTOs
- Note request helpers
- Note response mapper
- Note validation tests

Allowed endpoints:

```txt
GET /campaigns/:campaignId/notes
POST /campaigns/:campaignId/notes
PATCH /campaigns/:campaignId/notes/:noteId
```

---

# Rationale

Notes are the smallest useful next child resource after Blockers because they preserve lightweight operational memory without requiring Decision Context, Activities, Handoffs or Campaign Workspace composition.

Notes can support future workspace durability and future operational memory while remaining simple persisted facts.

They should not become chat, threaded comments, realtime collaboration or AI behavior.

---

# Guardrails

Campaign Notes must:

- remain scoped under Campaign
- persist facts only
- validate Campaign existence
- validate author User reference when provided
- use simple REST-first response wrappers
- keep derived intelligence out of backend truth
- keep AI/Copilot as future vision only

Campaign Notes must not become:

- chat
- comments system
- threaded discussions
- mentions/reactions system
- realtime collaboration
- Decision Context
- activity generator
- timeline presentation backend
- AI summary or Copilot insight source of truth

---

# Consequences

After this decision:

- Notes can be persisted in PostgreSQL through Prisma.
- Campaign Workspace has its second durable child resource.
- Decision Context, Activities and Handoffs remain deferred.
- Campaign Workspace endpoint remains deferred until more child facts exist.
- Frontend integration remains deferred.
- AI/Copilot remains future vision only.

---

# Non-Decisions

This ADR does not approve:

- Decision Context API
- Activities API
- Handoffs API
- Campaign Workspace endpoint
- frontend API client
- auth
- Docker
- realtime
- chat/comment behavior
- replies
- threads
- mentions
- event sourcing
- workflow engine
- AI/Copilot implementation
- embeddings
- semantic search
