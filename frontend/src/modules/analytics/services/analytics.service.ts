import { resolveMock } from '@/services';
import type { ChartDatum, KpiStats } from '@/modules/analytics/types';
import { MOCK_CHANNEL_PERFORMANCE, MOCK_KPI_STATS, MOCK_KPI_TREND } from './analytics.mock';

export async function getKpiStats(): Promise<KpiStats> {
  return resolveMock(MOCK_KPI_STATS);
}

export async function getKpiTrend() {
  return resolveMock(MOCK_KPI_TREND);
}

export async function getChannelPerformance(): Promise<ChartDatum[]> {
  return resolveMock(MOCK_CHANNEL_PERFORMANCE);
}
