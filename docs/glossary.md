# Glossary

## Campaign
Operational CRM entity.

## Workflow
Operational progression of campaign execution.

## Workspace
Operational environment for campaign coordination.

## Squad
Operational group responsible for campaign execution.

## Operational Planning
Visualization and coordination of future operational workload.

## Capacity
Operational pressure or overload perception.

## Overload
High operational concentration in a stage, squad or time period.

## Execution Health
Derived perception of campaign execution quality.

## Blocker
Lightweight operational impediment affecting campaign execution.

## SLA
Operational timing expectation used for visibility, not enforcement.

## Operational Risk
Execution signal that may affect campaign delivery.

## Coordination Awareness
Derived perception of who or what needs to act next.

## Handoff
Lightweight operational transition between workflow stages or responsible areas.

## Workflow Continuity
Perception that a campaign has a clear next step, owner and handoff path.

## Waiting State
Operational pause where a campaign is waiting for a person, squad or validation step.

## Persisted Domain Data
Operational facts that may become backend records later.

## Derived Operational Intelligence
Operational awareness recalculated from persisted facts, such as health, risk, pressure and continuity.

## UI-Only State
Temporary interface state such as modal visibility, filters, tabs and form drafts.

## Backend Readiness
Domain preparation for future backend work without implementing backend infrastructure now.

## Backend Foundation Planning
Documentation phase that defines persistence boundaries, entity relationships, API boundaries and backend risks before technical design.

## Backend Foundation Design
Documentation phase that turns backend planning into architecture direction, module boundaries, schema guidelines, implementation sequence and stack candidates without creating backend code.

## Backend Foundation Architecture Review
Documentation phase that challenges backend assumptions, validates boundaries and records implementation risks before backend code begins.

## Architecture Risk
Known weakness or uncertainty that could force redesign if ignored during future backend implementation.

## Backend MVP Definition
Documentation phase that defines the smallest useful backend scope before any backend implementation begins.

## Backend MVP
Minimal persistence layer for Campaign Workspace durability, scoped to operational facts rather than full SaaS infrastructure.

## Single Default Workspace
Backend MVP assumption where the system remains workspace-compatible while running with one default workspace and no full tenant runtime.

## Backend Stack Decision
Documentation phase that approves Backend V1 stack direction without creating backend implementation.

## Backend V1 Stack
Approved stack direction for the first backend: NestJS, Prisma, PostgreSQL, REST-first API and modular monolith.

## Frontend Backend Contract Preparation
Documentation phase that defines how future backend DTOs, frontend mappers, View Models and derived intelligence should relate before backend implementation begins.

## DTO
API transport shape returned by the backend. DTOs should expose persisted or reference facts, not UI presentation state.

## View Model
Frontend-facing shape prepared for components after DTO mapping and local derivation.

## API Response Shape
Contract planning shape that describes what future backend responses may contain without creating routes, OpenAPI specs or database schema.

## Campaign Workspace Contract
Contract for the operational facts required to make Campaign Workspace durable in Backend V1.

## UI Compatibility Field
Temporary frontend field that keeps the current mock UI working but should not automatically become backend schema.

## Backend Implementation Planning
Documentation phase that defines Backend V1 implementation cuts, module boundaries, schema direction, API order, workspace endpoint strategy and validation gates before backend code begins.

## Implementation Cut
Small planned slice of backend work used to keep implementation ordered and low risk.

## Composed Workspace Endpoint
Recommended Backend V1 read endpoint that returns the operational facts needed by Campaign Workspace in one response without returning derived intelligence as backend truth.

## Backend Skeleton Implementation
First backend runtime implementation phase. It creates a minimal NestJS backend foundation without Prisma, database, product APIs, auth or frontend integration.

## Health Endpoint
Minimal backend endpoint used only to validate that the backend skeleton can start and respond.

## Prisma And Database Foundation
Backend infrastructure phase that installs Prisma, defines the first schema, generates Prisma Client, creates migration SQL and prepares safe seed data without implementing product APIs.

## PrismaService
Minimal NestJS infrastructure provider for Prisma Client lifecycle. It must not contain product queries or repository behavior.

## Reference Data Implementation
Backend phase that exposes read-only workspace, user and squad reference facts through Prisma-backed REST APIs before Campaign backend behavior begins.

## Reference Data API
Read-only backend endpoint group for workspaces, users and squads. It supports future Campaign ownerId, squadId and workspaceId relationships without creating Campaign APIs yet.

## Campaign Persistence Implementation
Backend phase that exposes basic Campaign create, read and update APIs backed by Prisma/PostgreSQL without implementing Campaign Workspace behavior.

## Campaign Persistence API
REST endpoint group for persisted Campaign facts. It validates workspace, owner and squad references and keeps derived intelligence out of backend truth.

## Campaign Child Resources Planning
Documentation phase that validates campaign-scoped child resource order, API boundaries and guardrails before implementing Blockers, Notes, Decision Context, Activities or Handoffs.

## Campaign Workspace Facts Endpoint
Future composed read endpoint that should return persisted Campaign Workspace facts after child resources exist. It must not return derived intelligence, command center summaries or timeline presentation as backend truth.

## Modular Monolith
Likely first backend architecture direction where modules are clearly separated inside one deployable backend instead of distributed microservices.

## REST-First
Likely first API direction where resource-oriented endpoints expose persisted operational facts before orchestration or graph APIs are considered.

## Activity
Meaningful operational event related to campaign execution, coordination, planning or collaboration.

## Activity Model
Domain structure used to describe operational events without introducing event sourcing or audit log infrastructure.

## Operational Timeline
Workspace view that explains the campaign execution history through meaningful operational events.

## Timeline Event
Presentation model for a timeline item, including category, importance, message, actor and timestamp.

## Event Sourcing
Deferred architecture pattern that should not be implemented during the MVP.

## Decision Context
Operational reasoning that explains why something changed in campaign execution.

## Operational Memory
Lightweight campaign context that preserves decisions, rationale, risk notes, resolution notes and handoff notes.

## Resolution Note
Operational note explaining how a blocker, QA issue or execution friction was resolved.

## Handoff Note
Operational note explaining the context behind transition between workflow stages or responsible areas.
