import { resolveMock } from '@/services';
import type { EntityId } from '@/types';
import type { Campaign } from '@/modules/campaigns/types';
import { MOCK_CAMPAIGNS } from '@/modules/campaigns/mock';

export async function getCampaigns(): Promise<Campaign[]> {
  return resolveMock(MOCK_CAMPAIGNS);
}

export async function getCampaignById(id: EntityId): Promise<Campaign | undefined> {
  return resolveMock(MOCK_CAMPAIGNS.find((campaign) => campaign.id === id));
}

export async function getCampaignsByStatus(status: Campaign['status']): Promise<Campaign[]> {
  return resolveMock(MOCK_CAMPAIGNS.filter((campaign) => campaign.status === status));
}
