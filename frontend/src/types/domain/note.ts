import type { EntityId, TimestampedEntity } from './base';

export type CampaignNoteType =
  | 'note'
  | 'decision'
  | 'rationale'
  | 'clarification'
  | 'risk-note'
  | 'resolution-note'
  | 'handoff-note';

export type CampaignNoteImportance = 'low' | 'normal' | 'high';

export interface CampaignNote extends TimestampedEntity {
  campaignId: EntityId;
  authorUserId?: EntityId;
  type?: CampaignNoteType;
  title?: string;
  content: string;
  relatedWorkflowStage?: string;
  relatedBlockerId?: EntityId;
  relatedHandoffId?: EntityId;
  relatedActivityId?: EntityId;
  importance?: CampaignNoteImportance;
}
