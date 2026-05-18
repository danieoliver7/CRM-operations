import { useMemo } from 'react';
import { useCampaigns } from '@/modules/campaigns';
import {
  CampaignKanbanColumn,
  groupCampaignsByStatus,
  KANBAN_COLUMNS,
} from '@/modules/kanban';

export default function KanbanBoard() {
  const { campaigns } = useCampaigns();
  const campaignsByStatus = useMemo(() => groupCampaignsByStatus(campaigns), [campaigns]);

  return (
    <div className="h-[calc(100vh-100px)] overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex gap-6 h-full min-w-max pb-8 px-4">
        {KANBAN_COLUMNS.map((column) => (
          <CampaignKanbanColumn
            key={column.id}
            column={column}
            campaigns={campaignsByStatus[column.id]}
          />
        ))}
      </div>

      {/* Floating Collab Bar */}
      <div className="fixed bottom-6 left-[264px] bg-surface-container-high/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-outline-variant flex items-center gap-6 z-50 shadow-2xl">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((item) => (
            <img
              key={item}
              src={`https://i.pravatar.cc/150?u=collab${item}`}
              className="w-7 h-7 rounded-full border-2 border-surface-container shadow-lg"
              alt=""
            />
          ))}
        </div>
        <div className="h-4 w-px bg-outline-variant" />
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
            3 Collaborators Live
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(210,187,255,0.6)]" />
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
