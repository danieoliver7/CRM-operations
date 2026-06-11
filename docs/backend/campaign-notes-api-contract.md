# Campaign Notes API Contract

## Purpose

This document defines the API contract for Campaign Notes Implementation.

It covers only Campaign Notes.

It does not cover Decision Context, Activities, Handoffs, Campaign Workspace, chat/comment behavior or AI/Copilot behavior.

---

# Contract Philosophy

Notes APIs expose campaign-scoped operational memory facts.

They should be:

- simple
- REST-first
- Prisma-backed
- campaign-scoped
- operationally meaningful
- frontend-contract compatible
- useful for future operational memory

They should not expose chat, comments, threads, mentions, AI output or derived intelligence as backend truth.

---

# Standard Responses

List response:

```ts
type ListResponse<T> = {
  data: T[];
};
```

Detail response:

```ts
type DetailResponse<T> = {
  data: T;
};
```

Error response:

```ts
type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};
```

---

# CampaignNoteDto

```ts
type CampaignNoteDto = {
  id: string;
  campaignId: string;
  authorId: string | null;
  type: CampaignNoteType;
  body: string;
  createdAt: string;
  updatedAt: string;
};
```

The DTO uses API-facing `authorId` and `body` names while the database keeps `authorUserId` and `content`.

The DTO must not include:

- replies
- mentions
- reactions
- thread state
- chat state
- realtime state
- executionHealth
- slaState
- operationalRisk
- coordinationState
- workflowContinuity
- commandCenterSummary
- timelinePresentation
- AI summary
- AI recommendation
- Copilot insight

---

# Create Campaign Note Request

```ts
type CreateCampaignNoteRequest = {
  type: CampaignNoteType;
  body: string;
  authorId?: string | null;
};
```

Rules:

- `campaignId` comes from the route
- `type` is required
- `body` is required
- `authorId` must reference an existing User when provided
- note is created under the route Campaign

---

# Update Campaign Note Request

```ts
type UpdateCampaignNoteRequest = Partial<{
  type: CampaignNoteType;
  body: string;
}>;
```

Rules:

- Campaign must exist
- Note must exist under the route Campaign
- `campaignId` cannot be updated
- `authorId` cannot be updated
- `authorUserId` cannot be updated
- `createdAt` cannot be updated directly
- `updatedAt` cannot be updated directly
- raw database `content` cannot be used as an API field

---

# Implemented Endpoints

```txt
GET /campaigns/:campaignId/notes
POST /campaigns/:campaignId/notes
PATCH /campaigns/:campaignId/notes/:noteId
```

No global note endpoints are part of this contract.

No other Campaign child resource endpoint is part of this contract.

---

# Error Codes

```txt
CAMPAIGN_NOT_FOUND
NOTE_NOT_FOUND
USER_NOT_FOUND
INVALID_NOTE_INPUT
```

Example:

```json
{
  "error": {
    "code": "NOTE_NOT_FOUND",
    "message": "Note not found."
  }
}
```

---

# Final Principle

Expose campaign-scoped note facts.

Do not expose chat, comments, collaboration runtime, AI output, orchestration or derived intelligence as API truth.
