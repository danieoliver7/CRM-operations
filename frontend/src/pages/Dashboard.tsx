import React from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Mail, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '@/utils/cn';
import { useCampaigns } from '@/modules/campaigns';
import { MOCK_ACTIVITIES } from '@/modules/dashboard/services';

const performanceData = [
  { name: '08:00', value: 30 },
  { name: '10:00', value: 45 },
  { name: '12:00', value: 38 },
  { name: '14:00', value: 65 },
  { name: '16:00', value: 50 },
  { name: '18:00', value: 80 },
  { name: '20:00', value: 40 },
];

export default function Dashboard() {
  const { campaigns } = useCampaigns();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations Dashboard</h1>
          <p className="text-on-surface-variant text-sm mt-1">Real-time oversight for global multi-channel delivery.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            All Regions
          </button>
          <button className="bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-lg border border-outline-variant text-xs font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            Past 24 Hours
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Campaigns', value: '1,284', trend: '+12% vs LY', icon: Rocket, color: 'text-primary' },
          { label: 'SLA Adherence', value: '99.2%', trend: '+0.4% stability', icon: ShieldCheck, color: 'text-secondary' },
          { label: 'Overdue Tasks', value: '14', trend: 'Requires Attention', icon: AlertTriangle, color: 'text-error', border: 'border-error/20' },
          { label: 'Pending Approval', value: '28', trend: 'Awaiting Stakeholder', icon: Clock, color: 'text-tertiary', border: 'border-tertiary/20' },
        ].map((stat, i) => (
          <div key={i} className={cn("bg-surface-container border border-outline p-4 rounded-md flex flex-col justify-between shadow-sm", stat.border)}>
            <div className="flex items-start justify-between">
              <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-on-surface">{stat.value}</span>
              <p className={cn("text-[10px] mt-1 font-bold", i === 2 ? 'text-error' : i === 3 ? 'text-tertiary' : 'text-green-500')}>
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Productivity Chart */}
        <div className="lg:col-span-8 bg-surface-container border border-outline p-6 rounded-md flex flex-col gap-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">Team Velocity & Output</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-on-surface-variant">Deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-xs text-on-surface-variant">Avg. Latency</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="5%" stopColor="#d2bbff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d2bbff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a2a" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#958da1', fontSize: 10 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #4a4455', borderRadius: '8px' }}
                  itemStyle={{ color: '#d2bbff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#d2bbff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 border-t border-outline-variant pt-4">
            <div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase">Peak Hour</p>
              <p className="text-lg font-bold">14:22 GMT</p>
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase">Error Rate</p>
              <p className="text-lg font-bold text-green-400">0.02%</p>
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase">Instances</p>
              <p className="text-lg font-bold">114 Nodes</p>
            </div>
          </div>
        </div>

        {/* Channel Volume */}
        <div className="lg:col-span-4 bg-surface-container border border-outline p-6 rounded-md flex flex-col gap-6 shadow-sm">
          <h2 className="text-base font-semibold tracking-tight">Scheduled Volume</h2>
          <div className="space-y-6">
            {[
              { label: 'Email', current: '4.2M', total: '5M', progress: 84, icon: Mail, color: 'text-primary' },
              { label: 'Push', current: '1.8M', total: '2M', progress: 90, icon: TrendingUp, color: 'text-secondary' },
              { label: 'WhatsApp', current: '850K', total: '1M', progress: 85, icon: MessageSquare, color: 'text-tertiary' },
            ].map((channel, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <channel.icon className={cn("w-4 h-4", channel.color)} />
                    <span className="font-semibold">{channel.label}</span>
                  </div>
                  <span className="text-on-surface-variant font-mono">{channel.current} / {channel.total}</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-500", channel.color.replace('text-', 'bg-'))}
                    style={{ width: `${channel.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto p-4 bg-surface-container-low rounded-lg border border-outline-variant">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0">
                <TrendingUp className="text-secondary w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold">High Throughput Alert</p>
                <p className="text-[11px] text-on-surface-variant mt-1">Email relay approaching quota in US-East-1.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* QA Queue */}
        <div className="lg:col-span-8 bg-surface-container border border-outline rounded-md overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-outline flex items-center justify-between bg-surface-container-low/50">
            <h2 className="text-base font-semibold tracking-tight">QA Approval Queue</h2>
            <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-surface-container-lowest border-b border-outline-variant">
              <tr>
                <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">Campaign</th>
                <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">Status</th>
                <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">Owner</th>
                <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant">ETA</th>
                <th className="px-6 py-3 text-[10px] uppercase font-bold text-on-surface-variant"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {campaigns.slice(0, 2).map((camp) => (
                <tr key={camp.id} className="hover:bg-surface-variant/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{camp.name}</span>
                      <span className="text-[11px] text-on-surface-variant">{camp.segmentation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold border",
                      camp.status === 'qa' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                    )}>
                      {camp.status === 'qa' ? 'QA Review' : 'Stakeholder'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={camp.owner.avatar} className="w-5 h-5 rounded-full" alt="" />
                      <span className="text-xs text-on-surface-variant">{camp.owner.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">{camp.sla}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-on-surface-variant hover:text-on-surface">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity & Team */}
        <div className="lg:col-span-4 bg-surface-container border border-outline p-6 rounded-md flex flex-col gap-6 shadow-sm">
          <h2 className="text-base font-semibold tracking-tight">Team Activity</h2>
          <div className="space-y-4">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-1.5 shrink-0",
                  activity.type === 'alert' ? 'bg-error' : 'bg-primary'
                )} />
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    <span className="text-on-surface font-bold">{activity.user.name || 'System'}</span>
                    {' '}{activity.action}{' '}
                    <span className="text-primary font-medium">{activity.target}</span>
                  </p>
                  <span className="text-[10px] text-on-surface-variant/60">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto border-t border-outline-variant pt-6">
            <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block mb-4">Operations Timeline</span>
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 right-0 h-px bg-outline-variant top-1.5" />
              {[0, 1, 2, 3].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={cn("w-3 h-3 rounded-full border-2 border-surface shadow-lg", i === 0 ? 'bg-primary scale-125' : 'bg-surface-container-highest')} />
                  <span className="text-[9px] font-bold text-on-surface-variant">
                    {i === 0 ? '09:00' : i === 1 ? '11:00' : i === 2 ? '13:00' : '15:00'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
