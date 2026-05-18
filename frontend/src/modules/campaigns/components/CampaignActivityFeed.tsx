import { MessageSquare, MoreVertical } from 'lucide-react';
import type { Campaign } from '@/types/campaign';

interface CampaignActivityFeedProps {
  campaign: Campaign;
}

export function CampaignActivityFeed({ campaign }: CampaignActivityFeedProps) {
  const activities = [
    {
      user: campaign.owner.name,
      time: '12m ago',
      text: `updated ${campaign.name} progress to ${campaign.progress}%.`,
      avatar: campaign.owner.avatar,
    },
    {
      user: 'QA Ops',
      time: '28m ago',
      text: `requested final validation for ${campaign.channel}.`,
      avatar: 'https://i.pravatar.cc/150?u=qa-ops',
    },
    {
      user: 'CRM Strategy',
      time: '1h ago',
      text: `confirmed KPI target: ${campaign.metricsTarget?.expectedKpi ?? 'TBD'}.`,
      avatar: 'https://i.pravatar.cc/150?u=crm-strategy',
    },
  ];

  return (
    <section className="glass rounded-2xl shadow-2xl flex flex-col border-primary/20">
      <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/80 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold tracking-tight uppercase">Activity Feed</h3>
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-black">
            {activities.length} updates
          </span>
        </div>
        <MoreVertical className="w-4 h-4 text-on-surface-variant cursor-pointer" />
      </div>

      <div className="p-4 space-y-4">
        {activities.map((activity) => (
          <div key={`${activity.user}-${activity.time}`} className="flex gap-3">
            <img src={activity.avatar} className="w-8 h-8 rounded-full shadow-sm" alt="" />
            <div className="space-y-1">
              <span className="text-[11px] font-black text-primary uppercase">
                {activity.user} - {activity.time}
              </span>
              <p className="text-xs text-on-surface bg-surface-container-high p-3 rounded-2xl rounded-tl-none leading-relaxed shadow-sm">
                {activity.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
