import { AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { OperationalBlocker } from '@/modules/campaigns/utils';

interface WorkflowBlockerCardProps {
  blocker: OperationalBlocker;
}

const severityStyles: Record<OperationalBlocker['severity'], string> = {
  low: 'border-outline-variant/30 bg-surface-container-low/40 text-on-surface-variant',
  medium: 'border-tertiary/25 bg-tertiary/10 text-tertiary',
  high: 'border-error/25 bg-error/10 text-error',
};

export function WorkflowBlockerCard({ blocker }: WorkflowBlockerCardProps) {
  return (
    <div className={cn('rounded-lg border p-3', severityStyles[blocker.severity])}>
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        <p className="text-xs font-black text-on-surface">{blocker.label}</p>
        <span className="ml-auto text-[9px] font-black uppercase tracking-widest opacity-70">
          {blocker.severity}
        </span>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{blocker.description}</p>
    </div>
  );
}
