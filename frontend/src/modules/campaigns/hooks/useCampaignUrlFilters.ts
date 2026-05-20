import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CAMPAIGN_CHANNELS,
  CAMPAIGN_PRIORITIES,
  CAMPAIGN_STATUSES,
  type CampaignChannel,
  type CampaignPriority,
  type CampaignStatus,
} from '@/types/campaign';
import type { CampaignFilters } from '@/modules/campaigns/utils';

function getValidParam<TValue extends string>(value: string | null, allowedValues: readonly TValue[]) {
  if (!value) return undefined;

  return allowedValues.includes(value as TValue) ? (value as TValue) : undefined;
}

export function useCampaignUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<CampaignFilters>(
    () => ({
      status: getValidParam<CampaignStatus>(searchParams.get('status'), CAMPAIGN_STATUSES),
      channel: getValidParam<CampaignChannel>(searchParams.get('channel'), CAMPAIGN_CHANNELS),
      priority: getValidParam<CampaignPriority>(searchParams.get('priority'), CAMPAIGN_PRIORITIES),
      owner: searchParams.get('owner') || undefined,
      squad: searchParams.get('squad') || undefined,
    }),
    [searchParams],
  );

  function setFilter<TKey extends keyof CampaignFilters>(key: TKey, value: CampaignFilters[TKey] | '') {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, String(value));
    } else {
      nextParams.delete(key);
    }

    setSearchParams(nextParams);
  }

  function resetFilters() {
    setSearchParams(new URLSearchParams());
  }

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return {
    filters,
    setFilter,
    resetFilters,
    hasActiveFilters,
  };
}
