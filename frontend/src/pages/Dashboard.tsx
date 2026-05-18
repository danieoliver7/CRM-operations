import { useMemo } from 'react';
import { AlertTriangle, CalendarClock, Clock, Rocket, ShieldCheck } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useCampaigns } from '@/modules/campaigns';
import {
  CampaignChannelDistribution,
  CampaignHealthCard,
  CampaignStatusDistribution,
  OperationalAlert,
  OperationalMetricCard,
  UpcomingCampaignsList,
} from '@/modules/dashboard';
import {
  getCampaignChannelDistribution,
  getCampaignOperationalMetrics,
  getCampaignStatusDistribution,
  getDelayedCampaigns,
  getUpcomingCampaigns,
  getUrgentCampaigns,
} from '@/modules/dashboard/utils';
import { MOCK_ACTIVITIES } from '@/modules/dashboard/services';

export default function Dashboard() {
  const { campaigns } = useCampaigns();
  const metrics = useMemo(() => getCampaignOperationalMetrics(campaigns), [campaigns]);
  const statusDistribution = useMemo(() => getCampaignStatusDistribution(campaigns), [campaigns]);
  const channelDistribution = useMemo(() => getCampaignChannelDistribution(campaigns), [campaigns]);
  const urgentCampaigns = useMemo(() => getUrgentCampaigns(campaigns), [campaigns]);
  const delayedCampaigns = useMemo(() => getDelayedCampaigns(campaigns), [campaigns]);
  const upcomingCampaigns = useMemo(() => getUpcomingCampaigns(campaigns).slice(0, 5), [campaigns]);
  const qaCampaigns = useMemo(
    () => campaigns.filter((campaign) => campaign.status === 'qa' || campaign.status === 'approval'),
    [campaigns],
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations Dashboard</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Operational intelligence for active CRM campaign delivery.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            All Squads
          </button>
          <button className="bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            Live Operation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <OperationalMetricCard
          label="Active Campaigns"
          value={metrics.active}
          trend={`${metrics.total} total in workspace`}
          icon={Rocket}
          colorClassName="text-primary"
          trendClassName="text-green-500"
        />
        <OperationalMetricCard
          label="QA Pressure"
          value={metrics.qa}
          trend={`${qaCampaigns.length} in validation flow`}
          icon={ShieldCheck}
          colorClassName="text-secondary"
          trendClassName="text-secondary"
        />
        <OperationalMetricCard
          label="Risk Queue"
          value={metrics.urgent + metrics.delayed}
          trend={`${metrics.urgent} urgent / ${metrics.delayed} delayed`}
          icon={AlertTriangle}
          colorClassName="text-error"
          borderClassName={metrics.urgent + metrics.delayed > 0 ? 'border-error/20' : undefined}
          trendClassName={metrics.urgent + metrics.delayed > 0 ? 'text-error' : 'text-green-500'}
        />
        <OperationalMetricCard
          label="Upcoming Sends"
          value={metrics.upcoming}
          trend={`${metrics.scheduled} scheduled campaigns`}
          icon={CalendarClock}
          colorClassName="text-tertiary"
          borderClassName="border-tertiary/20"
          trendClassName="text-tertiary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 min-w-0">
          <CampaignStatusDistribution items={statusDistribution} />
        </div>
        <div className="lg:col-span-4 min-w-0">
          <CampaignHealthCard health={metrics.health} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 min-w-0">
          <UpcomingCampaignsList campaigns={upcomingCampaigns} />
        </div>
        <div className="lg:col-span-4 min-w-0">
          <OperationalAlert
            urgentCampaigns={urgentCampaigns}
            delayedCampaigns={delayedCampaigns}
            qaCampaigns={qaCampaigns}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 min-w-0">
          <CampaignChannelDistribution items={channelDistribution} total={metrics.total} />
        </div>

        <div className="lg:col-span-8 min-w-0 bg-surface-container border border-outline p-6 rounded-md flex flex-col gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">Team Activity</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Operational log
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex gap-3 rounded-md border border-outline-variant bg-surface-container-low/40 p-4">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full mt-1.5 shrink-0',
                    activity.type === 'alert' ? 'bg-error' : 'bg-primary',
                  )}
                />
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    <span className="text-on-surface font-bold">{activity.user.name || 'System'}</span>
                    {' '}
                    {activity.action}
                    {' '}
                    <span className="text-primary font-medium">{activity.target}</span>
                  </p>
                  <span className="text-[10px] text-on-surface-variant/60">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-outline-variant pt-6">
            <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block mb-4">
              Delivery Timeline
            </span>
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 right-0 h-px bg-outline-variant top-1.5" />
              {[
                { label: 'Now', active: true },
                { label: `${metrics.scheduledToday} today`, active: metrics.scheduledToday > 0 },
                { label: `${metrics.upcoming} upcoming`, active: metrics.upcoming > 0 },
                { label: `${metrics.completed} done`, active: false },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 relative z-10">
                  <div
                    className={cn(
                      'w-3 h-3 rounded-full border-2 border-surface shadow-lg',
                      item.active ? 'bg-primary scale-125' : 'bg-surface-container-highest',
                    )}
                  />
                  <span className="text-[9px] font-bold text-on-surface-variant">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
