import { CampaignActivityDto } from '../activities/activity.dto';
import { BlockerDto } from '../blockers/blocker.dto';
import { CampaignDto } from '../campaigns/campaign.dto';
import { CampaignDecisionContextDto } from '../decision-context/decision-context.dto';
import { CampaignHandoffDto } from '../handoffs/handoff.dto';
import { CampaignNoteDto } from '../notes/note.dto';
import { SquadDto } from '../squads/squad.dto';
import { UserDto } from '../users/user.dto';

export type CampaignWorkspaceFactsDto = {
  campaign: CampaignDto;
  owner: UserDto | null;
  squad: SquadDto | null;
  blockers: BlockerDto[];
  notes: CampaignNoteDto[];
  decisionContext: CampaignDecisionContextDto[];
  activities: CampaignActivityDto[];
  handoffs: CampaignHandoffDto[];
};
