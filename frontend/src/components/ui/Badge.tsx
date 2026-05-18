import { cn } from '@/utils/cn';
import type { BadgeProps, BadgeVariant } from './types';

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  tertiary: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  error: 'bg-error/10 text-error border-error/20',
  warning: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  muted: 'bg-outline-variant/10 text-on-surface-variant border-outline-variant/20',
  outline: 'bg-transparent text-on-surface-variant border-outline-variant/30',
};

export function Badge({ variant = 'muted', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
