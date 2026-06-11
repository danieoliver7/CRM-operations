import type { CampaignNoteType } from '@prisma/client';

export type CampaignNoteDto = {
  id: string;
  campaignId: string;
  authorId: string | null;
  type: CampaignNoteType;
  body: string;
  createdAt: string;
  updatedAt: string;
};
