import { History } from 'lucide-react';
import { getOperationalTimeline } from '@/modules/campaigns/utils';
import type { Campaign } from '@/types/campaign';
import { TimelineEventCard } from './TimelineEventCard';

interface CampaignOperationalTimelineProps {
  campaign: Campaign;
}

export function CampaignOperationalTimeline({ campaign }: CampaignOperationalTimelineProps) {
  const events = getOperationalTimeline(campaign);
  const criticalCount = events.filter((event) => event.importance === 'critical').length;

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold tracking-tight">Operational Timeline</h3>
          </div>
          <p className="mt-1 text-xs text-on-surface-variant">
            Execution history derived from workflow, coordination and health signals.
          </p>
        </div>
        <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/40 px-3 py-2 text-right">
          <p className="text-lg font-black text-on-surface">{events.length}</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
            {criticalCount} critical
          </p>
        </div>
      </div>

      <div>
        {events.map((event, index) => (
          <TimelineEventCard key={event.id} event={event} isLast={index === events.length - 1} />
        ))}
      </div>
    </section>
  );
}
