import { Module } from '@nestjs/common';
import { BlockersController } from './blockers.controller';
import { BlockersService } from './blockers.service';

@Module({
  controllers: [BlockersController],
  providers: [BlockersService],
})
export class BlockersModule {}
