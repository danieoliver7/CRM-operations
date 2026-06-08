# Database Seed Strategy

## Purpose

This document defines the seed strategy for the Prisma And Database Foundation sprint.

Seed data should support local validation without turning the database into a fake production dataset.

---

# Seed Scope

The seed script may create only safe reference data:

- one default organization
- one default workspace
- a few reference users
- a few reference squads

---

# Implemented Seed

Implemented file:

```txt
backend/prisma/seed.ts
```

The seed uses upserts to remain idempotent.

Running it more than once should not create duplicates.

---

# What Seed Must Not Include

Do not seed:

- auth users/passwords
- sessions
- RBAC roles
- billing records
- derived intelligence
- large fake campaign datasets
- workflow automation records
- dashboard summaries
- analytics data

Campaign seed data remains deferred.

---

# Current Seed Status

The seed script exists and is wired through Prisma.

It was not applied locally because the local database credentials failed authentication.

After fixing local `backend/.env`, run:

```bash
npm run prisma:seed
```

---

# Final Principle

Seed should make reference data available.

It should not pretend the product backend is implemented.
