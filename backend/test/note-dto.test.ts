import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CampaignNoteType } from '@prisma/client';
import { toCampaignNoteDto } from '../src/modules/notes/note.mapper';
import { parseCreateCampaignNoteRequest, parseUpdateCampaignNoteRequest } from '../src/modules/notes/note.requests';

const createdAt = new Date('2026-06-11T12:00:00.000Z');
const updatedAt = new Date('2026-06-11T13:00:00.000Z');

test('campaign note dto exposes lightweight operational memory facts only', () => {
  const dto = toCampaignNoteDto({
    id: 'note-id',
    campaignId: 'campaign-id',
    authorUserId: 'author-id',
    type: CampaignNoteType.note,
    content: 'Audience file is expected tomorrow morning.',
    createdAt,
    updatedAt,
  });

  assert.deepEqual(dto, {
    id: 'note-id',
    campaignId: 'campaign-id',
    authorId: 'author-id',
    type: 'note',
    body: 'Audience file is expected tomorrow morning.',
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  });

  assert.equal('replies' in dto, false);
  assert.equal('mentions' in dto, false);
  assert.equal('threadState' in dto, false);
  assert.equal('aiSummary' in dto, false);
  assert.equal('copilotInsight' in dto, false);
  assert.equal('executionHealth' in dto, false);
});

test('create note request accepts note facts', () => {
  const request = parseCreateCampaignNoteRequest({
    type: 'note',
    body: 'Audience file is expected tomorrow morning.',
    authorId: 'user-id',
  });

  assert.deepEqual(request, {
    type: 'note',
    body: 'Audience file is expected tomorrow morning.',
    authorId: 'user-id',
  });
});

test('update note request rejects author and database content fields', () => {
  assert.throws(() => {
    parseUpdateCampaignNoteRequest({
      body: 'Updated operational context.',
      authorId: 'user-id',
      content: 'Do not accept raw database field.',
    });
  });
});

test('update note request requires at least one note field', () => {
  assert.throws(() => {
    parseUpdateCampaignNoteRequest({});
  });
});
