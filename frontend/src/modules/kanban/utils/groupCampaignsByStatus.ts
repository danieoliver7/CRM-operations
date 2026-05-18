import { CAMPAIGN_STATUSES, type Campaign, type CampaignStatus } from '@/types/campaign';

export type CampaignsByStatus = Record<CampaignStatus, Campaign[]>;

export function groupCampaignsByStatus(campaigns: Campaign[]): CampaignsByStatus {
  const grouped = CAMPAIGN_STATUSES.reduce((acc, status) => {
    acc[status] = [];
    return acc;
  }, {} as CampaignsByStatus);

  campaigns.forEach((campaign) => {
    grouped[campaign.status].push(campaign);
  });

  return grouped;
}
