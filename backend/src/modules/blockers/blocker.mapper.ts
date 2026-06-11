import type { Prisma } from '@prisma/client';
import { toIsoString } from '../../common/api-response';
import { BlockerDto } from './blocker.dto';

export const BLOCKER_SELECT = {
  id: true,
  campaignId: true,
  createdByUserId: true,
  resolvedByUserId: true,
  title: true,
  description: true,
  severity: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  resolvedAt: true,
} satisfies Prisma.BlockerSelect;

export type BlockerRecord = Prisma.BlockerGetPayload<{
  select: typeof BLOCKER_SELECT;
}>;

export function toBlockerDto(blocker: BlockerRecord): BlockerDto {
  return {
    id: blocker.id,
    campaignId: blocker.campaignId,
    createdById: blocker.createdByUserId,
    resolvedById: blocker.resolvedByUserId,
    title: blocker.title,
    description: blocker.description,
    severity: blocker.severity,
    status: blocker.status,
    createdAt: toIsoString(blocker.createdAt),
    updatedAt: toIsoString(blocker.updatedAt),
    resolvedAt: blocker.resolvedAt ? toIsoString(blocker.resolvedAt) : null,
  };
}
