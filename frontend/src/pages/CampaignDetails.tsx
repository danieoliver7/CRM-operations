import { 
  ArrowLeft, 
  History, 
  Send, 
  FileText, 
  Edit3, 
  ExternalLink, 
  Users, 
  CheckCircle,
  MoreVertical,
  ChevronDown,
  Cloud,
  Zap,
  Star,
  MessageSquare,
  PlusCircle
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import {
  CampaignChannelIcon,
  CampaignStatusBadge,
} from '@/components/shared/campaign';
import { useCampaigns } from '@/modules/campaigns';

export default function CampaignDetails() {
  const { id } = useParams();
  const { campaigns } = useCampaigns();
  const campaign = campaigns.find((item) => item.id === id) ?? campaigns[0];

  return (
    <div className="space-y-8 pb-32 max-w-[1200px] mx-auto">
      {/* Detail Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black tracking-widest text-primary uppercase flex items-center gap-2">
              {campaign?.squad ?? 'Campaign'}
              {campaign && <CampaignChannelIcon channel={campaign.channel} showLabel />}
            </span>
            {campaign && <CampaignStatusBadge status={campaign.status} className="rounded-full" />}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{campaign?.name ?? 'Campaign Details'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass px-4 py-2 rounded-lg text-xs font-bold border border-outline-variant hover:bg-surface-container transition-all flex items-center gap-2">
            <History className="w-4 h-4" /> Version 1.4
          </button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-xs font-black shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
            <Send className="w-4 h-4 fill-on-primary" /> Launch Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Content Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Briefing Card */}
            <section className="glass p-6 rounded-2xl flex flex-col gap-6">
              <div className="flex items-center gap-3 text-primary">
                <FileText className="w-5 h-5" />
                <h3 className="text-lg font-bold tracking-tight">Campaign Briefing</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block mb-1">OBJECTIVE</label>
                  <p className="text-sm text-on-surface leading-relaxed font-medium">
                    {campaign?.objective ?? 'Loading campaign objective.'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block mb-1">KPI TARGET</label>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black text-secondary">{campaign?.metricsTarget?.expectedKpi ?? 'TBD'}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block mb-1">AUDIENCE</label>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black">45.2k</span>
                      <span className="text-[10px] font-bold text-on-surface-variant mb-1">Users</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Copywriting Card */}
            <section className="glass p-6 rounded-2xl flex flex-col gap-6">
              <div className="flex items-center gap-3 text-secondary">
                <Edit3 className="w-5 h-5" />
                <h3 className="text-lg font-bold tracking-tight">Copywriting</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest block mb-1">SUBJECT LINE</label>
                  <p className="text-sm italic font-medium">"{campaign?.content?.subject ?? 'Subject line pending approval'}"</p>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest block mb-1">PRE-HEADER</label>
                  <p className="text-sm text-on-surface-variant font-medium">
                    {campaign?.content?.preheader ?? 'Pre-header pending definition.'}
                  </p>
                </div>
                <div className="bg-secondary-container/10 border border-secondary/20 p-4 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-secondary-container/20 transition-all">
                  <div>
                    <label className="text-[9px] font-black text-secondary uppercase tracking-widest block mb-0.5">CALL TO ACTION</label>
                    <p className="text-lg font-black text-secondary">{campaign?.content?.cta ?? 'Define CTA'}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </section>
          </div>

          {/* Assets Gallery */}
          <section className="glass p-6 rounded-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-tertiary">
                <Users className="w-5 h-5" />
                <h3 className="text-lg font-bold tracking-tight">Asset Library</h3>
              </div>
              <span className="text-xs font-bold text-on-surface-variant cursor-pointer hover:text-primary transition-colors uppercase tracking-widest">Manage Files (12)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="aspect-video rounded-xl bg-surface-container-high border border-outline-variant overflow-hidden group relative cursor-pointer">
                  <img src={`https://picsum.photos/seed/asset${i}/300/200`} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" alt="" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                    <div className="glass p-2 rounded-lg"><ExternalLink className="w-4 h-4" /></div>
                  </div>
                </div>
              ))}
              <div className="aspect-video rounded-xl bg-surface-container flex flex-col items-center justify-center gap-2 border border-outline-variant/30 text-on-surface-variant transition-colors hover:bg-surface-container-highest cursor-pointer">
                <FileText className="w-6 h-6 opacity-30" />
                <span className="text-[10px] font-bold uppercase tracking-tight opacity-40 italic">Logo_Assets.zip</span>
              </div>
              <div className="aspect-video rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all cursor-pointer group">
                <PlusCircle className="w-6 h-6 mb-1 opacity-20 group-hover:opacity-100" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Asset</span>
              </div>
            </div>
          </section>

          {/* Implementation Detail */}
          <section className="glass p-6 rounded-2xl flex flex-col gap-6">
            <div className="flex items-center gap-3 text-on-surface">
              <CheckCircle className="w-5 h-5" />
              <h3 className="text-lg font-bold tracking-tight">Technical Implementation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-center gap-4 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Segmentation: Power Users</p>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-1">Filter: logins {`> `} 30/mo AND plan === {`'enterprise'`}</p>
                </div>
              </div>
              <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-center gap-4 hover:border-secondary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">A/B Strategy: 50/50 Control</p>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-1">Variant A: Tech Focus. Variant B: Value Props.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Controls */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass p-6 rounded-2xl space-y-6">
            <div>
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block mb-4">Operational Status</label>
              <div className="relative group">
                <select
                  defaultValue="In Production"
                  className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-3 text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
                >
                  <option>Drafting</option>
                  <option>Under Review</option>
                  <option>In Production</option>
                  <option>Scheduled</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors pointer-events-none" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">Core Assignees</label>
              <div className="space-y-1">
                {[
                  { name: 'Elena Soros', role: 'Creative Lead', master: true },
                  { name: 'Jordan Kox', role: 'CRM Strategist' }
                ].map((owner, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 hover:bg-surface-container-high rounded-xl transition-all group cursor-pointer">
                    <img src={`https://i.pravatar.cc/150?u=owner${i}`} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all" alt="" />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{owner.name}</p>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">{owner.role}</p>
                    </div>
                    {owner.master && <Star className="w-4 h-4 text-primary fill-primary/20" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-on-surface-variant">SLA Countdown</span>
                <span className="text-error">Critical</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono tracking-tighter">04:12:35</span>
                <span className="text-[11px] font-bold text-on-surface-variant italic">remaining</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden mt-2">
                <div className="h-full bg-error w-4/5 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-outline-variant/30">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">Operational Tech Stack</label>
              <div className="space-y-2">
                 <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl border border-outline-variant/30">
                    <div className="flex items-center gap-3">
                      <Cloud className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold">Braze Automation</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                 </div>
                 <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl border border-outline-variant/30">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-bold">Salesforce Sync</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                 </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Persistent Comment Bar */}
      <div className="fixed bottom-8 right-8 z-50 w-[400px] glass rounded-2xl shadow-2xl flex flex-col border-primary/20 animate-in slide-in-from-bottom-4 duration-500">
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/80 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold tracking-tight uppercase">Operational Feed</h3>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-black">4 LIVE</span>
          </div>
          <MoreVertical className="w-4 h-4 text-on-surface-variant cursor-pointer" />
        </div>
        <div className="h-64 overflow-y-auto p-4 space-y-4 no-scrollbar">
          <div className="flex gap-3">
            <img src="https://i.pravatar.cc/150?u=collab1" className="w-8 h-8 rounded-full shadow-sm" alt="" />
            <div className="space-y-1">
              <span className="text-[11px] font-black text-primary uppercase">@ElenaSoros - 12m ago</span>
              <p className="text-xs text-on-surface bg-surface-container-high p-3 rounded-2xl rounded-tl-none leading-relaxed shadow-sm">
                Can we double check the merge tag for {`{first_name}`}? <span className="text-secondary font-bold">@JordanKox</span> please confirm in Braze production node.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <img src="https://i.pravatar.cc/150?u=collab2" className="w-8 h-8 rounded-full shadow-sm" alt="" />
            <div className="space-y-1">
              <span className="text-[11px] font-black text-on-surface-variant uppercase">Jordan Kox - 5m ago</span>
              <p className="text-xs text-on-surface bg-surface-container-high p-3 rounded-2xl rounded-tl-none leading-relaxed shadow-sm">
                Confirmed, Braze validation passed for segment A. Production relay is green.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-surface-container border-t border-outline-variant/30 rounded-b-2xl">
          <div className="relative">
            <input className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 pl-4 pr-12 text-xs font-medium outline-none focus:border-primary/50 transition-all placeholder:text-on-surface-variant/40" placeholder="Type a sync update or '@' to mention..." />
            <button className="absolute right-2 top-2 p-1.5 bg-primary text-on-primary rounded-lg shadow-sm hover:scale-110 active:scale-95 transition-all">
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
