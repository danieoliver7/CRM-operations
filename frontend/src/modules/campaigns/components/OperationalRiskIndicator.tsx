import { CircleAlert } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { OperationalRisk } from '@/modules/campaigns/utils';

interface OperationalRiskIndicatorProps {
  risk: OperationalRisk;
}

const riskStyles: Record<OperationalRisk['level'], string> = {
  watch: 'border-tertiary/25 bg-tertiary/10 text-tertiary',
  'at-risk': 'border-error/25 bg-error/10 text-error',
  blocked: 'border-error/35 bg-error/15 text-error',
};

export function OperationalRiskIndicator({ risk }: OperationalRiskIndicatorProps) {
  return (
    <div className={cn('rounded-lg border p-3', riskStyles[risk.level])}>
      <div className="flex items-center gap-2">
        <CircleAlert className="h-3.5 w-3.5 shrink-0" />
        <p className="text-xs font-black text-on-surface">{risk.label}</p>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{risk.description}</p>
    </div>
  );
}
