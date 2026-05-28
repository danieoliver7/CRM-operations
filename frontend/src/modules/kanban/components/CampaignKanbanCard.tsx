import { MessageCircle, Paperclip } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CampaignChannelIcon,
  CampaignOwner,
  CampaignPriorityBadge,
  CampaignProgress,
} from '@/components/shared/campaign';
import {
  CoordinationStatusBadge,
  ExecutionHealthBadge,
  getCampaignCoordinationContext,
  getCampaignExecutionHealth,
} from '@/modules/campaigns';
import type { Campaign } from '@/types/campaign';
import { cn } from '@/utils/cn';

interface CampaignKanbanCardProps {
  campaign: Campaign;
}

export function CampaignKanbanCard({ campaign }: CampaignKanbanCardProps) {
  const isUrgent = campaign.priority === 'urgent';
  const execution = getCampaignExecutionHealth(campaign);
  const coordination = getCampaignCoordinationContext(campaign);
  const signalCount = execution.blockers.length + execution.risks.length;

  return (
    <Link
      to={`/campaign/${campaign.id}`}
      className={cn(
        'block w-full min-w-0 bg-surface-container border border-outline rounded-md p-3 space-y-3 hover:border-gray-600 transition-all cursor-pointer group shadow-lg relative overflow-hidden',
        isUrgent && 'border-error/30',
      )}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <CampaignChannelIcon channel={campaign.channel} showLabel variant="badge" />
        {isUrgent && (
          <CampaignPriorityBadge
            priority={campaign.priority}
            shortLabel
            className="border-transparent bg-transparent px-0"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <ExecutionHealthBadge health={execution.health} />
        <CoordinationStatusBadge state={coordination.state} />
      </div>

      <h4 className="truncate text-xs font-semibold text-on-surface">{campaign.name}</h4>
      <p className="text-[10px] text-on-surface-variant line-clamp-2 leading-relaxed">
        {campaign.objective || 'Segment: High intent users. Focus on conversion optimization.'}
      </p>

      <div className="flex min-w-0 items-center justify-between pt-1">
        <CampaignProgress value={campaign.progress} showValue className="mr-4" />
        <div className="flex items-center -space-x-1">
          <CampaignOwner owner={campaign.owner} compact avatarClassName="border-surface shadow-sm" />
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-between gap-2 text-[10px] text-on-surface-variant">
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> {signalCount}
          </span>
          <span className="flex items-center gap-1">
            <Paperclip className="w-3 h-3" /> 1
          </span>
        </div>
        <span className="truncate">{campaign.dueDate}</span>
      </div>
      <p className="truncate border-t border-outline-variant/20 pt-2 text-[10px] font-medium text-on-surface-variant">
        {coordination.nextResponsibleArea}: {coordination.bottleneck}
      </p>
    </Link>
  );
}
