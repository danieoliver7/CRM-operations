# Execution Health

## Execution Health Philosophy

Execution health exists to help teams understand:
- operational risk
- delays
- blockers
- unhealthy workflow execution
- overdue operational states

The goal is operational visibility, NOT automation.

---

# Health States

- healthy
- warning
- at-risk
- blocked
- overdue

---

# Health Indicators

Examples:
- overdue campaign
- overdue QA
- overdue approval
- blocked workflow
- urgent + delayed
- missing owner
- missing due date

---

# Current Heuristics

Execution health is derived from campaign fields:
- due date
- status
- priority
- owner
- audience or segmentation
- content readiness

Current health hierarchy:
- healthy: no relevant execution signal
- warning: due soon or light operational gap
- at-risk: risk signal that may affect execution
- blocked: high-severity blocker is present
- overdue: active campaign is past due date

Examples:
- QA overdue by 2 days
- urgent campaign blocked by missing assets
- approval delayed near due date
- campaign missing owner
- email campaign missing subject or preheader

Overdue and blocker signals should be explicit. Do not hide them behind abstract scores.

---

# Important

Execution health should remain:
- lightweight
- operational
- explainable
- visual

Avoid:
- AI predictions
- scoring systems
- complex algorithms
- fake precision

---

# UX Philosophy

Health indicators should:
- guide
- prioritize
- expose risk

Health indicators should NOT:
- overwhelm
- create alert fatigue
- dominate the interface
