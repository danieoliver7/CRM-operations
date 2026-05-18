import { CheckCircle2, Circle } from 'lucide-react';
import type { Campaign, CampaignStatus } from '@/types/campaign';
import { cn } from '@/utils/cn';

interface CampaignChecklistProps {
  campaign: Campaign;
}

const checklistStatusOrder: CampaignStatus[] = ['briefing', 'copy', 'approval', 'development', 'qa', 'scheduled'];

export function CampaignChecklist({ campaign }: CampaignChecklistProps) {
  const currentIndex = checklistStatusOrder.indexOf(campaign.status);
  const isAfter = (status: CampaignStatus) => currentIndex === -1 || currentIndex > checklistStatusOrder.indexOf(status);

  const items = [
    { label: 'Briefing completed', done: isAfter('briefing') },
    { label: 'Copy approved', done: isAfter('copy') },
    { label: 'Assets uploaded', done: campaign.progress >= 50 },
    { label: 'QA completed', done: isAfter('qa') || campaign.status === 'scheduled' },
    { label: 'Final validation', done: campaign.status === 'sent' || campaign.status === 'completed' },
    { label: 'Scheduled', done: ['scheduled', 'sent', 'completed'].includes(campaign.status) },
  ];

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight">Operational Checklist</h3>
        <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">
          {items.filter((item) => item.done).length}/{items.length}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            {item.done ? (
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-on-surface-variant/50 shrink-0" />
            )}
            <span className={cn('text-xs font-bold', item.done ? 'text-on-surface' : 'text-on-surface-variant')}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
