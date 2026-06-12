import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { parseCreateCampaignActivityRequest } from './activity.requests';
import { ActivitiesService } from './activities.service';

@Controller('campaigns/:campaignId/activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  findAllByCampaign(@Param('campaignId') campaignId: string) {
    return this.activitiesService.findAllByCampaign(campaignId);
  }

  @Post()
  create(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.activitiesService.create(campaignId, parseCreateCampaignActivityRequest(body));
  }
}
