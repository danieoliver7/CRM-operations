import type { EntityId } from './common';

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

export const CAMPAIGN_CHANNELS = [
  'email',
  'push',
  'sms',
  'whatsapp',
  'web_push',
  'in_app',
] as const;

export const CAMPAIGN_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];
export type CampaignChannel = (typeof CAMPAIGN_CHANNELS)[number];
export type CampaignPriority = (typeof CAMPAIGN_PRIORITIES)[number];

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

export interface CampaignOwner {
  name: string;
  avatar: string;
}

export interface CampaignContent {
  subject?: string;
  preheader?: string;
  cta?: string;
}

export interface CampaignMetricsTarget {
  expectedKpi?: string;
}

export interface Campaign {
  id: EntityId;
  name: string;
  status: CampaignStatus;
  channel: CampaignChannel;
  priority: CampaignPriority;
  owner: CampaignOwner;
  dueDate: string;
  progress: number;
  sla: string;
  squad: string;
  segmentation?: string;
  objective?: string;
  content?: CampaignContent;
  metricsTarget?: CampaignMetricsTarget;
}

export function getCampaignStatusLabel(status: CampaignStatus) {
  return CAMPAIGN_STATUS_LABELS[status];
}

export function getCampaignChannelLabel(channel: CampaignChannel) {
  return CAMPAIGN_CHANNEL_LABELS[channel];
}

export function getCampaignPriorityLabel(priority: CampaignPriority) {
  return CAMPAIGN_PRIORITY_LABELS[priority];
}
