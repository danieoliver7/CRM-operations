import type {
  ButtonHTMLAttributes,
  ComponentType,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export type ButtonVariant = 'primary' | 'surface' | 'ghost' | 'glass' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export type CardVariant = 'surface' | 'glass' | 'flat';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'muted'
  | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  title?: ReactNode;
  description?: ReactNode;
  onClose?: () => void;
}

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: AvatarSize;
  fallback?: string;
}

export interface AvatarGroupItem {
  src?: string;
  fallback?: string;
  alt?: string;
}

export interface AvatarGroupProps {
  items: AvatarGroupItem[];
  max?: number;
  className?: string;
}

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  indicatorClassName?: string;
}

export interface SidebarItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ComponentType<{ className?: string }>;
  active?: boolean;
}
