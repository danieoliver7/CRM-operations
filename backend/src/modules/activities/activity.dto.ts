import { CampaignActivityCategory, CampaignActivityType } from '@prisma/client';

export type CampaignActivityDto = {
  id: string;
  campaignId: string;
  actorId: string | null;
  type: CampaignActivityType;
  category: CampaignActivityCategory | null;
  message: string;
  metadata: Record<string, unknown> | null;
  relatedBlockerId: string | null;
  relatedNoteId: string | null;
  relatedDecisionContextId: string | null;
  relatedHandoffId: string | null;
  createdAt: string;
  updatedAt: string;
};
