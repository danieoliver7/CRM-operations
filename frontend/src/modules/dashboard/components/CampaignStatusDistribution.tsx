import { CAMPAIGN_STATUS_STYLES } from '@/components/shared/campaign';
import type { CampaignDistributionItem } from '@/modules/dashboard/utils';
import type { CampaignStatus } from '@/types/campaign';
import { cn } from '@/utils/cn';

interface CampaignStatusDistributionProps {
  items: CampaignDistributionItem<CampaignStatus>[];
}

export function CampaignStatusDistribution({ items }: CampaignStatusDistributionProps) {
  return (
    <div className="bg-surface-container border border-outline p-6 rounded-md flex flex-col gap-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight">Workflow Distribution</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">By status</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className={cn('w-2.5 h-2.5 rounded-full', CAMPAIGN_STATUS_STYLES[item.id].dotClassName)} />
                <span className="font-bold uppercase tracking-wider text-on-surface-variant">{item.label}</span>
              </div>
              <span className="text-on-surface-variant font-mono">{item.count}</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-500', CAMPAIGN_STATUS_STYLES[item.id].dotClassName)}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
