import { Injectable } from '@nestjs/common';
import { DetailResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignWorkspaceFactsDto } from './campaign-workspace.dto';
import {
  toCampaignWorkspaceFactsDto,
  WORKSPACE_ACTIVITY_SELECT,
  WORKSPACE_BLOCKER_SELECT,
  WORKSPACE_CAMPAIGN_SELECT,
  WORKSPACE_DECISION_CONTEXT_SELECT,
  WORKSPACE_HANDOFF_SELECT,
  WORKSPACE_NOTE_SELECT,
  WORKSPACE_OWNER_SELECT,
  WORKSPACE_SQUAD_SELECT,
} from './campaign-workspace.mapper';

@Injectable()
export class CampaignWorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  async findByCampaign(campaignId: string): Promise<DetailResponse<CampaignWorkspaceFactsDto>> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: WORKSPACE_CAMPAIGN_SELECT,
    });

    if (!campaign) {
      throw notFound('CAMPAIGN_NOT_FOUND', 'Campaign not found.');
    }

    const [owner, squad, blockers, notes, decisionContext, activities, handoffs] = await Promise.all([
      campaign.ownerId
        ? this.prisma.user.findUnique({
            where: { id: campaign.ownerId },
            select: WORKSPACE_OWNER_SELECT,
          })
        : Promise.resolve(null),
      campaign.squadId
        ? this.prisma.squad.findUnique({
            where: { id: campaign.squadId },
            select: WORKSPACE_SQUAD_SELECT,
          })
        : Promise.resolve(null),
      this.prisma.blocker.findMany({
        where: { campaignId },
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        select: WORKSPACE_BLOCKER_SELECT,
      }),
      this.prisma.campaignNote.findMany({
        where: { campaignId },
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        select: WORKSPACE_NOTE_SELECT,
      }),
      this.prisma.decisionContext.findMany({
        where: { campaignId },
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        select: WORKSPACE_DECISION_CONTEXT_SELECT,
      }),
      this.prisma.campaignActivity.findMany({
        where: { campaignId },
        orderBy: [{ createdAt: 'desc' }],
        select: WORKSPACE_ACTIVITY_SELECT,
      }),
      this.prisma.handoff.findMany({
        where: { campaignId },
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        select: WORKSPACE_HANDOFF_SELECT,
      }),
    ]);

    return {
      data: toCampaignWorkspaceFactsDto({
        campaign,
        owner,
        squad,
        blockers,
        notes,
        decisionContext,
        activities,
        handoffs,
      }),
    };
  }
}
