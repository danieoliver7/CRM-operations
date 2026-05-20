import { X } from 'lucide-react';
import {
  CAMPAIGN_CHANNEL_LABELS,
  CAMPAIGN_CHANNELS,
  CAMPAIGN_PRIORITIES,
  CAMPAIGN_PRIORITY_LABELS,
} from '@/types/campaign';
import type { CampaignFilters } from '@/modules/campaigns';

interface CalendarFiltersProps {
  filters: CampaignFilters;
  owners: string[];
  squads: string[];
  onFilterChange: <TKey extends keyof CampaignFilters>(key: TKey, value: CampaignFilters[TKey] | '') => void;
  onReset: () => void;
}

const selectClassName =
  'w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-primary/50 transition-all';

export function CalendarFilters({
  filters,
  owners,
  squads,
  onFilterChange,
  onReset,
}: CalendarFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Planning filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-[10px] font-bold text-on-surface-variant hover:text-on-surface"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      </div>

      <select value={filters.owner ?? ''} onChange={(event) => onFilterChange('owner', event.target.value)} className={selectClassName}>
        <option value="">All owners</option>
        {owners.map((owner) => (
          <option key={owner} value={owner}>{owner}</option>
        ))}
      </select>

      <select value={filters.squad ?? ''} onChange={(event) => onFilterChange('squad', event.target.value)} className={selectClassName}>
        <option value="">All squads</option>
        {squads.map((squad) => (
          <option key={squad} value={squad}>{squad}</option>
        ))}
      </select>

      <select value={filters.channel ?? ''} onChange={(event) => onFilterChange('channel', event.target.value as CampaignFilters['channel'] | '')} className={selectClassName}>
        <option value="">All channels</option>
        {CAMPAIGN_CHANNELS.map((channel) => (
          <option key={channel} value={channel}>{CAMPAIGN_CHANNEL_LABELS[channel]}</option>
        ))}
      </select>

      <select value={filters.priority ?? ''} onChange={(event) => onFilterChange('priority', event.target.value as CampaignFilters['priority'] | '')} className={selectClassName}>
        <option value="">All priorities</option>
        {CAMPAIGN_PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>{CAMPAIGN_PRIORITY_LABELS[priority]}</option>
        ))}
      </select>
    </div>
  );
}
