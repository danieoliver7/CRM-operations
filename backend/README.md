# CRM Operations Backend

Minimal NestJS backend skeleton for CRM Operations Platform.

This backend exists only to validate the first runtime foundation. It does not implement product backend behavior yet.

## What Exists

- Minimal NestJS app.
- `GET /health` endpoint returning a simple status payload.
- TypeScript build configuration.
- Backend package scripts for build, start, lint and test.

## What Does Not Exist Yet

- Prisma.
- Database connection.
- `schema.prisma`.
- Migrations.
- Product APIs.
- Authentication.
- Docker or deployment infrastructure.
- Frontend integration.

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
npm run lint
npm run test
npm run build
```

## Next Cut

The next backend cut should be Prisma and database foundation only after the first schema plan is reviewed again.
