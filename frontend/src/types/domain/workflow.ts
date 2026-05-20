import type { EntityId, TimestampedEntity } from './base';

export const CAMPAIGN_STATUSES = [
  'briefing',
  'copy',
  'approval',
  'development',
  'qa',
  'scheduled',
  'sent',
  'completed',
] as const;

export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  briefing: 'Briefing',
  copy: 'Copy',
  approval: 'Approval',
  development: 'Development',
  qa: 'QA',
  scheduled: 'Scheduled',
  sent: 'Sent',
  completed: 'Completed',
};

export interface WorkflowStage extends TimestampedEntity {
  key: CampaignStatus;
  label: string;
  order: number;
  description?: string;
  defaultResponsibleArea?: string;
}

export type HandoffStatus = 'pending' | 'completed' | 'cancelled';

export interface Handoff extends TimestampedEntity {
  campaignId: EntityId;
  fromStage: CampaignStatus;
  toStage: CampaignStatus;
  fromOwnerId?: EntityId;
  toOwnerId?: EntityId;
  fromSquadId?: EntityId;
  toSquadId?: EntityId;
  status: HandoffStatus;
  completedAt?: string;
}

export function getCampaignStatusLabel(status: CampaignStatus) {
  return CAMPAIGN_STATUS_LABELS[status];
}
