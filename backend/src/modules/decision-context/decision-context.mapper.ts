import type { Prisma } from '@prisma/client';
import { toIsoString } from '../../common/api-response';
import { CampaignDecisionContextDto } from './decision-context.dto';

export const DECISION_CONTEXT_SELECT = {
  id: true,
  campaignId: true,
  authorUserId: true,
  type: true,
  title: true,
  content: true,
  relatedWorkflowStage: true,
  relatedBlockerId: true,
  relatedActivityId: true,
  relatedHandoffId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.DecisionContextSelect;

export type DecisionContextRecord = Prisma.DecisionContextGetPayload<{
  select: typeof DECISION_CONTEXT_SELECT;
}>;

export function toCampaignDecisionContextDto(record: DecisionContextRecord): CampaignDecisionContextDto {
  return {
    id: record.id,
    campaignId: record.campaignId,
    authorId: record.authorUserId,
    type: record.type,
    title: record.title,
    body: record.content,
    relatedWorkflowStage: record.relatedWorkflowStage,
    relatedBlockerId: record.relatedBlockerId,
    relatedActivityId: record.relatedActivityId,
    relatedHandoffId: record.relatedHandoffId,
    createdAt: toIsoString(record.createdAt),
    updatedAt: toIsoString(record.updatedAt),
  };
}
