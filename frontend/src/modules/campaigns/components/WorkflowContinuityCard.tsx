import { GitBranch } from 'lucide-react';
import type { CampaignCoordinationContext } from '@/modules/campaigns/utils';
import { CoordinationStatusBadge } from './CoordinationStatusBadge';
import { OperationalOwnerIndicator } from './OperationalOwnerIndicator';
import { WorkflowHandoffCard } from './WorkflowHandoffCard';

interface WorkflowContinuityCardProps {
  context: CampaignCoordinationContext;
}

export function WorkflowContinuityCard({ context }: WorkflowContinuityCardProps) {
  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-secondary">
            <GitBranch className="h-4 w-4" />
            <h3 className="text-lg font-bold tracking-tight">Workflow Continuity</h3>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{context.continuityRisk}</p>
        </div>
        <CoordinationStatusBadge state={context.state} />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <OperationalOwnerIndicator context={context} />
        <WorkflowHandoffCard context={context} />
        <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-3">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Next responsible area</p>
          <p className="mt-1 text-xs font-bold text-on-surface">{context.nextResponsibleArea}</p>
          <p className="mt-2 text-[11px] leading-relaxed text-on-surface-variant">{context.nextAction}</p>
        </div>
      </div>
    </section>
  );
}
