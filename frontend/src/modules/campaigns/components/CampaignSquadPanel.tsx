import { Cloud, Star, Users, Zap } from 'lucide-react';
import { CampaignOwner } from '@/components/shared/campaign';
import type { Campaign } from '@/types/campaign';

interface CampaignSquadPanelProps {
  campaign: Campaign;
}

export function CampaignSquadPanel({ campaign }: CampaignSquadPanelProps) {
  const reviewers = [
    { name: 'QA Ops', role: 'QA owner', avatar: 'https://i.pravatar.cc/150?u=qa-ops' },
    { name: 'CRM Strategy', role: 'Stakeholder', avatar: 'https://i.pravatar.cc/150?u=crm-strategy' },
  ];

  return (
    <section className="glass p-6 rounded-2xl space-y-6">
      <div>
        <h3 className="text-lg font-bold tracking-tight">Squad Context</h3>
        <p className="text-xs text-on-surface-variant mt-1">{campaign.squad} operating squad and workspace owners.</p>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">Owner</label>
        <div className="flex items-center gap-3 p-3 bg-surface-container-high rounded-xl transition-all group">
          <CampaignOwner owner={campaign.owner} className="flex-1" avatarClassName="w-10 h-10 grayscale group-hover:grayscale-0 transition-all" />
          <Star className="w-4 h-4 text-primary fill-primary/20" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">Reviewers</label>
        {reviewers.map((reviewer) => (
          <div key={reviewer.name} className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border border-outline-variant/30">
            <img src={reviewer.avatar} className="w-8 h-8 rounded-full grayscale" alt="" />
            <div>
              <p className="text-xs font-bold">{reviewer.name}</p>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">{reviewer.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t border-outline-variant/30">
        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">Operational Stack</label>
        {[
          { label: 'Braze Automation', icon: Cloud, color: 'text-blue-400' },
          { label: 'Salesforce Sync', icon: Zap, color: 'text-orange-400' },
          { label: 'Audience Segment', icon: Users, color: 'text-secondary' },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center justify-between p-3 bg-surface-container rounded-xl border border-outline-variant/30">
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs font-bold">{item.label}</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
