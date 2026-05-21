import type { Campaign } from '@/types/campaign';
import type { DecisionContext, DecisionContextImportance, DecisionContextType } from '@/types/domain';
import { getCampaignCoordinationContext } from './coordinationMetrics';
import { getCampaignExecutionHealth } from './executionHealthMetrics';

function getContextDate(campaign: Campaign, offsetDays: number) {
  const baseDate = new Date(`${campaign.dueDate}T14:00:00`);
  baseDate.setDate(baseDate.getDate() + offsetDays);
  return baseDate.toISOString();
}

function createContext(
  campaign: Campaign,
  id: string,
  type: DecisionContextType,
  title: string,
  content: string,
  importance: DecisionContextImportance,
  offsetDays: number,
): DecisionContext {
  return {
    id: `${campaign.id}-${id}`,
    campaignId: campaign.id,
    authorName: campaign.owner.name,
    type,
    title,
    content,
    importance,
    relatedWorkflowStage: campaign.status,
    createdAt: getContextDate(campaign, offsetDays),
    updatedAt: getContextDate(campaign, offsetDays),
  };
}

export function getCampaignDecisionContext(campaign: Campaign): DecisionContext[] {
  const execution = getCampaignExecutionHealth(campaign);
  const coordination = getCampaignCoordinationContext(campaign);
  const contexts: DecisionContext[] = [
    createContext(
      campaign,
      'audience-clarification',
      'clarification',
      'Audience rule clarified',
      campaign.segmentation
        ? `Audience uses ${campaign.segmentation}; inactive subscribers should remain excluded from the send.`
        : 'Audience definition is still pending and should be confirmed before execution advances.',
      campaign.segmentation ? 'normal' : 'high',
      -4,
    ),
    createContext(
      campaign,
      'priority-rationale',
      'decision',
      campaign.priority === 'urgent' ? 'Priority increased for launch deadline' : 'Priority kept aligned to launch plan',
      campaign.priority === 'urgent'
        ? 'Priority is urgent because the campaign is tied to a business launch deadline.'
        : `Priority remains ${campaign.priority} while execution follows the planned operational window.`,
      campaign.priority === 'urgent' ? 'high' : 'normal',
      -3,
    ),
    createContext(
      campaign,
      'handoff-context',
      'handoff-note',
      `${coordination.handoffFrom} to ${coordination.handoffTo} context`,
      coordination.continuityRisk,
      coordination.state === 'handoff' || coordination.state === 'stalled' ? 'high' : 'normal',
      -2,
    ),
  ];

  if (execution.blockers.length > 0) {
    const blocker = execution.blockers[0];
    contexts.push({
      ...createContext(
        campaign,
        'blocker-resolution',
        'resolution-note',
        'Blocker resolution path recorded',
        `${blocker.description} Resolution depends on owner validation before the next workflow step.`,
        blocker.severity === 'high' ? 'high' : 'normal',
        -1,
      ),
      relatedBlockerId: blocker.id,
    });
  }

  if (execution.risks.length > 0) {
    const risk = execution.risks[0];
    contexts.push({
      ...createContext(
        campaign,
        'risk-note',
        'risk-note',
        'Execution risk explained',
        `${risk.description} This should stay visible so future operators understand why execution changed.`,
        risk.level === 'blocked' || risk.level === 'at-risk' ? 'high' : 'normal',
        0,
      ),
      relatedActivityId: risk.id,
    });
  }

  return contexts.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
}
