import type { CampaignChannel, CampaignPriority, CampaignStatus } from '@/types/campaign';

export interface CampaignFilterShape {
  channel?: CampaignChannel | '';
  owner?: string;
  priority?: CampaignPriority | '';
  squad?: string;
  status?: CampaignStatus | '';
}

export interface UseCampaignFiltersOptions<TCampaign extends CampaignFilterShape> {
  campaigns: TCampaign[];
  initialFilters?: CampaignFilterShape;
}
