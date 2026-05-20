# Architecture

## Current Position

CRM Operations Platform remains frontend-first.

The current architecture is:

```txt
frontend/src/types/domain
  -> frontend/src/modules
  -> frontend/src/stores/campaigns.store.ts
  -> derived operational utilities
  -> pages/components
```

## Domain Readiness

The frontend now has a lightweight domain type layer prepared for future backend implementation.

This layer defines product-domain concepts only.

It does NOT introduce:

- backend
- database
- API routes
- authentication
- persistence
- workflow orchestration

## State Boundary

Zustand remains responsible only for shared operational state.

Derived operational intelligence remains in utility functions.

UI-only state remains local to components/hooks unless it is truly shared navigation state.
