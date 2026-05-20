import type { UIStateMarker } from './base';

export interface ModalUIState extends UIStateMarker {
  isOpen: boolean;
}

export interface FilterUIState<TFilters extends Record<string, unknown>> extends UIStateMarker {
  filters: TFilters;
}

export interface FormDraftUIState<TForm extends Record<string, unknown>> extends UIStateMarker {
  draft: TForm;
  isDirty?: boolean;
}
