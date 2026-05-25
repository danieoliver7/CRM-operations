import { ArrowRight, CircleAlert, GitBranch, ShieldCheck } from 'lucide-react';
import { CampaignStatusBadge } from '@/components/shared/campaign';
import {
  getCampaignCoordinationContext,
  getCampaignExecutionHealth,
  getCampaignNextActionContext,
} from '@/modules/campaigns/utils';
import type { Campaign } from '@/types/campaign';
import { CoordinationStatusBadge } from './CoordinationStatusBadge';
import { ExecutionHealthBadge } from './ExecutionHealthBadge';
import { OperationalRiskIndicator } from './OperationalRiskIndicator';
import { SLAWarningBadge } from './SLAWarningBadge';
import { WorkflowBlockerCard } from './WorkflowBlockerCard';

interface CampaignOperationalCommandCenterProps {
  campaign: Campaign;
}

export function CampaignOperationalCommandCenter({ campaign }: CampaignOperationalCommandCenterProps) {
  const execution = getCampaignExecutionHealth(campaign);
  const coordination = getCampaignCoordinationContext(campaign);
  const nextAction = getCampaignNextActionContext(campaign);
  const primaryBlocker = execution.blockers[0];
  const primaryRisk = execution.risks[0];

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-6 border-primary/20">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              Operational command center
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">Current execution story</h2>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              {execution.summary} {coordination.continuityRisk}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <CampaignStatusBadge status={campaign.status} compact />
            <ExecutionHealthBadge health={execution.health} />
            <SLAWarningBadge slaState={execution.slaState} daysUntilDue={execution.daysUntilDue} />
            <CoordinationStatusBadge state={coordination.state} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low/40 p-4">
            <div className="flex items-center gap-2 text-primary">
              <ArrowRight className="h-4 w-4" />
              <p className="text-[10px] font-black uppercase tracking-widest">Next action</p>
            </div>
            <p className="mt-2 text-xs font-bold leading-relaxed text-on-surface">{nextAction.next}</p>
          </div>
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low/40 p-4">
            <div className="flex items-center gap-2 text-secondary">
              <GitBranch className="h-4 w-4" />
              <p className="text-[10px] font-black uppercase tracking-widest">Responsible area</p>
            </div>
            <p className="mt-2 text-xs font-bold leading-relaxed text-on-surface">
              {coordination.nextResponsibleArea}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">
              Waiting for {primaryBlocker ? primaryBlocker.label : coordination.waitingFor}.
            </p>
          </div>
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low/40 p-4">
            <div className="flex items-center gap-2 text-tertiary">
              {primaryRisk ? <CircleAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              <p className="text-[10px] font-black uppercase tracking-widest">Operational risk</p>
            </div>
            <p className="mt-2 text-xs font-bold leading-relaxed text-on-surface">
              {primaryRisk ? primaryRisk.label : 'No primary risk blocking execution'}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">
              {primaryRisk ? primaryRisk.description : nextAction.risk}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
            Blockers
          </p>
          {execution.blockers.length > 0 ? (
            execution.blockers.slice(0, 2).map((blocker) => (
              <WorkflowBlockerCard key={blocker.id} blocker={blocker} />
            ))
          ) : (
            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3">
              <p className="text-xs font-bold text-on-surface">No operational blockers detected.</p>
              <p className="mt-1 text-[11px] text-on-surface-variant">
                Workflow continuity is healthy from an execution-blocker perspective.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
            Risks
          </p>
          {execution.risks.length > 0 ? (
            execution.risks.slice(0, 2).map((risk) => (
              <OperationalRiskIndicator key={risk.id} risk={risk} />
            ))
          ) : (
            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3">
              <p className="text-xs font-bold text-on-surface">No execution risk requiring attention.</p>
              <p className="mt-1 text-[11px] text-on-surface-variant">
                Current campaign signals do not show delivery instability.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
