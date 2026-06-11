import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { BlockersModule } from './modules/blockers/blockers.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
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
  ],
})
export class AppModule {}
