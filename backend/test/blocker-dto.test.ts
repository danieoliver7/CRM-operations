import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BlockerSeverity, BlockerStatus } from '@prisma/client';
import { toBlockerDto } from '../src/modules/blockers/blocker.mapper';
import {
  parseCreateBlockerRequest,
  parseResolveBlockerRequest,
  parseUpdateBlockerRequest,
} from '../src/modules/blockers/blocker.requests';

const createdAt = new Date('2026-06-10T12:00:00.000Z');
const updatedAt = new Date('2026-06-10T13:00:00.000Z');
const resolvedAt = new Date('2026-06-10T14:00:00.000Z');

test('blocker dto exposes persisted blocker facts only', () => {
  const dto = toBlockerDto({
    id: 'blocker-id',
    campaignId: 'campaign-id',
    createdByUserId: 'creator-id',
    resolvedByUserId: 'resolver-id',
    title: 'Audience file missing',
    description: 'Segmentation file has not been delivered yet.',
    severity: BlockerSeverity.high,
    status: BlockerStatus.resolved,
    createdAt,
    updatedAt,
    resolvedAt,
  });

  assert.deepEqual(dto, {
    id: 'blocker-id',
    campaignId: 'campaign-id',
    createdById: 'creator-id',
    resolvedById: 'resolver-id',
    title: 'Audience file missing',
    description: 'Segmentation file has not been delivered yet.',
    severity: 'high',
    status: 'resolved',
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    resolvedAt: resolvedAt.toISOString(),
  });

  assert.equal('executionHealth' in dto, false);
  assert.equal('operationalRisk' in dto, false);
  assert.equal('slaState' in dto, false);
  assert.equal('ticketNumber' in dto, false);
  assert.equal('escalationStatus' in dto, false);
});

test('create blocker request accepts blocker facts', () => {
  const request = parseCreateBlockerRequest({
    title: 'Audience file missing',
    description: null,
    severity: 'high',
    createdById: 'user-id',
  });

  assert.deepEqual(request, {
    title: 'Audience file missing',
    description: null,
    severity: 'high',
    createdById: 'user-id',
  });
});

test('update blocker request rejects ownership and resolution fields', () => {
  assert.throws(() => {
    parseUpdateBlockerRequest({
      title: 'Updated title',
      resolvedAt: '2026-06-10T14:00:00.000Z',
    });
  });
});

test('resolve blocker request allows empty body', () => {
  assert.deepEqual(parseResolveBlockerRequest(undefined), {});
});

test('resolve blocker request keeps empty object empty', () => {
  assert.deepEqual(parseResolveBlockerRequest({}), {});
});
