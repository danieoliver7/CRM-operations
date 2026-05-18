import type { LucideIcon } from 'lucide-react';
import { CampaignMetric } from '@/components/shared/campaign';

interface OperationalMetricCardProps {
  label: string;
  value: string | number;
  trend: string;
  icon: LucideIcon;
  colorClassName: string;
  trendClassName?: string;
  borderClassName?: string;
}

export function OperationalMetricCard(props: OperationalMetricCardProps) {
  return <CampaignMetric {...props} />;
}
