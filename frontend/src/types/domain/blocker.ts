import type { EntityId, TimestampedEntity } from './base';

export type BlockerSeverity = 'low' | 'medium' | 'high';
export type BlockerStatus = 'open' | 'resolved';

export interface Blocker extends TimestampedEntity {
  campaignId: EntityId;
  title: string;
  description?: string;
  severity: BlockerSeverity;
  status: BlockerStatus;
  createdByUserId?: EntityId;
  resolvedByUserId?: EntityId;
  resolvedAt?: string;
}
