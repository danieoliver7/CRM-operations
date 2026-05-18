import { CAMPAIGN_STATUS_STYLES } from './presentation';
import type { CampaignStatus } from '@/types/campaign';
import { cn } from '@/utils/cn';

interface CampaignStatusBadgeProps {
  status: CampaignStatus;
  className?: string;
  compact?: boolean;
}

export function CampaignStatusBadge({ status, className, compact = false }: CampaignStatusBadgeProps) {
  const style = CAMPAIGN_STATUS_STYLES[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded border font-bold uppercase',
        compact ? 'px-2 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[10px] tracking-wider',
        style.badgeClassName,
        className,
      )}
    >
      {style.label}
    </span>
  );
}

