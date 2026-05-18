import { cn } from '@/utils/cn';
import type { InputProps } from './types';

export function Input({ leftIcon, rightIcon, className, ...props }: InputProps) {
  return (
    <div className="relative w-full group">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
          {leftIcon}
        </div>
      )}
      <input
        className={cn(
          'w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-2 text-sm font-medium outline-none transition-all placeholder:text-on-surface-variant/40 focus:border-primary/50',
          leftIcon ? 'pl-10' : 'pl-4',
          rightIcon ? 'pr-10' : 'pr-4',
          className,
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
