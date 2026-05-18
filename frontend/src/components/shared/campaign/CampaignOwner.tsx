import type { CampaignOwner as CampaignOwnerValue } from '@/types/campaign';
import { cn } from '@/utils/cn';

interface CampaignOwnerProps {
  owner: CampaignOwnerValue;
  avatarClassName?: string;
  className?: string;
  compact?: boolean;
}

export function CampaignOwner({ owner, avatarClassName, className, compact = false }: CampaignOwnerProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img
        src={owner.avatar}
        className={cn(
          compact ? 'w-5 h-5' : 'w-7 h-7',
          'rounded-full border border-outline-variant/30',
          avatarClassName,
        )}
        alt=""
      />
      {!compact && (
        <span className="text-xs font-medium text-on-surface-variant group-hover:text-on-surface">
          {owner.name}
        </span>
      )}
    </div>
  );
}

