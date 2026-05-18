import { X } from 'lucide-react';
import {
  CAMPAIGN_CHANNEL_LABELS,
  CAMPAIGN_CHANNELS,
  CAMPAIGN_PRIORITIES,
  CAMPAIGN_PRIORITY_LABELS,
  CAMPAIGN_STATUS_LABELS,
  CAMPAIGN_STATUSES,
} from '@/types/campaign';
import type { CampaignFilters } from '@/modules/campaigns/utils';

interface CampaignFiltersBarProps {
  filters: CampaignFilters;
  owners?: string[];
  onFilterChange: <TKey extends keyof CampaignFilters>(key: TKey, value: CampaignFilters[TKey] | '') => void;
  onReset: () => void;
  resultCount: number;
  totalCount: number;
}

export function CampaignFiltersBar({
  filters,
  owners = [],
  onFilterChange,
  onReset,
  resultCount,
  totalCount,
}: CampaignFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={filters.status ?? ''}
        onChange={(event) => onFilterChange('status', event.target.value as CampaignFilters['status'] | '')}
        className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-primary/50 transition-all"
      >
        <option value="">All status</option>
        {CAMPAIGN_STATUSES.map((status) => (
          <option key={status} value={status}>
            {CAMPAIGN_STATUS_LABELS[status]}
          </option>
        ))}
      </select>

      <select
        value={filters.channel ?? ''}
        onChange={(event) => onFilterChange('channel', event.target.value as CampaignFilters['channel'] | '')}
        className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-primary/50 transition-all"
      >
        <option value="">All channels</option>
        {CAMPAIGN_CHANNELS.map((channel) => (
          <option key={channel} value={channel}>
            {CAMPAIGN_CHANNEL_LABELS[channel]}
          </option>
        ))}
      </select>

      <select
        value={filters.priority ?? ''}
        onChange={(event) => onFilterChange('priority', event.target.value as CampaignFilters['priority'] | '')}
        className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-primary/50 transition-all"
      >
        <option value="">All priorities</option>
        {CAMPAIGN_PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {CAMPAIGN_PRIORITY_LABELS[priority]}
          </option>
        ))}
      </select>

      {owners.length > 0 && (
        <select
          value={filters.owner ?? ''}
          onChange={(event) => onFilterChange('owner', event.target.value)}
          className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-primary/50 transition-all"
        >
          <option value="">All owners</option>
          {owners.map((owner) => (
            <option key={owner} value={owner}>
              {owner}
            </option>
          ))}
        </select>
      )}

      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-auto">
        Showing {resultCount} of {totalCount}
      </span>

      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-1 px-3 py-2 border border-outline-variant/50 rounded-xl text-xs font-bold hover:bg-surface-container transition-all disabled:opacity-40"
        disabled={resultCount === totalCount}
      >
        <X className="w-3.5 h-3.5" />
        Clear
      </button>
    </div>
  );
}
