import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CampaignChannel, CampaignPriority, CampaignStatus } from '@prisma/client';
import { toCampaignDto } from '../src/modules/campaigns/campaign.mapper';
import { parseCreateCampaignRequest, parseUpdateCampaignRequest } from '../src/modules/campaigns/campaign.requests';

const createdAt = new Date('2026-06-10T12:00:00.000Z');
const updatedAt = new Date('2026-06-10T13:00:00.000Z');
const dueDate = new Date('2026-06-20T00:00:00.000Z');

test('campaign dto exposes persisted facts only', () => {
  const dto = toCampaignDto({
    id: 'campaign-id',
    workspaceId: 'workspace-id',
    ownerId: 'user-id',
    squadId: 'squad-id',
    name: 'June CRM Campaign',
    description: 'Example campaign description',
    objective: 'Drive engagement',
    status: CampaignStatus.briefing,
    channel: CampaignChannel.email,
    priority: CampaignPriority.medium,
    dueDate,
    plannedDate: null,
    campaignType: 'Lifecycle',
    audience: 'Active customers',
    segmentation: 'Engaged users',
    tags: ['crm', 'lifecycle'],
    content: null,
    metricsTarget: null,
    estimatedComplexity: null,
    createdAt,
    updatedAt,
  });

  assert.deepEqual(dto, {
    id: 'campaign-id',
    workspaceId: 'workspace-id',
    ownerId: 'user-id',
    squadId: 'squad-id',
    name: 'June CRM Campaign',
    description: 'Example campaign description',
    objective: 'Drive engagement',
    status: 'briefing',
    channel: 'email',
    priority: 'medium',
    dueDate: dueDate.toISOString(),
    plannedDate: null,
    campaignType: 'Lifecycle',
    audience: 'Active customers',
    segmentation: 'Engaged users',
    tags: ['crm', 'lifecycle'],
    content: null,
    metricsTarget: null,
    estimatedComplexity: null,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  });

  assert.equal('executionHealth' in dto, false);
  assert.equal('operationalRisk' in dto, false);
  assert.equal('coordinationState' in dto, false);
  assert.equal('progress' in dto, false);
  assert.equal('sla' in dto, false);
});

test('create campaign request defaults status, priority and tags', () => {
  const request = parseCreateCampaignRequest({
    workspaceId: 'workspace-id',
    name: 'June CRM Campaign',
    channel: 'email',
    dueDate: '2026-06-20T00:00:00.000Z',
  });

  assert.equal(request.status, 'briefing');
  assert.equal(request.priority, 'medium');
  assert.deepEqual(request.tags, []);
  assert.equal(request.dueDate.toISOString(), '2026-06-20T00:00:00.000Z');
});

test('update campaign request rejects read-only fields', () => {
  assert.throws(() => {
    parseUpdateCampaignRequest({
      id: 'campaign-id',
      name: 'Updated campaign',
    });
  });
});
