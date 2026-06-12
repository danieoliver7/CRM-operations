import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CampaignActivityCategory, CampaignActivityType } from '@prisma/client';
import { toCampaignActivityDto } from '../src/modules/activities/activity.mapper';
import { parseCreateCampaignActivityRequest } from '../src/modules/activities/activity.requests';

const createdAt = new Date('2026-06-12T12:00:00.000Z');
const updatedAt = new Date('2026-06-12T13:00:00.000Z');

test('campaign activity dto exposes meaningful operational event facts only', () => {
  const dto = toCampaignActivityDto({
    id: 'activity-id',
    campaignId: 'campaign-id',
    actorUserId: 'actor-id',
    type: CampaignActivityType.decision_recorded,
    category: CampaignActivityCategory.collaboration,
    message: 'Decision recorded after QA validation moved.',
    metadata: {
      relatedBlockerId: 'blocker-id',
      relatedNoteId: 'note-id',
      relatedDecisionContextId: 'decision-context-id',
      relatedHandoffId: 'handoff-id',
      source: 'manual',
    },
    createdAt,
    updatedAt,
  });

  assert.deepEqual(dto, {
    id: 'activity-id',
    campaignId: 'campaign-id',
    actorId: 'actor-id',
    type: 'decision_recorded',
    category: 'collaboration',
    message: 'Decision recorded after QA validation moved.',
    metadata: {
      relatedBlockerId: 'blocker-id',
      relatedNoteId: 'note-id',
      relatedDecisionContextId: 'decision-context-id',
      relatedHandoffId: 'handoff-id',
      source: 'manual',
    },
    relatedBlockerId: 'blocker-id',
    relatedNoteId: 'note-id',
    relatedDecisionContextId: 'decision-context-id',
    relatedHandoffId: 'handoff-id',
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  });

  assert.equal('actorUserId' in dto, false);
  assert.equal('eventSequence' in dto, false);
  assert.equal('aggregateVersion' in dto, false);
  assert.equal('timelinePresentation' in dto, false);
  assert.equal('notificationStatus' in dto, false);
  assert.equal('aiSummary' in dto, false);
  assert.equal('copilotInsight' in dto, false);
  assert.equal('executionHealth' in dto, false);
});

test('create activity request accepts supported operational event facts', () => {
  const request = parseCreateCampaignActivityRequest({
    type: 'decision_recorded',
    category: 'collaboration',
    message: 'Decision recorded after QA validation moved.',
    actorId: 'user-id',
    metadata: {
      source: 'manual',
    },
    relatedBlockerId: 'blocker-id',
    relatedNoteId: 'note-id',
    relatedDecisionContextId: 'decision-context-id',
    relatedHandoffId: 'handoff-id',
  });

  assert.deepEqual(request, {
    type: 'decision_recorded',
    category: 'collaboration',
    message: 'Decision recorded after QA validation moved.',
    actorId: 'user-id',
    metadata: {
      source: 'manual',
    },
    relatedBlockerId: 'blocker-id',
    relatedNoteId: 'note-id',
    relatedDecisionContextId: 'decision-context-id',
    relatedHandoffId: 'handoff-id',
  });
});

test('create activity request rejects timeline and event sourcing fields', () => {
  assert.throws(() => {
    parseCreateCampaignActivityRequest({
      type: 'decision_recorded',
      message: 'Decision recorded.',
      occurredAt: '2026-06-12T12:00:00.000Z',
      eventSequence: 1,
      timelinePresentation: {
        icon: 'sparkles',
      },
    });
  });
});

test('create activity request requires an object metadata value when provided', () => {
  assert.throws(() => {
    parseCreateCampaignActivityRequest({
      type: 'decision_recorded',
      message: 'Decision recorded.',
      metadata: ['not-supported'],
    });
  });
});

test('create activity request rejects reserved metadata fields', () => {
  assert.throws(() => {
    parseCreateCampaignActivityRequest({
      type: 'decision_recorded',
      message: 'Decision recorded.',
      metadata: {
        relatedBlockerId: 'blocker-id',
      },
    });
  });
});
