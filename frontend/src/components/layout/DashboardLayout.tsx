import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export function DashboardLayout({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('grid grid-cols-1 lg:grid-cols-12 gap-4', className)} {...props} />;
}

export function DashboardMain({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('lg:col-span-8 flex flex-col gap-4', className)} {...props} />;
}

export function DashboardAside({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <aside className={cn('lg:col-span-4 flex flex-col gap-4', className)} {...props} />;
}
