export type EntityId = string;
export type Maybe<T> = T | null;
export type OptionalNullable<T> = T | null | undefined;

export interface DomainEntity {
  id: EntityId;
}

export interface TimestampedEntity extends DomainEntity {
  createdAt?: string;
  updatedAt?: string;
}

// UI-only state stays outside persisted domain entities.
export interface UIStateMarker {
  readonly __uiState?: true;
}

// Derived operational intelligence is recalculated from persisted facts.
export interface DerivedOperationalStateMarker {
  readonly __derivedOperationalState?: true;
}
