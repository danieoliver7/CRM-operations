import { 
  ChevronLeft, 
  ChevronRight, 
  CircleAlert,
  Plus
} from 'lucide-react';
import { 
  format, 
  isSameMonth, 
  isSameDay
} from 'date-fns';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CampaignChannelIcon,
  CampaignPriorityBadge,
  CAMPAIGN_CHANNEL_STYLES,
  CAMPAIGN_STATUS_STYLES,
} from '@/components/shared/campaign';
import { cn } from '@/utils/cn';
import {
  CampaignCreationModal,
  filterCampaigns,
  getCapacityMetrics,
  useCampaigns,
  useCampaignUrlFilters,
} from '@/modules/campaigns';
import {
  CalendarCapacityIndicators,
  CalendarFilters,
  CalendarOperationalWarnings,
  useCalendarMonth,
} from '@/modules/calendar';

export default function Calendar() {
  const { currentDate, days, nextMonth, previousMonth } = useCalendarMonth();
  const { campaigns: allCampaigns, createCampaign } = useCampaigns();
  const { filters, setFilter, resetFilters } = useCampaignUrlFilters();
  const [isCreationOpen, setIsCreationOpen] = useState(false);
  const campaigns = useMemo(() => filterCampaigns(allCampaigns, filters), [allCampaigns, filters]);
  const capacity = useMemo(() => getCapacityMetrics(campaigns), [campaigns]);
  const owners = useMemo(
    () => Array.from(new Set(allCampaigns.map((campaign) => campaign.owner.name))).sort(),
    [allCampaigns],
  );
  const squads = useMemo(
    () => Array.from(new Set(allCampaigns.map((campaign) => campaign.squad))).sort(),
    [allCampaigns],
  );

  return (
    <>
    <div className="h-[calc(100vh-140px)] flex flex-col bg-surface-container-lowest/30 rounded-xl border border-outline-variant overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 flex items-center justify-between border-b border-outline-variant bg-surface-container-low/50">
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-surface-container rounded-lg p-1 border border-outline-variant">
            <button className="px-4 py-1.5 text-xs font-bold bg-surface-container-highest text-on-surface rounded shadow-sm">Month</button>
            <button className="px-4 py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors">Week</button>
            <button className="px-4 py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors">Day</button>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight">{format(currentDate, 'MMMM yyyy')}</h2>
            <div className="flex gap-1">
              <button onClick={previousMonth} className="p-1.5 hover:bg-surface-container rounded-lg border border-outline-variant transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="p-1.5 hover:bg-surface-container rounded-lg border border-outline-variant transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-7 h-7 rounded-full border-2 border-surface" alt="" />
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">+4</div>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-outline-variant bg-surface-container px-3 py-1.5 text-xs font-bold text-on-surface-variant md:flex">
            <CircleAlert className="h-4 w-4 text-tertiary" />
            {capacity.warnings.length} planning signals
          </div>
          <button
            onClick={() => setIsCreationOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary text-on-primary rounded-lg hover:opacity-90 text-xs font-bold transition-all"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-72 border-r border-outline-variant bg-surface-container-low/30 p-5 space-y-6 overflow-y-auto hidden lg:block">
          <CalendarFilters
            filters={filters}
            owners={owners}
            squads={squads}
            onFilterChange={setFilter}
            onReset={resetFilters}
          />
          <CalendarOperationalWarnings warnings={capacity.warnings} />
          <CalendarCapacityIndicators title="Owners" items={capacity.campaignsPerOwner} />
          <CalendarCapacityIndicators title="Squads" items={capacity.campaignsPerSquad} />
        </aside>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-7 border-b border-outline-variant sticky top-0 bg-surface z-10 shadow-sm">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div key={day} className="py-3 text-center text-[10px] font-bold text-on-surface-variant tracking-widest border-r border-outline-variant last:border-0">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const dayKey = format(day, 'yyyy-MM-dd');
              const dayCampaigns = campaigns.filter(c => isSameDay(new Date(`${c.dueDate}T00:00:00`), day));
              const dayCapacity = capacity.campaignsPerDay.find((item) => item.id === dayKey);
              return (
                <div 
                  key={i} 
                  className={cn(
                    "min-h-[160px] p-2 border-r border-b border-outline-variant relative overflow-hidden",
                    !isSameMonth(day, currentDate) ? "bg-surface-container-lowest/20" : "bg-transparent"
                  )}
                >
                  <span className={cn(
                    "text-[10px] font-bold",
                    !isSameMonth(day, currentDate) ? "text-on-surface-variant/40" : "text-on-surface-variant",
                    isSameDay(day, new Date()) ? "text-primary" : ""
                  )}>
                    {format(day, 'd')}
                  </span>
                  {dayCapacity && dayCapacity.level !== 'normal' && (
                    <span
                      className={cn(
                        'absolute right-2 top-2 rounded-full border px-2 py-0.5 text-[9px] font-black',
                        dayCapacity.level === 'overloaded'
                          ? 'border-error/30 bg-error/10 text-error'
                          : 'border-tertiary/30 bg-tertiary/10 text-tertiary',
                      )}
                    >
                      {dayCapacity.count} planned
                    </span>
                  )}

                  <div className="mt-2 space-y-2 relative z-10">
                    {dayCampaigns.map(camp => (
                      <Link
                        key={camp.id} 
                        to={`/campaign/${camp.id}`}
                        className={cn(
                          "block p-2 rounded-lg border-l-4 shadow-lg group hover:scale-[1.02] transition-all",
                          "bg-surface-container-high/60 backdrop-blur-md",
                          camp.priority === 'urgent' && "ring-1 ring-error/30",
                          CAMPAIGN_CHANNEL_STYLES[camp.channel].borderClassName
                        )}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <CampaignChannelIcon channel={camp.channel} iconClassName="w-3.5 h-3.5" />
                          <CampaignPriorityBadge priority={camp.priority} className="text-[8px] border-transparent bg-transparent px-0 opacity-60" />
                        </div>
                        <h4 className="text-[11px] font-bold truncate text-on-surface">{camp.name}</h4>
                        <p className="mt-1 truncate text-[9px] font-medium text-on-surface-variant">
                          {camp.owner.name} - {camp.squad}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <div className={cn("w-1 h-1 rounded-full", CAMPAIGN_STATUS_STYLES[camp.status].dotClassName)} />
                          <span className="text-[9px] text-on-surface-variant font-medium">SLA: {camp.sla}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    <CampaignCreationModal
      open={isCreationOpen}
      onClose={() => setIsCreationOpen(false)}
      onCreate={createCampaign}
    />
    </>
  );
}
