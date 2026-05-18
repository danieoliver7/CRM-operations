export interface UseSearchOptions<TItem> {
  items: TItem[];
  getSearchText: (item: TItem) => string;
  initialQuery?: string;
}
