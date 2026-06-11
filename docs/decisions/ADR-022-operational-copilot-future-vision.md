# ADR-022: Operational Copilot As Future Vision Only

## Status

Accepted

---

# Context

CRM Operations Platform is evolving from a frontend-first operational workspace into a durable backend-supported CRM operations platform.

The project now has:

- Campaign persistence
- Reference Data APIs
- Prisma/PostgreSQL foundation
- Campaign child resources planning
- Campaign Blockers as the next child resource implementation

There is a future strategic vision for a CRM Operations Copilot.

This Copilot may eventually analyze operational history, campaign facts, blockers, handoffs, notes, decision context, activities, timeline, performance and external context to help CRM teams understand what works and what slows down execution.

---

# Decision

We will record CRM Operations Copilot as a future vision only.

It is not part of the MVP.

It is not part of the current backend implementation scope.

It must not trigger AI implementation now.

---

# Why

The Copilot may become strategically valuable later, but implementing AI too early would create overengineering and distract from the core product.

The current priority is still:

- Campaign persistence
- Campaign Workspace durability
- Blockers
- Notes
- Decision Context
- Activities
- Handoffs
- Campaign Workspace Facts Endpoint

The best way to support future AI now is not to implement AI.

The best way is to keep the domain and data model clean.

---

# What We Will Do Now

We will:

- persist operational facts cleanly
- structure campaign child resources with clear semantics
- preserve decision context
- preserve blockers
- preserve notes
- preserve activities
- preserve handoffs
- preserve timestamps and actor references where useful
- keep Campaign as the central operational aggregate
- avoid storing derived intelligence as primary backend truth
- document future AI considerations

---

# What We Will Not Do Now

We will not implement:

- embeddings
- vector database
- OpenAI API
- LLM provider
- RAG pipeline
- agent runtime
- prompt engine
- Copilot UI
- AI recommendations
- AI-generated campaign suggestions
- AI-generated copy
- semantic search
- autonomous actions
- internet-connected agent
- AI automation engine

---

# AI-Ready Definition

AI-ready means the backend stores clean operational facts that could be useful later.

AI-ready does not mean AI exists.

AI-ready means:

```txt
Persist facts.
Preserve context.
Keep semantics clear.
Avoid derived intelligence persistence.
Do not implement AI yet.
```

---

# Consequences

This decision allows future AI conversations to exist in the product vision without changing the current implementation scope.

Current backend work should continue focusing on durable operational facts and Campaign Workspace readiness.

AI features remain deferred until the product has enough reliable persisted history to justify them.

---

# Final Principle

Prepare the data foundation for future intelligence.

Do not implement intelligence before the operational product is durable.
