import { ArrowRight } from 'lucide-react';
import type { CampaignCoordinationContext } from '@/modules/campaigns/utils';
import { CoordinationStatusBadge } from './CoordinationStatusBadge';

interface WorkflowHandoffCardProps {
  context: CampaignCoordinationContext;
}

export function WorkflowHandoffCard({ context }: WorkflowHandoffCardProps) {
  return (
    <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Handoff</p>
          <div className="mt-2 flex items-center gap-2 text-xs font-black text-on-surface">
            <span>{context.handoffFrom}</span>
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
            <span>{context.handoffTo}</span>
          </div>
        </div>
        <CoordinationStatusBadge state={context.state} />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-on-surface-variant">{context.continuityRisk}</p>
    </div>
  );
}
