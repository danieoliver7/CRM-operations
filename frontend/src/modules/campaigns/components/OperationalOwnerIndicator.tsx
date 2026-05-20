import { UserRound } from 'lucide-react';
import type { CampaignCoordinationContext } from '@/modules/campaigns/utils';
import { cn } from '@/utils/cn';

interface OperationalOwnerIndicatorProps {
  context: CampaignCoordinationContext;
  compact?: boolean;
}

export function OperationalOwnerIndicator({ context, compact = false }: OperationalOwnerIndicatorProps) {
  const hasMissingOwner = context.state === 'missing-owner';

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border bg-surface-container-low/40',
        compact ? 'px-2 py-1' : 'p-3',
        hasMissingOwner ? 'border-error/25 text-error' : 'border-outline-variant/30 text-on-surface-variant',
      )}
    >
      <UserRound className={cn('shrink-0', compact ? 'h-3.5 w-3.5' : 'h-4 w-4')} />
      <div className="min-w-0">
        {!compact && (
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
            Operational owner
          </p>
        )}
        <p className={cn('truncate font-bold', compact ? 'text-[10px]' : 'text-xs')}>
          {hasMissingOwner ? 'Owner required' : context.campaign.owner.name}
        </p>
      </div>
    </div>
  );
}
