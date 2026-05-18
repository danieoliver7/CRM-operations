import type { ComponentType } from 'react';

export interface NavigationItem {
  label: string;
  path: string;
  icon?: ComponentType<{ className?: string }>;
}
