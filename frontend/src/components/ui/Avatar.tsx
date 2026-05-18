import { cn } from '@/utils/cn';
import type { AvatarProps, AvatarSize } from './types';

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-5 w-5 text-[9px]',
  sm: 'h-7 w-7 text-[10px]',
  md: 'h-8 w-8 text-xs',
  lg: 'h-10 w-10 text-sm',
};

export function Avatar({ size = 'md', fallback, className, src, alt = '', ...props }: AvatarProps) {
  if (!src && fallback) {
    return (
      <div
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white',
          sizeClasses[size],
          className,
        )}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('shrink-0 rounded-full border border-outline-variant/30 object-cover', sizeClasses[size], className)}
      {...props}
    />
  );
}
