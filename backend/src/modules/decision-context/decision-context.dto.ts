import type { CampaignNoteType, CampaignStatus } from '@prisma/client';

export type CampaignDecisionContextDto = {
  id: string;
  campaignId: string;
  authorId: string | null;
  type: CampaignNoteType;
  title: string;
  body: string;
  relatedWorkflowStage: CampaignStatus | null;
  relatedBlockerId: string | null;
  relatedActivityId: string | null;
  relatedHandoffId: string | null;
  createdAt: string;
  updatedAt: string;
};
