import { Plus } from 'lucide-react';
import { CAMPAIGN_STATUS_STYLES } from '@/components/shared/campaign';
import type { KanbanColumn } from '@/modules/kanban/types';
import { CampaignKanbanCard } from './CampaignKanbanCard';
import type { Campaign } from '@/types/campaign';
import { cn } from '@/utils/cn';

interface CampaignKanbanColumnProps {
  column: KanbanColumn;
  campaigns: Campaign[];
}

export function CampaignKanbanColumn({ column, campaigns }: CampaignKanbanColumnProps) {
  const statusStyle = CAMPAIGN_STATUS_STYLES[column.id];
  const hasUrgentCampaign = campaigns.some((campaign) => campaign.priority === 'urgent');

  return (
    <div className="w-[240px] flex flex-col h-full space-y-4">
      <div
        className={cn(
          'flex items-center justify-between px-1 py-1 rounded-md',
          hasUrgentCampaign && 'bg-error/5',
        )}
      >
        <div className="flex items-center space-x-2">
          <span className={cn('w-2.5 h-2.5 rounded-full', statusStyle.dotClassName)} />
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            {column.title}
          </span>
          <span
            className={cn(
              'text-[10px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant font-medium',
              hasUrgentCampaign && 'bg-error/10 text-error',
            )}
          >
            {campaigns.length}
          </span>
          {hasUrgentCampaign && (
            <span className="text-[9px] font-black text-error uppercase tracking-tighter">P1</span>
          )}
        </div>
        <span className="text-on-surface-variant text-lg cursor-pointer hover:text-on-surface transition-colors">+</span>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar pr-1">
        {campaigns.length === 0 && (
          <div className="h-32 rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest/20 flex flex-col items-center justify-center gap-2 text-on-surface-variant group hover:border-primary/50 transition-all cursor-pointer">
            <Plus className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-all" />
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-20 group-hover:opacity-100 animate-pulse">
              Draft Here
            </span>
          </div>
        )}

        {campaigns.map((campaign) => (
          <CampaignKanbanCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
