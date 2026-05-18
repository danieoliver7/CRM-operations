import { MessageSquare, MoreVertical } from 'lucide-react';
import type { CampaignWorkspaceActivity } from '@/modules/campaigns/hooks';

interface CampaignActivityFeedProps {
  activities: CampaignWorkspaceActivity[];
}

export function CampaignActivityFeed({ activities }: CampaignActivityFeedProps) {
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
          <div key={activity.id} className="flex gap-3">
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
