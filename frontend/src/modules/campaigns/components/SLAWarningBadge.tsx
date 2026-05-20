import { Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { SLAState } from '@/modules/campaigns/utils';

interface SLAWarningBadgeProps {
  slaState: SLAState;
  daysUntilDue: number;
  className?: string;
}

function getLabel(slaState: SLAState, daysUntilDue: number) {
  if (slaState === 'overdue') return `Overdue ${Math.abs(daysUntilDue)}d`;
  if (slaState === 'delayed') return 'Delayed';
  if (slaState === 'due-soon') return daysUntilDue === 0 ? 'Due today' : 'Due soon';
  return 'On track';
}

const slaStyles: Record<SLAState, string> = {
  'on-track': 'border-outline-variant/40 bg-surface-container-low text-on-surface-variant',
  'due-soon': 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  delayed: 'border-error/25 bg-error/10 text-error',
  overdue: 'border-error/35 bg-error/15 text-error',
};

export function SLAWarningBadge({ slaState, daysUntilDue, className }: SLAWarningBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest',
        slaStyles[slaState],
        className,
      )}
    >
      <Clock className="h-3 w-3" />
      {getLabel(slaState, daysUntilDue)}
    </span>
  );
}
