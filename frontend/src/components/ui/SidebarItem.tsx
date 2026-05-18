import { cn } from '@/utils/cn';
import type { SidebarItemProps } from './types';

export function SidebarItem({
  icon: Icon,
  active = false,
  className,
  children,
  ...props
}: SidebarItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 border-l-2 px-3 py-2 text-sm transition-all duration-200',
        active
          ? 'bg-primary/10 text-on-primary-container border-primary'
          : 'text-on-surface-variant hover:text-on-surface border-transparent',
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 opacity-70" />}
      <span>{children}</span>
    </div>
  );
}
