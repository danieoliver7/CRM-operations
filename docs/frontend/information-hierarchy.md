# Information Hierarchy

## Operational UI Philosophy

Operational interfaces should guide attention intentionally.

The interface should communicate:

- what matters now
- what needs attention
- what creates operational risk
- what blocks execution

Without overwhelming operators.

---

# Attention Hierarchy

## Highest Priority

### Workflow Stage

Operators must immediately understand:

- where execution currently is
- what stage is active
- what operational state exists

---

## High Priority

### Blockers

Blockers should:

- appear near operational context
- communicate concrete friction
- remain compact and contextual

---

## High Priority

### Overdue State

Overdue indicators should:

- communicate timing clearly
- remain contextual
- avoid aggressive escalation visuals

---

## Medium Priority

### Operational Risks

Risk indicators should:

- support prioritization
- guide operational awareness
- communicate instability

Risk should NOT dominate the interface.

---

## Medium Priority

### SLA Awareness

SLA awareness should:

- provide timing context
- remain lightweight
- support execution visibility

---

## Lower Priority

### Metadata

Examples:

- tags
- campaign type
- secondary labels
- supporting attributes

---

# Visual Noise Rules

Operational interfaces should avoid:

- excessive red
- excessive warnings
- badge pollution
- decorative alerts
- unnecessary animations
- enterprise visual overload

---

# Dashboard Philosophy

Dashboards should:

- guide operational action
- summarize operational state
- communicate execution awareness

Dashboards should NOT:

- become BI systems
- become analytics overload
- display vanity metrics

---

# Workspace Philosophy

Workspaces should prioritize:

1. operational context
2. workflow execution
3. blockers
4. risks
5. guidance
6. collaboration visibility

Before:

- analytics
- metadata
- secondary information

---

# Warning Philosophy

Warnings should:

- remain actionable
- remain contextual
- explain operational meaning
- support prioritization

Warnings should NOT:

- create panic
- dominate screens
- appear without explanation
- become decorative UI

---

# Operational Clarity

Every screen should answer:

- what is happening?
- what needs attention?
- what is blocked?
- what is at risk?
- what should happen next?

As quickly as possible.

---

# Coordination Priority Hierarchy

Coordination signals should appear after blockers and overdue state, but before secondary metadata.

Priority order:
1. workflow stage
2. blockers and overdue state
3. coordination waiting state
4. pending handoff
5. next responsible area
6. SLA and risk context
7. supporting metadata

---

# Handoff Attention Rules

Handoff indicators should be emphasized when:
- campaign is in copy, approval, development or QA
- workflow is waiting action
- owner is missing
- campaign is stalled or blocked

Handoff indicators should remain compact on Kanban cards.

---

# Waiting State Visibility Rules

Waiting states should:
- name who or what is being waited on
- explain why the action matters
- be close to next-action UI

Waiting states should not:
- become task cards
- create alert noise
- use vague warning language
