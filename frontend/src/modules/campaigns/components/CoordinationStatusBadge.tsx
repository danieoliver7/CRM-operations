import { ArrowRightLeft, Clock, UserRoundX, Workflow, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { CoordinationState } from '@/modules/campaigns/utils';

interface CoordinationStatusBadgeProps {
  state: CoordinationState;
  className?: string;
}

const stateConfig = {
  clear: {
    label: 'Clear',
    icon: Workflow,
    className: 'border-green-500/20 bg-green-500/10 text-green-400',
  },
  waiting: {
    label: 'Waiting',
    icon: Clock,
    className: 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  },
  handoff: {
    label: 'Handoff',
    icon: ArrowRightLeft,
    className: 'border-secondary/30 bg-secondary/10 text-secondary',
  },
  stalled: {
    label: 'Stalled',
    icon: XCircle,
    className: 'border-error/30 bg-error/10 text-error',
  },
  'missing-owner': {
    label: 'No owner',
    icon: UserRoundX,
    className: 'border-error/30 bg-error/10 text-error',
  },
};

export function CoordinationStatusBadge({ state, className }: CoordinationStatusBadgeProps) {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest',
        config.className,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
