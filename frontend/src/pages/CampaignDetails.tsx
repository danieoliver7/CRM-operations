import { useEffect, useState } from 'react';
import { CheckCircle, Edit3, ExternalLink, FileText, Users, Zap } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  CampaignActivityFeed,
  CampaignAttachments,
  CampaignChecklist,
  CampaignDecisionContext,
  CampaignOperationalCommandCenter,
  CampaignOperationalTimeline,
  CampaignQuickActions,
  CampaignSquadPanel,
  CampaignWorkspaceHeader,
  CampaignWorkspaceToast,
  CampaignWorkspaceApiError,
  getCampaignWorkspaceFacts,
  mapCampaignWorkspaceFactsToViewModel,
  useCampaignWorkspaceState,
  type CampaignWorkspaceViewModel,
} from '@/modules/campaigns';

type WorkspaceLoadError = 'missing-id' | 'not-found' | 'backend-unavailable' | 'unexpected';

export default function CampaignDetails() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState<CampaignWorkspaceViewModel | null>(null);
  const [error, setError] = useState<WorkspaceLoadError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setWorkspace(null);
      setError('missing-id');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    getCampaignWorkspaceFacts(id, { signal: controller.signal })
      .then((facts) => {
        setWorkspace(mapCampaignWorkspaceFactsToViewModel(facts));
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') return;

        setWorkspace(null);

        if (loadError instanceof CampaignWorkspaceApiError) {
          if (loadError.code === 'CAMPAIGN_NOT_FOUND') {
            setError('not-found');
            return;
          }

          if (loadError.code === 'BACKEND_UNAVAILABLE') {
            setError('backend-unavailable');
            return;
          }
        }

        setError('unexpected');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return <div className="text-sm text-on-surface-variant">Loading campaign context...</div>;
  }

  if (error || !workspace) {
    return <CampaignWorkspaceLoadError error={error ?? 'unexpected'} />;
  }

  return <CampaignWorkspace workspace={workspace} />;
}

function CampaignWorkspaceLoadError({ error }: { error: WorkspaceLoadError }) {
  const errorCopy: Record<WorkspaceLoadError, { title: string; description: string }> = {
    'missing-id': {
      title: 'Campaign not found',
      description: 'This route is missing a campaign id.',
    },
    'not-found': {
      title: 'Campaign not found',
      description: 'This campaign id is not available in the backend workspace facts.',
    },
    'backend-unavailable': {
      title: 'Backend unavailable',
      description: 'Campaign workspace facts could not be loaded. Confirm the backend is running and try again.',
    },
    unexpected: {
      title: 'Unable to load campaign workspace',
      description: 'The workspace facts response could not be read safely.',
    },
  };

  return (
    <div className="space-y-4">
      <Link to="/campaigns" className="text-primary text-xs font-bold hover:underline">
        Back to campaigns
      </Link>
      <div className="glass p-8 rounded-2xl">
        <h1 className="text-2xl font-bold">{errorCopy[error].title}</h1>
        <p className="text-sm text-on-surface-variant mt-2">{errorCopy[error].description}</p>
      </div>
    </div>
  );
}

function CampaignWorkspace({ workspace }: { workspace: CampaignWorkspaceViewModel }) {
  const {
    activities,
    campaign,
    checklistItems,
    executeWorkflowAction,
    feedback,
    toggleChecklistItem,
    updatePriority,
    workflowActions,
  } = useCampaignWorkspaceState(workspace.campaign, {
    initialActivities: workspace.activities,
  });

  return (
    <div className="space-y-6 pb-20 max-w-[1200px] mx-auto">
      <CampaignWorkspaceToast message={feedback} />
      <CampaignWorkspaceHeader campaign={campaign} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          <CampaignOperationalCommandCenter campaign={campaign} />

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

          <CampaignOperationalTimeline campaign={campaign} />
          <CampaignDecisionContext campaign={campaign} />
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          <CampaignQuickActions
            currentPriority={campaign.priority}
            actions={workflowActions}
            onAction={executeWorkflowAction}
            onPriorityChange={updatePriority}
          />
          <CampaignChecklist items={checklistItems} onToggleItem={toggleChecklistItem} />
          <CampaignSquadPanel campaign={campaign} />
          <CampaignActivityFeed activities={activities} />
        </aside>
      </div>
    </div>
  );
}
