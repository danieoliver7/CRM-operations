import type { EntityId, TimestampedEntity } from './base';

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
  | 'due_date_changed';

export interface CampaignActivity extends TimestampedEntity {
  campaignId: EntityId;
  actorUserId?: EntityId;
  type: CampaignActivityType;
  message: string;
  metadata?: Record<string, unknown>;
}
