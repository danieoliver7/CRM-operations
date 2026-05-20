import {
  CAMPAIGN_STATUS_LABELS,
  type Campaign,
  type CampaignStatus,
} from '@/types/campaign';
import {
  getCampaignExecutionHealth,
  getCampaignNextActionContext,
  workflowStatusOrder,
} from './';

export type CoordinationState = 'clear' | 'waiting' | 'handoff' | 'stalled' | 'missing-owner';

export interface CampaignCoordinationContext {
  campaign: Campaign;
  state: CoordinationState;
  waitingFor: string;
  nextResponsibleArea: string;
  nextAction: string;
  handoffFrom: string;
  handoffTo: string;
  bottleneck: string;
  continuityRisk: string;
}

export interface CoordinationMetrics {
  campaignContexts: CampaignCoordinationContext[];
  waitingActionCampaigns: CampaignCoordinationContext[];
  stalledWorkflows: CampaignCoordinationContext[];
  missingOwnership: CampaignCoordinationContext[];
  pendingHandoffs: CampaignCoordinationContext[];
  delayedApprovals: CampaignCoordinationContext[];
  delayedQA: CampaignCoordinationContext[];
  campaignsWithoutNextAction: CampaignCoordinationContext[];
  blockedOperationalContinuity: CampaignCoordinationContext[];
  warnings: Array<{
    id: string;
    title: string;
    description: string;
    state: CoordinationState;
    to: string;
  }>;
}

const inactiveStatuses: CampaignStatus[] = ['sent', 'completed'];

const responsibleAreaByStatus: Record<CampaignStatus, string> = {
  briefing: 'Campaign owner',
  copy: 'Copy owner',
  approval: 'Approval owner',
  development: 'Marketing automation',
  qa: 'QA owner',
  scheduled: 'CRM Ops',
  sent: 'Analytics owner',
  completed: 'Campaign owner',
};

const handoffByStatus: Record<CampaignStatus, { from: string; to: string }> = {
  briefing: { from: 'Strategy', to: 'Copy' },
  copy: { from: 'Copy', to: 'Approval' },
  approval: { from: 'Approval', to: 'Development' },
  development: { from: 'Development', to: 'QA' },
  qa: { from: 'QA', to: 'Scheduling' },
  scheduled: { from: 'Scheduling', to: 'Send monitoring' },
  sent: { from: 'Send monitoring', to: 'Analytics' },
  completed: { from: 'Analytics', to: 'Archive' },
};

function isActiveCampaign(campaign: Campaign) {
  return !inactiveStatuses.includes(campaign.status);
}

function hasMissingOwner(campaign: Campaign) {
  return !campaign.owner?.name || campaign.owner.name === 'Unassigned';
}

function getNextStatusLabel(status: CampaignStatus) {
  const nextStatus = workflowStatusOrder[workflowStatusOrder.indexOf(status) + 1];
  return nextStatus ? CAMPAIGN_STATUS_LABELS[nextStatus] : 'Closeout';
}

function getCoordinationState(campaign: Campaign): CoordinationState {
  const execution = getCampaignExecutionHealth(campaign);

  if (!isActiveCampaign(campaign)) return 'clear';
  if (hasMissingOwner(campaign)) return 'missing-owner';
  if (execution.health === 'blocked' || execution.health === 'overdue') return 'stalled';
  if (['approval', 'qa', 'scheduled'].includes(campaign.status)) return 'waiting';
  if (['copy', 'development'].includes(campaign.status)) return 'handoff';

  return execution.risks.length > 0 || execution.blockers.length > 0 ? 'waiting' : 'clear';
}

function getBottleneck(campaign: Campaign, state: CoordinationState) {
  if (state === 'missing-owner') return 'No operational owner assigned';
  if (campaign.status === 'approval') return 'Approval validation';
  if (campaign.status === 'qa') return 'QA validation';
  if (campaign.status === 'development') return 'Implementation handoff';
  if (campaign.status === 'copy') return 'Copy readiness';
  if (campaign.status === 'scheduled') return 'Final scheduling confirmation';

  return 'Workflow continuity';
}

function getContinuityRisk(campaign: Campaign, state: CoordinationState) {
  const nextStatusLabel = getNextStatusLabel(campaign.status);

  if (state === 'missing-owner') return 'Campaign may lose continuity without a responsible owner.';
  if (state === 'stalled') return `${CAMPAIGN_STATUS_LABELS[campaign.status]} needs action before ${nextStatusLabel}.`;
  if (state === 'handoff') return `${handoffByStatus[campaign.status].from} must hand off to ${handoffByStatus[campaign.status].to}.`;
  if (state === 'waiting') return `${responsibleAreaByStatus[campaign.status]} needs to unblock the next step.`;

  return 'Workflow continuity is clear.';
}

export function getCampaignCoordinationContext(campaign: Campaign): CampaignCoordinationContext {
  const workflowContext = getCampaignNextActionContext(campaign);
  const state = getCoordinationState(campaign);
  const handoff = handoffByStatus[campaign.status];

  return {
    campaign,
    state,
    waitingFor: state === 'missing-owner' ? 'Operational owner' : workflowContext.waitingFor,
    nextResponsibleArea: responsibleAreaByStatus[campaign.status],
    nextAction: workflowContext.next,
    handoffFrom: handoff.from,
    handoffTo: handoff.to,
    bottleneck: getBottleneck(campaign, state),
    continuityRisk: getContinuityRisk(campaign, state),
  };
}

export function getCoordinationMetrics(campaigns: Campaign[]): CoordinationMetrics {
  const campaignContexts = campaigns.map(getCampaignCoordinationContext);
  const activeContexts = campaignContexts.filter((item) => isActiveCampaign(item.campaign));
  const waitingActionCampaigns = activeContexts.filter((item) => item.state === 'waiting');
  const stalledWorkflows = activeContexts.filter((item) => item.state === 'stalled');
  const missingOwnership = activeContexts.filter((item) => item.state === 'missing-owner');
  const pendingHandoffs = activeContexts.filter((item) => item.state === 'handoff');
  const delayedApprovals = activeContexts.filter((item) => item.campaign.status === 'approval' && item.state !== 'clear');
  const delayedQA = activeContexts.filter((item) => item.campaign.status === 'qa' && item.state !== 'clear');
  const campaignsWithoutNextAction = activeContexts.filter((item) => !item.nextAction);
  const blockedOperationalContinuity = activeContexts.filter((item) =>
    ['missing-owner', 'stalled'].includes(item.state),
  );
  const warningContexts = [
    ...missingOwnership,
    ...stalledWorkflows,
    ...waitingActionCampaigns,
    ...pendingHandoffs,
  ].filter((item, index, list) => list.findIndex((current) => current.campaign.id === item.campaign.id) === index);

  return {
    campaignContexts,
    waitingActionCampaigns,
    stalledWorkflows,
    missingOwnership,
    pendingHandoffs,
    delayedApprovals,
    delayedQA,
    campaignsWithoutNextAction,
    blockedOperationalContinuity,
    warnings: warningContexts.slice(0, 5).map((item) => ({
      id: `coordination-${item.campaign.id}`,
      title: item.state === 'missing-owner'
        ? `${item.campaign.name} needs an owner`
        : item.state === 'stalled'
          ? `${item.campaign.name} workflow is stalled`
          : item.state === 'handoff'
            ? `${item.handoffFrom} to ${item.handoffTo} handoff pending`
            : `${item.campaign.name} is waiting action`,
      description: item.continuityRisk,
      state: item.state,
      to: `/campaign/${item.campaign.id}`,
    })),
  };
}
