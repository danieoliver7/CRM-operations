import { ArrowRight, CheckCircle2, Flag, Send, TimerReset } from 'lucide-react';
import { CampaignPriorityBadge } from '@/components/shared/campaign';
import type { CampaignPriority, CampaignStatus } from '@/types/campaign';
import { CAMPAIGN_PRIORITY_LABELS, CAMPAIGN_PRIORITIES, CAMPAIGN_STATUS_LABELS } from '@/types/campaign';

interface CampaignQuickActionsProps {
  currentStatus: CampaignStatus;
  currentPriority: CampaignPriority;
  nextStatus?: CampaignStatus;
  onMoveToNextStatus: () => void;
  onMoveToStatus: (status: CampaignStatus) => void;
  onPriorityChange: (priority: CampaignPriority) => void;
}

export function CampaignQuickActions({
  currentStatus,
  currentPriority,
  nextStatus,
  onMoveToNextStatus,
  onMoveToStatus,
  onPriorityChange,
}: CampaignQuickActionsProps) {
  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold tracking-tight">Quick Actions</h3>
        <p className="text-xs text-on-surface-variant mt-1">Local mock actions for this campaign workspace.</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={onMoveToNextStatus}
          disabled={!nextStatus}
          className="flex items-center justify-between gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low p-3 text-left hover:border-primary/40 hover:bg-surface-container-high transition-all disabled:opacity-40"
        >
          <span className="flex items-center gap-3">
            <ArrowRight className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold">
              {nextStatus ? `Move to ${CAMPAIGN_STATUS_LABELS[nextStatus]}` : 'Workflow completed'}
            </span>
          </span>
          {nextStatus && <span className="text-[10px] font-black text-primary uppercase">Next</span>}
        </button>

        <button
          type="button"
          onClick={() => onMoveToStatus('qa')}
          disabled={currentStatus === 'qa'}
          className="flex items-center gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low p-3 text-left hover:border-secondary/40 hover:bg-surface-container-high transition-all disabled:opacity-40"
        >
          <CheckCircle2 className="w-4 h-4 text-secondary" />
          <span className="text-xs font-bold">Move to QA</span>
        </button>

        <button
          type="button"
          onClick={() => onMoveToStatus('scheduled')}
          disabled={currentStatus === 'scheduled'}
          className="flex items-center gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low p-3 text-left hover:border-tertiary/40 hover:bg-surface-container-high transition-all disabled:opacity-40"
        >
          <TimerReset className="w-4 h-4 text-tertiary" />
          <span className="text-xs font-bold">Schedule Campaign</span>
        </button>

        <button
          type="button"
          onClick={() => onMoveToStatus('completed')}
          disabled={currentStatus === 'completed'}
          className="flex items-center gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low p-3 text-left hover:border-green-400/40 hover:bg-surface-container-high transition-all disabled:opacity-40"
        >
          <Send className="w-4 h-4 text-green-400" />
          <span className="text-xs font-bold">Mark as Completed</span>
        </button>
      </div>

      <div className="space-y-3 border-t border-outline-variant/30 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Priority</span>
          <CampaignPriorityBadge priority={currentPriority} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {CAMPAIGN_PRIORITIES.map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() => onPriorityChange(priority)}
              className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-[10px] font-black uppercase tracking-tight hover:border-primary/40 hover:bg-surface-container-high transition-all"
            >
              <Flag className="w-3 h-3" />
              {CAMPAIGN_PRIORITY_LABELS[priority]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
