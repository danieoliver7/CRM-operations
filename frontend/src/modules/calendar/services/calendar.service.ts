import { resolveMock } from '@/services';
import { getCampaigns } from '@/modules/campaigns/services';
import type { Campaign } from '@/modules/campaigns/types';

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function getCalendarCampaigns(): Promise<Campaign[]> {
  return getCampaigns();
}

export async function getCampaignsByDate(date: Date): Promise<Campaign[]> {
  const campaigns = await getCampaigns();
  const targetDate = toDateKey(date);

  return resolveMock(campaigns.filter((campaign) => campaign.dueDate === targetDate));
}
