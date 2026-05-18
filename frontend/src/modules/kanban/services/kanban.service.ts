import { resolveMock } from '@/services';
import { getCampaignsByStatus } from '@/modules/campaigns/services';
import type { CampaignStatus } from '@/modules/campaigns/types';
import type { KanbanColumn } from '@/modules/kanban/types';

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: 'briefing', title: 'Briefing' },
  { id: 'copy', title: 'Copy' },
  { id: 'approval', title: 'Approval' },
  { id: 'development', title: 'Development' },
  { id: 'qa', title: 'QA' },
  { id: 'scheduled', title: 'Scheduled' },
  { id: 'sent', title: 'Sent' },
  { id: 'completed', title: 'Completed' },
];

export async function getKanbanColumns(): Promise<KanbanColumn[]> {
  return resolveMock(KANBAN_COLUMNS);
}

export async function getKanbanCampaignsByColumn(status: CampaignStatus) {
  return getCampaignsByStatus(status);
}
