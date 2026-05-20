import type { EntityId, TimestampedEntity } from './base';

export interface Organization extends TimestampedEntity {
  name: string;
  slug?: string;
}

export interface Workspace extends TimestampedEntity {
  organizationId: EntityId;
  name: string;
  slug?: string;
  description?: string;
}

export type MembershipRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface Membership extends TimestampedEntity {
  organizationId: EntityId;
  workspaceId?: EntityId;
  userId: EntityId;
  role: MembershipRole;
  isActive?: boolean;
}
