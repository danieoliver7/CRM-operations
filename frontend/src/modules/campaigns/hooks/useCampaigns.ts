import { useCampaignsStore } from '@/stores';

export function useCampaigns() {
  const campaigns = useCampaignsStore((state) => state.campaigns);

  return {
    campaigns,
    isLoading: false,
  };
}
