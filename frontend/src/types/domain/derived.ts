import type { DerivedOperationalStateMarker } from './base';
import type { CampaignStatus } from './workflow';

export type ExecutionHealthState = 'healthy' | 'warning' | 'at-risk' | 'blocked' | 'overdue';
export type SLAState = 'on-track' | 'due-soon' | 'delayed' | 'overdue';
export type OperationalRiskLevel = 'watch' | 'at-risk' | 'blocked';
export type CoordinationState = 'clear' | 'waiting' | 'handoff' | 'stalled' | 'missing-owner';
export type PressureLevel = 'normal' | 'watch' | 'overloaded';

export interface DerivedCampaignIntelligence extends DerivedOperationalStateMarker {
  executionHealth?: ExecutionHealthState;
  slaState?: SLAState;
  operationalRisk?: OperationalRiskLevel;
  coordinationState?: CoordinationState;
  planningPressure?: PressureLevel;
  workflowContinuity?: CoordinationState;
  daysUntilDue?: number;
  blockerCount?: number;
  riskCount?: number;
  delayedWorkflowStages?: CampaignStatus[];
}
