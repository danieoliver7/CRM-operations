import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  parseCancelCampaignHandoffRequest,
  parseCompleteCampaignHandoffRequest,
  parseCreateCampaignHandoffRequest,
  parseUpdateCampaignHandoffRequest,
} from './handoff.requests';
import { HandoffsService } from './handoffs.service';

@Controller('campaigns/:campaignId/handoffs')
export class HandoffsController {
  constructor(private readonly handoffsService: HandoffsService) {}

  @Get()
  findAllByCampaign(@Param('campaignId') campaignId: string) {
    return this.handoffsService.findAllByCampaign(campaignId);
  }

  @Post()
  create(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.handoffsService.create(campaignId, parseCreateCampaignHandoffRequest(body));
  }

  @Patch(':handoffId')
  update(@Param('campaignId') campaignId: string, @Param('handoffId') handoffId: string, @Body() body: unknown) {
    return this.handoffsService.update(campaignId, handoffId, parseUpdateCampaignHandoffRequest(body));
  }

  @Post(':handoffId/complete')
  complete(@Param('campaignId') campaignId: string, @Param('handoffId') handoffId: string, @Body() body: unknown) {
    parseCompleteCampaignHandoffRequest(body);
    return this.handoffsService.complete(campaignId, handoffId);
  }

  @Post(':handoffId/cancel')
  cancel(@Param('campaignId') campaignId: string, @Param('handoffId') handoffId: string, @Body() body: unknown) {
    return this.handoffsService.cancel(campaignId, handoffId, parseCancelCampaignHandoffRequest(body));
  }
}
