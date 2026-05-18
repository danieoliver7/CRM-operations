import { useMemo } from 'react';
import { useFilters } from '@/hooks';
import type { CampaignFilterShape, UseCampaignFiltersOptions } from '@/modules/campaigns/types';

const defaultFilters: CampaignFilterShape = {
  channel: '',
  owner: '',
  priority: '',
  squad: '',
  status: '',
};

export function useCampaignFilters<TCampaign extends CampaignFilterShape>({
  campaigns,
  initialFilters = defaultFilters,
}: UseCampaignFiltersOptions<TCampaign>) {
  const filterState = useFilters(initialFilters);

  const filteredCampaigns = useMemo(
    () =>
      campaigns.filter((campaign) =>
        Object.entries(filterState.filters).every(([key, value]) => {
          if (!value) return true;

          return campaign[key as keyof CampaignFilterShape] === value;
        }),
      ),
    [campaigns, filterState.filters],
  );

  return {
    ...filterState,
    filteredCampaigns,
  };
}
