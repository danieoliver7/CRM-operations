import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { PrismaModule } from './prisma/prisma.module';
import { SquadsModule } from './modules/squads/squads.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';

@Module({
  imports: [HealthModule, PrismaModule, WorkspacesModule, UsersModule, SquadsModule, CampaignsModule],
})
export class AppModule {}
