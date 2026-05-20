import type { EntityId, TimestampedEntity } from './base';

export interface CampaignNote extends TimestampedEntity {
  campaignId: EntityId;
  authorUserId?: EntityId;
  content: string;
}
