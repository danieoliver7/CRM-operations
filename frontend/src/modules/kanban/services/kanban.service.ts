import { resolveMock } from '@/services';
import { getCampaignsByStatus } from '@/modules/campaigns/services';
import type { CampaignStatus } from '@/modules/campaigns/types';
import type { KanbanColumn } from '@/modules/kanban/types';

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: 'Briefing', title: 'Briefing' },
  { id: 'Copy', title: 'Copy' },
  { id: 'Approval', title: 'Approval' },
  { id: 'Development', title: 'Development' },
  { id: 'QA', title: 'QA' },
  { id: 'Scheduled', title: 'Scheduled' },
  { id: 'Sent', title: 'Sent' },
  { id: 'Completed', title: 'Completed' },
];

export async function getKanbanColumns(): Promise<KanbanColumn[]> {
  return resolveMock(KANBAN_COLUMNS);
}

export async function getKanbanCampaignsByColumn(status: CampaignStatus) {
  return getCampaignsByStatus(status);
}
