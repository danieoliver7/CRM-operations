import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  parseCreateCampaignDecisionContextRequest,
  parseUpdateCampaignDecisionContextRequest,
} from './decision-context.requests';
import { DecisionContextService } from './decision-context.service';

@Controller('campaigns/:campaignId/decision-context')
export class DecisionContextController {
  constructor(private readonly decisionContextService: DecisionContextService) {}

  @Get()
  findAllByCampaign(@Param('campaignId') campaignId: string) {
    return this.decisionContextService.findAllByCampaign(campaignId);
  }

  @Post()
  create(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.decisionContextService.create(campaignId, parseCreateCampaignDecisionContextRequest(body));
  }

  @Patch(':decisionContextId')
  update(
    @Param('campaignId') campaignId: string,
    @Param('decisionContextId') decisionContextId: string,
    @Body() body: unknown,
  ) {
    return this.decisionContextService.update(
      campaignId,
      decisionContextId,
      parseUpdateCampaignDecisionContextRequest(body),
    );
  }
}
