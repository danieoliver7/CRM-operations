import type { Campaign, CampaignContent, CampaignMetricsTarget, CampaignStatus } from '@/types/campaign';
import type {
  CampaignActivityDto,
  CampaignBlockerDto,
  CampaignDecisionContextDto,
  CampaignHandoffDto,
  CampaignNoteDto,
  CampaignWorkspaceFactsDto,
  SquadDto,
  UserDto,
} from '@/modules/campaigns/types';
import type {
  CampaignWorkspaceActivityItem,
  CampaignWorkspaceActivityFact,
  CampaignWorkspaceBlocker,
  CampaignWorkspaceDecisionContext,
  CampaignWorkspaceHandoff,
  CampaignWorkspaceNote,
  CampaignWorkspaceViewModel,
} from '@/modules/campaigns/types';

const progressByStatus: Record<CampaignStatus, number> = {
  briefing: 8,
  copy: 32,
  approval: 48,
  development: 62,
  qa: 82,
  scheduled: 94,
  sent: 100,
  completed: 100,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readOptionalString(value: unknown, key: string) {
  if (!isRecord(value)) return undefined;

  const field = value[key];
  return typeof field === 'string' && field.trim() ? field : undefined;
}

function mapContent(value: unknown): CampaignContent | undefined {
  const content: CampaignContent = {
    subject: readOptionalString(value, 'subject'),
    preheader: readOptionalString(value, 'preheader'),
    cta: readOptionalString(value, 'cta'),
  };

  return Object.values(content).some(Boolean) ? content : undefined;
}

function mapMetricsTarget(value: unknown): CampaignMetricsTarget | undefined {
  const expectedKpi = readOptionalString(value, 'expectedKpi');

  return expectedKpi ? { expectedKpi } : undefined;
}

function getOwnerAvatar(owner: UserDto | null) {
  if (owner?.avatarUrl) return owner.avatarUrl;

  const avatarKey = owner?.email ?? owner?.name ?? 'unassigned-owner';
  return `https://i.pravatar.cc/150?u=${encodeURIComponent(avatarKey)}`;
}

function mapOwner(owner: UserDto | null): Campaign['owner'] {
  return {
    name: owner?.name ?? 'Unassigned',
    avatar: getOwnerAvatar(owner),
  };
}

function mapSquad(squad: SquadDto | null) {
  return squad?.name ?? 'No squad assigned';
}

function getDayDiff(dateKey: string | undefined) {
  if (!dateKey) return undefined;

  const dueDate = new Date(`${dateKey}T00:00:00`);
  if (Number.isNaN(dueDate.getTime())) return undefined;

  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return Math.ceil((dueDate.getTime() - todayDate.getTime()) / 86400000);
}

function toDateKey(dateValue: string | null | undefined) {
  if (!dateValue) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) return dateValue;

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString().slice(0, 10);
}

function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function mapSlaDisplay(campaign: CampaignWorkspaceFactsDto['campaign'], dueDate: string) {
  if (campaign.status === 'completed') return 'completed';
  if (campaign.status === 'sent') return 'sent';
  if (campaign.status === 'scheduled') return 'scheduled';

  const daysUntilDue = getDayDiff(dueDate);
  if (daysUntilDue === undefined) return 'planning';
  if (daysUntilDue < 0) return 'overdue';
  if (daysUntilDue === 0) return 'today';
  if (daysUntilDue === 1) return '1d';

  return `${daysUntilDue}d`;
}

function mapCampaign(dto: CampaignWorkspaceFactsDto): Campaign {
  const { campaign } = dto;
  const dueDate = toDateKey(campaign.dueDate) ?? getTodayKey();
  const plannedDate = toDateKey(campaign.plannedDate);

  return {
    id: campaign.id,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
    name: campaign.name,
    description: campaign.description ?? undefined,
    objective: campaign.objective ?? campaign.description ?? 'Objective pending definition.',
    status: campaign.status,
    channel: campaign.channel,
    priority: campaign.priority,
    ownerId: campaign.ownerId ?? undefined,
    squadId: campaign.squadId ?? undefined,
    dueDate,
    plannedDate,
    campaignType: campaign.campaignType ?? undefined,
    audience: campaign.audience ?? undefined,
    segmentation: campaign.segmentation ?? campaign.audience ?? undefined,
    tags: campaign.tags,
    content: mapContent(campaign.content),
    metricsTarget: mapMetricsTarget(campaign.metricsTarget),
    estimatedComplexity: campaign.estimatedComplexity ?? undefined,
    owner: mapOwner(dto.owner),
    squad: mapSquad(dto.squad),
    progress: progressByStatus[campaign.status],
    sla: mapSlaDisplay(campaign, dueDate),
  };
}

function getRelativeTime(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'recently';

  const diffMinutes = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
  if (diffMinutes < 1) return 'now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function getActivityActor(activity: CampaignActivityDto, owner: UserDto | null) {
  if (owner && activity.actorId === owner.id) {
    return {
      name: owner.name,
      avatar: getOwnerAvatar(owner),
    };
  }

  return {
    name: 'CRM Ops',
    avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(activity.actorId ?? 'crm-ops')}`,
  };
}

function mapActivity(activity: CampaignActivityDto, owner: UserDto | null): CampaignWorkspaceActivityItem {
  const actor = getActivityActor(activity, owner);

  return {
    id: activity.id,
    user: actor.name,
    time: getRelativeTime(activity.createdAt),
    text: activity.message,
    avatar: actor.avatar,
  };
}

function mapActivityFact(activity: CampaignActivityDto): CampaignWorkspaceActivityFact {
  return {
    id: activity.id,
    campaignId: activity.campaignId,
    actorId: activity.actorId ?? undefined,
    type: activity.type,
    category: activity.category ?? undefined,
    message: activity.message,
    createdAt: activity.createdAt,
    updatedAt: activity.updatedAt,
  };
}

function mapBlocker(blocker: CampaignBlockerDto): CampaignWorkspaceBlocker {
  return {
    id: blocker.id,
    campaignId: blocker.campaignId,
    title: blocker.title,
    description: blocker.description ?? undefined,
    severity: blocker.severity,
    status: blocker.status,
    createdAt: blocker.createdAt,
    updatedAt: blocker.updatedAt,
    resolvedAt: blocker.resolvedAt ?? undefined,
  };
}

function mapNote(note: CampaignNoteDto): CampaignWorkspaceNote {
  return {
    id: note.id,
    campaignId: note.campaignId,
    authorId: note.authorId ?? undefined,
    type: note.type,
    body: note.body,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

function mapDecisionContext(context: CampaignDecisionContextDto): CampaignWorkspaceDecisionContext {
  return {
    id: context.id,
    campaignId: context.campaignId,
    authorId: context.authorId ?? undefined,
    type: context.type,
    title: context.title,
    body: context.body,
    relatedWorkflowStage: context.relatedWorkflowStage ?? undefined,
    relatedBlockerId: context.relatedBlockerId ?? undefined,
    relatedActivityId: context.relatedActivityId ?? undefined,
    relatedHandoffId: context.relatedHandoffId ?? undefined,
    createdAt: context.createdAt,
    updatedAt: context.updatedAt,
  };
}

function mapHandoff(handoff: CampaignHandoffDto): CampaignWorkspaceHandoff {
  return {
    id: handoff.id,
    campaignId: handoff.campaignId,
    status: handoff.status,
    fromStage: handoff.fromStage ?? undefined,
    toStage: handoff.toStage ?? undefined,
    fromOwnerId: handoff.fromOwnerId ?? undefined,
    toOwnerId: handoff.toOwnerId ?? undefined,
    fromSquadId: handoff.fromSquadId ?? undefined,
    toSquadId: handoff.toSquadId ?? undefined,
    reason: handoff.reason ?? undefined,
    completedAt: handoff.completedAt ?? undefined,
    cancelledAt: handoff.cancelledAt ?? undefined,
    createdAt: handoff.createdAt,
    updatedAt: handoff.updatedAt,
  };
}

export function mapCampaignWorkspaceFactsToViewModel(
  dto: CampaignWorkspaceFactsDto,
): CampaignWorkspaceViewModel {
  return {
    campaign: mapCampaign(dto),
    blockers: dto.blockers.map(mapBlocker),
    notes: dto.notes.map(mapNote),
    decisionContext: dto.decisionContext.map(mapDecisionContext),
    activityFacts: dto.activities.map(mapActivityFact),
    activities: dto.activities.map((activity) => mapActivity(activity, dto.owner)),
    handoffs: dto.handoffs.map(mapHandoff),
  };
}
