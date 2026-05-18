import type { ChartDatum, KpiStats } from '@/modules/analytics/types';

export const MOCK_KPI_STATS: KpiStats = {
  openRate: 24.5,
  ctr: 5.2,
  bounceRate: 0.4,
  conversionRate: 1.8,
  revenue: 142500,
  deliveryRate: 99.8,
};

export const MOCK_KPI_TREND = [
  { day: '01', revenue: 4000, conv: 2.4 },
  { day: '05', revenue: 3000, conv: 1.8 },
  { day: '10', revenue: 5000, conv: 3.2 },
  { day: '15', revenue: 4500, conv: 2.1 },
  { day: '20', revenue: 7000, conv: 4.5 },
  { day: '25', revenue: 6000, conv: 3.8 },
  { day: '30', revenue: 8000, conv: 5.2 },
];

export const MOCK_CHANNEL_PERFORMANCE: ChartDatum[] = [
  { name: 'Email', value: 42 },
  { name: 'SMS', value: 28 },
  { name: 'Push', value: 18 },
  { name: 'Webhooks', value: 12 },
];
