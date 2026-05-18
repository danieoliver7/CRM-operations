import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CampaignChannelIcon,
  CampaignOwner,
  CampaignPriorityBadge,
  CampaignStatusBadge,
} from '@/components/shared/campaign';
import type { Campaign } from '@/types/campaign';

interface UpcomingCampaignsListProps {
  campaigns: Campaign[];
}

export function UpcomingCampaignsList({ campaigns }: UpcomingCampaignsListProps) {
  return (
    <div className="bg-surface-container border border-outline rounded-md overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-outline flex items-center justify-between bg-surface-container-low/50">
        <h2 className="text-base font-semibold tracking-tight">Upcoming Operational Queue</h2>
        <Link to="/campaigns" className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-surface-container-lowest border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">Campaign</th>
              <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">Channel</th>
              <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">Status</th>
              <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">Owner</th>
              <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">Due</th>
              <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-surface-variant/20 transition-colors">
                <td className="px-6 py-4">
                  <Link to={`/campaign/${campaign.id}`} className="flex flex-col gap-1 group">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold group-hover:text-primary transition-colors">{campaign.name}</span>
                      {campaign.priority === 'urgent' && (
                        <CampaignPriorityBadge priority={campaign.priority} shortLabel />
                      )}
                    </div>
                    <span className="text-[11px] text-on-surface-variant">{campaign.segmentation}</span>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <CampaignChannelIcon channel={campaign.channel} showLabel />
                </td>
                <td className="px-6 py-4">
                  <CampaignStatusBadge status={campaign.status} compact />
                </td>
                <td className="px-6 py-4">
                  <CampaignOwner owner={campaign.owner} compact={false} avatarClassName="w-5 h-5" />
                </td>
                <td className="px-6 py-4 text-xs font-mono">{campaign.dueDate}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/campaign/${campaign.id}`} className="inline-flex text-on-surface-variant hover:text-on-surface">
                    <MoreHorizontal className="w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
