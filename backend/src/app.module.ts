import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { BlockersModule } from './modules/blockers/blockers.module';
import { CampaignWorkspaceModule } from './modules/campaign-workspace/campaign-workspace.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { DecisionContextModule } from './modules/decision-context/decision-context.module';
import { HandoffsModule } from './modules/handoffs/handoffs.module';
import { NotesModule } from './modules/notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';
import { SquadsModule } from './modules/squads/squads.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';

@Module({
  imports: [
    HealthModule,
    PrismaModule,
    WorkspacesModule,
    UsersModule,
    SquadsModule,
    CampaignsModule,
    BlockersModule,
    NotesModule,
    DecisionContextModule,
    ActivitiesModule,
    HandoffsModule,
    CampaignWorkspaceModule,
  ],
})
export class AppModule {}
