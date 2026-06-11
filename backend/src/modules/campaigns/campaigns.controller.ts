import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  parseCreateCampaignRequest,
  parseUpdateCampaignOwnerRequest,
  parseUpdateCampaignPriorityRequest,
  parseUpdateCampaignRequest,
  parseUpdateCampaignSquadRequest,
  parseUpdateCampaignStatusRequest,
} from './campaign.requests';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':campaignId')
  findById(@Param('campaignId') campaignId: string) {
    return this.campaignsService.findById(campaignId);
  }

  @Post()
  create(@Body() body: unknown) {
    return this.campaignsService.create(parseCreateCampaignRequest(body));
  }

  @Patch(':campaignId')
  update(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.campaignsService.update(campaignId, parseUpdateCampaignRequest(body));
  }

  @Patch(':campaignId/status')
  updateStatus(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.campaignsService.updateStatus(campaignId, parseUpdateCampaignStatusRequest(body));
  }

  @Patch(':campaignId/priority')
  updatePriority(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.campaignsService.updatePriority(campaignId, parseUpdateCampaignPriorityRequest(body));
  }

  @Patch(':campaignId/owner')
  updateOwner(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.campaignsService.updateOwner(campaignId, parseUpdateCampaignOwnerRequest(body));
  }

  @Patch(':campaignId/squad')
  updateSquad(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.campaignsService.updateSquad(campaignId, parseUpdateCampaignSquadRequest(body));
  }
}
