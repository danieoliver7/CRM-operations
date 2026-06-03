# API Response Shapes

## Purpose

This document defines suggested API response shapes for Backend V1 contract planning.

These shapes are not implemented routes, final OpenAPI specs, Prisma models, or database schemas.

---

# Response Philosophy

Backend responses should be:

- predictable
- resource-oriented
- campaign-centered
- frontend-friendly
- safe for derived intelligence

Backend responses should expose operational facts. The frontend should map and derive presentation-ready intelligence.

---

# Standard List Response

Recommended list response shape:

```ts
type ListResponse<T> = {
  data: T[];
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
};
```

For Backend MVP, pagination metadata may remain optional if data volume is still small.

---

# Standard Item Response

Recommended item response shape:

```ts
type ItemResponse<T> = {
  data: T;
};
```

This keeps responses consistent without forcing an enterprise envelope too early.

---

# Error Response Direction

Future errors should be machine-readable and easy for the frontend to convert into operational messages.

```ts
type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
};
```

Errors should not leak framework internals. Empty resource arrays are not errors.

---

# CampaignDto

```ts
type CampaignDto = {
  id: string;
  workspaceId: string;
  ownerId?: string;
  squadId?: string;
  name: string;
  description?: string;
  objective?: string;
  status: CampaignStatus;
  channel: CampaignChannel;
  priority: CampaignPriority;
  dueDate: string;
  plannedDate?: string;
  campaignType?: string;
  audience?: string;
  segmentation?: string;
  tags?: string[];
  content?: {
    subject?: string;
    preheader?: string;
    cta?: string;
  };
  metricsTarget?: {
    expectedKpi?: string;
  };
  estimatedComplexity?: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
};
```

CampaignDto carries campaign facts. It should not include `progress`, `sla`, `executionHealth`, `operationalRisk`, or command center summaries.

---

# UserDto

```ts
type UserDto = {
  id: string;
  name: string;
  avatarUrl?: string;
  roleLabel?: string;
};
```

UserDto is reference data for ownership display. It does not imply authentication, sessions, permissions, or RBAC.

---

# SquadDto

```ts
type SquadDto = {
  id: string;
  name: string;
  description?: string;
};
```

Squad pressure remains derived from campaigns and workload facts.

---

# CampaignActivityDto

```ts
type CampaignActivityDto = {
  id: string;
  campaignId: string;
  actorUserId?: string;
  type: string;
  category?: 'workflow' | 'coordination' | 'execution' | 'planning' | 'collaboration';
  message: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};
```

Activities are meaningful operational records. They should not become event sourcing or a full audit log.

---

# BlockerDto

```ts
type BlockerDto = {
  id: string;
  campaignId: string;
  title: string;
  description?: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'resolved';
  createdByUserId?: string;
  resolvedByUserId?: string;
  resolvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};
```

Blockers are lightweight operational impediments. They should not become tickets.

---

# HandoffDto

```ts
type HandoffDto = {
  id: string;
  campaignId: string;
  fromStatus?: CampaignStatus;
  toStatus?: CampaignStatus;
  fromOwnerId?: string;
  toOwnerId?: string;
  fromSquadId?: string;
  toSquadId?: string;
  status: 'pending' | 'completed' | 'canceled';
  reason?: string;
  completedAt?: string;
  canceledAt?: string;
  createdAt?: string;
  updatedAt?: string;
};
```

Handoffs are coordination facts. They should not become dependency graph runtime.

---

# CampaignNoteDto

```ts
type CampaignNoteDto = {
  id: string;
  campaignId: string;
  authorUserId?: string;
  type?: 'note' | 'decision' | 'rationale' | 'clarification' | 'risk-note' | 'resolution-note' | 'handoff-note';
  title?: string;
  content: string;
  relatedWorkflowStage?: CampaignStatus;
  relatedBlockerId?: string;
  relatedHandoffId?: string;
  relatedActivityId?: string;
  importance?: 'low' | 'normal' | 'high';
  createdAt?: string;
  updatedAt?: string;
};
```

Notes preserve operational memory. They should not become chat, replies, or threaded comments.

---

# DecisionContextDto

```ts
type DecisionContextDto = {
  id: string;
  campaignId: string;
  authorUserId?: string;
  type: 'decision' | 'rationale' | 'clarification' | 'risk-note' | 'resolution-note' | 'handoff-note';
  title: string;
  content: string;
  relatedWorkflowStage?: CampaignStatus;
  relatedBlockerId?: string;
  relatedHandoffId?: string;
  relatedActivityId?: string;
  importance: 'low' | 'normal' | 'high';
  createdAt?: string;
  updatedAt?: string;
};
```

Decision Context explains why execution changed. It is not a comment system.

---

# CampaignWorkspaceResponseDto

```ts
type CampaignWorkspaceResponseDto = {
  campaign: CampaignDto;
  owner?: UserDto;
  squad?: SquadDto;
  activities: CampaignActivityDto[];
  blockers: BlockerDto[];
  handoffs: HandoffDto[];
  notes: CampaignNoteDto[];
  decisionContext: DecisionContextDto[];
};
```

This composed response is sufficient for Backend V1 contract planning if the implementation starts with Campaign Workspace durability.

It provides facts needed to render the workspace while leaving derived intelligence in frontend utilities.

---

# Response Shapes To Avoid In Backend V1

Avoid response shapes such as:

```ts
type CampaignCommandCenterResponseDto = {
  executionHealth: string;
  operationalRisk: string;
  coordinationState: string;
  workflowContinuity: string;
  summary: string;
};
```

These values should be derived from campaign facts, blockers, handoffs, notes, activities and dates.
