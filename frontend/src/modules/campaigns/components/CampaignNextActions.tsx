import { AlertTriangle, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { CampaignStatusBadge } from '@/components/shared/campaign';
import {
  getCampaignCoordinationContext,
  getCampaignExecutionHealth,
  getCampaignNextActionContext,
} from '@/modules/campaigns/utils';
import type { Campaign } from '@/types/campaign';
import { CoordinationStatusBadge } from './CoordinationStatusBadge';

interface CampaignNextActionsProps {
  campaign: Campaign;
}

export function CampaignNextActions({ campaign }: CampaignNextActionsProps) {
  const context = getCampaignNextActionContext(campaign);
  const execution = getCampaignExecutionHealth(campaign);
  const coordination = getCampaignCoordinationContext(campaign);
  const primaryBlocker = execution.blockers[0];
  const primaryRisk = execution.risks[0];

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight">Next Actions</h3>
        <div className="flex items-center gap-2">
          <CoordinationStatusBadge state={coordination.state} />
          <CampaignStatusBadge status={campaign.status} compact />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold">Next step</p>
            <p className="text-[11px] text-on-surface-variant mt-1">{context.next}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Clock className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold">Waiting for</p>
            <p className="text-[11px] text-on-surface-variant mt-1">
              {primaryBlocker ? primaryBlocker.label : coordination.waitingFor}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <ArrowRight className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold">Next responsible area</p>
            <p className="text-[11px] text-on-surface-variant mt-1">{coordination.nextResponsibleArea}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {campaign.priority === 'urgent' ? (
            <AlertTriangle className="w-4 h-4 text-error shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-xs font-bold">Operational risk</p>
            <p className="text-[11px] text-on-surface-variant mt-1">
              {primaryRisk
                ? primaryRisk.description
                : campaign.priority === 'urgent'
                ? `Priority is urgent. ${context.risk}`
                : context.risk}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
