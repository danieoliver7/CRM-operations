# Operational Risks

## Risk Philosophy

Operational risks exist to expose campaigns that may fail operationally.

The goal is awareness, not prediction.

---

# Risk Signals

Examples:
- urgent + overdue
- overloaded QA
- overloaded owner
- delayed approval
- too many campaigns scheduled
- missing operational steps

---

# Important

Risk indicators should:
- remain understandable
- remain explainable
- avoid fake intelligence

Avoid:
- AI risk scoring
- predictive systems
- hidden heuristics

---

# UX Philosophy

Risks should:
- guide
- prioritize
- inform

Risks should NOT:
- overwhelm
- pollute
- dominate the UI

---

# Risk Hierarchy

Risk levels should stay operational and simple:
- watch: requires attention
- at-risk: campaign execution may be affected
- blocked: execution is actively blocked by a high-severity signal

# Current Risk Heuristics

Risk can be derived from:
- urgent + overdue
- urgent + high-severity blocker
- QA close to due date
- approval close to due date
- multiple blockers

# Operational Risk Examples

Correct:
- urgent campaign is overdue
- QA window is compressed
- approval delay may compress development and QA

Avoid:
- AI predicts failure
- probabilistic delivery score
- hidden risk scoring
