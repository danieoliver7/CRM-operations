import type { EntityId } from '@/types';

export interface ActivityUser {
  name: string;
  avatar: string;
}

export interface Activity {
  id: EntityId;
  user: ActivityUser;
  action: string;
  target: string;
  timestamp: string;
  type: 'system' | 'user' | 'alert';
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
}
