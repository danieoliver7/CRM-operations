import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Mail,
  TrendingUp,
  MessageSquare,
  Plus
} from 'lucide-react';
import { 
  format, 
  isSameMonth, 
  isSameDay
} from 'date-fns';
import { cn } from '@/utils/cn';
import { MOCK_CAMPAIGNS } from '@/modules/campaigns/services';
import { useCalendarMonth } from '@/modules/calendar';

export default function Calendar() {
  const { currentDate, days, nextMonth, previousMonth } = useCalendarMonth();

  return (
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
          <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg hover:bg-surface-container text-xs font-semibold transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-on-primary rounded-lg hover:opacity-90 text-xs font-bold transition-all">
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-64 border-r border-outline-variant bg-surface-container-low/30 p-6 space-y-8 overflow-y-auto hidden lg:block">
          <div>
            <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Channels</h3>
            <div className="space-y-4">
              {[
                { label: 'Email', icon: Mail, color: 'text-primary' },
                { label: 'Push', icon: TrendingUp, color: 'text-secondary' },
                { label: 'WhatsApp', icon: MessageSquare, color: 'text-tertiary' },
              ].map((ch, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary h-4 w-4" />
                  <ch.icon className={cn("w-4 h-4", ch.color)} />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{ch.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Squads</h3>
            <div className="space-y-1">
              {['Growth Squad', 'Retention', 'Lifecycle Ops'].map((squad) => (
                <button key={squad} className="w-full flex justify-between items-center p-2 rounded-lg hover:bg-surface-container-highest transition-all group">
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface">{squad}</span>
                  <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 italic">4</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-primary-container/10 border border-primary/20 rounded-xl mt-auto">
            <p className="text-xs font-bold text-primary mb-2">Campaign Tip</p>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Drag campaign blocks to reschedule. SLA statuses auto-update based on shift.
            </p>
          </div>
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
              const campaigns = MOCK_CAMPAIGNS.filter(c => isSameDay(new Date(c.dueDate), day));
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

                  <div className="mt-2 space-y-2 relative z-10">
                    {campaigns.map(camp => (
                      <div 
                        key={camp.id} 
                        className={cn(
                          "p-2 rounded-lg border-l-4 shadow-lg group cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-all",
                          "bg-surface-container-high/60 backdrop-blur-md",
                          camp.channel === 'Email' ? 'border-primary' : camp.channel === 'Push' ? 'border-secondary' : 'border-tertiary'
                        )}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={cn(
                            "material-symbols-outlined text-[14px]",
                            camp.channel === 'Email' ? 'text-primary' : camp.channel === 'Push' ? 'text-secondary' : 'text-tertiary'
                          )}>
                            {camp.channel === 'Email' ? 'mail' : camp.channel === 'Push' ? 'trending_up' : 'chat'}
                          </span>
                          <span className="text-[8px] font-bold opacity-60 uppercase">{camp.priority}</span>
                        </div>
                        <h4 className="text-[11px] font-bold truncate text-on-surface">{camp.name}</h4>
                        <div className="flex items-center gap-1 mt-2">
                          <div className={cn(
                            "w-1 h-1 rounded-full",
                            camp.status === 'QA' ? 'bg-error' : 'bg-green-400'
                          )} />
                          <span className="text-[9px] text-on-surface-variant font-medium">SLA: {camp.sla}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
