export interface CampaignFilterShape {
  channel?: string;
  owner?: string;
  priority?: string;
  squad?: string;
  status?: string;
}

export interface UseCampaignFiltersOptions<TCampaign extends CampaignFilterShape> {
  campaigns: TCampaign[];
  initialFilters?: CampaignFilterShape;
}
