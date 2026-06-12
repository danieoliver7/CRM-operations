import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { HandoffsController } from './handoffs.controller';
import { HandoffsService } from './handoffs.service';

@Module({
  imports: [PrismaModule],
  controllers: [HandoffsController],
  providers: [HandoffsService],
})
export class HandoffsModule {}
