import {
  CAMPAIGN_STATUSES,
  CAMPAIGN_STATUS_LABELS,
  type Campaign,
  type CampaignStatus,
} from '@/types/campaign';

type PressureLevel = 'normal' | 'watch' | 'overloaded';
type CapacityEntity = 'day' | 'owner' | 'squad' | 'stage' | 'channel';

export interface CapacityItem {
  id: string;
  label: string;
  count: number;
  urgentCount: number;
  level: PressureLevel;
  entity: CapacityEntity;
}

export interface CapacityWarning {
  id: string;
  title: string;
  description: string;
  level: Exclude<PressureLevel, 'normal'>;
  to?: string;
}

export interface CapacityMetrics {
  campaignsPerDay: CapacityItem[];
  campaignsPerOwner: CapacityItem[];
  campaignsPerSquad: CapacityItem[];
  overloadedDays: CapacityItem[];
  overloadedOwners: CapacityItem[];
  overloadedSquads: CapacityItem[];
  overloadedStages: CapacityItem[];
  urgentConcentration: CapacityItem[];
  warnings: CapacityWarning[];
}

const inactiveStatuses: CampaignStatus[] = ['sent', 'completed'];

function getPressureLevel(count: number, watchAt: number, overloadAt: number): PressureLevel {
  if (count >= overloadAt) return 'overloaded';
  if (count >= watchAt) return 'watch';
  return 'normal';
}

function formatDateLabel(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
}

function getActiveCampaigns(campaigns: Campaign[]) {
  return campaigns.filter((campaign) => !inactiveStatuses.includes(campaign.status));
}

function groupCampaigns(
  campaigns: Campaign[],
  entity: CapacityEntity,
  getKey: (campaign: Campaign) => string,
  getLabel: (key: string) => string,
  watchAt: number,
  overloadAt: number,
) {
  const groups = new Map<string, Campaign[]>();

  campaigns.forEach((campaign) => {
    const key = getKey(campaign);
    groups.set(key, [...(groups.get(key) ?? []), campaign]);
  });

  return Array.from(groups.entries())
    .map(([key, items]) => {
      const urgentCount = items.filter((campaign) => campaign.priority === 'urgent').length;

      return {
        id: key,
        label: getLabel(key),
        count: items.length,
        urgentCount,
        level: getPressureLevel(items.length + urgentCount, watchAt, overloadAt),
        entity,
      } satisfies CapacityItem;
    })
    .sort((a, b) => b.count + b.urgentCount - (a.count + a.urgentCount));
}

function getStageItems(campaigns: Campaign[]) {
  return CAMPAIGN_STATUSES.map((status) => {
    const items = campaigns.filter((campaign) => campaign.status === status);
    const urgentCount = items.filter((campaign) => campaign.priority === 'urgent').length;

    return {
      id: status,
      label: CAMPAIGN_STATUS_LABELS[status],
      count: items.length,
      urgentCount,
      level: getPressureLevel(items.length + urgentCount, 3, 5),
      entity: 'stage',
    } satisfies CapacityItem;
  }).filter((item) => item.count > 0);
}

export function getCapacityMetrics(campaigns: Campaign[]): CapacityMetrics {
  const activeCampaigns = getActiveCampaigns(campaigns);
  const campaignsPerDay = groupCampaigns(
    activeCampaigns,
    'day',
    (campaign) => campaign.dueDate,
    formatDateLabel,
    3,
    5,
  );
  const campaignsPerOwner = groupCampaigns(
    activeCampaigns,
    'owner',
    (campaign) => campaign.owner.name,
    (owner) => owner,
    3,
    5,
  );
  const campaignsPerSquad = groupCampaigns(
    activeCampaigns,
    'squad',
    (campaign) => campaign.squad,
    (squad) => squad,
    3,
    5,
  );
  const overloadedStages = getStageItems(activeCampaigns).filter((item) => item.level !== 'normal');
  const urgentConcentration = campaignsPerOwner.filter((item) => item.urgentCount >= 2);
  const overloadedDays = campaignsPerDay.filter((item) => item.level !== 'normal');
  const overloadedOwners = campaignsPerOwner.filter((item) => item.level !== 'normal');
  const overloadedSquads = campaignsPerSquad.filter((item) => item.level !== 'normal');

  const warnings: CapacityWarning[] = [
    ...overloadedDays.slice(0, 2).map((item) => ({
      id: `day-${item.id}`,
      title: `${item.count} campaigns planned for ${item.label}`,
      description: item.urgentCount > 0
        ? `${item.urgentCount} urgent campaign${item.urgentCount > 1 ? 's' : ''} in the same day.`
        : 'High delivery concentration for the day.',
      level: item.level === 'overloaded' ? 'overloaded' : 'watch',
      to: `/calendar?date=${item.id}`,
    }) satisfies CapacityWarning),
    ...overloadedOwners.slice(0, 2).map((item) => ({
      id: `owner-${item.id}`,
      title: `${item.label} has ${item.count} active campaigns`,
      description: item.urgentCount > 0
        ? `${item.urgentCount} urgent campaign${item.urgentCount > 1 ? 's' : ''} assigned.`
        : 'Owner workload is trending high.',
      level: item.level === 'overloaded' ? 'overloaded' : 'watch',
      to: `/campaigns?owner=${encodeURIComponent(item.id)}`,
    }) satisfies CapacityWarning),
    ...overloadedStages.slice(0, 1).map((item) => ({
      id: `stage-${item.id}`,
      title: `${item.label} stage is under pressure`,
      description: `${item.count} active campaign${item.count > 1 ? 's' : ''} in this workflow stage.`,
      level: item.level === 'overloaded' ? 'overloaded' : 'watch',
      to: `/kanban?status=${item.id}`,
    }) satisfies CapacityWarning),
  ];

  return {
    campaignsPerDay,
    campaignsPerOwner,
    campaignsPerSquad,
    overloadedDays,
    overloadedOwners,
    overloadedSquads,
    overloadedStages,
    urgentConcentration,
    warnings,
  };
}
