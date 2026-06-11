import type { Prisma } from '@prisma/client';
import { toIsoString } from '../../common/api-response';
import { CampaignNoteDto } from './note.dto';

export const NOTE_SELECT = {
  id: true,
  campaignId: true,
  authorUserId: true,
  type: true,
  content: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CampaignNoteSelect;

export type CampaignNoteRecord = Prisma.CampaignNoteGetPayload<{
  select: typeof NOTE_SELECT;
}>;

export function toCampaignNoteDto(note: CampaignNoteRecord): CampaignNoteDto {
  return {
    id: note.id,
    campaignId: note.campaignId,
    authorId: note.authorUserId,
    type: note.type,
    body: note.content,
    createdAt: toIsoString(note.createdAt),
    updatedAt: toIsoString(note.updatedAt),
  };
}
