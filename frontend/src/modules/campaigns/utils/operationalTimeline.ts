import { CAMPAIGN_STATUS_LABELS, type Campaign } from '@/types/campaign';
import type { TimelineEvent, TimelineEventImportance } from '@/types/domain';
import type { DecisionContext } from '@/types/domain';
import { getCampaignDecisionContext } from './collaborationContext';
import { getCampaignCoordinationContext } from './coordinationMetrics';
import { getCampaignExecutionHealth } from './executionHealthMetrics';

function getRelativeTimelineDate(campaign: Campaign, offsetDays: number) {
  const baseDate = new Date(`${campaign.dueDate}T10:00:00`);
  baseDate.setDate(baseDate.getDate() + offsetDays);
  return baseDate.toISOString();
}

function getDueDateLabel(daysUntilDue: number) {
  if (daysUntilDue < 0) return `${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) === 1 ? '' : 's'} overdue`;
  if (daysUntilDue === 0) return 'due today';
  if (daysUntilDue === 1) return 'due tomorrow';
  return `due in ${daysUntilDue} days`;
}

function sortTimelineEvents(events: TimelineEvent[]) {
  return [...events].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

function getDecisionTimelineType(context: DecisionContext): TimelineEvent['type'] {
  if (context.type === 'decision') return 'decision_recorded';
  if (context.type === 'risk-note') return 'risk_note_added';
  if (context.type === 'resolution-note') return 'resolution_note_added';
  if (context.type === 'handoff-note') return 'handoff_note_added';
  return 'note_added';
}

function getDecisionTimelineImportance(context: DecisionContext): TimelineEventImportance {
  if (context.importance === 'high') return 'high';
  if (context.importance === 'low') return 'low';
  return 'normal';
}

export function getOperationalTimeline(campaign: Campaign): TimelineEvent[] {
  const execution = getCampaignExecutionHealth(campaign);
  const coordination = getCampaignCoordinationContext(campaign);
  const decisionContext = getCampaignDecisionContext(campaign);
  const events: TimelineEvent[] = [
    {
      id: `${campaign.id}-created`,
      campaignId: campaign.id,
      type: 'campaign_created',
      category: 'planning',
      importance: 'normal',
      source: 'mock',
      title: 'Campaign created',
      message: `${campaign.squad} opened the operational workspace for ${campaign.name}.`,
      actorName: campaign.owner.name,
      timestamp: campaign.createdAt ?? getRelativeTimelineDate(campaign, -7),
    },
    {
      id: `${campaign.id}-owner`,
      campaignId: campaign.id,
      type: 'owner_changed',
      category: 'coordination',
      importance: coordination.state === 'missing-owner' ? 'critical' : 'normal',
      source: 'derived',
      title: coordination.state === 'missing-owner' ? 'Operational owner missing' : 'Owner assigned',
      message: coordination.state === 'missing-owner'
        ? 'Campaign requires an operational owner before execution can continue safely.'
        : `${campaign.owner.name} is the current operational owner.`,
      actorName: coordination.state === 'missing-owner' ? undefined : campaign.owner.name,
      timestamp: getRelativeTimelineDate(campaign, -5),
    },
    {
      id: `${campaign.id}-status`,
      campaignId: campaign.id,
      type: 'status_changed',
      category: 'workflow',
      importance: coordination.state === 'stalled' ? 'high' : 'normal',
      source: 'derived',
      title: `Moved to ${CAMPAIGN_STATUS_LABELS[campaign.status]}`,
      message: `Workflow is currently in ${CAMPAIGN_STATUS_LABELS[campaign.status]} with ${campaign.progress}% progress.`,
      actorName: campaign.owner.name,
      timestamp: getRelativeTimelineDate(campaign, -3),
    },
    {
      id: `${campaign.id}-handoff`,
      campaignId: campaign.id,
      type: coordination.state === 'handoff' ? 'handoff_started' : 'handoff_completed',
      category: 'coordination',
      importance: coordination.state === 'handoff' || coordination.state === 'waiting' ? 'high' : 'normal',
      source: 'derived',
      title: `${coordination.handoffFrom} to ${coordination.handoffTo}`,
      message: coordination.continuityRisk,
      actorName: coordination.nextResponsibleArea,
      timestamp: getRelativeTimelineDate(campaign, -2),
    },
    {
      id: `${campaign.id}-due-date`,
      campaignId: campaign.id,
      type: execution.slaState === 'due-soon' ? 'sla_due_soon' : 'due_date_changed',
      category: 'planning',
      importance: execution.slaState === 'due-soon' ? 'high' : 'normal',
      source: 'derived',
      title: 'Due date context',
      message: `${campaign.name} is ${getDueDateLabel(execution.daysUntilDue)}.`,
      timestamp: getRelativeTimelineDate(campaign, -1),
    },
  ];

  execution.blockers.forEach((blocker, index) => {
    events.push({
      id: `${blocker.id}-timeline`,
      campaignId: campaign.id,
      type: 'blocker_created',
      category: 'execution',
      importance: blocker.severity === 'high' ? 'critical' : 'high',
      source: 'derived',
      title: blocker.label,
      message: blocker.description,
      actorName: 'CRM Ops',
      timestamp: getRelativeTimelineDate(campaign, index),
      metadata: { severity: blocker.severity },
    });
  });

  execution.risks.forEach((risk, index) => {
    events.push({
      id: `${risk.id}-timeline`,
      campaignId: campaign.id,
      type: 'execution_risk_detected',
      category: 'execution',
      importance: risk.level === 'blocked' ? 'critical' : 'high',
      source: 'derived',
      title: risk.label,
      message: risk.description,
      actorName: 'System',
      timestamp: getRelativeTimelineDate(campaign, index + 1),
      metadata: { riskLevel: risk.level },
    });
  });

  if (execution.health === 'overdue') {
    events.push({
      id: `${campaign.id}-overdue`,
      campaignId: campaign.id,
      type: 'campaign_overdue',
      category: 'execution',
      importance: 'critical',
      source: 'derived',
      title: 'Campaign became overdue',
      message: execution.summary,
      actorName: 'System',
      timestamp: getRelativeTimelineDate(campaign, 1),
    });
  }

  if (coordination.state === 'stalled') {
    events.push({
      id: `${campaign.id}-workflow-stalled`,
      campaignId: campaign.id,
      type: 'workflow_stalled',
      category: 'coordination',
      importance: 'critical',
      source: 'derived',
      title: 'Workflow stalled',
      message: coordination.continuityRisk,
      actorName: coordination.nextResponsibleArea,
      timestamp: getRelativeTimelineDate(campaign, 1),
    });
  }

  const priorityImportance: TimelineEventImportance = campaign.priority === 'urgent' ? 'high' : 'normal';
  events.push({
    id: `${campaign.id}-priority`,
    campaignId: campaign.id,
    type: 'priority_changed',
    category: 'planning',
    importance: priorityImportance,
    source: 'derived',
    title: `Priority set to ${campaign.priority}`,
    message: `Operational priority is currently ${campaign.priority}.`,
    actorName: campaign.owner.name,
    timestamp: getRelativeTimelineDate(campaign, -4),
  });

  decisionContext
    .filter((context) => context.importance === 'high' || context.type !== 'clarification')
    .forEach((context) => {
      events.push({
        id: `${context.id}-timeline`,
        campaignId: campaign.id,
        type: getDecisionTimelineType(context),
        category: 'collaboration',
        importance: getDecisionTimelineImportance(context),
        source: 'mock',
        title: context.title,
        message: context.content,
        actorName: context.authorName,
        timestamp: context.createdAt ?? getRelativeTimelineDate(campaign, 0),
        metadata: {
          decisionContextType: context.type,
          relatedWorkflowStage: context.relatedWorkflowStage,
          relatedBlockerId: context.relatedBlockerId,
          relatedHandoffId: context.relatedHandoffId,
        },
      });
    });

  return sortTimelineEvents(events);
}
