import type { CampaignStatus } from '@/modules/campaigns/types';

export interface KanbanColumn {
  id: CampaignStatus;
  title: string;
}

export interface DragState<TItem> {
  draggedItem: TItem | null;
  dropTargetId: string | null;
}
