import {
  Archive,
  ArrowRight,
  CheckCircle2,
  Copy,
  Flag,
  RotateCcw,
  Send,
  TimerReset,
  type LucideIcon,
} from 'lucide-react';
import { CampaignPriorityBadge } from '@/components/shared/campaign';
import type { CampaignWorkflowAction, CampaignWorkflowActionId } from '@/modules/campaigns/utils';
import type { CampaignPriority } from '@/types/campaign';
import { CAMPAIGN_PRIORITY_LABELS, CAMPAIGN_PRIORITIES } from '@/types/campaign';

interface CampaignQuickActionsProps {
  currentPriority: CampaignPriority;
  actions: CampaignWorkflowAction[];
  onAction: (action: CampaignWorkflowAction) => void;
  onPriorityChange: (priority: CampaignPriority) => void;
}

const actionIcons: Record<CampaignWorkflowActionId, LucideIcon> = {
  submit_briefing: ArrowRight,
  send_to_copy: ArrowRight,
  submit_copy: ArrowRight,
  request_copy_changes: RotateCcw,
  approve_copy: CheckCircle2,
  approve_campaign: CheckCircle2,
  request_changes: RotateCcw,
  send_to_qa: CheckCircle2,
  return_to_copy: RotateCcw,
  mark_qa_complete: CheckCircle2,
  return_to_development: RotateCcw,
  flag_qa_issue: Flag,
  mark_as_sent: Send,
  reschedule: TimerReset,
  cancel_schedule: RotateCcw,
  mark_as_completed: CheckCircle2,
  review_performance: ArrowRight,
  archive_campaign: Archive,
  duplicate_campaign: Copy,
};

export function CampaignQuickActions({
  currentPriority,
  actions,
  onAction,
  onPriorityChange,
}: CampaignQuickActionsProps) {
  const primaryAction = actions.find((action) => action.variant === 'primary');
  const secondaryActions = actions.filter((action) => action.variant === 'secondary').slice(0, 3);

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold tracking-tight">Quick Actions</h3>
        <p className="text-xs text-on-surface-variant mt-1">Local mock actions for this campaign workspace.</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {primaryAction && (
          <button
            type="button"
            onClick={() => onAction(primaryAction)}
            className="flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/10 p-3 text-left hover:border-primary/60 hover:bg-primary/15 transition-all"
          >
            <span className="flex items-center gap-3">
              {(() => {
                const Icon = actionIcons[primaryAction.id];
                return <Icon className="w-4 h-4 text-primary" />;
              })()}
              <span className="text-xs font-bold">{primaryAction.label}</span>
            </span>
            <span className="text-[10px] font-black text-primary uppercase">Primary</span>
          </button>
        )}

        {secondaryActions.map((action) => {
          const Icon = actionIcons[action.id];

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onAction(action)}
              className="flex items-center gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low p-3 text-left hover:border-secondary/40 hover:bg-surface-container-high transition-all"
            >
              <Icon className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold">{action.label}</span>
            </button>
          );
        })}
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
