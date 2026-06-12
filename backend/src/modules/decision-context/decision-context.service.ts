import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignDecisionContextDto } from './decision-context.dto';
import { DECISION_CONTEXT_SELECT, toCampaignDecisionContextDto } from './decision-context.mapper';
import {
  CreateCampaignDecisionContextRequest,
  UpdateCampaignDecisionContextRequest,
} from './decision-context.requests';

@Injectable()
export class DecisionContextService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByCampaign(campaignId: string): Promise<ListResponse<CampaignDecisionContextDto>> {
    await this.ensureCampaignExists(campaignId);

    const records = await this.prisma.decisionContext.findMany({
      where: { campaignId },
      orderBy: [{ createdAt: 'desc' }],
      select: DECISION_CONTEXT_SELECT,
    });

    return {
      data: records.map(toCampaignDecisionContextDto),
    };
  }

  async create(
    campaignId: string,
    request: CreateCampaignDecisionContextRequest,
  ): Promise<DetailResponse<CampaignDecisionContextDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureUserExists(request.authorId);
    await this.ensureRelatedReferencesExist(campaignId, request);

    const record = await this.prisma.decisionContext.create({
      data: {
        campaignId,
        authorUserId: request.authorId ?? null,
        type: request.type,
        title: request.title,
        content: request.body,
        relatedWorkflowStage: request.relatedWorkflowStage ?? null,
        relatedBlockerId: request.relatedBlockerId ?? null,
        relatedActivityId: request.relatedActivityId ?? null,
        relatedHandoffId: request.relatedHandoffId ?? null,
      },
      select: DECISION_CONTEXT_SELECT,
    });

    return {
      data: toCampaignDecisionContextDto(record),
    };
  }

  async update(
    campaignId: string,
    decisionContextId: string,
    request: UpdateCampaignDecisionContextRequest,
  ): Promise<DetailResponse<CampaignDecisionContextDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureDecisionContextBelongsToCampaign(campaignId, decisionContextId);
    await this.ensureRelatedReferencesExist(campaignId, request);

    const record = await this.prisma.decisionContext.update({
      where: { id: decisionContextId },
      data: toUpdateData(request),
      select: DECISION_CONTEXT_SELECT,
    });

    return {
      data: toCampaignDecisionContextDto(record),
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

  private async ensureDecisionContextBelongsToCampaign(campaignId: string, decisionContextId: string) {
    const record = await this.prisma.decisionContext.findFirst({
      where: {
        id: decisionContextId,
        campaignId,
      },
      select: { id: true },
    });

    if (!record) {
      throw notFound('DECISION_CONTEXT_NOT_FOUND', 'Decision context not found.');
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

  private async ensureRelatedReferencesExist(
    campaignId: string,
    request: CreateCampaignDecisionContextRequest | UpdateCampaignDecisionContextRequest,
  ) {
    if (hasOwn(request, 'relatedBlockerId')) {
      await this.ensureBlockerExists(campaignId, request.relatedBlockerId);
    }

    if (hasOwn(request, 'relatedActivityId')) {
      await this.ensureActivityExists(campaignId, request.relatedActivityId);
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

  private async ensureActivityExists(campaignId: string, activityId: string | null | undefined) {
    if (activityId === null || activityId === undefined) {
      return;
    }

    const activity = await this.prisma.campaignActivity.findFirst({
      where: {
        id: activityId,
        campaignId,
      },
      select: { id: true },
    });

    if (!activity) {
      throw notFound('ACTIVITY_NOT_FOUND', 'Activity not found.');
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

function toUpdateData(request: UpdateCampaignDecisionContextRequest): Prisma.DecisionContextUncheckedUpdateInput {
  const data: Prisma.DecisionContextUncheckedUpdateInput = {};

  assignIfPresent(data, request, 'type', 'type');
  assignIfPresent(data, request, 'title', 'title');
  assignIfPresent(data, request, 'body', 'content');
  assignIfPresent(data, request, 'relatedWorkflowStage', 'relatedWorkflowStage');
  assignIfPresent(data, request, 'relatedBlockerId', 'relatedBlockerId');
  assignIfPresent(data, request, 'relatedActivityId', 'relatedActivityId');
  assignIfPresent(data, request, 'relatedHandoffId', 'relatedHandoffId');

  return data;
}

function assignIfPresent<K extends keyof UpdateCampaignDecisionContextRequest>(
  data: Prisma.DecisionContextUncheckedUpdateInput,
  request: UpdateCampaignDecisionContextRequest,
  sourceField: K,
  targetField: keyof Prisma.DecisionContextUncheckedUpdateInput,
) {
  if (hasOwn(request, sourceField)) {
    data[targetField] = request[sourceField] as never;
  }
}

function hasOwn(input: object, field: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
