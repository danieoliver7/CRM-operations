import { create } from 'zustand';
import { MOCK_CAMPAIGNS } from '@/modules/campaigns/mock';
import type { Campaign, CampaignPriority, CampaignStatus } from '@/types/campaign';

interface CampaignsState {
  campaigns: Campaign[];
  getCampaignById: (id: string) => Campaign | undefined;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  updateCampaignStatus: (id: string, status: CampaignStatus) => void;
  updateCampaignPriority: (id: string, priority: CampaignPriority) => void;
  resetCampaigns: () => void;
}

export const useCampaignsStore = create<CampaignsState>((set, get) => ({
  campaigns: MOCK_CAMPAIGNS,
  getCampaignById: (id) => get().campaigns.find((campaign) => campaign.id === id),
  updateCampaign: (id, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updates } : campaign,
      ),
    })),
  updateCampaignStatus: (id, status) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status } : campaign,
      ),
    })),
  updateCampaignPriority: (id, priority) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, priority } : campaign,
      ),
    })),
  resetCampaigns: () => set({ campaigns: MOCK_CAMPAIGNS }),
}));
