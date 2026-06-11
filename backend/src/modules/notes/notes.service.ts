import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignNoteDto } from './note.dto';
import { NOTE_SELECT, toCampaignNoteDto } from './note.mapper';
import { CreateCampaignNoteRequest, UpdateCampaignNoteRequest } from './note.requests';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByCampaign(campaignId: string): Promise<ListResponse<CampaignNoteDto>> {
    await this.ensureCampaignExists(campaignId);

    const notes = await this.prisma.campaignNote.findMany({
      where: { campaignId },
      orderBy: [{ createdAt: 'desc' }],
      select: NOTE_SELECT,
    });

    return {
      data: notes.map(toCampaignNoteDto),
    };
  }

  async create(campaignId: string, request: CreateCampaignNoteRequest): Promise<DetailResponse<CampaignNoteDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureUserExists(request.authorId);

    const note = await this.prisma.campaignNote.create({
      data: {
        campaignId,
        authorUserId: request.authorId ?? null,
        type: request.type,
        content: request.body,
      },
      select: NOTE_SELECT,
    });

    return {
      data: toCampaignNoteDto(note),
    };
  }

  async update(
    campaignId: string,
    noteId: string,
    request: UpdateCampaignNoteRequest,
  ): Promise<DetailResponse<CampaignNoteDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureNoteBelongsToCampaign(campaignId, noteId);

    const note = await this.prisma.campaignNote.update({
      where: { id: noteId },
      data: toUpdateData(request),
      select: NOTE_SELECT,
    });

    return {
      data: toCampaignNoteDto(note),
    };
  }

  private async ensureCampaignExists(campaignId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true },
    });

    if (!campaign) {
      throw notFound('CAMPAIGN_NOT_FOUND', 'Campaign not found.');
    }
  }

  private async ensureNoteBelongsToCampaign(campaignId: string, noteId: string) {
    const note = await this.prisma.campaignNote.findFirst({
      where: {
        id: noteId,
        campaignId,
      },
      select: { id: true },
    });

    if (!note) {
      throw notFound('NOTE_NOT_FOUND', 'Note not found.');
    }
  }

  private async ensureUserExists(userId: string | null | undefined) {
    if (userId === null || userId === undefined) {
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw notFound('USER_NOT_FOUND', 'User not found.');
    }
  }
}

function toUpdateData(request: UpdateCampaignNoteRequest): Prisma.CampaignNoteUncheckedUpdateInput {
  const data: Prisma.CampaignNoteUncheckedUpdateInput = {};

  assignIfPresent(data, request, 'type', 'type');
  assignIfPresent(data, request, 'body', 'content');

  return data;
}

function assignIfPresent<K extends keyof UpdateCampaignNoteRequest>(
  data: Prisma.CampaignNoteUncheckedUpdateInput,
  request: UpdateCampaignNoteRequest,
  sourceField: K,
  targetField: keyof Prisma.CampaignNoteUncheckedUpdateInput,
) {
  if (hasOwn(request, sourceField)) {
    data[targetField] = request[sourceField] as never;
  }
}

function hasOwn(input: object, field: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
