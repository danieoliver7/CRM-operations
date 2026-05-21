import { BrainCircuit } from 'lucide-react';
import { getCampaignDecisionContext } from '@/modules/campaigns/utils';
import type { Campaign } from '@/types/campaign';
import { DecisionContextCard } from './DecisionContextCard';

interface CampaignDecisionContextProps {
  campaign: Campaign;
}

export function CampaignDecisionContext({ campaign }: CampaignDecisionContextProps) {
  const contexts = getCampaignDecisionContext(campaign);
  const highImportanceCount = contexts.filter((context) => context.importance === 'high').length;

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-bold tracking-tight">Decision Context</h3>
          </div>
          <p className="mt-1 text-xs text-on-surface-variant">
            Operational memory explaining why execution changed.
          </p>
        </div>
        <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 px-3 py-2 text-right">
          <p className="text-lg font-black text-on-surface">{contexts.length}</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
            {highImportanceCount} high
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {contexts.map((context) => (
          <DecisionContextCard key={context.id} context={context} />
        ))}
      </div>
    </section>
  );
}
