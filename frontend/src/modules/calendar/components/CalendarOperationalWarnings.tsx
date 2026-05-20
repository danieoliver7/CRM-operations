import { AlertTriangle } from 'lucide-react';
import type { CapacityWarning } from '@/modules/campaigns';
import { OperationalPressureBadge } from '@/modules/campaigns';
import { cn } from '@/utils/cn';

interface CalendarOperationalWarningsProps {
  warnings: CapacityWarning[];
}

export function CalendarOperationalWarnings({ warnings }: CalendarOperationalWarningsProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-tertiary" />
        <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          Operational pressure
        </h3>
      </div>

      <div className="space-y-2">
        {warnings.slice(0, 4).map((warning) => (
          <div
            key={warning.id}
            className={cn(
              'rounded-lg border p-3',
              warning.level === 'overloaded'
                ? 'border-error/20 bg-error/5'
                : 'border-tertiary/20 bg-tertiary/5',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-bold leading-snug text-on-surface">{warning.title}</p>
              <OperationalPressureBadge level={warning.level} className="shrink-0" />
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{warning.description}</p>
          </div>
        ))}
        {warnings.length === 0 && (
          <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3">
            <p className="text-xs font-bold text-on-surface">No overload signals</p>
            <p className="mt-1 text-[11px] text-on-surface-variant">Future campaign distribution looks manageable.</p>
          </div>
        )}
      </div>
    </section>
  );
}
