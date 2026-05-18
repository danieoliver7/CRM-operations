import { CAMPAIGN_CHANNEL_STYLES } from './presentation';
import type { CampaignChannel } from '@/types/campaign';
import { cn } from '@/utils/cn';

interface CampaignChannelIconProps {
  channel: CampaignChannel;
  className?: string;
  iconClassName?: string;
  variant?: 'plain' | 'badge';
  showLabel?: boolean;
}

export function CampaignChannelIcon({
  channel,
  className,
  iconClassName,
  variant = 'plain',
  showLabel = false,
}: CampaignChannelIconProps) {
  const style = CAMPAIGN_CHANNEL_STYLES[channel];
  const Icon = style.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2',
        variant === 'badge' && 'rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
        variant === 'badge' && style.badgeClassName,
        className,
      )}
    >
      <Icon className={cn('w-4 h-4', variant === 'badge' ? '' : style.textClassName, iconClassName)} />
      {showLabel && (
        <span className={cn('font-bold', variant === 'badge' ? 'text-[10px]' : 'text-xs')}>
          {style.label}
        </span>
      )}
    </span>
  );
}
