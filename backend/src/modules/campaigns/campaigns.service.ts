import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignDto } from './campaign.dto';
import { CAMPAIGN_SELECT, toCampaignDto } from './campaign.mapper';
import {
  CreateCampaignRequest,
  UpdateCampaignOwnerRequest,
  UpdateCampaignPriorityRequest,
  UpdateCampaignRequest,
  UpdateCampaignSquadRequest,
  UpdateCampaignStatusRequest,
} from './campaign.requests';

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ListResponse<CampaignDto>> {
    const campaigns = await this.prisma.campaign.findMany({
      orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
      select: CAMPAIGN_SELECT,
    });

    return {
      data: campaigns.map(toCampaignDto),
    };
  }

  async findById(campaignId: string): Promise<DetailResponse<CampaignDto>> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: CAMPAIGN_SELECT,
    });

    if (!campaign) {
      throw notFound('CAMPAIGN_NOT_FOUND', 'Campaign not found.');
    }

    return {
      data: toCampaignDto(campaign),
    };
  }

  async create(request: CreateCampaignRequest): Promise<DetailResponse<CampaignDto>> {
    await this.ensureWorkspaceExists(request.workspaceId);
    await this.ensureUserExists(request.ownerId);
    await this.ensureSquadExists(request.squadId);

    const campaign = await this.prisma.campaign.create({
      data: {
        workspaceId: request.workspaceId,
        ownerId: request.ownerId ?? null,
        squadId: request.squadId ?? null,
        name: request.name,
        description: request.description ?? null,
        objective: request.objective ?? null,
        status: request.status,
        channel: request.channel,
        priority: request.priority,
        dueDate: request.dueDate,
        plannedDate: request.plannedDate ?? null,
        campaignType: request.campaignType ?? null,
        audience: request.audience ?? null,
        segmentation: request.segmentation ?? null,
        tags: request.tags,
        ...jsonData('content', request.content),
        ...jsonData('metricsTarget', request.metricsTarget),
        estimatedComplexity: request.estimatedComplexity ?? null,
      },
      select: CAMPAIGN_SELECT,
    });

    return {
      data: toCampaignDto(campaign),
    };
  }

  async update(campaignId: string, request: UpdateCampaignRequest): Promise<DetailResponse<CampaignDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.validateUpdateReferences(request);

    const campaign = await this.prisma.campaign.update({
      where: { id: campaignId },
      data: toUpdateData(request),
      select: CAMPAIGN_SELECT,
    });

    return {
      data: toCampaignDto(campaign),
    };
  }

  async updateStatus(
    campaignId: string,
    request: UpdateCampaignStatusRequest,
  ): Promise<DetailResponse<CampaignDto>> {
    await this.ensureCampaignExists(campaignId);

    const campaign = await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: request.status,
      },
      select: CAMPAIGN_SELECT,
    });

    return {
      data: toCampaignDto(campaign),
    };
  }

  async updatePriority(
    campaignId: string,
    request: UpdateCampaignPriorityRequest,
  ): Promise<DetailResponse<CampaignDto>> {
    await this.ensureCampaignExists(campaignId);

    const campaign = await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        priority: request.priority,
      },
      select: CAMPAIGN_SELECT,
    });

    return {
      data: toCampaignDto(campaign),
    };
  }

  async updateOwner(
    campaignId: string,
    request: UpdateCampaignOwnerRequest,
  ): Promise<DetailResponse<CampaignDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureUserExists(request.ownerId);

    const campaign = await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        ownerId: request.ownerId,
      },
      select: CAMPAIGN_SELECT,
    });

    return {
      data: toCampaignDto(campaign),
    };
  }

  async updateSquad(
    campaignId: string,
    request: UpdateCampaignSquadRequest,
  ): Promise<DetailResponse<CampaignDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureSquadExists(request.squadId);

    const campaign = await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        squadId: request.squadId,
      },
      select: CAMPAIGN_SELECT,
    });

    return {
      data: toCampaignDto(campaign),
    };
  }

  private async validateUpdateReferences(request: UpdateCampaignRequest) {
    if (hasOwn(request, 'workspaceId')) {
      await this.ensureWorkspaceExists(request.workspaceId);
    }

    if (hasOwn(request, 'ownerId')) {
      await this.ensureUserExists(request.ownerId);
    }

    if (hasOwn(request, 'squadId')) {
      await this.ensureSquadExists(request.squadId);
    }
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

  private async ensureWorkspaceExists(workspaceId: string | undefined) {
    if (!workspaceId) {
      return;
    }

    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: { id: true },
    });

    if (!workspace) {
      throw notFound('WORKSPACE_NOT_FOUND', 'Workspace not found.');
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
}

function toUpdateData(request: UpdateCampaignRequest): Prisma.CampaignUncheckedUpdateInput {
  const data: Prisma.CampaignUncheckedUpdateInput = {};

  assignIfPresent(data, request, 'workspaceId');
  assignIfPresent(data, request, 'ownerId');
  assignIfPresent(data, request, 'squadId');
  assignIfPresent(data, request, 'name');
  assignIfPresent(data, request, 'description');
  assignIfPresent(data, request, 'objective');
  assignIfPresent(data, request, 'status');
  assignIfPresent(data, request, 'channel');
  assignIfPresent(data, request, 'priority');
  assignIfPresent(data, request, 'dueDate');
  assignIfPresent(data, request, 'plannedDate');
  assignIfPresent(data, request, 'campaignType');
  assignIfPresent(data, request, 'audience');
  assignIfPresent(data, request, 'segmentation');
  assignIfPresent(data, request, 'tags');
  assignIfPresent(data, request, 'estimatedComplexity');

  if (hasOwn(request, 'content')) {
    data.content = toNullableJsonInput(request.content);
  }

  if (hasOwn(request, 'metricsTarget')) {
    data.metricsTarget = toNullableJsonInput(request.metricsTarget);
  }

  return data;
}

function assignIfPresent<K extends keyof UpdateCampaignRequest>(
  data: Prisma.CampaignUncheckedUpdateInput,
  request: UpdateCampaignRequest,
  field: K,
) {
  if (hasOwn(request, field)) {
    data[field] = request[field] as never;
  }
}

function jsonData(field: 'content' | 'metricsTarget', value: unknown) {
  if (value === undefined) {
    return {};
  }

  return {
    [field]: toNullableJsonInput(value),
  };
}

function toNullableJsonInput(value: unknown): Prisma.InputJsonValue | typeof Prisma.JsonNull {
  if (value === null) {
    return Prisma.JsonNull;
  }

  return value as Prisma.InputJsonValue;
}

function hasOwn(input: object, field: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
