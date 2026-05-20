import type { EntityId, TimestampedEntity } from './base';

export interface Squad extends TimestampedEntity {
  name: string;
  description?: string;
  leadUserId?: EntityId;
}
