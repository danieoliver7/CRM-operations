import type { CapacityItem } from '@/modules/campaigns';
import { OperationalPressureBadge } from '@/modules/campaigns';

interface CalendarCapacityIndicatorsProps {
  title: string;
  items: CapacityItem[];
}

export function CalendarCapacityIndicators({ title, items }: CalendarCapacityIndicatorsProps) {
  return (
    <section>
      <h3 className="mb-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{title}</h3>
      <div className="space-y-2">
        {items.slice(0, 5).map((item) => (
          <div key={item.id} className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-xs font-bold text-on-surface">{item.label}</span>
              <OperationalPressureBadge level={item.level} label={String(item.count)} />
            </div>
            {item.urgentCount > 0 && (
              <p className="mt-1 text-[10px] font-bold text-error">{item.urgentCount} urgent</p>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <p className="rounded-lg border border-outline-variant/30 p-3 text-[11px] text-on-surface-variant">
            No active campaign load.
          </p>
        )}
      </div>
    </section>
  );
}
