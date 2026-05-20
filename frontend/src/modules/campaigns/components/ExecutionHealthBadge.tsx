import { AlertTriangle, CircleAlert, Clock, ShieldCheck, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { ExecutionHealthState } from '@/modules/campaigns/utils';

interface ExecutionHealthBadgeProps {
  health: ExecutionHealthState;
  className?: string;
}

const healthConfig = {
  healthy: {
    label: 'Healthy',
    icon: ShieldCheck,
    className: 'border-green-500/20 bg-green-500/10 text-green-400',
  },
  warning: {
    label: 'Warning',
    icon: AlertTriangle,
    className: 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  },
  'at-risk': {
    label: 'At risk',
    icon: CircleAlert,
    className: 'border-error/25 bg-error/10 text-error',
  },
  blocked: {
    label: 'Blocked',
    icon: XCircle,
    className: 'border-error/35 bg-error/15 text-error',
  },
  overdue: {
    label: 'Overdue',
    icon: Clock,
    className: 'border-error/35 bg-error/15 text-error',
  },
};

export function ExecutionHealthBadge({ health, className }: ExecutionHealthBadgeProps) {
  const config = healthConfig[health];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest',
        config.className,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
