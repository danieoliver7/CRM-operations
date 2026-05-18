import { CheckCircle, Edit3, ExternalLink, FileText, Users, Zap } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  CampaignActivityFeed,
  CampaignAttachments,
  CampaignChecklist,
  CampaignNextActions,
  CampaignQuickActions,
  CampaignSquadPanel,
  CampaignTimeline,
  CampaignWorkspaceHeader,
  CampaignWorkspaceToast,
  useCampaigns,
  useCampaignWorkspaceState,
} from '@/modules/campaigns';

export default function CampaignDetails() {
  const { id } = useParams();
  const { campaigns, isLoading } = useCampaigns();
  const sourceCampaign = campaigns.find((item) => item.id === id);

  if (isLoading) {
    return <div className="text-sm text-on-surface-variant">Loading campaign context...</div>;
  }

  if (!sourceCampaign) {
    return (
      <div className="space-y-4">
        <Link to="/campaigns" className="text-primary text-xs font-bold hover:underline">
          Back to campaigns
        </Link>
        <div className="glass p-8 rounded-2xl">
          <h1 className="text-2xl font-bold">Campaign not found</h1>
          <p className="text-sm text-on-surface-variant mt-2">
            This campaign id is not available in the current workspace mock.
          </p>
        </div>
      </div>
    );
  }

  return <CampaignWorkspace campaign={sourceCampaign} />;
}

function CampaignWorkspace({ campaign: sourceCampaign }: { campaign: NonNullable<ReturnType<typeof useCampaigns>['campaigns'][number]> }) {
  const {
    activities,
    campaign,
    checklistItems,
    feedback,
    moveToNextStatus,
    moveToStatus,
    nextStatus,
    toggleChecklistItem,
    updatePriority,
  } = useCampaignWorkspaceState(sourceCampaign);

  return (
    <div className="space-y-6 pb-20 max-w-[1200px] mx-auto">
      <CampaignWorkspaceToast message={feedback} />
      <CampaignWorkspaceHeader campaign={campaign} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="glass p-6 rounded-2xl flex flex-col gap-6">
              <div className="flex items-center gap-3 text-primary">
                <FileText className="w-5 h-5" />
                <h3 className="text-lg font-bold tracking-tight">Campaign Briefing</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block mb-1">
                    Objective
                  </label>
                  <p className="text-sm text-on-surface leading-relaxed font-medium">{campaign.objective}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block mb-1">
                      KPI Target
                    </label>
                    <span className="text-2xl font-black text-secondary">
                      {campaign.metricsTarget?.expectedKpi ?? 'TBD'}
                    </span>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block mb-1">
                      Audience
                    </label>
                    <span className="text-base font-black">{campaign.segmentation ?? 'Audience pending'}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="glass p-6 rounded-2xl flex flex-col gap-6">
              <div className="flex items-center gap-3 text-secondary">
                <Edit3 className="w-5 h-5" />
                <h3 className="text-lg font-bold tracking-tight">Copy Workspace</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest block mb-1">
                    Subject Line
                  </label>
                  <p className="text-sm italic font-medium">
                    "{campaign.content?.subject ?? 'Subject line pending approval'}"
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest block mb-1">
                    Pre-header
                  </label>
                  <p className="text-sm text-on-surface-variant font-medium">
                    {campaign.content?.preheader ?? 'Pre-header pending definition.'}
                  </p>
                </div>
                <div className="bg-secondary-container/10 border border-secondary/20 p-4 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-secondary-container/20 transition-all">
                  <div>
                    <label className="text-[9px] font-black text-secondary uppercase tracking-widest block mb-0.5">
                      Call to action
                    </label>
                    <p className="text-lg font-black text-secondary">{campaign.content?.cta ?? 'Define CTA'}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </section>
          </div>

          <CampaignAttachments campaign={campaign} />

          <section className="glass p-6 rounded-2xl flex flex-col gap-6">
            <div className="flex items-center gap-3 text-on-surface">
              <CheckCircle className="w-5 h-5" />
              <h3 className="text-lg font-bold tracking-tight">Implementation Context</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-center gap-4 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Segmentation: {campaign.segmentation ?? 'Pending definition'}</p>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-1">
                    Squad: {campaign.squad} - Channel: {campaign.channel}
                  </p>
                </div>
              </div>
              <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-center gap-4 hover:border-secondary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Operational Target</p>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-1">
                    {campaign.metricsTarget?.expectedKpi ?? 'Define KPI before launch.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <CampaignTimeline campaign={campaign} />
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          <CampaignQuickActions
            currentStatus={campaign.status}
            currentPriority={campaign.priority}
            nextStatus={nextStatus}
            onMoveToNextStatus={moveToNextStatus}
            onMoveToStatus={moveToStatus}
            onPriorityChange={updatePriority}
          />
          <CampaignNextActions campaign={campaign} />
          <CampaignChecklist items={checklistItems} onToggleItem={toggleChecklistItem} />
          <CampaignSquadPanel campaign={campaign} />
          <CampaignActivityFeed activities={activities} />
        </aside>
      </div>
    </div>
  );
}
