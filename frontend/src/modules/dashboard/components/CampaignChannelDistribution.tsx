import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CampaignChannelIcon } from '@/components/shared/campaign';
import type { CampaignDistributionItem } from '@/modules/dashboard/utils';
import type { CampaignChannel } from '@/types/campaign';

interface CampaignChannelDistributionProps {
  items: CampaignDistributionItem<CampaignChannel>[];
  total: number;
}

export function CampaignChannelDistribution({ items, total }: CampaignChannelDistributionProps) {
  return (
    <div className="bg-surface-container border border-outline p-6 rounded-md flex flex-col gap-6 shadow-sm">
      <h2 className="text-base font-semibold tracking-tight">Channel Mix</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <Link key={item.id} to={`/campaigns?channel=${item.id}`} className="block space-y-2 group">
            <div className="flex justify-between items-center text-xs">
              <CampaignChannelIcon channel={item.id} showLabel />
              <span className="text-on-surface-variant font-mono">
                {item.count} / {total}
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500" style={{ width: `${item.percentage}%` }} />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto p-4 bg-surface-container-low rounded-lg border border-outline-variant">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0">
            <TrendingUp className="text-secondary w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold">Operational Mix</p>
            <p className="text-[11px] text-on-surface-variant mt-1">
              Active CRM work is distributed across {items.filter((item) => item.count > 0).length} channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
