import type { EntityId } from './base';
import type { CampaignActivityCategory, CampaignActivityType } from './activity';

export type TimelineEventCategory = CampaignActivityCategory;
export type TimelineEventImportance = 'low' | 'normal' | 'high' | 'critical';
export type TimelineEventSource = 'mock' | 'derived' | 'local-action';

export interface TimelineEvent {
  id: EntityId;
  campaignId: EntityId;
  type: CampaignActivityType;
  category: TimelineEventCategory;
  importance: TimelineEventImportance;
  source: TimelineEventSource;
  title: string;
  message: string;
  actorName?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
