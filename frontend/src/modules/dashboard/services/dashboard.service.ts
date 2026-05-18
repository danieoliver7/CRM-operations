import { resolveMock } from '@/services';
import type { ChartDatum } from '@/modules/analytics/types';
import type { Activity, DashboardMetric } from '@/modules/dashboard/types';
import { MOCK_ACTIVITIES, MOCK_DASHBOARD_METRICS, MOCK_PERFORMANCE_DATA } from './dashboard.mock';

export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  return resolveMock(MOCK_DASHBOARD_METRICS);
}

export async function getRecentActivities(): Promise<Activity[]> {
  return resolveMock(MOCK_ACTIVITIES);
}

export async function getPerformanceData(): Promise<ChartDatum[]> {
  return resolveMock(MOCK_PERFORMANCE_DATA);
}
