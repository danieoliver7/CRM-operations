import type { EntityId, TimestampedEntity } from './base';

export type CampaignMetricType =
  | 'delivery_rate'
  | 'open_rate'
  | 'click_rate'
  | 'conversion_rate'
  | 'revenue'
  | 'custom';

export interface CampaignMetric extends TimestampedEntity {
  campaignId: EntityId;
  metricType: CampaignMetricType;
  value: number;
  source?: string;
  capturedAt: string;
}
