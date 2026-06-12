import type { Prisma } from '@prisma/client';
import { toIsoString } from '../../common/api-response';
import { CampaignActivityDto } from './activity.dto';

export const ACTIVITY_SELECT = {
  id: true,
  campaignId: true,
  actorUserId: true,
  type: true,
  category: true,
  message: true,
  metadata: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CampaignActivitySelect;

export type ActivityRecord = Prisma.CampaignActivityGetPayload<{
  select: typeof ACTIVITY_SELECT;
}>;

export function toCampaignActivityDto(activity: ActivityRecord): CampaignActivityDto {
  const metadata = toMetadataObject(activity.metadata);

  return {
    id: activity.id,
    campaignId: activity.campaignId,
    actorId: activity.actorUserId,
    type: activity.type,
    category: activity.category,
    message: activity.message,
    metadata,
    relatedBlockerId: readRelatedId(metadata, 'relatedBlockerId'),
    relatedNoteId: readRelatedId(metadata, 'relatedNoteId'),
    relatedDecisionContextId: readRelatedId(metadata, 'relatedDecisionContextId'),
    relatedHandoffId: readRelatedId(metadata, 'relatedHandoffId'),
    createdAt: toIsoString(activity.createdAt),
    updatedAt: toIsoString(activity.updatedAt),
  };
}

function toMetadataObject(value: Prisma.JsonValue | null): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function readRelatedId(metadata: Record<string, unknown> | null, field: string): string | null {
  const value = metadata?.[field];
  return typeof value === 'string' ? value : null;
}
