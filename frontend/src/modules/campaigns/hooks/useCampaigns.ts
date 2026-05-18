import { useEffect, useState } from 'react';
import { getCampaigns } from '@/modules/campaigns/services';
import type { Campaign } from '@/types/campaign';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getCampaigns()
      .then((data) => {
        if (isMounted) setCampaigns(data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    campaigns,
    isLoading,
  };
}
