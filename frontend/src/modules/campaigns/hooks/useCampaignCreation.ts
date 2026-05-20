import { useState } from 'react';
import { useCampaigns } from './useCampaigns';
import type { Campaign } from '@/types/campaign';

export function useCampaignCreation() {
  const { createCampaign } = useCampaigns();
  const [isCreationOpen, setIsCreationOpen] = useState(false);

  function openCampaignCreation() {
    setIsCreationOpen(true);
  }

  function closeCampaignCreation() {
    setIsCreationOpen(false);
  }

  function handleCreateCampaign(campaign: Campaign) {
    createCampaign(campaign);
    closeCampaignCreation();
  }

  return {
    closeCampaignCreation,
    handleCreateCampaign,
    isCreationOpen,
    openCampaignCreation,
  };
}
