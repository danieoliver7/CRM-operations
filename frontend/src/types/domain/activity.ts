import type { EntityId, TimestampedEntity } from './base';

export type CampaignActivityType =
  | 'campaign_created'
  | 'status_changed'
  | 'priority_changed'
  | 'owner_changed'
  | 'blocker_created'
  | 'blocker_resolved'
  | 'handoff_started'
  | 'handoff_completed'
  | 'note_added'
  | 'decision_recorded'
  | 'risk_note_added'
  | 'resolution_note_added'
  | 'handoff_note_added'
  | 'due_date_changed'
  | 'execution_risk_detected'
  | 'sla_due_soon'
  | 'campaign_overdue'
  | 'workflow_stalled';

export type CampaignActivityCategory =
  | 'workflow'
  | 'coordination'
  | 'execution'
  | 'planning'
  | 'collaboration';

export interface CampaignActivity extends TimestampedEntity {
  campaignId: EntityId;
  actorUserId?: EntityId;
  type: CampaignActivityType;
  category?: CampaignActivityCategory;
  message: string;
  metadata?: Record<string, unknown>;
}
