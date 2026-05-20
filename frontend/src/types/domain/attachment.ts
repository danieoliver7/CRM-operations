import type { EntityId, TimestampedEntity } from './base';

export type AttachmentType = 'briefing' | 'copy' | 'creative' | 'qa_evidence' | 'implementation_link' | 'other';

export interface Attachment extends TimestampedEntity {
  campaignId: EntityId;
  name: string;
  url: string;
  type: AttachmentType;
  uploadedByUserId?: EntityId;
}
