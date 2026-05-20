import {
  CAMPAIGN_STATUS_LABELS,
  type Campaign,
  type CampaignStatus,
} from '@/types/campaign';

export type ExecutionHealthState = 'healthy' | 'warning' | 'at-risk' | 'blocked' | 'overdue';
export type SLAState = 'on-track' | 'due-soon' | 'delayed' | 'overdue';
export type OperationalBlockerSeverity = 'low' | 'medium' | 'high';
export type OperationalRiskLevel = 'watch' | 'at-risk' | 'blocked';

export interface OperationalBlocker {
  id: string;
  campaignId: string;
  label: string;
  description: string;
  severity: OperationalBlockerSeverity;
}

export interface OperationalRisk {
  id: string;
  campaignId: string;
  label: string;
  description: string;
  level: OperationalRiskLevel;
}

export interface CampaignExecutionHealth {
  campaign: Campaign;
  health: ExecutionHealthState;
  slaState: SLAState;
  daysUntilDue: number;
  blockers: OperationalBlocker[];
  risks: OperationalRisk[];
  summary: string;
}

export interface ExecutionHealthMetrics {
  campaignHealth: CampaignExecutionHealth[];
  overdueCampaigns: CampaignExecutionHealth[];
  blockedCampaigns: CampaignExecutionHealth[];
  campaignsAtRisk: CampaignExecutionHealth[];
  delayedWorkflowStages: Array<{ status: CampaignStatus; label: string; count: number }>;
  overdueOwners: Array<{ owner: string; count: number }>;
  blockedSquads: Array<{ squad: string; count: number }>;
  warnings: Array<{
    id: string;
    title: string;
    description: string;
    level: OperationalRiskLevel;
    to: string;
  }>;
}

const inactiveStatuses: CampaignStatus[] = ['sent', 'completed'];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDayDiff(dateKey: string | undefined, today = new Date()) {
  if (!dateKey) return 999;

  const dueDate = new Date(`${dateKey}T00:00:00`);
  const todayDate = new Date(`${toDateKey(today)}T00:00:00`);

  return Math.ceil((dueDate.getTime() - todayDate.getTime()) / 86400000);
}

function isActiveCampaign(campaign: Campaign) {
  return !inactiveStatuses.includes(campaign.status);
}

function hasContentGap(campaign: Campaign) {
  if (campaign.channel !== 'email') return false;

  return !campaign.content?.subject || !campaign.content?.preheader;
}

function getSLAState(campaign: Campaign, daysUntilDue: number): SLAState {
  if (!campaign.dueDate) return 'delayed';
  if (!isActiveCampaign(campaign)) return 'on-track';
  if (daysUntilDue < -1) return 'overdue';
  if (daysUntilDue < 0) return 'delayed';
  if (daysUntilDue <= 1) return 'due-soon';

  return 'on-track';
}

function getBlockers(campaign: Campaign, daysUntilDue: number): OperationalBlocker[] {
  const blockers: OperationalBlocker[] = [];

  if (!campaign.owner?.name || campaign.owner.name === 'Unassigned') {
    blockers.push({
      id: `${campaign.id}-missing-owner`,
      campaignId: campaign.id,
      label: 'Missing owner',
      description: 'Campaign needs an accountable owner before execution continues.',
      severity: 'high',
    });
  }

  if (!campaign.dueDate) {
    blockers.push({
      id: `${campaign.id}-missing-due-date`,
      campaignId: campaign.id,
      label: 'Missing due date',
      description: 'Execution timing is unclear without a due date.',
      severity: 'high',
    });
  }

  if (!campaign.audience && !campaign.segmentation) {
    blockers.push({
      id: `${campaign.id}-missing-audience`,
      campaignId: campaign.id,
      label: 'Missing audience validation',
      description: 'Audience context is required before copy, QA or scheduling.',
      severity: 'medium',
    });
  }

  if (hasContentGap(campaign) && ['copy', 'approval', 'development', 'qa'].includes(campaign.status)) {
    blockers.push({
      id: `${campaign.id}-content-gap`,
      campaignId: campaign.id,
      label: 'Missing copy assets',
      description: 'Subject or preheader is missing for the email execution path.',
      severity: campaign.status === 'qa' ? 'high' : 'medium',
    });
  }

  if (campaign.status === 'approval' && daysUntilDue < 0) {
    blockers.push({
      id: `${campaign.id}-approval-overdue`,
      campaignId: campaign.id,
      label: 'Approval delayed',
      description: `Approval is overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) === 1 ? '' : 's'}.`,
      severity: 'high',
    });
  }

  if (campaign.status === 'qa' && daysUntilDue < 0) {
    blockers.push({
      id: `${campaign.id}-qa-overdue`,
      campaignId: campaign.id,
      label: 'QA overdue',
      description: `QA is overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) === 1 ? '' : 's'}.`,
      severity: 'high',
    });
  }

  return blockers;
}

function getRisks(campaign: Campaign, daysUntilDue: number, blockers: OperationalBlocker[]): OperationalRisk[] {
  const risks: OperationalRisk[] = [];

  if (campaign.priority === 'urgent' && daysUntilDue < 0) {
    risks.push({
      id: `${campaign.id}-urgent-overdue`,
      campaignId: campaign.id,
      label: 'Urgent and overdue',
      description: 'Priority and timing are both under pressure.',
      level: 'at-risk',
    });
  }

  if (campaign.priority === 'urgent' && blockers.some((blocker) => blocker.severity === 'high')) {
    risks.push({
      id: `${campaign.id}-urgent-blocked`,
      campaignId: campaign.id,
      label: 'Urgent campaign blocked',
      description: 'A high-severity blocker is affecting an urgent campaign.',
      level: 'blocked',
    });
  }

  if (campaign.status === 'qa' && daysUntilDue <= 1) {
    risks.push({
      id: `${campaign.id}-qa-window`,
      campaignId: campaign.id,
      label: 'QA window compressed',
      description: 'QA is close to the due date and may delay scheduling.',
      level: daysUntilDue < 0 ? 'blocked' : 'watch',
    });
  }

  if (campaign.status === 'approval' && daysUntilDue <= 1) {
    risks.push({
      id: `${campaign.id}-approval-window`,
      campaignId: campaign.id,
      label: 'Approval window compressed',
      description: 'Approval timing may compress development and QA.',
      level: daysUntilDue < 0 ? 'at-risk' : 'watch',
    });
  }

  if (blockers.length >= 2) {
    risks.push({
      id: `${campaign.id}-multiple-blockers`,
      campaignId: campaign.id,
      label: 'Multiple blockers',
      description: 'Several operational gaps need attention before execution continues.',
      level: blockers.some((blocker) => blocker.severity === 'high') ? 'blocked' : 'at-risk',
    });
  }

  return risks;
}

function getHealthState(
  campaign: Campaign,
  slaState: SLAState,
  blockers: OperationalBlocker[],
  risks: OperationalRisk[],
): ExecutionHealthState {
  if (!isActiveCampaign(campaign)) return 'healthy';
  if (slaState === 'overdue') return 'overdue';
  if (blockers.some((blocker) => blocker.severity === 'high')) return 'blocked';
  if (risks.some((risk) => risk.level === 'at-risk' || risk.level === 'blocked')) return 'at-risk';
  if (slaState === 'due-soon' || slaState === 'delayed' || blockers.length > 0 || risks.length > 0) {
    return 'warning';
  }

  return 'healthy';
}

function getSummary(health: ExecutionHealthState, campaign: Campaign, daysUntilDue: number) {
  if (health === 'overdue') {
    return `${CAMPAIGN_STATUS_LABELS[campaign.status]} overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) === 1 ? '' : 's'}.`;
  }

  if (health === 'blocked') return 'Execution is blocked by operational gaps.';
  if (health === 'at-risk') return 'Execution has risk signals that need review.';
  if (health === 'warning') return daysUntilDue <= 1 ? 'Due soon with limited execution window.' : 'Execution needs light attention.';

  return 'Execution is on track.';
}

function countBy<TKey extends string>(
  items: CampaignExecutionHealth[],
  getKey: (item: CampaignExecutionHealth) => TKey,
) {
  const counts = new Map<TKey, number>();

  items.forEach((item) => {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCampaignExecutionHealth(campaign: Campaign, today = new Date()): CampaignExecutionHealth {
  const daysUntilDue = getDayDiff(campaign.dueDate, today);
  const slaState = getSLAState(campaign, daysUntilDue);
  const blockers = getBlockers(campaign, daysUntilDue);
  const risks = getRisks(campaign, daysUntilDue, blockers);
  const health = getHealthState(campaign, slaState, blockers, risks);

  return {
    campaign,
    health,
    slaState,
    daysUntilDue,
    blockers,
    risks,
    summary: getSummary(health, campaign, daysUntilDue),
  };
}

export function getExecutionHealthMetrics(campaigns: Campaign[], today = new Date()): ExecutionHealthMetrics {
  const campaignHealth = campaigns.map((campaign) => getCampaignExecutionHealth(campaign, today));
  const overdueCampaigns = campaignHealth.filter((item) => item.health === 'overdue');
  const blockedCampaigns = campaignHealth.filter((item) => item.health === 'blocked');
  const campaignsAtRisk = campaignHealth.filter((item) => item.health === 'at-risk' || item.health === 'overdue');
  const delayedItems = campaignHealth.filter((item) => ['delayed', 'overdue'].includes(item.slaState));

  const delayedWorkflowStages = countBy(delayedItems, (item) => item.campaign.status).map((item) => ({
    status: item.id,
    label: CAMPAIGN_STATUS_LABELS[item.id],
    count: item.count,
  }));
  const overdueOwners = countBy(overdueCampaigns, (item) => item.campaign.owner.name).map((item) => ({
    owner: item.id,
    count: item.count,
  }));
  const blockedSquads = countBy(blockedCampaigns, (item) => item.campaign.squad).map((item) => ({
    squad: item.id,
    count: item.count,
  }));

  const warnings: ExecutionHealthMetrics['warnings'] = [...overdueCampaigns, ...blockedCampaigns, ...campaignsAtRisk]
    .filter((item, index, list) => list.findIndex((current) => current.campaign.id === item.campaign.id) === index)
    .slice(0, 5)
    .map((item) => ({
      id: `execution-${item.campaign.id}`,
      title: item.health === 'overdue'
        ? `${item.campaign.name} is overdue`
        : item.health === 'blocked'
          ? `${item.campaign.name} is blocked`
          : `${item.campaign.name} is at risk`,
      description: item.summary,
      level: item.health === 'blocked' ? 'blocked' : item.health === 'overdue' ? 'at-risk' : 'watch',
      to: `/campaign/${item.campaign.id}`,
    }));

  return {
    campaignHealth,
    overdueCampaigns,
    blockedCampaigns,
    campaignsAtRisk,
    delayedWorkflowStages,
    overdueOwners,
    blockedSquads,
    warnings,
  };
}
