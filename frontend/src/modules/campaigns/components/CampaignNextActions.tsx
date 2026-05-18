import { AlertTriangle, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { CampaignStatusBadge } from '@/components/shared/campaign';
import type { Campaign } from '@/types/campaign';

interface CampaignNextActionsProps {
  campaign: Campaign;
}

function getNextAction(campaign: Campaign) {
  if (campaign.status === 'briefing') return 'Complete briefing scope and lock target audience.';
  if (campaign.status === 'copy') return 'Submit final copy for approval.';
  if (campaign.status === 'approval') return 'Collect stakeholder approval before development.';
  if (campaign.status === 'development') return 'Finish implementation and prepare QA package.';
  if (campaign.status === 'qa') return 'Validate links, personalization and rendering.';
  if (campaign.status === 'scheduled') return 'Monitor send window and final readiness.';
  if (campaign.status === 'sent') return 'Review delivery health and early engagement.';
  return 'Capture learnings and close operational notes.';
}

export function CampaignNextActions({ campaign }: CampaignNextActionsProps) {
  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight">Next Actions</h3>
        <CampaignStatusBadge status={campaign.status} compact />
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold">Next step</p>
            <p className="text-[11px] text-on-surface-variant mt-1">{getNextAction(campaign)}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Clock className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold">Waiting for</p>
            <p className="text-[11px] text-on-surface-variant mt-1">{campaign.owner.name} to clear SLA checkpoint.</p>
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
              {campaign.priority === 'urgent'
                ? 'Priority is urgent. Keep approval and QA owners aligned.'
                : 'No critical blocker mapped in current mock workspace.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
