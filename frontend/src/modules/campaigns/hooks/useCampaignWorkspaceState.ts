import { useMemo, useState } from 'react';
import { useCampaignsStore } from '@/stores';
import {
  getCampaignWorkflowActions,
  getNextStatus,
  type CampaignWorkflowAction,
} from '@/modules/campaigns/utils';
import type { Campaign, CampaignPriority, CampaignStatus } from '@/types/campaign';

export interface CampaignWorkspaceActivity {
  id: string;
  user: string;
  time: string;
  text: string;
  avatar: string;
}

export interface CampaignChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

function getInitialChecklist(campaign: Campaign): CampaignChecklistItem[] {
  const completedByStatus: Record<CampaignStatus, string[]> = {
    briefing: [],
    copy: ['briefing-completed'],
    approval: ['briefing-completed', 'copy-approved'],
    development: ['briefing-completed', 'copy-approved'],
    qa: ['briefing-completed', 'copy-approved', 'assets-uploaded'],
    scheduled: ['briefing-completed', 'copy-approved', 'assets-uploaded', 'qa-completed', 'scheduled'],
    sent: ['briefing-completed', 'copy-approved', 'assets-uploaded', 'qa-completed', 'final-validation', 'scheduled'],
    completed: ['briefing-completed', 'copy-approved', 'assets-uploaded', 'qa-completed', 'final-validation', 'scheduled'],
  };
  const completedItems = completedByStatus[campaign.status];

  return [
    { id: 'briefing-completed', label: 'Briefing completed', done: completedItems.includes('briefing-completed') },
    { id: 'copy-approved', label: 'Copy approved', done: completedItems.includes('copy-approved') },
    { id: 'assets-uploaded', label: 'Assets uploaded', done: completedItems.includes('assets-uploaded') || campaign.progress >= 50 },
    { id: 'qa-completed', label: 'QA completed', done: completedItems.includes('qa-completed') },
    { id: 'final-validation', label: 'Final validation', done: completedItems.includes('final-validation') },
    { id: 'scheduled', label: 'Scheduled', done: completedItems.includes('scheduled') },
  ];
}

function getInitialActivities(campaign: Campaign): CampaignWorkspaceActivity[] {
  return [
    {
      id: 'initial-owner-progress',
      user: campaign.owner.name,
      time: '12m ago',
      text: `updated ${campaign.name} progress to ${campaign.progress}%.`,
      avatar: campaign.owner.avatar,
    },
    {
      id: 'initial-qa-validation',
      user: 'QA Ops',
      time: '28m ago',
      text: `requested final validation for ${campaign.channel}.`,
      avatar: 'https://i.pravatar.cc/150?u=qa-ops',
    },
    {
      id: 'initial-kpi',
      user: 'CRM Strategy',
      time: '1h ago',
      text: `confirmed KPI target: ${campaign.metricsTarget?.expectedKpi ?? 'TBD'}.`,
      avatar: 'https://i.pravatar.cc/150?u=crm-strategy',
    },
  ];
}

export function useCampaignWorkspaceState(initialCampaign: Campaign) {
  const [checklistItems, setChecklistItems] = useState(() => getInitialChecklist(initialCampaign));
  const [activities, setActivities] = useState(() => getInitialActivities(initialCampaign));
  const [feedback, setFeedback] = useState<string | null>(null);
  const updateCampaignStatus = useCampaignsStore((state) => state.updateCampaignStatus);
  const updateCampaignPriority = useCampaignsStore((state) => state.updateCampaignPriority);
  const campaign = initialCampaign;

  function pushActivity(text: string) {
    setActivities((current) => [
      {
        id: `local-${Date.now()}-${current.length}`,
        user: 'Daniel',
        time: 'now',
        text,
        avatar: 'https://i.pravatar.cc/150?u=daniel-ops',
      },
      ...current,
    ]);
  }

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2400);
  }

  function moveToStatus(status: CampaignStatus) {
    updateCampaignStatus(campaign.id, status);
    const derivedChecklist = getInitialChecklist({ ...campaign, status });
    setChecklistItems((current) =>
      current.map((item) => ({
        ...item,
        done: item.done || Boolean(derivedChecklist.find((derivedItem) => derivedItem.id === item.id)?.done),
      })),
    );
    pushActivity(`moved campaign to ${status}.`);
    showFeedback(`Campaign moved to ${status}`);
  }

  function updatePriority(priority: CampaignPriority) {
    updateCampaignPriority(campaign.id, priority);
    pushActivity(`changed priority to ${priority}.`);
    showFeedback(`Priority updated to ${priority}`);
  }

  function executeWorkflowAction(action: CampaignWorkflowAction) {
    if (action.targetStatus) {
      updateCampaignStatus(campaign.id, action.targetStatus);
      const derivedChecklist = getInitialChecklist({ ...campaign, status: action.targetStatus });
      setChecklistItems((current) =>
        current.map((item) => ({
          ...item,
          done: item.done || Boolean(derivedChecklist.find((derivedItem) => derivedItem.id === item.id)?.done),
        })),
      );
    }

    if (action.id === 'flag_qa_issue') {
      updateCampaignPriority(campaign.id, 'urgent');
    }

    pushActivity(action.activity);
    showFeedback(action.feedback);
  }

  function toggleChecklistItem(itemId: string) {
    const currentItem = checklistItems.find((item) => item.id === itemId);
    if (!currentItem) return;

    setChecklistItems((current) =>
      current.map((item) => {
        if (item.id !== itemId) return item;

        return { ...item, done: !item.done };
      }),
    );

    pushActivity(`${currentItem.done ? 'unchecked' : 'checked'} "${currentItem.label}".`);
    showFeedback(currentItem.done ? 'Checklist item reopened' : 'Checklist item completed');
  }

  const nextStatus = useMemo(() => getNextStatus(campaign.status), [campaign.status]);
  const workflowActions = useMemo(() => getCampaignWorkflowActions(campaign), [campaign]);

  return {
    activities,
    campaign,
    checklistItems,
    feedback,
    executeWorkflowAction,
    moveToStatus,
    nextStatus,
    toggleChecklistItem,
    updatePriority,
    workflowActions,
  };
}
