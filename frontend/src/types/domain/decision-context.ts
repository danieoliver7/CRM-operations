import type { EntityId, TimestampedEntity } from './base';
import type { CampaignNoteImportance, CampaignNoteType } from './note';
import type { CampaignStatus } from './workflow';

export type DecisionContextType = Exclude<CampaignNoteType, 'note'>;
export type DecisionContextImportance = CampaignNoteImportance;

// Decision Context captures operational reasoning. It is not a comment thread.
export interface DecisionContext extends TimestampedEntity {
  campaignId: EntityId;
  authorUserId?: EntityId;
  authorName?: string;
  type: DecisionContextType;
  title: string;
  content: string;
  relatedWorkflowStage?: CampaignStatus;
  relatedBlockerId?: EntityId;
  relatedHandoffId?: EntityId;
  relatedActivityId?: EntityId;
  importance: DecisionContextImportance;
}
