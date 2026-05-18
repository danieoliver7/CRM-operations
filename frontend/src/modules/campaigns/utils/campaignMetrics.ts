import type { Campaign, CampaignChannel, CampaignStatus } from '@/types/campaign';

const inactiveStatuses: CampaignStatus[] = ['sent', 'completed'];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getCampaignOperationalMetrics(campaigns: Campaign[], today = new Date()) {
  const todayKey = toDateKey(today);

  const byStatus = campaigns.reduce(
    (acc, campaign) => {
      acc[campaign.status] = (acc[campaign.status] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<CampaignStatus, number>>,
  );

  const byChannel = campaigns.reduce(
    (acc, campaign) => {
      acc[campaign.channel] = (acc[campaign.channel] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<CampaignChannel, number>>,
  );

  const delayedCampaigns = campaigns.filter(
    (campaign) => campaign.dueDate < todayKey && !inactiveStatuses.includes(campaign.status),
  );

  return {
    total: campaigns.length,
    byStatus,
    byChannel,
    qa: byStatus.qa ?? 0,
    urgent: campaigns.filter((campaign) => campaign.priority === 'urgent').length,
    delayed: delayedCampaigns.length,
    scheduled: byStatus.scheduled ?? 0,
  };
}

