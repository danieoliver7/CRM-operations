import { cn } from '@/utils/cn';
import type { TimelineEventImportance } from '@/types/domain';

interface TimelineEventImportanceBadgeProps {
  importance: TimelineEventImportance;
}

const importanceStyles: Record<TimelineEventImportance, string> = {
  low: 'border-outline-variant/40 bg-surface-container-low text-on-surface-variant',
  normal: 'border-primary/20 bg-primary/10 text-primary',
  high: 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  critical: 'border-error/30 bg-error/10 text-error',
};

export function TimelineEventImportanceBadge({ importance }: TimelineEventImportanceBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest',
        importanceStyles[importance],
      )}
    >
      {importance}
    </span>
  );
}
