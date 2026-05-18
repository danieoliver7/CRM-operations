import { cn } from '@/utils/cn';
import type { ProgressBarProps } from './types';

export function ProgressBar({ value, className, indicatorClassName, ...props }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-surface-container', className)} {...props}>
      <div
        className={cn('h-full bg-primary transition-all duration-500', indicatorClassName)}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
