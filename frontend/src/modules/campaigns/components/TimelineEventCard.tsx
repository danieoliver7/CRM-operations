import type { TimelineEvent } from '@/types/domain';
import { TimelineEventIcon } from './TimelineEventIcon';
import { TimelineEventImportanceBadge } from './TimelineEventImportanceBadge';

interface TimelineEventCardProps {
  event: TimelineEvent;
  isLast?: boolean;
}

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function TimelineEventCard({ event, isLast = false }: TimelineEventCardProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <TimelineEventIcon category={event.category} />
        {!isLast && <div className="mt-2 w-px flex-1 bg-outline-variant/50" />}
      </div>
      <div className="min-w-0 flex-1 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-bold text-on-surface">{event.title}</p>
          <TimelineEventImportanceBadge importance={event.importance} />
          <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
            {event.category}
          </span>
          <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
            {formatTimestamp(event.timestamp)}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{event.message}</p>
        {event.actorName && (
          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Actor: {event.actorName}
          </p>
        )}
      </div>
    </div>
  );
}
