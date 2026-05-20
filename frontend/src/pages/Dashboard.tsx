import { useMemo } from 'react';
import { AlertTriangle, CalendarClock, Rocket, ShieldCheck, Users } from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  ExecutionHealthBadge,
  getCapacityMetrics,
  getCoordinationMetrics,
  getExecutionHealthMetrics,
  OperationalPressureBadge,
  SLAWarningBadge,
  useCampaigns,
} from '@/modules/campaigns';
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
  const capacity = useMemo(() => getCapacityMetrics(campaigns), [campaigns]);
  const execution = useMemo(() => getExecutionHealthMetrics(campaigns), [campaigns]);
  const coordination = useMemo(() => getCoordinationMetrics(campaigns), [campaigns]);
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
          to="/campaigns"
        />
        <OperationalMetricCard
          label="QA Pressure"
          value={metrics.qa}
          trend={`${qaCampaigns.length} in validation flow`}
          icon={ShieldCheck}
          colorClassName="text-secondary"
          trendClassName="text-secondary"
          to="/kanban?status=qa"
        />
        <OperationalMetricCard
          label="Risk Queue"
          value={metrics.urgent + metrics.delayed}
          trend={`${metrics.urgent} urgent / ${metrics.delayed} delayed`}
          icon={AlertTriangle}
          colorClassName="text-error"
          borderClassName={metrics.urgent + metrics.delayed > 0 ? 'border-error/20' : undefined}
          trendClassName={metrics.urgent + metrics.delayed > 0 ? 'text-error' : 'text-green-500'}
          to="/campaigns?priority=urgent"
        />
        <OperationalMetricCard
          label="Upcoming Sends"
          value={metrics.upcoming}
          trend={`${metrics.scheduled} scheduled campaigns`}
          icon={CalendarClock}
          colorClassName="text-tertiary"
          borderClassName="border-tertiary/20"
          trendClassName="text-tertiary"
          to="/campaigns?status=scheduled"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 min-w-0 bg-surface-container border border-outline p-6 rounded-md shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Coordination Queue</h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Handoffs, waiting states and ownership gaps across active campaigns.
              </p>
            </div>
            <OperationalPressureBadge
              level={coordination.blockedOperationalContinuity.length > 0 ? 'overloaded' : coordination.warnings.length > 0 ? 'watch' : 'normal'}
              label={`${coordination.warnings.length} signals`}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { label: 'Waiting action', value: coordination.waitingActionCampaigns.length, detail: 'campaigns need action' },
              { label: 'Pending handoffs', value: coordination.pendingHandoffs.length, detail: 'stage transitions' },
              { label: 'Stalled workflows', value: coordination.stalledWorkflows.length, detail: 'continuity at risk' },
              { label: 'Missing owner', value: coordination.missingOwnership.length, detail: 'ownership gaps' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-4">
                <span className="text-2xl font-black text-on-surface">{item.value}</span>
                <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{item.label}</p>
                <p className="mt-1 truncate text-xs font-bold text-on-surface">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 min-w-0 bg-surface-container border border-outline p-6 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">Coordination Warnings</h2>
            <AlertTriangle className="h-4 w-4 text-tertiary" />
          </div>
          <div className="mt-4 space-y-3">
            {coordination.warnings.slice(0, 3).map((warning) => (
              <a
                key={warning.id}
                href={warning.to}
                className="block rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3 hover:border-primary/30 transition-colors"
              >
                <p className="text-xs font-bold leading-snug">{warning.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{warning.description}</p>
              </a>
            ))}
            {coordination.warnings.length === 0 && (
              <p className="rounded-lg border border-outline-variant/30 p-3 text-xs text-on-surface-variant">
                No relevant coordination gaps in active campaigns.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 min-w-0 bg-surface-container border border-outline p-6 rounded-md shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Execution Intelligence</h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Operational health derived from SLA, blockers and workflow risk.
              </p>
            </div>
            <ExecutionHealthBadge
              health={execution.blockedCampaigns.length > 0 ? 'blocked' : execution.overdueCampaigns.length > 0 ? 'overdue' : execution.campaignsAtRisk.length > 0 ? 'at-risk' : 'healthy'}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { label: 'At risk', value: execution.campaignsAtRisk.length, detail: 'campaigns need review' },
              { label: 'Blocked', value: execution.blockedCampaigns.length, detail: 'operational blockers' },
              { label: 'Overdue', value: execution.overdueCampaigns.length, detail: 'past due date' },
              { label: 'Delayed stages', value: execution.delayedWorkflowStages.length, detail: execution.delayedWorkflowStages[0]?.label ?? 'no stage delay' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-4">
                <span className="text-2xl font-black text-on-surface">{item.value}</span>
                <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{item.label}</p>
                <p className="mt-1 truncate text-xs font-bold text-on-surface">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 min-w-0 bg-surface-container border border-outline p-6 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">Execution Warnings</h2>
            <AlertTriangle className="h-4 w-4 text-error" />
          </div>
          <div className="mt-4 space-y-3">
            {execution.warnings.slice(0, 3).map((warning) => {
              const campaignHealth = execution.campaignHealth.find((item) => item.campaign.id === warning.id.replace('execution-', ''));

              return (
                <a
                  key={warning.id}
                  href={warning.to}
                  className="block rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-bold leading-snug">{warning.title}</p>
                    {campaignHealth && (
                      <SLAWarningBadge
                        slaState={campaignHealth.slaState}
                        daysUntilDue={campaignHealth.daysUntilDue}
                        className="shrink-0"
                      />
                    )}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{warning.description}</p>
                </a>
              );
            })}
            {execution.warnings.length === 0 && (
              <p className="rounded-lg border border-outline-variant/30 p-3 text-xs text-on-surface-variant">
                No relevant execution warnings in active campaigns.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 min-w-0 bg-surface-container border border-outline p-6 rounded-md shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Planning Pressure</h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Future overload signals derived from planned campaign workload.
              </p>
            </div>
            <OperationalPressureBadge
              level={capacity.warnings.some((warning) => warning.level === 'overloaded') ? 'overloaded' : capacity.warnings.length > 0 ? 'watch' : 'normal'}
              label={`${capacity.warnings.length} signals`}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: 'Overloaded days', value: capacity.overloadedDays.length, detail: capacity.overloadedDays[0]?.label ?? 'No day pressure', icon: CalendarClock },
              { label: 'Owner pressure', value: capacity.overloadedOwners.length, detail: capacity.overloadedOwners[0]?.label ?? 'Balanced owners', icon: Users },
              { label: 'Squad pressure', value: capacity.overloadedSquads.length, detail: capacity.overloadedSquads[0]?.label ?? 'Balanced squads', icon: ShieldCheck },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-4">
                <div className="flex items-center justify-between">
                  <item.icon className="h-4 w-4 text-on-surface-variant" />
                  <span className="text-2xl font-black text-on-surface">{item.value}</span>
                </div>
                <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{item.label}</p>
                <p className="mt-1 truncate text-xs font-bold text-on-surface">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 min-w-0 bg-surface-container border border-outline p-6 rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">Upcoming Warnings</h2>
            <AlertTriangle className="h-4 w-4 text-tertiary" />
          </div>
          <div className="mt-4 space-y-3">
            {capacity.warnings.slice(0, 3).map((warning) => (
              <a
                key={warning.id}
                href={warning.to}
                className="block rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-bold leading-snug">{warning.title}</p>
                  <OperationalPressureBadge level={warning.level} className="shrink-0" />
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{warning.description}</p>
              </a>
            ))}
            {capacity.warnings.length === 0 && (
              <p className="rounded-lg border border-outline-variant/30 p-3 text-xs text-on-surface-variant">
                No relevant overload warnings in the current plan.
              </p>
            )}
          </div>
        </div>
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
