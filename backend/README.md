# CRM Operations Backend

Minimal NestJS backend foundation for CRM Operations Platform.

This backend currently contains runtime infrastructure, Prisma persistence foundation, read-only reference data APIs, basic Campaign persistence APIs, campaign-scoped Blockers APIs, campaign-scoped Notes APIs and campaign-scoped Decision Context APIs.

## What Exists

- Minimal NestJS app.
- `GET /health` endpoint returning a simple status payload.
- TypeScript build configuration.
- Prisma 7 setup.
- PostgreSQL datasource configured through `prisma.config.ts`.
- First Prisma schema.
- First migration SQL.
- Safe reference seed script.
- Minimal PrismaService/PrismaModule for future use.
- Read-only Workspaces API.
- Read-only Users API.
- Read-only Squads API.
- Basic Campaign persistence API.
- Campaign Blockers API.
- Campaign Notes API.
- Campaign Decision Context API.

## What Does Not Exist Yet

- Campaign Workspace endpoint.
- Non-blocker/non-note/non-decision-context Campaign child resource APIs.
- Automatic activity, timeline, handoff, note or decision context creation.
- Write APIs for reference data.
- Authentication.
- Docker or deployment infrastructure.
- Frontend integration.

## Environment

Create a local `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Then set a valid local PostgreSQL URL:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Do not commit `.env`.

## Install

```bash
npm install
```

## Run

```bash
npm run start:dev
```

The backend listens on port `4000` by default.

Health check:

```txt
GET http://localhost:4000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "crm-operations-backend"
}
```

Reference data endpoints:

```txt
GET http://localhost:4000/workspaces
GET http://localhost:4000/workspaces/:workspaceId
GET http://localhost:4000/users
GET http://localhost:4000/users/:userId
GET http://localhost:4000/squads
GET http://localhost:4000/squads/:squadId
```

Campaign persistence endpoints:

```txt
GET http://localhost:4000/campaigns
GET http://localhost:4000/campaigns/:campaignId
POST http://localhost:4000/campaigns
PATCH http://localhost:4000/campaigns/:campaignId
PATCH http://localhost:4000/campaigns/:campaignId/status
PATCH http://localhost:4000/campaigns/:campaignId/priority
PATCH http://localhost:4000/campaigns/:campaignId/owner
PATCH http://localhost:4000/campaigns/:campaignId/squad
```

Campaign Blockers endpoints:

```txt
GET http://localhost:4000/campaigns/:campaignId/blockers
POST http://localhost:4000/campaigns/:campaignId/blockers
PATCH http://localhost:4000/campaigns/:campaignId/blockers/:blockerId
POST http://localhost:4000/campaigns/:campaignId/blockers/:blockerId/resolve
```

Campaign Notes endpoints:

```txt
GET http://localhost:4000/campaigns/:campaignId/notes
POST http://localhost:4000/campaigns/:campaignId/notes
PATCH http://localhost:4000/campaigns/:campaignId/notes/:noteId
```

Campaign Decision Context endpoints:

```txt
GET http://localhost:4000/campaigns/:campaignId/decision-context
POST http://localhost:4000/campaigns/:campaignId/decision-context
PATCH http://localhost:4000/campaigns/:campaignId/decision-context/:decisionContextId
```

List responses use:

```json
{
  "data": []
}
```

Detail responses use:

```json
{
  "data": {}
}
```

Not-found responses use:

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found."
  }
}
```

## Validate

```bash
npm run prisma:format
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run test
npm run build
```

With valid local database credentials:

```bash
npx prisma migrate dev
npm run prisma:seed
```

## Next Cut

The next backend cut should likely be Campaign Activities Implementation, if approved.

It should not introduce auth, Docker, realtime, workflow engines or frontend integration unless explicitly approved.
