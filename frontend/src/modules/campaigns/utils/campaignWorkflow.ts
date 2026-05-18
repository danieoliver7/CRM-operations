import type { Campaign, CampaignStatus } from '@/types/campaign';

export type CampaignWorkflowActionId =
  | 'submit_briefing'
  | 'send_to_copy'
  | 'submit_copy'
  | 'request_copy_changes'
  | 'approve_copy'
  | 'approve_campaign'
  | 'request_changes'
  | 'send_to_qa'
  | 'return_to_copy'
  | 'mark_qa_complete'
  | 'return_to_development'
  | 'flag_qa_issue'
  | 'mark_as_sent'
  | 'reschedule'
  | 'cancel_schedule'
  | 'mark_as_completed'
  | 'review_performance'
  | 'archive_campaign'
  | 'duplicate_campaign';

export interface CampaignWorkflowAction {
  id: CampaignWorkflowActionId;
  label: string;
  targetStatus?: CampaignStatus;
  activity: string;
  feedback: string;
  variant: 'primary' | 'secondary';
}

interface CampaignNextActionContext {
  next: string;
  waitingFor: string;
  risk: string;
}

const workflowActionsByStatus: Record<CampaignStatus, CampaignWorkflowAction[]> = {
  briefing: [
    {
      id: 'submit_briefing',
      label: 'Submit Briefing',
      targetStatus: 'copy',
      activity: 'submitted briefing to copy.',
      feedback: 'Briefing sent to copy',
      variant: 'primary',
    },
    {
      id: 'send_to_copy',
      label: 'Send to Copy',
      targetStatus: 'copy',
      activity: 'moved campaign to copy.',
      feedback: 'Campaign moved to copy',
      variant: 'secondary',
    },
  ],
  copy: [
    {
      id: 'submit_copy',
      label: 'Submit Copy',
      targetStatus: 'approval',
      activity: 'submitted final copy for approval.',
      feedback: 'Copy submitted for approval',
      variant: 'primary',
    },
    {
      id: 'approve_copy',
      label: 'Approve Copy',
      targetStatus: 'approval',
      activity: 'approved final copy.',
      feedback: 'Copy approved',
      variant: 'secondary',
    },
    {
      id: 'request_copy_changes',
      label: 'Request Copy Changes',
      activity: 'requested copy changes.',
      feedback: 'Copy changes requested',
      variant: 'secondary',
    },
  ],
  approval: [
    {
      id: 'approve_campaign',
      label: 'Approve Campaign',
      targetStatus: 'development',
      activity: 'approved campaign for development.',
      feedback: 'Campaign approved',
      variant: 'primary',
    },
    {
      id: 'request_changes',
      label: 'Request Changes',
      targetStatus: 'copy',
      activity: 'requested stakeholder changes.',
      feedback: 'Changes requested',
      variant: 'secondary',
    },
  ],
  development: [
    {
      id: 'send_to_qa',
      label: 'Send to QA',
      targetStatus: 'qa',
      activity: 'sent implementation to QA.',
      feedback: 'Campaign sent to QA',
      variant: 'primary',
    },
    {
      id: 'return_to_copy',
      label: 'Return to Copy',
      targetStatus: 'copy',
      activity: 'returned campaign to copy.',
      feedback: 'Campaign returned to copy',
      variant: 'secondary',
    },
  ],
  qa: [
    {
      id: 'mark_qa_complete',
      label: 'Mark QA Complete',
      targetStatus: 'scheduled',
      activity: 'marked QA complete and moved campaign to scheduled.',
      feedback: 'QA completed',
      variant: 'primary',
    },
    {
      id: 'return_to_development',
      label: 'Return to Development',
      targetStatus: 'development',
      activity: 'returned campaign to development from QA.',
      feedback: 'Returned to development',
      variant: 'secondary',
    },
    {
      id: 'flag_qa_issue',
      label: 'Flag QA Issue',
      activity: 'flagged a QA issue.',
      feedback: 'QA issue flagged',
      variant: 'secondary',
    },
  ],
  scheduled: [
    {
      id: 'mark_as_sent',
      label: 'Mark as Sent',
      targetStatus: 'sent',
      activity: 'marked campaign as sent.',
      feedback: 'Campaign marked as sent',
      variant: 'primary',
    },
    {
      id: 'reschedule',
      label: 'Reschedule',
      activity: 'rescheduled the campaign.',
      feedback: 'Campaign rescheduled',
      variant: 'secondary',
    },
    {
      id: 'cancel_schedule',
      label: 'Cancel Schedule',
      targetStatus: 'development',
      activity: 'cancelled the schedule and returned campaign to development.',
      feedback: 'Schedule cancelled',
      variant: 'secondary',
    },
  ],
  sent: [
    {
      id: 'mark_as_completed',
      label: 'Mark as Completed',
      targetStatus: 'completed',
      activity: 'marked campaign as completed.',
      feedback: 'Campaign completed',
      variant: 'primary',
    },
    {
      id: 'review_performance',
      label: 'Review Performance',
      activity: 'opened performance review.',
      feedback: 'Performance review noted',
      variant: 'secondary',
    },
  ],
  completed: [
    {
      id: 'archive_campaign',
      label: 'Archive Campaign',
      activity: 'archived campaign notes.',
      feedback: 'Campaign archived locally',
      variant: 'primary',
    },
    {
      id: 'duplicate_campaign',
      label: 'Duplicate Campaign',
      activity: 'duplicated campaign as a future template.',
      feedback: 'Campaign duplicated locally',
      variant: 'secondary',
    },
  ],
};

export const workflowStatusOrder: CampaignStatus[] = [
  'briefing',
  'copy',
  'approval',
  'development',
  'qa',
  'scheduled',
  'sent',
  'completed',
];

export function getCampaignWorkflowActions(campaign: Campaign) {
  return workflowActionsByStatus[campaign.status];
}

export function getNextStatus(status: CampaignStatus): CampaignStatus | undefined {
  const index = workflowStatusOrder.indexOf(status);
  return workflowStatusOrder[index + 1];
}

export function getCampaignNextActionContext(campaign: Campaign): CampaignNextActionContext {
  const contexts: Record<CampaignStatus, CampaignNextActionContext> = {
    briefing: {
      next: 'Submit briefing once audience, objective and KPI are locked.',
      waitingFor: `${campaign.owner.name} to confirm scope.`,
      risk: 'Missing audience or KPI can slow copy and approval.',
    },
    copy: {
      next: 'Submit final copy for approval.',
      waitingFor: 'Copywriter',
      risk: 'Missing subject line or preheader can block approval.',
    },
    approval: {
      next: 'Approve campaign or request targeted changes.',
      waitingFor: 'Stakeholders',
      risk: 'Late approval compresses development and QA windows.',
    },
    development: {
      next: 'Send implementation package to QA.',
      waitingFor: 'Marketing automation developer',
      risk: 'Incomplete implementation can return the campaign to copy or development.',
    },
    qa: {
      next: 'Validate links, personalization and rendering.',
      waitingFor: 'QA Ops',
      risk: 'Send is blocked if validation fails.',
    },
    scheduled: {
      next: 'Monitor send window and final readiness.',
      waitingFor: 'CRM Ops',
      risk: 'Last-minute audience or content changes can cancel the schedule.',
    },
    sent: {
      next: 'Review delivery health and early engagement.',
      waitingFor: 'Analytics owner',
      risk: 'Performance review is needed before closing learnings.',
    },
    completed: {
      next: 'Capture learnings and reuse assets where relevant.',
      waitingFor: 'Campaign owner',
      risk: 'Insights can be lost if the workspace is archived too early.',
    },
  };

  return contexts[campaign.status];
}
