import { ArrowLeft, History, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CampaignChannelIcon,
  CampaignOwner,
  CampaignPriorityBadge,
  CampaignProgress,
  CampaignStatusBadge,
} from '@/components/shared/campaign';
import { ExecutionHealthBadge } from './ExecutionHealthBadge';
import { SLAWarningBadge } from './SLAWarningBadge';
import { CoordinationStatusBadge } from './CoordinationStatusBadge';
import { getCampaignCoordinationContext, getCampaignExecutionHealth } from '@/modules/campaigns/utils';
import type { Campaign } from '@/types/campaign';

interface CampaignWorkspaceHeaderProps {
  campaign: Campaign;
}

export function CampaignWorkspaceHeader({ campaign }: CampaignWorkspaceHeaderProps) {
  const execution = getCampaignExecutionHealth(campaign);
  const coordination = getCampaignCoordinationContext(campaign);

  return (
    <div className="glass p-6 rounded-2xl">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="min-w-0">
          <Link
            to="/campaigns"
            className="text-[10px] font-black tracking-widest text-on-surface-variant uppercase inline-flex items-center gap-2 mb-4 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Campaign inventory
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-[10px] font-black tracking-widest text-primary uppercase">
              {campaign.squad} workspace
            </span>
            <CampaignChannelIcon channel={campaign.channel} showLabel variant="badge" />
            <CampaignStatusBadge status={campaign.status} className="rounded-full" />
            <CampaignPriorityBadge priority={campaign.priority} />
            <ExecutionHealthBadge health={execution.health} />
            <SLAWarningBadge slaState={execution.slaState} daysUntilDue={execution.daysUntilDue} />
            <CoordinationStatusBadge state={coordination.state} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">{campaign.name}</h1>
          <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">{campaign.objective}</p>
          <p className="mt-3 max-w-2xl text-xs font-medium leading-relaxed text-on-surface-variant">
            {execution.summary} Next responsible area: {coordination.nextResponsibleArea}.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:min-w-[280px]">
          <div className="flex items-center justify-between gap-3">
            <CampaignOwner owner={campaign.owner} avatarClassName="w-9 h-9" />
            <div className="flex items-center gap-2">
              <button className="glass px-3 py-2 rounded-lg text-xs font-bold border border-outline-variant hover:bg-surface-container transition-all flex items-center gap-2">
                <History className="w-4 h-4" /> v1.4
              </button>
              <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-black shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                <Send className="w-4 h-4 fill-on-primary" /> Launch
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-3">
              <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">SLA</p>
              <p className="text-lg font-black font-mono mt-1">{campaign.sla}</p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-3">
              <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Due Date</p>
              <p className="text-lg font-black font-mono mt-1">{campaign.dueDate}</p>
            </div>
          </div>

          <CampaignProgress value={campaign.progress} showValue />
        </div>
      </div>
    </div>
  );
}
