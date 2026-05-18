import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CampaignMetricProps {
  label: string;
  value: string | number;
  trend: string;
  icon: LucideIcon;
  colorClassName: string;
  trendClassName?: string;
  borderClassName?: string;
}

export function CampaignMetric({
  label,
  value,
  trend,
  icon: Icon,
  colorClassName,
  trendClassName = 'text-green-500',
  borderClassName,
}: CampaignMetricProps) {
  return (
    <div className={cn('bg-surface-container border border-outline p-4 rounded-md flex flex-col justify-between shadow-sm', borderClassName)}>
      <div className="flex items-start justify-between">
        <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">{label}</span>
        <Icon className={cn('w-4 h-4', colorClassName)} />
      </div>
      <div className="mt-4">
        <span className="text-2xl font-bold text-on-surface">{value}</span>
        <p className={cn('text-[10px] mt-1 font-bold', trendClassName)}>{trend}</p>
      </div>
    </div>
  );
}

