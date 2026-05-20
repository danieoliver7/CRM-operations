import { useCampaignsStore } from '@/stores';

export function useCampaigns() {
  const campaigns = useCampaignsStore((state) => state.campaigns);
  const createCampaign = useCampaignsStore((state) => state.createCampaign);

  return {
    campaigns,
    createCampaign,
    isLoading: false,
  };
}
