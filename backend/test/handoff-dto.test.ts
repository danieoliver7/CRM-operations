import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CampaignStatus, HandoffStatus } from '@prisma/client';
import { toCampaignHandoffDto } from '../src/modules/handoffs/handoff.mapper';
import {
  parseCancelCampaignHandoffRequest,
  parseCompleteCampaignHandoffRequest,
  parseCreateCampaignHandoffRequest,
  parseUpdateCampaignHandoffRequest,
} from '../src/modules/handoffs/handoff.requests';

const createdAt = new Date('2026-06-12T12:00:00.000Z');
const updatedAt = new Date('2026-06-12T13:00:00.000Z');
const completedAt = new Date('2026-06-12T14:00:00.000Z');

test('campaign handoff dto exposes lightweight transition facts only', () => {
  const dto = toCampaignHandoffDto({
    id: 'handoff-id',
    campaignId: 'campaign-id',
    status: HandoffStatus.completed,
    fromStage: CampaignStatus.development,
    toStage: CampaignStatus.qa,
    fromOwnerId: 'from-owner-id',
    toOwnerId: 'to-owner-id',
    fromSquadId: 'from-squad-id',
    toSquadId: 'to-squad-id',
    reason: 'Development is ready for QA validation.',
    completedAt,
    cancelledAt: null,
    createdAt,
    updatedAt,
  });

  assert.deepEqual(dto, {
    id: 'handoff-id',
    campaignId: 'campaign-id',
    status: 'completed',
    fromStage: 'development',
    toStage: 'qa',
    fromOwnerId: 'from-owner-id',
    toOwnerId: 'to-owner-id',
    fromSquadId: 'from-squad-id',
    toSquadId: 'to-squad-id',
    reason: 'Development is ready for QA validation.',
    completedAt: completedAt.toISOString(),
    cancelledAt: null,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  });

  assert.equal('workflowGraph' in dto, false);
  assert.equal('dependencyGraph' in dto, false);
  assert.equal('taskTree' in dto, false);
  assert.equal('timelinePresentation' in dto, false);
  assert.equal('notificationStatus' in dto, false);
  assert.equal('aiSummary' in dto, false);
  assert.equal('executionHealth' in dto, false);
});

test('create handoff request accepts supported transition facts', () => {
  const request = parseCreateCampaignHandoffRequest({
    fromStage: 'development',
    toStage: 'qa',
    fromOwnerId: 'from-owner-id',
    toOwnerId: 'to-owner-id',
    fromSquadId: 'from-squad-id',
    toSquadId: 'to-squad-id',
    reason: 'Development is ready for QA validation.',
  });

  assert.deepEqual(request, {
    fromStage: 'development',
    toStage: 'qa',
    fromOwnerId: 'from-owner-id',
    toOwnerId: 'to-owner-id',
    fromSquadId: 'from-squad-id',
    toSquadId: 'to-squad-id',
    reason: 'Development is ready for QA validation.',
  });
});

test('create handoff request requires at least one destination', () => {
  assert.throws(() => {
    parseCreateCampaignHandoffRequest({
      fromStage: 'development',
      reason: 'No destination.',
    });
  });
});

test('update handoff request rejects status and unsupported ownership fields', () => {
  assert.throws(() => {
    parseUpdateCampaignHandoffRequest({
      reason: 'Updated handoff reason.',
      status: 'completed',
      completedById: 'user-id',
    });
  });
});

test('complete handoff request rejects fields unsupported by the schema', () => {
  assert.throws(() => {
    parseCompleteCampaignHandoffRequest({
      completedById: 'user-id',
      notes: 'Finished by QA owner.',
    });
  });
});

test('cancel handoff request accepts reason but rejects unsupported fields', () => {
  assert.deepEqual(parseCancelCampaignHandoffRequest({ reason: 'QA window moved.' }), {
    reason: 'QA window moved.',
  });

  assert.throws(() => {
    parseCancelCampaignHandoffRequest({
      cancelledById: 'user-id',
      reason: 'QA window moved.',
    });
  });
});
