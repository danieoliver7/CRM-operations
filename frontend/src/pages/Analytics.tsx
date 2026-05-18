import React from 'react';
import { 
  CheckCircle2, 
  Mail, 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Filter,
  Calendar,
  Zap,
  MoreVertical,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '@/utils/cn';

const kpiTrend = [
  { day: '01', revenue: 4000, conv: 2.4 },
  { day: '05', revenue: 3000, conv: 1.8 },
  { day: '10', revenue: 5000, conv: 3.2 },
  { day: '15', revenue: 4500, conv: 2.1 },
  { day: '20', revenue: 7000, conv: 4.5 },
  { day: '25', revenue: 6000, conv: 3.8 },
  { day: '30', revenue: 8000, conv: 5.2 },
];

const channelPerf = [
  { name: 'Email', value: 42, color: '#d2bbff' },
  { name: 'SMS', value: 28, color: '#89ceff' },
  { name: 'Push', value: 18, color: '#ffb784' },
  { name: 'Webhooks', value: 12, color: '#958da1' },
];

export default function Analytics() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-on-surface">KPI Analytics</h1>
          <p className="text-on-surface-variant text-base mt-2">Real-time performance metrics across all active CRM channels.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-surface-container rounded-lg border border-outline-variant px-4 py-2 gap-3 hover:bg-surface-container-high transition-all cursor-pointer">
            <Calendar className="w-5 h-5 text-on-surface-variant" />
            <span className="text-xs font-bold text-on-surface">Oct 1 - Oct 31, 2023</span>
          </div>
          <button className="bg-surface-container border border-outline-variant px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-surface-container-high transition-all">
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="bg-primary text-on-primary px-5 py-2 rounded-lg text-xs font-black flex items-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'DELIVERY RATE', value: '99.8%', trend: '+0.2%', up: true, icon: CheckCircle2, color: 'text-primary' },
          { label: 'OPEN RATE', value: '24.5%', trend: '+4.1%', up: true, icon: Mail, color: 'text-secondary' },
          { label: 'CTR', value: '5.2%', trend: '-1.2%', up: false, icon: BarChart3, color: 'text-tertiary' },
          { label: 'BOUNCE', value: '0.4%', trend: '-0.1%', up: true, icon: ArrowDownRight, color: 'text-error' },
          { label: 'CONVERSION', value: '1.8%', trend: '+0.5%', up: true, icon: Zap, color: 'text-primary' },
          { label: 'REVENUE', value: '$142.5k', trend: '+12.8%', up: true, icon: BarChart3, color: 'text-primary', highlight: true },
        ].map((stat, i) => (
          <div key={i} className={cn("bg-surface-container border border-outline p-5 rounded-md flex flex-col gap-2 shadow-sm", stat.highlight && "border-primary/50 bg-primary/5")}>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">{stat.label}</span>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </div>
            <div className="text-2xl font-bold text-on-surface leading-none">{stat.value}</div>
            <div className="flex items-center gap-1">
              {stat.up ? <ArrowUpRight className="w-3 h-3 text-green-400" /> : <ArrowDownRight className="w-3 h-3 text-error" />}
              <span className={cn("text-[10px] font-bold", stat.up ? "text-green-400" : "text-error")}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-container border border-outline p-8 rounded-md overflow-hidden flex flex-col gap-8 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Performance Trend</h3>
              <p className="text-xs text-on-surface-variant mt-1">Full funnel analysis over the last 30 business days.</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[11px] font-bold text-on-surface-variant uppercase">Revenue</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-[11px] font-bold text-on-surface-variant uppercase">Conversions</span>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpiTrend}>
                <defs>
                  <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="5%" stopColor="#d2bbff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d2bbff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a2a" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#958da1', fontSize: 11 }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131313', border: '1px solid #4a4455', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#d2bbff" strokeWidth={3} fill="url(#gradRev)" />
                <Area type="monotone" dataKey="conv" stroke="#89ceff" strokeWidth={3} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container border border-outline p-8 rounded-md flex-1 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-primary w-5 h-5 fill-primary/20" />
              <h3 className="text-lg font-bold tracking-tight">AI Operational Insights</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: 'High Yield Segment', desc: 'Loyalty tier (Gold+) is converting at 18% with personalized Push notifications.', color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Optimal Send Window', desc: 'Engagement peaks at 10:15 AM PST. Automated shift recommended for Q4.', color: 'text-secondary', bg: 'bg-secondary/10' },
                { label: 'Anomaly Detected', desc: 'SMS delivery rates dropped 12% in EU region. Check vendor API status.', color: 'text-tertiary', bg: 'bg-tertiary/10' },
              ].map((insight, i) => (
                <div key={i} className="flex flex-col gap-1 w-full text-left">
                  <p className={cn("text-[9px] font-bold uppercase tracking-wider", insight.color)}>{insight.label}</p>
                  <p className="text-xs text-on-surface leading-relaxed">{insight.desc}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2 border border-outline text-on-surface font-bold text-[11px] uppercase tracking-widest rounded-md hover:bg-surface-container-high transition-all">View Operational Audit</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold tracking-tight mb-8">Channel Efficiency</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelPerf}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#958da1', fontSize: 12 }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(210, 187, 255, 0.05)' }} contentStyle={{ backgroundColor: '#131313', border: '1px solid #4a4455', borderRadius: '12px' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {channelPerf.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6 glass p-8 rounded-3xl flex flex-col gap-8">
          <h3 className="text-xl font-bold tracking-tight">Active Data Streams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Braze Enterprise', status: 'Connected', logo: 'B', color: 'bg-white text-surface' },
              { name: 'Salesforce CRM', status: 'Healthy', logo: 'sf', color: 'bg-[#00A1E0] text-white' },
              { name: 'Segment CDP', status: 'Syncing', logo: 'S', color: 'bg-[#36CDA3] text-white' },
              { name: 'HubSpot', status: 'Standby', logo: 'H', color: 'bg-[#FF7A59] text-white' },
            ].map((source, i) => (
              <div key={i} className="bg-surface-container-high/50 border border-outline-variant/30 p-4 rounded-2xl flex items-center justify-between hover:bg-surface-container-highest transition-all group">
                <div className="flex items-center gap-4">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center font-black", source.color)}>
                    {source.logo}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{source.name}</p>
                    <p className="text-[11px] text-green-400 font-bold opacity-80">{source.status}</p>
                  </div>
                </div>
                <MoreVertical className="w-5 h-5 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all cursor-pointer" />
              </div>
            ))}
            <div className="bg-surface-container-high/30 border-2 border-dashed border-outline-variant/20 p-4 rounded-2xl flex items-center justify-center group hover:border-primary/40 transition-all cursor-pointer">
              <div className="flex items-center gap-3 text-on-surface-variant group-hover:text-primary transition-all">
                <Plus className="w-5 h-5" />
                <span className="text-xs font-bold font-mono tracking-tighter">Add Data Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
