import type { EntityId, TimestampedEntity } from './base';

export type UserRole =
  | 'crm_analyst'
  | 'copywriter'
  | 'designer'
  | 'qa_analyst'
  | 'marketing_automation'
  | 'manager'
  | 'approver';

export interface User extends TimestampedEntity {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: UserRole;
  squadId?: EntityId;
  isActive?: boolean;
}

// Compatibility shape used by the current frontend mock/UI.
export interface CampaignOwner {
  name: string;
  avatar: string;
}
