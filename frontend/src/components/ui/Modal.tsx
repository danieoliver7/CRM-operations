import { cn } from '@/utils/cn';
import { Button } from './Button';
import type { ModalProps } from './types';

export function Modal({
  open,
  title,
  description,
  onClose,
  className,
  children,
  ...props
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-dim/80 p-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'glass w-full max-w-lg rounded-2xl border border-outline-variant/30 shadow-2xl',
          className,
        )}
        {...props}
      >
        {(title || description || onClose) && (
          <div className="flex items-start justify-between gap-4 border-b border-outline-variant/30 p-5">
            <div>
              {title && <h2 className="text-lg font-bold tracking-tight text-on-surface">{title}</h2>}
              {description && <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{description}</p>}
            </div>
            {onClose && (
              <Button variant="icon" size="icon" aria-label="Close modal" onClick={onClose}>
                x
              </Button>
            )}
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
