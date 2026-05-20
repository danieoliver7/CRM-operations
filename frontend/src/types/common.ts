export type { EntityId, Maybe, OptionalNullable, DomainEntity, TimestampedEntity } from './domain/base';

export type Nullable<T> = T | null;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SelectOption<TValue extends string | number = string> {
  label: string;
  value: TValue;
}
