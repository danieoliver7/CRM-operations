import React from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  TrendingUp, 
  MessageSquare, 
  Zap,
  MoreVertical,
  Plus
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { MOCK_CAMPAIGNS } from '@/modules/campaigns/services';
import { Link } from 'react-router-dom';

export default function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Campaign Inventory</h1>
          <p className="text-on-surface-variant text-base mt-2">Active cross-channel marketing operations repository.</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-sm font-black flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          Create Campaign
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-primary/50 transition-all font-medium placeholder:text-on-surface-variant/40" 
                placeholder="Search repository..." 
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant/50 rounded-xl text-xs font-bold hover:bg-surface-container transition-all">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant opacity-60">
            <span>SHOWING 28 TOTAL CAMPAIGNS</span>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-outline-variant/20">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Campaign Asset</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Channel</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Priority</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Owner</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Status</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {MOCK_CAMPAIGNS.map((camp) => (
              <tr key={camp.id} className="group hover:bg-primary/5 transition-all">
                <td className="px-6 py-5">
                  <Link to={`/campaign/${camp.id}`} className="flex flex-col">
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{camp.name}</span>
                    <span className="text-[10px] text-on-surface-variant font-mono mt-1 opacity-60 uppercase">{camp.squad} squad • {camp.dueDate}</span>
                  </Link>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    {camp.channel === 'Email' ? <Mail className="w-4 h-4 text-primary" /> : 
                     camp.channel === 'Push' ? <TrendingUp className="w-4 h-4 text-secondary" /> : 
                     <MessageSquare className="w-4 h-4 text-tertiary" />}
                    <span className="text-xs font-bold">{camp.channel}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[9px] font-black border uppercase tracking-tighter",
                    camp.priority === 'Urgent' ? 'bg-error/10 text-error border-error/20' : 
                    camp.priority === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                    'bg-outline-variant/10 text-on-surface-variant border-outline-variant/20'
                  )}>
                    {camp.priority}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img src={camp.owner.avatar} className="w-7 h-7 rounded-full grayscale group-hover:grayscale-0 transition-all border border-outline-variant/30" alt="" />
                    <span className="text-xs font-medium text-on-surface-variant group-hover:text-on-surface">{camp.owner.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]",
                      camp.status === 'QA' ? 'bg-primary' : camp.status === 'Approval' ? 'bg-tertiary' : 'bg-outline'
                    )} />
                    <span className="text-xs font-bold opacity-80">{camp.status}</span>
                   </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-on-surface-variant hover:text-on-surface transition-colors p-1.5 rounded-lg border border-transparent hover:border-outline-variant/30">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="px-6 py-4 flex justify-between items-center bg-surface-container-lowest border-t border-outline-variant/10">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Page 1 of 4</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-[10px] font-black uppercase border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-all">Prev</button>
            <button className="px-3 py-1 text-[10px] font-black uppercase border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
