import type { Prisma } from '@prisma/client';
import { toIsoString } from '../../common/api-response';
import { CampaignHandoffDto } from './handoff.dto';

export const HANDOFF_SELECT = {
  id: true,
  campaignId: true,
  status: true,
  fromStage: true,
  toStage: true,
  fromOwnerId: true,
  toOwnerId: true,
  fromSquadId: true,
  toSquadId: true,
  reason: true,
  completedAt: true,
  cancelledAt: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.HandoffSelect;

export type HandoffRecord = Prisma.HandoffGetPayload<{
  select: typeof HANDOFF_SELECT;
}>;

export function toCampaignHandoffDto(handoff: HandoffRecord): CampaignHandoffDto {
  return {
    id: handoff.id,
    campaignId: handoff.campaignId,
    status: handoff.status,
    fromStage: handoff.fromStage,
    toStage: handoff.toStage,
    fromOwnerId: handoff.fromOwnerId,
    toOwnerId: handoff.toOwnerId,
    fromSquadId: handoff.fromSquadId,
    toSquadId: handoff.toSquadId,
    reason: handoff.reason,
    completedAt: handoff.completedAt ? toIsoString(handoff.completedAt) : null,
    cancelledAt: handoff.cancelledAt ? toIsoString(handoff.cancelledAt) : null,
    createdAt: toIsoString(handoff.createdAt),
    updatedAt: toIsoString(handoff.updatedAt),
  };
}
