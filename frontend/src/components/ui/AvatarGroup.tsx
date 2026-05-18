import { cn } from '@/utils/cn';
import { Avatar } from './Avatar';
import type { AvatarGroupProps } from './types';

export function AvatarGroup({ items, max = items.length, className }: AvatarGroupProps) {
  const visibleItems = items.slice(0, max);
  const remaining = items.length - visibleItems.length;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleItems.map((item, index) => (
        <Avatar
          key={`${item.src ?? item.fallback ?? 'avatar'}-${index}`}
          src={item.src}
          fallback={item.fallback}
          alt={item.alt}
          size="sm"
          className="border-2 border-surface"
        />
      ))}
      {remaining > 0 && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-surface-container-highest text-[10px] font-bold">
          +{remaining}
        </div>
      )}
    </div>
  );
}
