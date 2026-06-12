import { Injectable } from '@nestjs/common';
import { HandoffStatus, Prisma } from '@prisma/client';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignHandoffDto } from './handoff.dto';
import { HANDOFF_SELECT, HandoffRecord, toCampaignHandoffDto } from './handoff.mapper';
import {
  CancelCampaignHandoffRequest,
  CreateCampaignHandoffRequest,
  invalidHandoffInput,
  UpdateCampaignHandoffRequest,
} from './handoff.requests';

@Injectable()
export class HandoffsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByCampaign(campaignId: string): Promise<ListResponse<CampaignHandoffDto>> {
    await this.ensureCampaignExists(campaignId);

    const handoffs = await this.prisma.handoff.findMany({
      where: { campaignId },
      orderBy: [{ createdAt: 'desc' }],
      select: HANDOFF_SELECT,
    });

    return {
      data: handoffs.map(toCampaignHandoffDto),
    };
  }

  async create(campaignId: string, request: CreateCampaignHandoffRequest): Promise<DetailResponse<CampaignHandoffDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.validateUserReferences(request);
    await this.validateSquadReferences(request);

    const handoff = await this.prisma.handoff.create({
      data: {
        campaignId,
        status: HandoffStatus.pending,
        fromStage: request.fromStage ?? null,
        toStage: request.toStage ?? null,
        fromOwnerId: request.fromOwnerId ?? null,
        toOwnerId: request.toOwnerId ?? null,
        fromSquadId: request.fromSquadId ?? null,
        toSquadId: request.toSquadId ?? null,
        reason: request.reason ?? null,
      },
      select: HANDOFF_SELECT,
    });

    return {
      data: toCampaignHandoffDto(handoff),
    };
  }

  async update(
    campaignId: string,
    handoffId: string,
    request: UpdateCampaignHandoffRequest,
  ): Promise<DetailResponse<CampaignHandoffDto>> {
    await this.ensureCampaignExists(campaignId);
    const currentHandoff = await this.ensureHandoffBelongsToCampaign(campaignId, handoffId);
    await this.validateUserReferences(request);
    await this.validateSquadReferences(request);
    this.ensureDestinationAfterUpdate(currentHandoff, request);

    const handoff = await this.prisma.handoff.update({
      where: { id: handoffId },
      data: toUpdateData(request),
      select: HANDOFF_SELECT,
    });

    return {
      data: toCampaignHandoffDto(handoff),
    };
  }

  async complete(campaignId: string, handoffId: string): Promise<DetailResponse<CampaignHandoffDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureHandoffBelongsToCampaign(campaignId, handoffId);

    const handoff = await this.prisma.handoff.update({
      where: { id: handoffId },
      data: {
        status: HandoffStatus.completed,
        completedAt: new Date(),
        cancelledAt: null,
      },
      select: HANDOFF_SELECT,
    });

    return {
      data: toCampaignHandoffDto(handoff),
    };
  }

  async cancel(
    campaignId: string,
    handoffId: string,
    request: CancelCampaignHandoffRequest,
  ): Promise<DetailResponse<CampaignHandoffDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureHandoffBelongsToCampaign(campaignId, handoffId);

    const handoff = await this.prisma.handoff.update({
      where: { id: handoffId },
      data: {
        status: HandoffStatus.cancelled,
        completedAt: null,
        cancelledAt: new Date(),
        ...reasonData(request),
      },
      select: HANDOFF_SELECT,
    });

    return {
      data: toCampaignHandoffDto(handoff),
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

  private async ensureHandoffBelongsToCampaign(campaignId: string, handoffId: string): Promise<HandoffRecord> {
    const handoff = await this.prisma.handoff.findFirst({
      where: {
        id: handoffId,
        campaignId,
      },
      select: HANDOFF_SELECT,
    });

    if (!handoff) {
      throw notFound('HANDOFF_NOT_FOUND', 'Handoff not found.');
    }

    return handoff;
  }

  private async validateUserReferences(request: CreateCampaignHandoffRequest | UpdateCampaignHandoffRequest) {
    await this.ensureUserExists(request.fromOwnerId);
    await this.ensureUserExists(request.toOwnerId);
  }

  private async validateSquadReferences(request: CreateCampaignHandoffRequest | UpdateCampaignHandoffRequest) {
    await this.ensureSquadExists(request.fromSquadId);
    await this.ensureSquadExists(request.toSquadId);
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

  private async ensureSquadExists(squadId: string | null | undefined) {
    if (squadId === null || squadId === undefined) {
      return;
    }

    const squad = await this.prisma.squad.findUnique({
      where: { id: squadId },
      select: { id: true },
    });

    if (!squad) {
      throw notFound('SQUAD_NOT_FOUND', 'Squad not found.');
    }
  }

  private ensureDestinationAfterUpdate(handoff: HandoffRecord, request: UpdateCampaignHandoffRequest) {
    const toStage = hasOwn(request, 'toStage') ? request.toStage : handoff.toStage;
    const toOwnerId = hasOwn(request, 'toOwnerId') ? request.toOwnerId : handoff.toOwnerId;
    const toSquadId = hasOwn(request, 'toSquadId') ? request.toSquadId : handoff.toSquadId;

    if (toStage || toOwnerId || toSquadId) {
      return;
    }

    throw invalidHandoffInput('Handoff requires at least one destination field.', {
      fields: ['toStage', 'toOwnerId', 'toSquadId'],
    });
  }
}

function toUpdateData(request: UpdateCampaignHandoffRequest): Prisma.HandoffUncheckedUpdateInput {
  const data: Prisma.HandoffUncheckedUpdateInput = {};

  assignIfPresent(data, request, 'fromStage');
  assignIfPresent(data, request, 'toStage');
  assignIfPresent(data, request, 'fromOwnerId');
  assignIfPresent(data, request, 'toOwnerId');
  assignIfPresent(data, request, 'fromSquadId');
  assignIfPresent(data, request, 'toSquadId');
  assignIfPresent(data, request, 'reason');

  return data;
}

function assignIfPresent<K extends keyof UpdateCampaignHandoffRequest>(
  data: Prisma.HandoffUncheckedUpdateInput,
  request: UpdateCampaignHandoffRequest,
  field: K,
) {
  if (hasOwn(request, field)) {
    data[field] = request[field] as never;
  }
}

function reasonData(request: CancelCampaignHandoffRequest): Prisma.HandoffUncheckedUpdateInput {
  if (!hasOwn(request, 'reason')) {
    return {};
  }

  return {
    reason: request.reason,
  };
}

function hasOwn(input: object, field: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
