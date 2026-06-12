import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignActivityDto } from './activity.dto';
import { ACTIVITY_SELECT, toCampaignActivityDto } from './activity.mapper';
import { ActivityMetadata, CreateCampaignActivityRequest } from './activity.requests';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByCampaign(campaignId: string): Promise<ListResponse<CampaignActivityDto>> {
    await this.ensureCampaignExists(campaignId);

    const activities = await this.prisma.campaignActivity.findMany({
      where: { campaignId },
      orderBy: [{ createdAt: 'desc' }],
      select: ACTIVITY_SELECT,
    });

    return {
      data: activities.map(toCampaignActivityDto),
    };
  }

  async create(
    campaignId: string,
    request: CreateCampaignActivityRequest,
  ): Promise<DetailResponse<CampaignActivityDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureUserExists(request.actorId);
    await this.ensureRelatedReferencesExist(campaignId, request);

    const activity = await this.prisma.campaignActivity.create({
      data: {
        campaignId,
        actorUserId: request.actorId ?? null,
        type: request.type,
        category: request.category ?? null,
        message: request.message,
        ...metadataData(toActivityMetadata(request)),
      },
      select: ACTIVITY_SELECT,
    });

    return {
      data: toCampaignActivityDto(activity),
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

  private async ensureRelatedReferencesExist(campaignId: string, request: CreateCampaignActivityRequest) {
    if (hasOwn(request, 'relatedBlockerId')) {
      await this.ensureBlockerExists(campaignId, request.relatedBlockerId);
    }

    if (hasOwn(request, 'relatedNoteId')) {
      await this.ensureNoteExists(campaignId, request.relatedNoteId);
    }

    if (hasOwn(request, 'relatedDecisionContextId')) {
      await this.ensureDecisionContextExists(campaignId, request.relatedDecisionContextId);
    }

    if (hasOwn(request, 'relatedHandoffId')) {
      await this.ensureHandoffExists(campaignId, request.relatedHandoffId);
    }
  }

  private async ensureBlockerExists(campaignId: string, blockerId: string | null | undefined) {
    if (blockerId === null || blockerId === undefined) {
      return;
    }

    const blocker = await this.prisma.blocker.findFirst({
      where: {
        id: blockerId,
        campaignId,
      },
      select: { id: true },
    });

    if (!blocker) {
      throw notFound('BLOCKER_NOT_FOUND', 'Blocker not found.');
    }
  }

  private async ensureNoteExists(campaignId: string, noteId: string | null | undefined) {
    if (noteId === null || noteId === undefined) {
      return;
    }

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

  private async ensureDecisionContextExists(
    campaignId: string,
    decisionContextId: string | null | undefined,
  ) {
    if (decisionContextId === null || decisionContextId === undefined) {
      return;
    }

    const decisionContext = await this.prisma.decisionContext.findFirst({
      where: {
        id: decisionContextId,
        campaignId,
      },
      select: { id: true },
    });

    if (!decisionContext) {
      throw notFound('DECISION_CONTEXT_NOT_FOUND', 'Decision context not found.');
    }
  }

  private async ensureHandoffExists(campaignId: string, handoffId: string | null | undefined) {
    if (handoffId === null || handoffId === undefined) {
      return;
    }

    const handoff = await this.prisma.handoff.findFirst({
      where: {
        id: handoffId,
        campaignId,
      },
      select: { id: true },
    });

    if (!handoff) {
      throw notFound('HANDOFF_NOT_FOUND', 'Handoff not found.');
    }
  }
}

function toActivityMetadata(request: CreateCampaignActivityRequest): ActivityMetadata | null | undefined {
  const metadata = request.metadata ? { ...request.metadata } : request.metadata;

  if (!metadata) {
    return relatedMetadata(request);
  }

  assignRelatedMetadata(metadata, request, 'relatedBlockerId');
  assignRelatedMetadata(metadata, request, 'relatedNoteId');
  assignRelatedMetadata(metadata, request, 'relatedDecisionContextId');
  assignRelatedMetadata(metadata, request, 'relatedHandoffId');

  return metadata;
}

function relatedMetadata(request: CreateCampaignActivityRequest): ActivityMetadata | null | undefined {
  const metadata: ActivityMetadata = {};

  assignRelatedMetadata(metadata, request, 'relatedBlockerId');
  assignRelatedMetadata(metadata, request, 'relatedNoteId');
  assignRelatedMetadata(metadata, request, 'relatedDecisionContextId');
  assignRelatedMetadata(metadata, request, 'relatedHandoffId');

  return Object.keys(metadata).length > 0 ? metadata : request.metadata;
}

function assignRelatedMetadata<K extends keyof CreateCampaignActivityRequest>(
  metadata: ActivityMetadata,
  request: CreateCampaignActivityRequest,
  field: K,
) {
  if (hasOwn(request, field)) {
    metadata[field as string] = request[field];
  }
}

function metadataData(metadata: ActivityMetadata | null | undefined) {
  if (metadata === undefined) {
    return {};
  }

  return {
    metadata: metadata === null ? Prisma.JsonNull : (metadata as Prisma.InputJsonValue),
  };
}

function hasOwn(input: object, field: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
