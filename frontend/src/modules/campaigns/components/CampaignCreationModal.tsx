import { useState, type FormEvent } from 'react';
import { CalendarPlus, Target } from 'lucide-react';
import { Button, Modal } from '@/components/ui';
import {
  CAMPAIGN_CHANNEL_LABELS,
  CAMPAIGN_CHANNELS,
  CAMPAIGN_PRIORITIES,
  CAMPAIGN_PRIORITY_LABELS,
  type Campaign,
  type CampaignChannel,
  type CampaignComplexity,
  type CampaignPriority,
} from '@/types/campaign';

interface CampaignCreationModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (campaign: Campaign) => void;
}

const inputClassName =
  'w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-primary/50 transition-all placeholder:text-on-surface-variant/40';

function getNewCampaignId() {
  return `cmp-${Date.now().toString(36)}`;
}

export function CampaignCreationModal({ open, onClose, onCreate }: CampaignCreationModalProps) {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [owner, setOwner] = useState('Marina Lopes');
  const [squad, setSquad] = useState('Lifecycle');
  const [dueDate, setDueDate] = useState('2026-05-27');
  const [audience, setAudience] = useState('');
  const [campaignType, setCampaignType] = useState('Lifecycle');
  const [channel, setChannel] = useState<CampaignChannel>('email');
  const [priority, setPriority] = useState<CampaignPriority>('medium');
  const [estimatedComplexity, setEstimatedComplexity] = useState<CampaignComplexity>('medium');
  const [tags, setTags] = useState('planning, crm');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const campaign: Campaign = {
      id: getNewCampaignId(),
      name: name.trim() || `${campaignType} | New CRM Campaign`,
      status: 'briefing',
      channel,
      priority,
      owner: {
        name: owner.trim() || 'Unassigned',
        avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(owner.trim() || 'unassigned')}`,
      },
      dueDate,
      progress: 8,
      sla: 'planning',
      squad: squad.trim() || 'Unassigned',
      segmentation: audience.trim() || 'Audience to be defined',
      objective: objective.trim() || 'Plan campaign objective and operational requirements.',
      audience: audience.trim() || undefined,
      campaignType: campaignType.trim() || undefined,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      estimatedComplexity,
      metricsTarget: { expectedKpi: 'KPI to define' },
    };

    onCreate(campaign);
    setName('');
    setObjective('');
    setAudience('');
  }

  return (
    <Modal
      open={open}
      title="Plan Campaign"
      description="Create an operational plan with owner, squad, due date and delivery context."
      onClose={onClose}
      className="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-primary">
            <Target className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Operational intent</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="space-y-1 md:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Campaign name</span>
              <input value={name} onChange={(event) => setName(event.target.value)} className={inputClassName} />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Objective</span>
              <textarea
                value={objective}
                onChange={(event) => setObjective(event.target.value)}
                className={`${inputClassName} min-h-20 resize-none`}
              />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Audience</span>
              <input value={audience} onChange={(event) => setAudience(event.target.value)} className={inputClassName} />
            </label>
            <label className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Campaign type</span>
              <input value={campaignType} onChange={(event) => setCampaignType(event.target.value)} className={inputClassName} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Owner</span>
            <input value={owner} onChange={(event) => setOwner(event.target.value)} className={inputClassName} />
          </label>
          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Squad</span>
            <input value={squad} onChange={(event) => setSquad(event.target.value)} className={inputClassName} />
          </label>
          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Due date</span>
            <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className={inputClassName} />
          </label>
          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Channel</span>
            <select value={channel} onChange={(event) => setChannel(event.target.value as CampaignChannel)} className={inputClassName}>
              {CAMPAIGN_CHANNELS.map((item) => (
                <option key={item} value={item}>{CAMPAIGN_CHANNEL_LABELS[item]}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Priority</span>
            <select value={priority} onChange={(event) => setPriority(event.target.value as CampaignPriority)} className={inputClassName}>
              {CAMPAIGN_PRIORITIES.map((item) => (
                <option key={item} value={item}>{CAMPAIGN_PRIORITY_LABELS[item]}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Complexity</span>
            <select value={estimatedComplexity} onChange={(event) => setEstimatedComplexity(event.target.value as CampaignComplexity)} className={inputClassName}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="space-y-1 md:col-span-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Tags</span>
            <input value={tags} onChange={(event) => setTags(event.target.value)} className={inputClassName} />
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-outline-variant/30 pt-5">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" leftIcon={<CalendarPlus className="h-4 w-4" />}>
            Add to plan
          </Button>
        </div>
      </form>
    </Modal>
  );
}
