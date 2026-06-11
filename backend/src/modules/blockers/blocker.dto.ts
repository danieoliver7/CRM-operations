import type { BlockerSeverity, BlockerStatus } from '@prisma/client';

export type BlockerDto = {
  id: string;
  campaignId: string;
  createdById: string | null;
  resolvedById: string | null;
  title: string;
  description: string | null;
  severity: BlockerSeverity;
  status: BlockerStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
};
