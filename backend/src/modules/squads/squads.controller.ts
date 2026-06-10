import { Controller, Get, Param } from '@nestjs/common';
import { SquadsService } from './squads.service';

@Controller('squads')
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}

  @Get()
  findAll() {
    return this.squadsService.findAll();
  }

  @Get(':squadId')
  findById(@Param('squadId') squadId: string) {
    return this.squadsService.findById(squadId);
  }
}
