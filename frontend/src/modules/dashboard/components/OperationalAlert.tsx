import { AlertTriangle, CalendarClock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Campaign } from '@/types/campaign';

interface OperationalAlertProps {
  urgentCampaigns: Campaign[];
  delayedCampaigns: Campaign[];
  qaCampaigns: Campaign[];
}

export function OperationalAlert({ urgentCampaigns, delayedCampaigns, qaCampaigns }: OperationalAlertProps) {
  const hasRisk = urgentCampaigns.length > 0 || delayedCampaigns.length > 0;

  return (
    <div className="bg-surface-container border border-outline p-6 rounded-md flex flex-col gap-5 shadow-sm">
      <h2 className="text-base font-semibold tracking-tight">Operational Alerts</h2>

      <div className="space-y-4">
        <Link to={hasRisk ? '/campaigns?priority=urgent' : '/campaigns'} className="flex gap-3 group">
          <AlertTriangle className={hasRisk ? 'w-4 h-4 text-error shrink-0 mt-0.5' : 'w-4 h-4 text-green-400 shrink-0 mt-0.5'} />
          <div>
            <p className="text-xs font-bold group-hover:text-primary transition-colors">
              {hasRisk ? 'Risk queue active' : 'No critical risk'}
            </p>
            <p className="text-[11px] text-on-surface-variant mt-1">
              {urgentCampaigns.length} urgent and {delayedCampaigns.length} delayed campaigns.
            </p>
          </div>
        </Link>

        <Link to="/kanban?status=qa" className="flex gap-3 group">
          <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold group-hover:text-primary transition-colors">QA pressure</p>
            <p className="text-[11px] text-on-surface-variant mt-1">
              {qaCampaigns.length} campaigns need validation or approval.
            </p>
          </div>
        </Link>

        <Link to="/campaigns?status=scheduled" className="flex gap-3 group">
          <CalendarClock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold group-hover:text-primary transition-colors">Next action</p>
            <p className="text-[11px] text-on-surface-variant mt-1">
              Prioritize due dates and unblock urgent campaign owners first.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
