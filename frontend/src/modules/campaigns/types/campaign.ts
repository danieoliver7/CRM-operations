import type { EntityId } from '@/types';

export type CampaignStatus =
  | 'Briefing'
  | 'Copy'
  | 'Approval'
  | 'Development'
  | 'QA'
  | 'Scheduled'
  | 'Sent'
  | 'Completed';

export type CampaignChannel = 'Email' | 'Push' | 'WhatsApp' | 'SMS' | 'InApp' | 'Web Push';

export type CampaignPriority = 'Urgent' | 'High' | 'Medium' | 'Low';

export interface CampaignOwner {
  name: string;
  avatar: string;
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
  subject?: string;
  preheader?: string;
  cta?: string;
  segmentation?: string;
  objective?: string;
  expectedKpi?: string;
  squad?: string;
}
