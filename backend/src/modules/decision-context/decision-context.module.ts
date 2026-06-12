import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DecisionContextController } from './decision-context.controller';
import { DecisionContextService } from './decision-context.service';

@Module({
  imports: [PrismaModule],
  controllers: [DecisionContextController],
  providers: [DecisionContextService],
})
export class DecisionContextModule {}
