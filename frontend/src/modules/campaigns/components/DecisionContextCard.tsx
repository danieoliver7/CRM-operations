import {
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  HelpCircle,
  Lightbulb,
  MessageSquareText,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import type { DecisionContext, DecisionContextType } from '@/types/domain';

interface DecisionContextCardProps {
  context: DecisionContext;
}

const typeConfig: Record<DecisionContextType, { label: string; icon: LucideIcon; className: string }> = {
  decision: {
    label: 'Decision',
    icon: Lightbulb,
    className: 'border-primary/25 bg-primary/10 text-primary',
  },
  rationale: {
    label: 'Rationale',
    icon: HelpCircle,
    className: 'border-secondary/25 bg-secondary/10 text-secondary',
  },
  clarification: {
    label: 'Clarification',
    icon: MessageSquareText,
    className: 'border-outline-variant/40 bg-surface-container-low text-on-surface-variant',
  },
  'risk-note': {
    label: 'Risk Note',
    icon: AlertTriangle,
    className: 'border-tertiary/30 bg-tertiary/10 text-tertiary',
  },
  'resolution-note': {
    label: 'Resolution',
    icon: CheckCircle2,
    className: 'border-green-500/30 bg-green-500/10 text-green-400',
  },
  'handoff-note': {
    label: 'Handoff',
    icon: GitBranch,
    className: 'border-secondary/25 bg-secondary/10 text-secondary',
  },
};

function formatDate(timestamp?: string) {
  if (!timestamp) return 'Recent';

  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function DecisionContextCard({ context }: DecisionContextCardProps) {
  const config = typeConfig[context.type];
  const Icon = config.icon;

  return (
    <article className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest/60 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border', config.className)}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-black text-on-surface">{context.title}</h4>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
              {config.label} - {context.authorName ?? 'CRM Ops'} - {formatDate(context.createdAt)}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest',
            context.importance === 'high'
              ? 'border-tertiary/30 bg-tertiary/10 text-tertiary'
              : 'border-outline-variant/40 bg-surface-container-low text-on-surface-variant',
          )}
        >
          {context.importance}
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-on-surface-variant">{context.content}</p>
      {context.relatedWorkflowStage && (
        <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Related stage: {context.relatedWorkflowStage}
        </p>
      )}
    </article>
  );
}
