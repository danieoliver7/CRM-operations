import { CAMPAIGN_PRIORITY_STYLES } from './presentation';
import type { CampaignPriority } from '@/types/campaign';
import { cn } from '@/utils/cn';

interface CampaignPriorityBadgeProps {
  priority: CampaignPriority;
  className?: string;
  shortLabel?: boolean;
}

export function CampaignPriorityBadge({ priority, className, shortLabel = false }: CampaignPriorityBadgeProps) {
  const style = CAMPAIGN_PRIORITY_STYLES[priority];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter',
        style.badgeClassName,
        className,
      )}
    >
      {shortLabel && priority === 'urgent' ? 'P1' : style.label}
    </span>
  );
}

