import type { Campaign, CampaignChannel, CampaignPriority, CampaignStatus } from '@/types/campaign';

export interface CampaignFilters {
  status?: CampaignStatus;
  channel?: CampaignChannel;
  priority?: CampaignPriority;
  owner?: string;
  squad?: string;
}

export function filterCampaigns(campaigns: Campaign[], filters: CampaignFilters) {
  const ownerFilter = filters.owner?.trim().toLowerCase();
  const squadFilter = filters.squad?.trim().toLowerCase();

  return campaigns.filter((campaign) => {
    if (filters.status && campaign.status !== filters.status) return false;
    if (filters.channel && campaign.channel !== filters.channel) return false;
    if (filters.priority && campaign.priority !== filters.priority) return false;
    if (ownerFilter && !campaign.owner.name.toLowerCase().includes(ownerFilter)) return false;
    if (squadFilter && campaign.squad.toLowerCase() !== squadFilter) return false;

    return true;
  });
}
