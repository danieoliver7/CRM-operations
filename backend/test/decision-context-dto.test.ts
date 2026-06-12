import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CampaignNoteType, CampaignStatus } from '@prisma/client';
import { toCampaignDecisionContextDto } from '../src/modules/decision-context/decision-context.mapper';
import {
  parseCreateCampaignDecisionContextRequest,
  parseUpdateCampaignDecisionContextRequest,
} from '../src/modules/decision-context/decision-context.requests';

const createdAt = new Date('2026-06-11T12:00:00.000Z');
const updatedAt = new Date('2026-06-11T13:00:00.000Z');

test('decision context dto exposes operational reasoning facts only', () => {
  const dto = toCampaignDecisionContextDto({
    id: 'decision-context-id',
    campaignId: 'campaign-id',
    authorUserId: 'author-id',
    type: CampaignNoteType.rationale,
    title: 'Launch moved due to audience validation',
    content: 'Campaign launch was moved because segmentation needs validation before QA.',
    relatedWorkflowStage: CampaignStatus.qa,
    relatedBlockerId: 'blocker-id',
    relatedActivityId: null,
    relatedHandoffId: null,
    createdAt,
    updatedAt,
  });

  assert.deepEqual(dto, {
    id: 'decision-context-id',
    campaignId: 'campaign-id',
    authorId: 'author-id',
    type: 'rationale',
    title: 'Launch moved due to audience validation',
    body: 'Campaign launch was moved because segmentation needs validation before QA.',
    relatedWorkflowStage: 'qa',
    relatedBlockerId: 'blocker-id',
    relatedActivityId: null,
    relatedHandoffId: null,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  });

  assert.equal('comments' in dto, false);
  assert.equal('approvalStatus' in dto, false);
  assert.equal('knowledgeBasePath' in dto, false);
  assert.equal('aiSummary' in dto, false);
  assert.equal('copilotInsight' in dto, false);
  assert.equal('executionHealth' in dto, false);
});

test('create decision context request accepts supported reasoning facts', () => {
  const request = parseCreateCampaignDecisionContextRequest({
    type: 'rationale',
    title: 'Launch moved due to audience validation',
    body: 'Campaign launch was moved because segmentation needs validation before QA.',
    authorId: 'user-id',
    relatedWorkflowStage: 'qa',
    relatedBlockerId: 'blocker-id',
  });

  assert.deepEqual(request, {
    type: 'rationale',
    title: 'Launch moved due to audience validation',
    body: 'Campaign launch was moved because segmentation needs validation before QA.',
    authorId: 'user-id',
    relatedWorkflowStage: 'qa',
    relatedBlockerId: 'blocker-id',
    relatedActivityId: undefined,
    relatedHandoffId: undefined,
  });
});

test('update decision context request rejects author and unsupported status fields', () => {
  assert.throws(() => {
    parseUpdateCampaignDecisionContextRequest({
      body: 'Updated rationale.',
      authorId: 'user-id',
      relatedStatus: 'planning',
    });
  });
});

test('update decision context request requires at least one field', () => {
  assert.throws(() => {
    parseUpdateCampaignDecisionContextRequest({});
  });
});
