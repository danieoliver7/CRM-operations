import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  parseCreateBlockerRequest,
  parseResolveBlockerRequest,
  parseUpdateBlockerRequest,
} from './blocker.requests';
import { BlockersService } from './blockers.service';

@Controller('campaigns/:campaignId/blockers')
export class BlockersController {
  constructor(private readonly blockersService: BlockersService) {}

  @Get()
  findAllByCampaign(@Param('campaignId') campaignId: string) {
    return this.blockersService.findAllByCampaign(campaignId);
  }

  @Post()
  create(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.blockersService.create(campaignId, parseCreateBlockerRequest(body));
  }

  @Patch(':blockerId')
  update(@Param('campaignId') campaignId: string, @Param('blockerId') blockerId: string, @Body() body: unknown) {
    return this.blockersService.update(campaignId, blockerId, parseUpdateBlockerRequest(body));
  }

  @Post(':blockerId/resolve')
  resolve(@Param('campaignId') campaignId: string, @Param('blockerId') blockerId: string, @Body() body: unknown) {
    return this.blockersService.resolve(campaignId, blockerId, parseResolveBlockerRequest(body));
  }
}
