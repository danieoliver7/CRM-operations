import { CheckCircle2, Circle } from 'lucide-react';
import type { CampaignChecklistItem } from '@/modules/campaigns/hooks';
import { cn } from '@/utils/cn';

interface CampaignChecklistProps {
  items: CampaignChecklistItem[];
  onToggleItem: (itemId: string) => void;
}

export function CampaignChecklist({ items, onToggleItem }: CampaignChecklistProps) {
  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight">Operational Checklist</h3>
        <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">
          {items.filter((item) => item.done).length}/{items.length}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggleItem(item.id)}
            className="flex w-full items-center gap-3 rounded-lg text-left hover:bg-surface-container-high/50 transition-all"
          >
            {item.done ? (
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-on-surface-variant/50 shrink-0" />
            )}
            <span className={cn('text-xs font-bold', item.done ? 'text-on-surface' : 'text-on-surface-variant')}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
