import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export function PageContainer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('space-y-6', className)} {...props} />;
}
