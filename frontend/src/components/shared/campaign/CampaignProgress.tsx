import { cn } from '@/utils/cn';

interface CampaignProgressProps {
  value: number;
  className?: string;
  showValue?: boolean;
}

export function CampaignProgress({ value, className, showValue = false }: CampaignProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('flex items-center space-x-2 flex-1', className)}>
      <div className="w-full h-1 bg-outline rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-1000"
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {showValue && <span className="text-[9px] text-on-surface-variant">{Math.round(safeValue)}%</span>}
    </div>
  );
}

