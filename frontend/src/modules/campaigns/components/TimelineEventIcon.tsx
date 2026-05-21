import {
  CalendarClock,
  GitBranch,
  MessageSquare,
  ShieldAlert,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import type { TimelineEventCategory } from '@/types/domain';

interface TimelineEventIconProps {
  category: TimelineEventCategory;
}

const categoryConfig = {
  workflow: { icon: GitBranch, className: 'text-primary bg-primary/10 border-primary/20' },
  coordination: { icon: Users, className: 'text-secondary bg-secondary/10 border-secondary/20' },
  execution: { icon: ShieldAlert, className: 'text-error bg-error/10 border-error/20' },
  planning: { icon: CalendarClock, className: 'text-tertiary bg-tertiary/10 border-tertiary/20' },
  collaboration: { icon: MessageSquare, className: 'text-on-surface-variant bg-surface-container-high border-outline-variant/40' },
} satisfies Record<TimelineEventCategory, { icon: LucideIcon; className: string }>;

export function TimelineEventIcon({ category }: TimelineEventIconProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div className={cn('flex h-8 w-8 items-center justify-center rounded-full border', config.className)}>
      <Icon className="h-4 w-4" />
    </div>
  );
}
