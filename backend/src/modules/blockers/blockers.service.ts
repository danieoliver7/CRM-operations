import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { BlockerDto } from './blocker.dto';
import { BLOCKER_SELECT, toBlockerDto } from './blocker.mapper';
import { CreateBlockerRequest, ResolveBlockerRequest, UpdateBlockerRequest } from './blocker.requests';

@Injectable()
export class BlockersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByCampaign(campaignId: string): Promise<ListResponse<BlockerDto>> {
    await this.ensureCampaignExists(campaignId);

    const blockers = await this.prisma.blocker.findMany({
      where: { campaignId },
      orderBy: [{ status: 'asc' }, { severity: 'desc' }, { createdAt: 'desc' }],
      select: BLOCKER_SELECT,
    });

    return {
      data: blockers.map(toBlockerDto),
    };
  }

  async create(campaignId: string, request: CreateBlockerRequest): Promise<DetailResponse<BlockerDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureUserExists(request.createdById);

    const blocker = await this.prisma.blocker.create({
      data: {
        campaignId,
        title: request.title,
        description: request.description ?? null,
        severity: request.severity,
        createdByUserId: request.createdById ?? null,
      },
      select: BLOCKER_SELECT,
    });

    return {
      data: toBlockerDto(blocker),
    };
  }

  async update(
    campaignId: string,
    blockerId: string,
    request: UpdateBlockerRequest,
  ): Promise<DetailResponse<BlockerDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureBlockerBelongsToCampaign(campaignId, blockerId);

    const blocker = await this.prisma.blocker.update({
      where: { id: blockerId },
      data: toUpdateData(request),
      select: BLOCKER_SELECT,
    });

    return {
      data: toBlockerDto(blocker),
    };
  }

  async resolve(
    campaignId: string,
    blockerId: string,
    request: ResolveBlockerRequest,
  ): Promise<DetailResponse<BlockerDto>> {
    await this.ensureCampaignExists(campaignId);
    await this.ensureBlockerBelongsToCampaign(campaignId, blockerId);
    await this.ensureUserExists(request.resolvedById);

    const blocker = await this.prisma.blocker.update({
      where: { id: blockerId },
      data: {
        status: 'resolved',
        resolvedAt: new Date(),
        ...(hasOwn(request, 'resolvedById') ? { resolvedByUserId: request.resolvedById ?? null } : {}),
      },
      select: BLOCKER_SELECT,
    });

    return {
      data: toBlockerDto(blocker),
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

  private async ensureBlockerBelongsToCampaign(campaignId: string, blockerId: string) {
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

function toUpdateData(request: UpdateBlockerRequest): Prisma.BlockerUncheckedUpdateInput {
  const data: Prisma.BlockerUncheckedUpdateInput = {};

  assignIfPresent(data, request, 'title');
  assignIfPresent(data, request, 'description');
  assignIfPresent(data, request, 'severity');
  assignIfPresent(data, request, 'status');

  return data;
}

function assignIfPresent<K extends keyof UpdateBlockerRequest>(
  data: Prisma.BlockerUncheckedUpdateInput,
  request: UpdateBlockerRequest,
  field: K,
) {
  if (hasOwn(request, field)) {
    data[field] = request[field] as never;
  }
}

function hasOwn(input: object, field: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
