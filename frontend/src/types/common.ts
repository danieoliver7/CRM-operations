export type EntityId = string;

export type Nullable<T> = T | null;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SelectOption<TValue extends string | number = string> {
  label: string;
  value: TValue;
}
