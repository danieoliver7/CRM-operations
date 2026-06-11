# Campaign Notes Validation

## Purpose

This document defines validation rules for the Campaign Notes Implementation sprint.

It validates only Campaign Notes APIs.

It does not validate Decision Context, Activities, Handoffs, Campaign Workspace, chat/comment behavior, auth, frontend integration or AI/Copilot behavior.

---

# Validation Goal

Validate that campaign notes can be listed, created and updated through simple REST endpoints backed by Prisma/PostgreSQL.

The validation should prove that notes are durable campaign-scoped operational memory without becoming chat, comments, threads, realtime collaboration or AI behavior.

---

# Pre-Validation Requirements

Before testing endpoints, confirm:

- local `backend/.env` exists and is not committed
- `DATABASE_URL` points to local PostgreSQL
- migrations can be applied
- seed can be run
- reference users exist
- at least one Campaign exists or can be created
- existing health, reference data, Campaign and Blockers APIs still work

---

# Required Database Commands

Run from `/backend`:

```bash
npx prisma migrate dev
npm run prisma:seed
```

If migrations or seed are already applied, the commands should still complete safely.

---

# Required Backend Commands

Run from `/backend`:

```bash
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run test
npm run build
```

---

# Required Runtime Validation

Start the backend:

```bash
npm run start
```

Validate existing endpoints still work:

```txt
GET /health
GET /workspaces
GET /users
GET /squads
GET /campaigns
GET /campaigns/:campaignId
GET /campaigns/:campaignId/blockers
```

Validate Campaign Notes endpoints:

```txt
GET /campaigns/:campaignId/notes
POST /campaigns/:campaignId/notes
PATCH /campaigns/:campaignId/notes/:noteId
```

---

# Required Error Validation

Validate:

- invalid campaign id returns `CAMPAIGN_NOT_FOUND`
- invalid note id under a valid campaign returns `NOTE_NOT_FOUND`
- note from another campaign returns `NOTE_NOT_FOUND`
- invalid `authorId` returns `USER_NOT_FOUND`
- unsupported note fields return `INVALID_NOTE_INPUT`

---

# Response Validation

List responses must use:

```json
{
  "data": []
}
```

Detail responses must use:

```json
{
  "data": {}
}
```

Error responses must use:

```json
{
  "error": {
    "code": "NOTE_NOT_FOUND",
    "message": "Note not found."
  }
}
```

---

# Frontend Regression Validation

Run from `/frontend`:

```bash
npm run lint
npm run build
```

Frontend runtime code should remain unaffected by this sprint.

---

# Safety Checks

Confirm:

- `backend/.env` is not committed
- no real credentials are committed
- Prisma schema was not expanded with chat, comment, AI, Copilot or derived intelligence fields
- no Decision Context API was created
- no Activities API was created
- no Handoffs API was created
- no Campaign Workspace endpoint was created
- no frontend API client was created
- no auth was created
- no Docker setup was added
- no workflow engine behavior was introduced
- no event sourcing behavior was introduced
- no chat/comment behavior was introduced
- no AI/Copilot behavior was introduced
- no derived intelligence is persisted or returned as backend truth

---

# Final Principle

Campaign Notes validation should prove the backend can persist operational memory facts without expanding into collaboration, AI or the rest of Campaign Workspace backend behavior.
