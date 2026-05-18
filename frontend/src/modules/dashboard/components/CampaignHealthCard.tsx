import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { CampaignStatusBadge } from '@/components/shared/campaign';
import type { CampaignHealthMetrics } from '@/modules/dashboard/utils';
import { cn } from '@/utils/cn';

interface CampaignHealthCardProps {
  health: CampaignHealthMetrics;
}

export function CampaignHealthCard({ health }: CampaignHealthCardProps) {
  const Icon = health.riskLevel === 'healthy' ? CheckCircle2 : health.riskLevel === 'watch' ? Activity : AlertTriangle;

  return (
    <div className="bg-surface-container border border-outline p-6 rounded-md flex flex-col gap-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Operational Health</h2>
          <p className="text-xs text-on-surface-variant mt-1">Campaign flow risk derived from active work.</p>
        </div>
        <Icon
          className={cn(
            'w-5 h-5',
            health.riskLevel === 'healthy' && 'text-green-400',
            health.riskLevel === 'watch' && 'text-tertiary',
            health.riskLevel === 'risk' && 'text-error',
          )}
        />
      </div>

      <div>
        <div className="flex items-end justify-between">
          <span className="text-4xl font-bold text-on-surface">{health.score}</span>
          <span
            className={cn(
              'text-[10px] font-black uppercase tracking-widest',
              health.riskLevel === 'healthy' && 'text-green-400',
              health.riskLevel === 'watch' && 'text-tertiary',
              health.riskLevel === 'risk' && 'text-error',
            )}
          >
            {health.label}
          </span>
        </div>
        <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden mt-4">
          <div
            className={cn(
              'h-full transition-all duration-500',
              health.riskLevel === 'healthy' && 'bg-green-400',
              health.riskLevel === 'watch' && 'bg-tertiary',
              health.riskLevel === 'risk' && 'bg-error',
            )}
            style={{ width: `${health.score}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-outline-variant pt-4">
        <div>
          <p className="text-[10px] text-on-surface-variant font-bold uppercase">Active</p>
          <p className="text-lg font-bold">{health.activeCampaigns}</p>
        </div>
        <div>
          <p className="text-[10px] text-on-surface-variant font-bold uppercase">Bottleneck</p>
          <div className="mt-1 flex items-center gap-2">
            <CampaignStatusBadge status={health.bottleneckStatus} compact />
            <span className="text-xs text-on-surface-variant">{health.bottleneckCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
