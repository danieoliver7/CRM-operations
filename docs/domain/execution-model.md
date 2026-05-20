# Execution Model

## Execution Philosophy

Execution intelligence exists to improve operational awareness.

The system should help teams understand:

- campaign health
- execution risk
- blockers
- workflow delays
- operational pressure

The system should NOT:

- automate execution
- replace operational judgment
- predict behavior through black-box systems
- become orchestration software

---

# Execution Health

Execution Health is derived from operational context.

Execution Health should remain:

- explainable
- lightweight
- operational
- contextual

Execution Health is NOT:

- predictive AI
- hidden scoring
- machine learning
- operational automation

---

# Execution Health Signals

Execution health derives from:

- workflow stage
- overdue state
- blockers
- SLA state
- priority
- missing operational context
- delayed execution stages

---

# Execution States

## healthy

Campaign execution is progressing normally.

## warning

Execution requires attention but is still operationally stable.

## at-risk

Execution contains operational instability or compression signals.

## blocked

Execution contains operational blockers preventing progress.

## overdue

Campaign execution exceeded expected operational timing.

---

# SLA Philosophy

SLA awareness exists to communicate operational timing.

SLA should remain:

- lightweight
- informational
- contextual
- operational

SLA should NOT become:

- enforcement engine
- escalation engine
- automation trigger
- enterprise workflow system

---

# SLA States

- on-track
- due-soon
- delayed
- overdue

---

# Blocker Philosophy

Blockers represent operational friction.

Blockers should:

- explain operational gaps
- communicate missing execution context
- guide resolution

Blockers should NOT:

- create ticket systems
- become incidents
- generate workflow complexity

---

# Risk Philosophy

Risk is NOT the same as blocker.

## Blocker

Something actively preventing execution.

## Risk

Something increasing operational instability.

---

# Operational Risk Signals

Risk may derive from:

- urgent + overdue
- workflow compression
- multiple blockers
- delayed QA
- delayed approval
- missing execution context

---

# Intelligence Philosophy

All execution intelligence should remain:

- derived
- visible
- explainable
- deterministic
- operational

Avoid:

- AI orchestration
- hidden operational logic
- predictive scoring
- machine learning abstraction

---

# Human-Centered Operations

The platform supports operators.

The platform does NOT replace operators.

The system communicates operational context.

Humans make operational decisions.

---

# Coordination Perception

Coordination perception extends execution intelligence by showing:
- who likely needs to act next
- which handoff is pending
- which workflow stage is waiting
- whether campaign continuity is clear
- whether ownership is missing

Coordination perception is derived from campaign status, owner, workflow context and execution signals.

It is NOT:
- orchestration
- automation
- task assignment
- dependency graph management

---

# Handoff Heuristics

Current handoff heuristics:
- briefing hands off to copy
- copy hands off to approval
- approval hands off to development
- development hands off to QA
- QA hands off to scheduling

These are UI signals only.

---

# Workflow Continuity Heuristics

Workflow continuity can be affected by:
- missing owner
- stalled workflow
- high-severity blocker
- overdue active campaign
- pending approval
- pending QA
- unclear next action

The goal is operational awareness, not workflow enforcement.
