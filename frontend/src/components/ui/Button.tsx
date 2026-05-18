import { cn } from '@/utils/cn';
import type { ButtonProps, ButtonSize, ButtonVariant } from './types';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-lg shadow-primary/20',
  surface:
    'bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high',
  ghost:
    'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
  glass:
    'glass border border-outline-variant text-on-surface hover:bg-surface-container',
  icon:
    'text-on-surface-variant hover:text-on-surface border border-transparent hover:border-outline-variant/30',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-xs rounded-lg',
  lg: 'px-6 py-2.5 text-sm rounded-lg',
  icon: 'h-8 w-8 p-1.5 rounded-lg',
};

export function Button({
  variant = 'surface',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-bold transition-all disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
