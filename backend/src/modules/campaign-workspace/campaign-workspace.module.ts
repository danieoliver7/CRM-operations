import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CampaignWorkspaceController } from './campaign-workspace.controller';
import { CampaignWorkspaceService } from './campaign-workspace.service';

@Module({
  imports: [PrismaModule],
  controllers: [CampaignWorkspaceController],
  providers: [CampaignWorkspaceService],
})
export class CampaignWorkspaceModule {}
