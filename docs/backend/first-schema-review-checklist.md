# First Schema Review Checklist

## Purpose

This checklist must be used before approving the first backend schema.

It exists to prevent schema decisions that violate product principles.

---

# Campaign Aggregate Check

- [ ] Does Campaign remain the central operational aggregate?
- [ ] Are campaign child records campaign-scoped?
- [ ] Are commercial concerns kept outside Campaign?
- [ ] Are workflow concepts contextual instead of runtime-driven?

---

# Persistence Boundary Check

- [ ] Does the schema persist facts?
- [ ] Does the schema avoid persisting derived intelligence?
- [ ] Does the schema avoid UI-only state?
- [ ] Are execution health, risk and coordination state not stored as primary truth?
- [ ] Is timeline presentation not stored as primary truth?

---

# Workspace Scope Check

- [ ] Are campaigns workspace-compatible?
- [ ] Is workspaceId present where needed?
- [ ] Does the schema avoid full tenant runtime complexity?
- [ ] Does the schema avoid billing and advanced RBAC?

---

# Activity Check

- [ ] Are activities meaningful operational facts?
- [ ] Are UI events excluded?
- [ ] Is activity not used as event sourcing?
- [ ] Is Campaign state not reconstructed from activities?

---

# Decision Context Check

- [ ] Does Decision Context explain operational reasoning?
- [ ] Is it campaign-scoped?
- [ ] Does it avoid chat/thread semantics?
- [ ] Are replies and mentions excluded?

---

# Blocker Check

- [ ] Are blockers campaign-scoped?
- [ ] Do blockers avoid ticket-system semantics?
- [ ] Are blocker status and resolution facts clear?

---

# Handoff Check

- [ ] Are handoffs campaign-scoped?
- [ ] Do handoffs avoid dependency graph behavior?
- [ ] Are from/to stages and owners clear?

---

# JSON Usage Check

- [ ] Is JSON used only for bounded flexible metadata?
- [ ] Are important queryable facts stored as explicit fields?
- [ ] Is JSON not used as a dumping ground?

---

# Timestamp Check

- [ ] Do core entities have createdAt and updatedAt?
- [ ] Do resolved/completed/captured records have appropriate timestamps?
- [ ] Are timestamp meanings consistent?

---

# API Alignment Check

- [ ] Does schema support narrow Backend MVP APIs?
- [ ] Does schema avoid derived intelligence endpoints?
- [ ] Does schema support Campaign Workspace durability?

---

# Optional Scope Check

- [ ] If attachment metadata is included, is file storage still deferred?
- [ ] If campaign metrics are included, is analytics warehouse still deferred?
- [ ] Are optional entities justified by Campaign Workspace durability?

---

# Auth And SaaS Boundary Check

- [ ] Is auth timing documented based on deployment target?
- [ ] Does schema avoid provider-specific auth lock-in?
- [ ] Does schema avoid enterprise RBAC?
- [ ] Does schema support single default workspace without full tenant runtime?

---

# Final Approval Question

Can this schema support the Campaign Workspace without turning the backend into:

- project management
- workflow engine
- event sourcing
- analytics warehouse
- enterprise SaaS admin platform

If not, reject the schema.
