import { 
  Plus, 
  Paperclip,
  MessageCircle
} from 'lucide-react';
import {
  CampaignChannelIcon,
  CampaignOwner,
  CampaignPriorityBadge,
  CampaignProgress,
  CAMPAIGN_STATUS_STYLES,
} from '@/components/shared/campaign';
import { useCampaigns } from '@/modules/campaigns';
import { KANBAN_COLUMNS } from '@/modules/kanban';

export default function KanbanBoard() {
  const { campaigns: allCampaigns } = useCampaigns();

  return (
    <div className="h-[calc(100vh-100px)] overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex gap-6 h-full min-w-max pb-8 px-4">
        {KANBAN_COLUMNS.map((column) => {
          const campaigns = allCampaigns.filter((campaign) => campaign.status === column.id);
          return (
            <div key={column.id} className="w-[240px] flex flex-col h-full space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${CAMPAIGN_STATUS_STYLES[column.id].dotClassName}`}></span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">{column.title}</span>
                  <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant font-medium">
                    {campaigns.length}
                  </span>
                </div>
                <span className="text-on-surface-variant text-lg cursor-pointer hover:text-on-surface transition-colors">+</span>
              </div>

              <div className="flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar pr-1">
                {campaigns.length === 0 && (
                  <div className="h-32 rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest/20 flex flex-col items-center justify-center gap-2 text-on-surface-variant group hover:border-primary/50 transition-all cursor-pointer">
                    <Plus className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-all" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter opacity-20 group-hover:opacity-100 animate-pulse">Draft Here</span>
                  </div>
                )}
                {campaigns.map((camp) => (
                  <div 
                    key={camp.id} 
                    className="bg-surface-container border border-outline rounded-md p-3 space-y-3 hover:border-gray-600 transition-all cursor-pointer group shadow-lg relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start">
                      <CampaignChannelIcon
                        channel={camp.channel}
                        showLabel
                        variant="badge"
                      />
                      {camp.priority === 'urgent' && (
                        <CampaignPriorityBadge priority={camp.priority} shortLabel className="border-transparent bg-transparent px-0" />
                      )}
                    </div>

                    <h4 className="text-xs font-semibold text-on-surface">{camp.name}</h4>
                    <p className="text-[10px] text-on-surface-variant line-clamp-2 leading-relaxed">
                      {camp.objective || 'Segment: High intent users. Focus on conversion optimization.'}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <CampaignProgress value={camp.progress} showValue className="mr-4" />
                      <div className="flex items-center -space-x-1">
                        <CampaignOwner owner={camp.owner} compact avatarClassName="border-surface shadow-sm" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 2</span>
                        <span className="flex items-center gap-1"><Paperclip className="w-3 h-3" /> 1</span>
                      </div>
                      <span>{camp.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Collab Bar */}
      <div className="fixed bottom-6 left-[264px] bg-surface-container-high/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-outline-variant flex items-center gap-6 z-50 shadow-2xl">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <img key={i} src={`https://i.pravatar.cc/150?u=collab${i}`} className="w-7 h-7 rounded-full border-2 border-surface-container shadow-lg" alt="" />
          ))}
        </div>
        <div className="h-4 w-px bg-outline-variant" />
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">3 Collaborators Live</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(210,187,255,0.6)]" />
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
