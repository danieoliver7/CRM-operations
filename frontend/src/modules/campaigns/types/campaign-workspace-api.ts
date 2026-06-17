import type {
  CampaignChannel,
  CampaignComplexity,
  CampaignPriority,
  CampaignStatus,
} from '@/types/campaign';

export type DetailResponse<TData> = {
  data: TData;
};

export type ApiErrorResponse = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

export type JsonRecord = Record<string, unknown>;

export type CampaignDto = {
  id: string;
  workspaceId: string;
  ownerId: string | null;
  squadId: string | null;
  name: string;
  description: string | null;
  objective: string | null;
  status: CampaignStatus;
  channel: CampaignChannel;
  priority: CampaignPriority;
  dueDate: string;
  plannedDate: string | null;
  campaignType: string | null;
  audience: string | null;
  segmentation: string | null;
  tags: string[];
  content: unknown;
  metricsTarget: unknown;
  estimatedComplexity: CampaignComplexity | null;
  createdAt: string;
  updatedAt: string;
};

export type UserDto = {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  roleLabel?: string;
  createdAt: string;
  updatedAt: string;
};

export type SquadDto = {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type CampaignActivityType =
  | 'campaign_created'
  | 'status_changed'
  | 'priority_changed'
  | 'owner_changed'
  | 'blocker_created'
  | 'blocker_resolved'
  | 'handoff_started'
  | 'handoff_completed'
  | 'note_added'
  | 'decision_recorded'
  | 'risk_note_added'
  | 'resolution_note_added'
  | 'handoff_note_added'
  | 'due_date_changed'
  | 'execution_risk_detected'
  | 'sla_due_soon'
  | 'campaign_overdue'
  | 'workflow_stalled';

export type CampaignActivityCategory =
  | 'workflow'
  | 'coordination'
  | 'execution'
  | 'planning'
  | 'collaboration';

export type CampaignActivityDto = {
  id: string;
  campaignId: string;
  actorId: string | null;
  type: CampaignActivityType;
  category: CampaignActivityCategory | null;
  message: string;
  metadata: JsonRecord | null;
  relatedBlockerId: string | null;
  relatedNoteId: string | null;
  relatedDecisionContextId: string | null;
  relatedHandoffId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlockerSeverity = 'low' | 'medium' | 'high';
export type BlockerStatus = 'open' | 'resolved';

export type CampaignBlockerDto = {
  id: string;
  campaignId: string;
  createdById: string | null;
  resolvedById: string | null;
  title: string;
  description: string | null;
  severity: BlockerSeverity;
  status: BlockerStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
};

export type CampaignNoteType =
  | 'note'
  | 'decision'
  | 'rationale'
  | 'clarification'
  | 'risk_note'
  | 'resolution_note'
  | 'handoff_note';

export type CampaignNoteDto = {
  id: string;
  campaignId: string;
  authorId: string | null;
  type: CampaignNoteType;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type CampaignDecisionContextDto = {
  id: string;
  campaignId: string;
  authorId: string | null;
  type: CampaignNoteType;
  title: string;
  body: string;
  relatedWorkflowStage: CampaignStatus | null;
  relatedBlockerId: string | null;
  relatedActivityId: string | null;
  relatedHandoffId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type HandoffStatus = 'pending' | 'completed' | 'cancelled';

export type CampaignHandoffDto = {
  id: string;
  campaignId: string;
  status: HandoffStatus;
  fromStage: CampaignStatus | null;
  toStage: CampaignStatus | null;
  fromOwnerId: string | null;
  toOwnerId: string | null;
  fromSquadId: string | null;
  toSquadId: string | null;
  reason: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CampaignWorkspaceFactsDto = {
  campaign: CampaignDto;
  owner: UserDto | null;
  squad: SquadDto | null;
  blockers: CampaignBlockerDto[];
  notes: CampaignNoteDto[];
  decisionContext: CampaignDecisionContextDto[];
  activities: CampaignActivityDto[];
  handoffs: CampaignHandoffDto[];
};
