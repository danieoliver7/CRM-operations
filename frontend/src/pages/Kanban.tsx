import { useMemo } from 'react';
import {
  CampaignFiltersBar,
  filterCampaigns,
  getCoordinationMetrics,
  useCampaigns,
  useCampaignUrlFilters,
} from '@/modules/campaigns';
import {
  CampaignKanbanColumn,
  groupCampaignsByStatus,
  KANBAN_COLUMNS,
} from '@/modules/kanban';

export default function KanbanBoard() {
  const { campaigns } = useCampaigns();
  const { filters, setFilter, resetFilters } = useCampaignUrlFilters();
  const filteredCampaigns = useMemo(() => filterCampaigns(campaigns, filters), [campaigns, filters]);
  const campaignsByStatus = useMemo(() => groupCampaignsByStatus(filteredCampaigns), [filteredCampaigns]);
  const coordination = useMemo(() => getCoordinationMetrics(filteredCampaigns), [filteredCampaigns]);
  const owners = useMemo(
    () => Array.from(new Set(campaigns.map((campaign) => campaign.owner.name))).sort(),
    [campaigns],
  );
  const visibleColumns = useMemo(
    () => KANBAN_COLUMNS.filter((column) => !filters.status || column.id === filters.status),
    [filters.status],
  );

  return (
    <div className="min-w-0 space-y-4 overflow-x-hidden">
      <div className="px-4 py-3 bg-surface-container border border-outline rounded-md">
        <CampaignFiltersBar
          filters={filters}
          owners={owners}
          onFilterChange={setFilter}
          onReset={resetFilters}
          resultCount={filteredCampaigns.length}
          totalCount={campaigns.length}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 px-1 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Waiting action', value: coordination.waitingActionCampaigns.length },
          { label: 'Pending handoffs', value: coordination.pendingHandoffs.length },
          { label: 'Stalled workflows', value: coordination.stalledWorkflows.length },
          { label: 'Missing owner', value: coordination.missingOwnership.length },
        ].map((item) => (
          <div key={item.label} className="rounded-md border border-outline-variant/30 bg-surface-container-low/40 px-4 py-3">
            <p className="text-xl font-black text-on-surface">{item.value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-full overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest/20">
        <div className="h-[calc(100vh-300px)] min-h-[520px] max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth px-3 py-4">
          <div className="flex h-full min-w-max flex-nowrap gap-4 pb-6 sm:gap-6">
            {visibleColumns.map((column) => (
              <CampaignKanbanColumn
                key={column.id}
                column={column}
                campaigns={campaignsByStatus[column.id]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Collab Bar */}
      <div className="fixed bottom-24 left-4 right-4 z-40 flex max-w-max items-center gap-4 rounded-full border border-outline-variant bg-surface-container-high/90 px-4 py-2.5 shadow-2xl backdrop-blur-md md:bottom-6 md:left-[264px] md:right-6 md:gap-6 md:px-6">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((item) => (
            <img
              key={item}
              src={`https://i.pravatar.cc/150?u=collab${item}`}
              className="w-7 h-7 rounded-full border-2 border-surface-container shadow-lg"
              alt=""
            />
          ))}
        </div>
        <div className="h-4 w-px bg-outline-variant" />
        <div className="flex min-w-0 items-center gap-3">
          <span className="truncate text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
            3 Collaborators Live
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(210,187,255,0.6)]" />
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
