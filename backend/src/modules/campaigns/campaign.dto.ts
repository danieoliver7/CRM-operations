import type { CampaignChannel, CampaignComplexity, CampaignPriority, CampaignStatus, Prisma } from '@prisma/client';

export type CampaignDto = {
  id: string;
  workspaceId: string;
  ownerId: string | null;
  squadId: string | null;
  name: string;
  description: string | null;
  objective: string | null;
  status: CampaignStatus;
  channel: CampaignChannel;
  priority: CampaignPriority;
  dueDate: string;
  plannedDate: string | null;
  campaignType: string | null;
  audience: string | null;
  segmentation: string | null;
  tags: string[];
  content: Prisma.JsonValue | null;
  metricsTarget: Prisma.JsonValue | null;
  estimatedComplexity: CampaignComplexity | null;
  createdAt: string;
  updatedAt: string;
};
