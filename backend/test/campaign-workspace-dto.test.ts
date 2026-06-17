import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CampaignActivityCategory, CampaignActivityType, CampaignNoteType, CampaignStatus } from '@prisma/client';
import { toCampaignWorkspaceFactsDto } from '../src/modules/campaign-workspace/campaign-workspace.mapper';

const createdAt = new Date('2026-06-12T12:00:00.000Z');
const updatedAt = new Date('2026-06-12T13:00:00.000Z');
const dueDate = new Date('2026-06-20T12:00:00.000Z');

test('campaign workspace facts dto composes persisted facts only', () => {
  const dto = toCampaignWorkspaceFactsDto({
    campaign: {
      id: 'campaign-id',
      workspaceId: 'workspace-id',
      ownerId: 'owner-id',
      squadId: 'squad-id',
      name: 'June CRM campaign',
      description: 'Campaign description.',
      objective: 'Drive lifecycle activation.',
      status: CampaignStatus.qa,
      channel: 'email',
      priority: 'high',
      dueDate,
      plannedDate: null,
      campaignType: 'Lifecycle',
      audience: 'Active subscribers',
      segmentation: null,
      tags: ['crm'],
      content: null,
      metricsTarget: null,
      estimatedComplexity: 'medium',
      createdAt,
      updatedAt,
    },
    owner: {
      id: 'owner-id',
      name: 'CRM Owner',
      email: 'owner@example.com',
      avatarUrl: null,
      roleLabel: 'CRM Manager',
      createdAt,
      updatedAt,
    },
    squad: {
      id: 'squad-id',
      workspaceId: 'workspace-id',
      name: 'CRM Squad',
      description: null,
      createdAt,
      updatedAt,
    },
    blockers: [],
    notes: [
      {
        id: 'note-id',
        campaignId: 'campaign-id',
        authorUserId: 'owner-id',
        type: CampaignNoteType.note,
        content: 'Operational note.',
        createdAt,
        updatedAt,
      },
    ],
    decisionContext: [],
    activities: [
      {
        id: 'activity-id',
        campaignId: 'campaign-id',
        actorUserId: 'owner-id',
        type: CampaignActivityType.handoff_started,
        category: CampaignActivityCategory.coordination,
        message: 'Handoff started.',
        metadata: null,
        createdAt,
        updatedAt,
      },
    ],
    handoffs: [],
  });

  assert.equal(dto.campaign.id, 'campaign-id');
  assert.equal(dto.owner?.id, 'owner-id');
  assert.equal(dto.squad?.id, 'squad-id');
  assert.deepEqual(dto.blockers, []);
  assert.equal(dto.notes[0].body, 'Operational note.');
  assert.equal(dto.activities[0].message, 'Handoff started.');
  assert.deepEqual(dto.handoffs, []);

  assert.equal('executionHealth' in dto, false);
  assert.equal('operationalRisk' in dto, false);
  assert.equal('coordinationState' in dto, false);
  assert.equal('workflowContinuity' in dto, false);
  assert.equal('commandCenterSummary' in dto, false);
  assert.equal('timeline' in dto, false);
  assert.equal('timelineEvents' in dto, false);
  assert.equal('nextBestAction' in dto, false);
  assert.equal('aiSummary' in dto, false);
});
