import { AlertTriangle, CircleAlert } from 'lucide-react';
import { cn } from '@/utils/cn';

interface OperationalPressureBadgeProps {
  level: 'normal' | 'watch' | 'overloaded';
  label?: string;
  className?: string;
}

const levelStyles = {
  normal: 'border-outline-variant/40 bg-surface-container-low text-on-surface-variant',
  watch: 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  overloaded: 'border-error/30 bg-error/10 text-error',
};

export function OperationalPressureBadge({
  level,
  label = level === 'overloaded' ? 'Overloaded' : level === 'watch' ? 'Watch' : 'Normal',
  className,
}: OperationalPressureBadgeProps) {
  const Icon = level === 'overloaded' ? CircleAlert : AlertTriangle;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest',
        levelStyles[level],
        className,
      )}
    >
      {level !== 'normal' && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
}
