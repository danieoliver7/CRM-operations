import type { EntityId, TimestampedEntity } from './base';
import type { CampaignStatus } from './workflow';
import type { CampaignOwner } from './user';

export const CAMPAIGN_CHANNELS = [
  'email',
  'push',
  'sms',
  'whatsapp',
  'web_push',
  'in_app',
] as const;

export const CAMPAIGN_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;
export const CAMPAIGN_COMPLEXITIES = ['low', 'medium', 'high'] as const;

export type CampaignChannel = (typeof CAMPAIGN_CHANNELS)[number];
export type CampaignPriority = (typeof CAMPAIGN_PRIORITIES)[number];
export type CampaignComplexity = (typeof CAMPAIGN_COMPLEXITIES)[number];

export const CAMPAIGN_CHANNEL_LABELS: Record<CampaignChannel, string> = {
  email: 'Email',
  push: 'Push',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
  web_push: 'Web Push',
  in_app: 'InApp',
};

export const CAMPAIGN_PRIORITY_LABELS: Record<CampaignPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export interface CampaignContent {
  subject?: string;
  preheader?: string;
  cta?: string;
}

export interface CampaignMetricsTarget {
  expectedKpi?: string;
}

// Persisted campaign facts. Derived health, risk, SLA and coordination state stay in utils.
export interface Campaign extends TimestampedEntity {
  name: string;
  description?: string;
  objective?: string;
  status: CampaignStatus;
  channel: CampaignChannel;
  priority: CampaignPriority;
  ownerId?: EntityId;
  squadId?: EntityId;
  dueDate: string;
  plannedDate?: string;
  campaignType?: string;
  audience?: string;
  segmentation?: string;
  tags?: string[];
  content?: CampaignContent;
  metricsTarget?: CampaignMetricsTarget;
  estimatedComplexity?: CampaignComplexity;

  // Current UI compatibility fields until backend entities are introduced.
  owner: CampaignOwner;
  squad: string;
  progress: number;
  sla: string;
}

export function getCampaignChannelLabel(channel: CampaignChannel) {
  return CAMPAIGN_CHANNEL_LABELS[channel];
}

export function getCampaignPriorityLabel(priority: CampaignPriority) {
  return CAMPAIGN_PRIORITY_LABELS[priority];
}
