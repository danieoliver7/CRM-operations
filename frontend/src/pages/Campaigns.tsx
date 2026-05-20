import {
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CampaignChannelIcon,
  CampaignOwner,
  CampaignPriorityBadge,
  CampaignStatusBadge,
} from '@/components/shared/campaign';
import {
  CampaignCreationModal,
  CampaignFiltersBar,
  filterCampaigns,
  useCampaigns,
  useCampaignUrlFilters,
} from '@/modules/campaigns';

export default function Campaigns() {
  const { campaigns, createCampaign } = useCampaigns();
  const { filters, setFilter, resetFilters } = useCampaignUrlFilters();
  const [isCreationOpen, setIsCreationOpen] = useState(false);
  const filteredCampaigns = useMemo(() => filterCampaigns(campaigns, filters), [campaigns, filters]);
  const owners = useMemo(
    () => Array.from(new Set(campaigns.map((campaign) => campaign.owner.name))).sort(),
    [campaigns],
  );
  const squads = useMemo(
    () => Array.from(new Set(campaigns.map((campaign) => campaign.squad))).sort(),
    [campaigns],
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Campaign Inventory</h1>
          <p className="text-on-surface-variant text-base mt-2">
            Active cross-channel marketing operations repository.
          </p>
        </div>
        <button
          onClick={() => setIsCreationOpen(true)}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-sm font-black flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Create Campaign
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-primary/50 transition-all font-medium placeholder:text-on-surface-variant/40"
                placeholder="Search repository..."
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant/50 rounded-xl text-xs font-bold hover:bg-surface-container transition-all">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant opacity-60">
            <span>SHOWING {filteredCampaigns.length} OF {campaigns.length} CAMPAIGNS</span>
          </div>
        </div>

        <div className="p-4 border-b border-outline-variant/20 bg-surface-container-lowest/40">
          <CampaignFiltersBar
            filters={filters}
            owners={owners}
            squads={squads}
            onFilterChange={setFilter}
            onReset={resetFilters}
            resultCount={filteredCampaigns.length}
            totalCount={campaigns.length}
          />
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-outline-variant/20">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Campaign Asset</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Channel</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Priority</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Owner</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Status</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant" />
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {filteredCampaigns.map((camp) => (
              <tr key={camp.id} className="group hover:bg-primary/5 transition-all">
                <td className="px-6 py-5">
                  <Link to={`/campaign/${camp.id}`} className="flex flex-col">
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{camp.name}</span>
                    <span className="text-[10px] text-on-surface-variant font-mono mt-1 opacity-60 uppercase">
                      {camp.squad} squad - {camp.dueDate}
                    </span>
                  </Link>
                </td>
                <td className="px-6 py-5">
                  <CampaignChannelIcon channel={camp.channel} showLabel />
                </td>
                <td className="px-6 py-5">
                  <CampaignPriorityBadge priority={camp.priority} />
                </td>
                <td className="px-6 py-5">
                  <CampaignOwner
                    owner={camp.owner}
                    className="gap-3"
                    avatarClassName="grayscale group-hover:grayscale-0 transition-all"
                  />
                </td>
                <td className="px-6 py-5">
                  <CampaignStatusBadge status={camp.status} className="tracking-normal normal-case" />
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-on-surface-variant hover:text-on-surface transition-colors p-1.5 rounded-lg border border-transparent hover:border-outline-variant/30">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCampaigns.length === 0 && (
              <tr>
                <td className="px-6 py-12 text-center text-sm text-on-surface-variant" colSpan={6}>
                  No campaigns match the current operational filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="px-6 py-4 flex justify-between items-center bg-surface-container-lowest border-t border-outline-variant/10">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Page 1 of 1</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-[10px] font-black uppercase border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-all">Prev</button>
            <button className="px-3 py-1 text-[10px] font-black uppercase border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-all">Next</button>
          </div>
        </div>
      </div>

      <CampaignCreationModal
        open={isCreationOpen}
        onClose={() => setIsCreationOpen(false)}
        onCreate={createCampaign}
      />
    </div>
  );
}
