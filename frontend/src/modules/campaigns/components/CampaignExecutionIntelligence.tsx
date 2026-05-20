import { Activity, ShieldAlert } from 'lucide-react';
import { ExecutionHealthBadge } from './ExecutionHealthBadge';
import { OperationalRiskIndicator } from './OperationalRiskIndicator';
import { SLAWarningBadge } from './SLAWarningBadge';
import { WorkflowBlockerCard } from './WorkflowBlockerCard';
import { getCampaignExecutionHealth } from '@/modules/campaigns/utils';
import type { Campaign } from '@/types/campaign';

interface CampaignExecutionIntelligenceProps {
  campaign: Campaign;
}

export function CampaignExecutionIntelligence({ campaign }: CampaignExecutionIntelligenceProps) {
  const execution = getCampaignExecutionHealth(campaign);

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Activity className="h-4 w-4" />
            <h3 className="text-lg font-bold tracking-tight">Execution Health</h3>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{execution.summary}</p>
        </div>
        <ExecutionHealthBadge health={execution.health} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">SLA</p>
          <div className="mt-2">
            <SLAWarningBadge slaState={execution.slaState} daysUntilDue={execution.daysUntilDue} />
          </div>
        </div>
        <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Signals</p>
          <p className="mt-1 text-lg font-black text-on-surface">
            {execution.blockers.length + execution.risks.length}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-tertiary" />
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
            Blockers and risks
          </p>
        </div>
        {execution.blockers.slice(0, 3).map((blocker) => (
          <WorkflowBlockerCard key={blocker.id} blocker={blocker} />
        ))}
        {execution.risks.slice(0, 3).map((risk) => (
          <OperationalRiskIndicator key={risk.id} risk={risk} />
        ))}
        {execution.blockers.length === 0 && execution.risks.length === 0 && (
          <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3">
            <p className="text-xs font-bold text-on-surface">No execution blockers</p>
            <p className="mt-1 text-[11px] text-on-surface-variant">Current workflow looks operationally healthy.</p>
          </div>
        )}
      </div>
    </section>
  );
}
