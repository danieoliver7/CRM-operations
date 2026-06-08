# Backend Skeleton Project Structure

## Purpose

This document records the backend skeleton project structure.

It guides future backend work without implying that Backend V1 product modules already exist.

---

# Implemented Structure

Current backend skeleton:

```txt
backend/
  src/
    app.module.ts
    main.ts
    health/
      health.controller.ts
      health.module.ts
      health.response.ts
  test/
    health-response.test.ts
  package.json
  package-lock.json
  tsconfig.json
  tsconfig.build.json
  nest-cli.json
  README.md
```

Generated and ignored locally:

```txt
backend/dist/
backend/node_modules/
```

---

# Structure Rules

The backend skeleton may contain only:

- app bootstrap
- root app module
- health validation structure
- TypeScript/Nest configuration
- package scripts
- backend README
- minimal tests

---

# Product Modules Not Yet Created

Do not create these modules until their implementation cuts are approved:

```txt
backend/src/modules/campaigns
backend/src/modules/users
backend/src/modules/squads
backend/src/modules/workspaces
backend/src/modules/activities
backend/src/modules/blockers
backend/src/modules/handoffs
backend/src/modules/notes
backend/src/modules/decision-context
```

---

# Why No Product Modules Yet

Backend Skeleton Implementation validates runtime foundation only.

Product modules belong to later cuts:

```txt
Reference Data
Campaign Persistence
Campaign Workspace Facts
```

Creating them now would make the skeleton look more complete than it really is.

---

# Final Rule

The backend folder now exists, but the product backend does not exist yet.
