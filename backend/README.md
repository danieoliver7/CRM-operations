# CRM Operations Backend

Minimal NestJS backend foundation for CRM Operations Platform.

This backend currently contains runtime and persistence infrastructure only. It does not implement CRM Operations product APIs yet.

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

## What Does Not Exist Yet

- Product APIs.
- Campaign persistence controllers/services.
- User/Squad/Workspace APIs.
- Campaign Workspace endpoint.
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

The next backend cut should be Reference Data Implementation.

It should not introduce product APIs beyond the approved cut.
