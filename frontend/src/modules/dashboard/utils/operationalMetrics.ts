import {
  CAMPAIGN_CHANNELS,
  CAMPAIGN_CHANNEL_LABELS,
  CAMPAIGN_STATUSES,
  CAMPAIGN_STATUS_LABELS,
  type Campaign,
  type CampaignChannel,
  type CampaignStatus,
} from '@/types/campaign';

const inactiveStatuses: CampaignStatus[] = ['sent', 'completed'];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function isActiveCampaign(campaign: Campaign) {
  return !inactiveStatuses.includes(campaign.status);
}

function getPercentage(count: number, total: number) {
  return total > 0 ? Math.round((count / total) * 100) : 0;
}

export type CampaignCountByStatus = Record<CampaignStatus, number>;
export type CampaignCountByChannel = Record<CampaignChannel, number>;

export interface CampaignDistributionItem<TId extends string> {
  id: TId;
  label: string;
  count: number;
  percentage: number;
}

export interface CampaignHealthMetrics {
  score: number;
  label: string;
  riskLevel: 'healthy' | 'watch' | 'risk';
  activeCampaigns: number;
  bottleneckStatus: CampaignStatus;
  bottleneckCount: number;
}

export interface CampaignOperationalMetrics {
  total: number;
  active: number;
  completed: number;
  qa: number;
  urgent: number;
  delayed: number;
  scheduled: number;
  scheduledToday: number;
  upcoming: number;
  byStatus: CampaignCountByStatus;
  byChannel: CampaignCountByChannel;
  health: CampaignHealthMetrics;
}

export function getCampaignStatusDistribution(campaigns: Campaign[]) {
  const total = campaigns.length;
  const byStatus = CAMPAIGN_STATUSES.reduce((acc, status) => {
    acc[status] = campaigns.filter((campaign) => campaign.status === status).length;
    return acc;
  }, {} as CampaignCountByStatus);

  return CAMPAIGN_STATUSES.map((status) => ({
    id: status,
    label: CAMPAIGN_STATUS_LABELS[status],
    count: byStatus[status],
    percentage: getPercentage(byStatus[status], total),
  }));
}

export function getCampaignChannelDistribution(campaigns: Campaign[]) {
  const total = campaigns.length;
  const byChannel = CAMPAIGN_CHANNELS.reduce((acc, channel) => {
    acc[channel] = campaigns.filter((campaign) => campaign.channel === channel).length;
    return acc;
  }, {} as CampaignCountByChannel);

  return CAMPAIGN_CHANNELS.map((channel) => ({
    id: channel,
    label: CAMPAIGN_CHANNEL_LABELS[channel],
    count: byChannel[channel],
    percentage: getPercentage(byChannel[channel], total),
  }));
}

export function getUrgentCampaigns(campaigns: Campaign[]) {
  return campaigns
    .filter((campaign) => campaign.priority === 'urgent' && isActiveCampaign(campaign))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function getScheduledCampaigns(campaigns: Campaign[]) {
  return campaigns
    .filter((campaign) => campaign.status === 'scheduled')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function getUpcomingCampaigns(campaigns: Campaign[], today = new Date(), daysAhead = 7) {
  const todayKey = toDateKey(today);
  const limitKey = toDateKey(addDays(today, daysAhead));

  return campaigns
    .filter(
      (campaign) =>
        isActiveCampaign(campaign) &&
        campaign.dueDate >= todayKey &&
        campaign.dueDate <= limitKey,
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function getDelayedCampaigns(campaigns: Campaign[], today = new Date()) {
  const todayKey = toDateKey(today);

  return campaigns
    .filter((campaign) => isActiveCampaign(campaign) && campaign.dueDate < todayKey)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function getCampaignHealthMetrics(campaigns: Campaign[], today = new Date()): CampaignHealthMetrics {
  const delayed = getDelayedCampaigns(campaigns, today).length;
  const urgent = getUrgentCampaigns(campaigns).length;
  const qa = campaigns.filter((campaign) => campaign.status === 'qa').length;
  const activeCampaigns = campaigns.filter(isActiveCampaign).length;
  const statusDistribution = getCampaignStatusDistribution(campaigns).filter(
    (item) => !inactiveStatuses.includes(item.id),
  );
  const bottleneck = statusDistribution.reduce(
    (current, item) => (item.count > current.count ? item : current),
    statusDistribution[0],
  );
  const score = Math.max(0, Math.min(100, 100 - delayed * 20 - urgent * 12 - qa * 4));
  const riskLevel = score >= 80 ? 'healthy' : score >= 60 ? 'watch' : 'risk';

  return {
    score,
    label: riskLevel === 'healthy' ? 'Healthy' : riskLevel === 'watch' ? 'Needs attention' : 'At risk',
    riskLevel,
    activeCampaigns,
    bottleneckStatus: bottleneck.id,
    bottleneckCount: bottleneck.count,
  };
}

export function getCampaignOperationalMetrics(campaigns: Campaign[], today = new Date()): CampaignOperationalMetrics {
  const statusDistribution = getCampaignStatusDistribution(campaigns);
  const channelDistribution = getCampaignChannelDistribution(campaigns);
  const byStatus = statusDistribution.reduce((acc, item) => {
    acc[item.id] = item.count;
    return acc;
  }, {} as CampaignCountByStatus);
  const byChannel = channelDistribution.reduce((acc, item) => {
    acc[item.id] = item.count;
    return acc;
  }, {} as CampaignCountByChannel);
  const scheduledCampaigns = getScheduledCampaigns(campaigns);
  const todayKey = toDateKey(today);

  return {
    total: campaigns.length,
    active: campaigns.filter(isActiveCampaign).length,
    completed: byStatus.completed,
    qa: byStatus.qa,
    urgent: getUrgentCampaigns(campaigns).length,
    delayed: getDelayedCampaigns(campaigns, today).length,
    scheduled: byStatus.scheduled,
    scheduledToday: scheduledCampaigns.filter((campaign) => campaign.dueDate === todayKey).length,
    upcoming: getUpcomingCampaigns(campaigns, today).length,
    byStatus,
    byChannel,
    health: getCampaignHealthMetrics(campaigns, today),
  };
}
