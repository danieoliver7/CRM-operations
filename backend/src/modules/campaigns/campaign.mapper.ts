import type { Prisma } from '@prisma/client';
import { toIsoString } from '../../common/api-response';
import { CampaignDto } from './campaign.dto';

export const CAMPAIGN_SELECT = {
  id: true,
  workspaceId: true,
  ownerId: true,
  squadId: true,
  name: true,
  description: true,
  objective: true,
  status: true,
  channel: true,
  priority: true,
  dueDate: true,
  plannedDate: true,
  campaignType: true,
  audience: true,
  segmentation: true,
  tags: true,
  content: true,
  metricsTarget: true,
  estimatedComplexity: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CampaignSelect;

export type CampaignRecord = Prisma.CampaignGetPayload<{
  select: typeof CAMPAIGN_SELECT;
}>;

export function toCampaignDto(campaign: CampaignRecord): CampaignDto {
  return {
    id: campaign.id,
    workspaceId: campaign.workspaceId,
    ownerId: campaign.ownerId,
    squadId: campaign.squadId,
    name: campaign.name,
    description: campaign.description,
    objective: campaign.objective,
    status: campaign.status,
    channel: campaign.channel,
    priority: campaign.priority,
    dueDate: toIsoString(campaign.dueDate),
    plannedDate: campaign.plannedDate ? toIsoString(campaign.plannedDate) : null,
    campaignType: campaign.campaignType,
    audience: campaign.audience,
    segmentation: campaign.segmentation,
    tags: campaign.tags,
    content: campaign.content,
    metricsTarget: campaign.metricsTarget,
    estimatedComplexity: campaign.estimatedComplexity,
    createdAt: toIsoString(campaign.createdAt),
    updatedAt: toIsoString(campaign.updatedAt),
  };
}
