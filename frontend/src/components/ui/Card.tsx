import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import type { CardProps, CardVariant } from './types';

const variantClasses: Record<CardVariant, string> = {
  surface: 'bg-surface-container border border-outline rounded-md shadow-sm',
  glass: 'glass border border-outline-variant/30 rounded-2xl shadow-sm',
  flat: 'bg-surface-container-low border border-outline-variant/30 rounded-xl',
};

export function Card({ variant = 'surface', className, ...props }: CardProps) {
  return <div className={cn(variantClasses[variant], className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center justify-between gap-4', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-base font-semibold tracking-tight text-on-surface', className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />;
}
