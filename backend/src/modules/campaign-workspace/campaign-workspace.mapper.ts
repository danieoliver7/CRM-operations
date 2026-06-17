import type { Prisma } from '@prisma/client';
import { ACTIVITY_SELECT, ActivityRecord, toCampaignActivityDto } from '../activities/activity.mapper';
import { BLOCKER_SELECT, BlockerRecord, toBlockerDto } from '../blockers/blocker.mapper';
import { CAMPAIGN_SELECT, CampaignRecord, toCampaignDto } from '../campaigns/campaign.mapper';
import {
  DECISION_CONTEXT_SELECT,
  DecisionContextRecord,
  toCampaignDecisionContextDto,
} from '../decision-context/decision-context.mapper';
import { HANDOFF_SELECT, HandoffRecord, toCampaignHandoffDto } from '../handoffs/handoff.mapper';
import { CampaignNoteRecord, NOTE_SELECT, toCampaignNoteDto } from '../notes/note.mapper';
import { toSquadDto } from '../squads/squad.dto';
import { toUserDto } from '../users/user.dto';
import { CampaignWorkspaceFactsDto } from './campaign-workspace.dto';

export const WORKSPACE_CAMPAIGN_SELECT = CAMPAIGN_SELECT;
export const WORKSPACE_BLOCKER_SELECT = BLOCKER_SELECT;
export const WORKSPACE_NOTE_SELECT = NOTE_SELECT;
export const WORKSPACE_DECISION_CONTEXT_SELECT = DECISION_CONTEXT_SELECT;
export const WORKSPACE_ACTIVITY_SELECT = ACTIVITY_SELECT;
export const WORKSPACE_HANDOFF_SELECT = HANDOFF_SELECT;

export const WORKSPACE_OWNER_SELECT = {
  id: true,
  name: true,
  email: true,
  avatarUrl: true,
  roleLabel: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export const WORKSPACE_SQUAD_SELECT = {
  id: true,
  workspaceId: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.SquadSelect;

export type WorkspaceOwnerRecord = Prisma.UserGetPayload<{
  select: typeof WORKSPACE_OWNER_SELECT;
}>;

export type WorkspaceSquadRecord = Prisma.SquadGetPayload<{
  select: typeof WORKSPACE_SQUAD_SELECT;
}>;

export type CampaignWorkspaceFactsParts = {
  campaign: CampaignRecord;
  owner: WorkspaceOwnerRecord | null;
  squad: WorkspaceSquadRecord | null;
  blockers: BlockerRecord[];
  notes: CampaignNoteRecord[];
  decisionContext: DecisionContextRecord[];
  activities: ActivityRecord[];
  handoffs: HandoffRecord[];
};

export function toCampaignWorkspaceFactsDto(parts: CampaignWorkspaceFactsParts): CampaignWorkspaceFactsDto {
  return {
    campaign: toCampaignDto(parts.campaign),
    owner: parts.owner ? toUserDto(parts.owner) : null,
    squad: parts.squad ? toSquadDto(parts.squad) : null,
    blockers: parts.blockers.map(toBlockerDto),
    notes: parts.notes.map(toCampaignNoteDto),
    decisionContext: parts.decisionContext.map(toCampaignDecisionContextDto),
    activities: parts.activities.map(toCampaignActivityDto),
    handoffs: parts.handoffs.map(toCampaignHandoffDto),
  };
}
