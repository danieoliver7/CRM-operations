import type { Activity, DashboardMetric } from '@/modules/dashboard/types';

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    user: { name: 'Liam Foster', avatar: 'https://i.pravatar.cc/150?u=liam' },
    action: 'approved',
    target: 'Global Loyalty Email',
    timestamp: '2 minutes ago',
    type: 'user',
  },
  {
    id: 'a2',
    user: { name: 'System', avatar: '' },
    action: 'flagged',
    target: 'High Bounce Rate on Node #2',
    timestamp: '12 minutes ago',
    type: 'alert',
  },
];

export const MOCK_DASHBOARD_METRICS: DashboardMetric[] = [
  { label: 'Total Campaigns', value: '1,284', trend: '+12% vs LY' },
  { label: 'SLA Adherence', value: '99.2%', trend: '+0.4% stability' },
  { label: 'Overdue Tasks', value: '14', trend: 'Requires Attention' },
  { label: 'Pending Approval', value: '28', trend: 'Awaiting Stakeholder' },
];

export const MOCK_PERFORMANCE_DATA = [
  { name: '08:00', value: 30 },
  { name: '10:00', value: 45 },
  { name: '12:00', value: 38 },
  { name: '14:00', value: 65 },
  { name: '16:00', value: 50 },
  { name: '18:00', value: 80 },
  { name: '20:00', value: 40 },
];
