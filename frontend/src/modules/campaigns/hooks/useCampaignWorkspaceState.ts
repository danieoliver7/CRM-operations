import { useMemo, useState } from 'react';
import { useCampaignsStore } from '@/stores';
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

const statusFlow: CampaignStatus[] = [
  'briefing',
  'copy',
  'approval',
  'development',
  'qa',
  'scheduled',
  'sent',
  'completed',
];

function getInitialChecklist(campaign: Campaign): CampaignChecklistItem[] {
  const currentIndex = statusFlow.indexOf(campaign.status);
  const isAfter = (status: CampaignStatus) => currentIndex === -1 || currentIndex > statusFlow.indexOf(status);

  return [
    { id: 'briefing-completed', label: 'Briefing completed', done: isAfter('briefing') },
    { id: 'copy-approved', label: 'Copy approved', done: isAfter('copy') },
    { id: 'assets-uploaded', label: 'Assets uploaded', done: campaign.progress >= 50 },
    { id: 'qa-completed', label: 'QA completed', done: isAfter('qa') || campaign.status === 'scheduled' },
    { id: 'final-validation', label: 'Final validation', done: campaign.status === 'sent' || campaign.status === 'completed' },
    { id: 'scheduled', label: 'Scheduled', done: ['scheduled', 'sent', 'completed'].includes(campaign.status) },
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

function getNextStatus(status: CampaignStatus): CampaignStatus | undefined {
  const index = statusFlow.indexOf(status);
  return statusFlow[index + 1];
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

  function moveToNextStatus() {
    const nextStatus = getNextStatus(campaign.status);
    if (!nextStatus) return;

    moveToStatus(nextStatus);
  }

  function updatePriority(priority: CampaignPriority) {
    updateCampaignPriority(campaign.id, priority);
    pushActivity(`changed priority to ${priority}.`);
    showFeedback(`Priority updated to ${priority}`);
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

  return {
    activities,
    campaign,
    checklistItems,
    feedback,
    moveToNextStatus,
    moveToStatus,
    nextStatus,
    toggleChecklistItem,
    updatePriority,
  };
}
