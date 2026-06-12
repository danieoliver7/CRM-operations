import { CampaignStatus, HandoffStatus } from '@prisma/client';

export type CampaignHandoffDto = {
  id: string;
  campaignId: string;
  status: HandoffStatus;
  fromStage: CampaignStatus | null;
  toStage: CampaignStatus | null;
  fromOwnerId: string | null;
  toOwnerId: string | null;
  fromSquadId: string | null;
  toSquadId: string | null;
  reason: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
};
