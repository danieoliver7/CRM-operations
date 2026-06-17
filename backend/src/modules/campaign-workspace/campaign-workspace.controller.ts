import { Controller, Get, Param } from '@nestjs/common';
import { CampaignWorkspaceService } from './campaign-workspace.service';

@Controller('campaigns/:campaignId/workspace')
export class CampaignWorkspaceController {
  constructor(private readonly campaignWorkspaceService: CampaignWorkspaceService) {}

  @Get()
  findByCampaign(@Param('campaignId') campaignId: string) {
    return this.campaignWorkspaceService.findByCampaign(campaignId);
  }
}
