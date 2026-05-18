import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CampaignMetric } from '@/components/shared/campaign';

interface OperationalMetricCardProps {
  label: string;
  value: string | number;
  trend: string;
  icon: LucideIcon;
  colorClassName: string;
  trendClassName?: string;
  borderClassName?: string;
  to?: string;
}

export function OperationalMetricCard({ to, ...metricProps }: OperationalMetricCardProps) {
  if (!to) return <CampaignMetric {...metricProps} />;

  return (
    <Link to={to} className="block transition-transform hover:-translate-y-0.5">
      <CampaignMetric {...metricProps} />
    </Link>
  );
}
