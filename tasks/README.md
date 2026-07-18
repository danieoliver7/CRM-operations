# Development Tasks

This directory contains executable development contracts for Codex and other development agents.

## Directory Structure

```text
tasks/
|-- README.md
|-- TASK_TEMPLATE.md
|-- backlog/
|-- active/
`-- done/
```

## Task Lifecycle

Tasks move through:

```text
backlog -> active -> review -> done
```

### Status Values

Use only:

- Draft
- Blocked
- Ready
- In Progress
- Review
- Done

### Directory Meaning

#### backlog

Contains approved ideas and planned work that are not currently being implemented.

A backlog task may have status `Draft`, `Blocked` or `Ready`.

#### active

Contains the task currently being implemented or reviewed.

Normally, only one implementation task should be active at a time. Separate investigation-only tasks may run in parallel when they cannot modify the same files or architectural decisions.

#### done

Contains completed tasks with execution evidence. Completed tasks must not be rewritten to describe behavior that was not actually delivered.

### File Naming

Use:

`TASK-XXX-short-kebab-case-title.md`

### Definition of Ready

A task may receive `Status: Ready` only when:

- the problem is clearly described;
- current behavior is known;
- expected behavior is observable;
- data source is declared;
- scope is defined;
- non-goals are defined;
- acceptance criteria are verifiable;
- validation commands are defined;
- architectural rules are referenced;
- no material product decision is missing.

### Definition of Done

A task may receive `Status: Done` only when:

- acceptance criteria are satisfied;
- required validation passes;
- manual validation is recorded;
- unrelated changes are removed;
- required documentation is updated;
- execution evidence is complete;
- remaining limitations are documented.

### Scope Changes

An implementation agent must not silently expand the task. When a new requirement is discovered, stop if it materially affects the current task, document the discovery, create a separate follow-up task and do not implement it without approval.

### Moving Tasks

When implementation begins, move the task from `tasks/backlog/` to `tasks/active/`. After validation and review, move it from `tasks/active/` to `tasks/done/`.

### Agent Responsibilities

The project management agent defines the problem, objective, expected behavior, scope, non-goals, acceptance criteria, product decisions and data-source direction.

The development agent defines the smallest safe implementation, internal file changes, implementation details, tests and technical corrections after inspection.
