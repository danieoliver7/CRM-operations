import { CheckCircle2, Clock, GitBranch, Send, UserRound } from 'lucide-react';
import type { Campaign } from '@/types/campaign';

interface CampaignTimelineProps {
  campaign: Campaign;
}

export function CampaignTimeline({ campaign }: CampaignTimelineProps) {
  const events = [
    { label: 'Campaign created', detail: `${campaign.squad} squad opened the workspace`, time: 'D-6', icon: GitBranch },
    { label: 'Copy submitted', detail: campaign.content?.subject ?? 'Copy package waiting for subject line', time: 'D-4', icon: Clock },
    { label: 'Owner assigned', detail: `${campaign.owner.name} became operational owner`, time: 'D-3', icon: UserRound },
    { label: `Moved to ${campaign.status.toUpperCase()}`, detail: `Current stage progress is ${campaign.progress}%`, time: 'Now', icon: CheckCircle2 },
    { label: 'Send window', detail: `Target due date is ${campaign.dueDate}`, time: 'Next', icon: Send },
  ];

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold tracking-tight">Operational Timeline</h3>
        <p className="text-xs text-on-surface-variant mt-1">Mocked workflow history for this campaign.</p>
      </div>

      <div className="space-y-5">
        {events.map((event, index) => {
          const Icon = event.icon;

          return (
            <div key={event.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                {index < events.length - 1 && <div className="w-px flex-1 bg-outline-variant/50 mt-2" />}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">{event.label}</p>
                  <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">{event.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">{event.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
