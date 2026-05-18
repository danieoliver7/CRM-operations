import {
  Bell,
  CheckCircle2,
  ClipboardList,
  Code2,
  FileText,
  Mail,
  MessageSquare,
  MousePointer2,
  Send,
  Smartphone,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import {
  CAMPAIGN_CHANNEL_LABELS,
  CAMPAIGN_PRIORITY_LABELS,
  CAMPAIGN_STATUS_LABELS,
  type CampaignChannel,
  type CampaignPriority,
  type CampaignStatus,
} from '@/types/campaign';

interface CampaignVisualStyle {
  label: string;
  badgeClassName: string;
  dotClassName: string;
  borderClassName?: string;
  textClassName?: string;
  icon?: LucideIcon;
}

export const CAMPAIGN_STATUS_STYLES: Record<CampaignStatus, CampaignVisualStyle> = {
  briefing: {
    label: CAMPAIGN_STATUS_LABELS.briefing,
    badgeClassName: 'bg-outline-variant/10 text-on-surface-variant border-outline-variant/20',
    dotClassName: 'bg-gray-600',
    textClassName: 'text-on-surface-variant',
    icon: ClipboardList,
  },
  copy: {
    label: CAMPAIGN_STATUS_LABELS.copy,
    badgeClassName: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dotClassName: 'bg-blue-500',
    textClassName: 'text-blue-400',
    icon: FileText,
  },
  approval: {
    label: CAMPAIGN_STATUS_LABELS.approval,
    badgeClassName: 'bg-tertiary/10 text-tertiary border-tertiary/20',
    dotClassName: 'bg-yellow-500',
    textClassName: 'text-tertiary',
    icon: Timer,
  },
  development: {
    label: CAMPAIGN_STATUS_LABELS.development,
    badgeClassName: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    dotClassName: 'bg-indigo-500',
    textClassName: 'text-indigo-400',
    icon: Code2,
  },
  qa: {
    label: CAMPAIGN_STATUS_LABELS.qa,
    badgeClassName: 'bg-primary/10 text-primary border-primary/20',
    dotClassName: 'bg-primary',
    textClassName: 'text-primary',
    icon: CheckCircle2,
  },
  scheduled: {
    label: CAMPAIGN_STATUS_LABELS.scheduled,
    badgeClassName: 'bg-green-500/10 text-green-400 border-green-500/20',
    dotClassName: 'bg-green-500',
    textClassName: 'text-green-400',
    icon: Timer,
  },
  sent: {
    label: CAMPAIGN_STATUS_LABELS.sent,
    badgeClassName: 'bg-primary/10 text-primary border-primary/20',
    dotClassName: 'bg-primary',
    textClassName: 'text-primary',
    icon: Send,
  },
  completed: {
    label: CAMPAIGN_STATUS_LABELS.completed,
    badgeClassName: 'bg-green-500/10 text-green-400 border-green-500/20',
    dotClassName: 'bg-green-500',
    textClassName: 'text-green-400',
    icon: CheckCircle2,
  },
};

export const CAMPAIGN_PRIORITY_STYLES: Record<CampaignPriority, CampaignVisualStyle> = {
  low: {
    label: CAMPAIGN_PRIORITY_LABELS.low,
    badgeClassName: 'bg-outline-variant/10 text-on-surface-variant border-outline-variant/20',
    dotClassName: 'bg-outline',
    textClassName: 'text-on-surface-variant',
  },
  medium: {
    label: CAMPAIGN_PRIORITY_LABELS.medium,
    badgeClassName: 'bg-outline-variant/10 text-on-surface-variant border-outline-variant/20',
    dotClassName: 'bg-tertiary',
    textClassName: 'text-on-surface-variant',
  },
  high: {
    label: CAMPAIGN_PRIORITY_LABELS.high,
    badgeClassName: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    dotClassName: 'bg-orange-400',
    textClassName: 'text-orange-400',
  },
  urgent: {
    label: CAMPAIGN_PRIORITY_LABELS.urgent,
    badgeClassName: 'bg-error/10 text-error border-error/20',
    dotClassName: 'bg-error',
    textClassName: 'text-error',
  },
};

export const CAMPAIGN_CHANNEL_STYLES: Record<CampaignChannel, CampaignVisualStyle & { icon: LucideIcon }> = {
  email: {
    label: CAMPAIGN_CHANNEL_LABELS.email,
    badgeClassName: 'bg-primary/20 text-on-primary-container border-primary/20',
    dotClassName: 'bg-primary',
    borderClassName: 'border-primary',
    textClassName: 'text-primary',
    icon: Mail,
  },
  push: {
    label: CAMPAIGN_CHANNEL_LABELS.push,
    badgeClassName: 'bg-tertiary/20 text-tertiary border-tertiary/20',
    dotClassName: 'bg-tertiary',
    borderClassName: 'border-secondary',
    textClassName: 'text-secondary',
    icon: Bell,
  },
  sms: {
    label: CAMPAIGN_CHANNEL_LABELS.sms,
    badgeClassName: 'bg-secondary/20 text-secondary border-secondary/20',
    dotClassName: 'bg-secondary',
    borderClassName: 'border-tertiary',
    textClassName: 'text-tertiary',
    icon: Smartphone,
  },
  whatsapp: {
    label: CAMPAIGN_CHANNEL_LABELS.whatsapp,
    badgeClassName: 'bg-secondary/20 text-secondary border-secondary/20',
    dotClassName: 'bg-secondary',
    borderClassName: 'border-tertiary',
    textClassName: 'text-tertiary',
    icon: MessageSquare,
  },
  web_push: {
    label: CAMPAIGN_CHANNEL_LABELS.web_push,
    badgeClassName: 'bg-secondary/20 text-secondary border-secondary/20',
    dotClassName: 'bg-secondary',
    borderClassName: 'border-tertiary',
    textClassName: 'text-tertiary',
    icon: MousePointer2,
  },
  in_app: {
    label: CAMPAIGN_CHANNEL_LABELS.in_app,
    badgeClassName: 'bg-secondary/20 text-secondary border-secondary/20',
    dotClassName: 'bg-secondary',
    borderClassName: 'border-tertiary',
    textClassName: 'text-tertiary',
    icon: MessageSquare,
  },
};

