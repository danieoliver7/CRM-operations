import type { Campaign } from '@/types/campaign';
import type {
  BlockerSeverity,
  BlockerStatus,
  CampaignActivityCategory,
  CampaignActivityType,
  CampaignNoteType,
  HandoffStatus,
} from './campaign-workspace-api';

export type CampaignWorkspaceActivityItem = {
  id: string;
  user: string;
  time: string;
  text: string;
  avatar: string;
};

export type CampaignWorkspaceBlocker = {
  id: string;
  campaignId: string;
  title: string;
  description?: string;
  severity: BlockerSeverity;
  status: BlockerStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
};

export type CampaignWorkspaceNote = {
  id: string;
  campaignId: string;
  authorId?: string;
  type: CampaignNoteType;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type CampaignWorkspaceDecisionContext = {
  id: string;
  campaignId: string;
  authorId?: string;
  type: CampaignNoteType;
  title: string;
  body: string;
  relatedWorkflowStage?: Campaign['status'];
  relatedBlockerId?: string;
  relatedActivityId?: string;
  relatedHandoffId?: string;
  createdAt: string;
  updatedAt: string;
};

export type CampaignWorkspaceHandoff = {
  id: string;
  campaignId: string;
  status: HandoffStatus;
  fromStage?: Campaign['status'];
  toStage?: Campaign['status'];
  fromOwnerId?: string;
  toOwnerId?: string;
  fromSquadId?: string;
  toSquadId?: string;
  reason?: string;
  completedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CampaignWorkspaceActivityFact = {
  id: string;
  campaignId: string;
  actorId?: string;
  type: CampaignActivityType;
  category?: CampaignActivityCategory;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type CampaignWorkspaceViewModel = {
  campaign: Campaign;
  blockers: CampaignWorkspaceBlocker[];
  notes: CampaignWorkspaceNote[];
  decisionContext: CampaignWorkspaceDecisionContext[];
  activityFacts: CampaignWorkspaceActivityFact[];
  activities: CampaignWorkspaceActivityItem[];
  handoffs: CampaignWorkspaceHandoff[];
};
