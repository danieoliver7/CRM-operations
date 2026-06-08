# Database Environment Rules

## Purpose

This document defines environment and database connection rules for the Prisma And Database Foundation sprint.

It exists to prevent secrets, environment drift and premature infrastructure complexity.

---

# Environment Philosophy

Database configuration should be explicit, local-development friendly and safe.

Do not commit secrets.

Do not hardcode credentials.

Do not introduce production infrastructure decisions in this sprint.

---

# Local Environment

Local validation may use:

```txt
backend/.env
```

This file is ignored by git and must not be committed.

---

# Committed Environment Example

The repository may include:

```txt
backend/.env.example
```

Expected placeholder:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

No real credentials should appear in committed files.

---

# Prisma 7 Configuration

Prisma 7 reads the datasource URL through:

```txt
backend/prisma.config.ts
```

The schema keeps only the provider:

```prisma
datasource db {
  provider = "postgresql"
}
```

This is intentional for the installed Prisma version.

---

# Validation Note

During this sprint, the local database URL reached PostgreSQL but failed authentication.

Migration and seed application require a valid local `DATABASE_URL`.

Do not solve this by committing credentials.
