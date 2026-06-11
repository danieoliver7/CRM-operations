import { CampaignNoteType } from '@prisma/client';
import { badRequest } from '../../common/api-response';

export type CreateCampaignNoteRequest = {
  type: CampaignNoteType;
  body: string;
  authorId?: string | null;
};

export type UpdateCampaignNoteRequest = Partial<{
  type: CampaignNoteType;
  body: string;
}>;

const CREATE_FORBIDDEN_FIELDS = [
  'id',
  'campaignId',
  'authorUserId',
  'title',
  'content',
  'relatedWorkflowStage',
  'relatedBlockerId',
  'relatedHandoffId',
  'relatedActivityId',
  'importance',
  'createdAt',
  'updatedAt',
];

const UPDATE_FORBIDDEN_FIELDS = [
  'id',
  'campaignId',
  'authorId',
  'authorUserId',
  'title',
  'content',
  'relatedWorkflowStage',
  'relatedBlockerId',
  'relatedHandoffId',
  'relatedActivityId',
  'importance',
  'createdAt',
  'updatedAt',
];

export function parseCreateCampaignNoteRequest(body: unknown): CreateCampaignNoteRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, CREATE_FORBIDDEN_FIELDS);

  return {
    type: readRequiredEnum(input, 'type', CampaignNoteType),
    body: readRequiredString(input, 'body'),
    authorId: readOptionalNullableString(input, 'authorId'),
  };
}

export function parseUpdateCampaignNoteRequest(body: unknown): UpdateCampaignNoteRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, UPDATE_FORBIDDEN_FIELDS);

  const request: UpdateCampaignNoteRequest = {};

  assignIfPresent(request, input, 'type', () => readRequiredEnum(input, 'type', CampaignNoteType));
  assignIfPresent(request, input, 'body', () => readRequiredString(input, 'body'));

  if (Object.keys(request).length === 0) {
    throw invalidNoteInput('At least one note field is required.');
  }

  return request;
}

export function invalidNoteInput(message: string, details?: unknown) {
  return badRequest('INVALID_NOTE_INPUT', message, details);
}

function requireBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw invalidNoteInput('Request body must be an object.');
  }

  return body as Record<string, unknown>;
}

function rejectForbiddenFields(input: Record<string, unknown>, fields: string[]) {
  const forbiddenFields = fields.filter((field) => hasOwn(input, field));

  if (forbiddenFields.length > 0) {
    throw invalidNoteInput('Note write contains forbidden fields.', {
      fields: forbiddenFields,
    });
  }
}

function assignIfPresent<K extends keyof UpdateCampaignNoteRequest>(
  request: UpdateCampaignNoteRequest,
  input: Record<string, unknown>,
  field: K,
  read: () => UpdateCampaignNoteRequest[K],
) {
  if (hasOwn(input, field as string)) {
    request[field] = read() as UpdateCampaignNoteRequest[K];
  }
}

function readRequiredString(input: Record<string, unknown>, field: string): string {
  const value = input[field];

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw invalidField(field, 'Expected a non-empty string.');
  }

  return value;
}

function readOptionalNullableString(input: Record<string, unknown>, field: string): string | null | undefined {
  if (!hasOwn(input, field)) {
    return undefined;
  }

  return readRequiredNullableString(input, field);
}

function readRequiredNullableString(input: Record<string, unknown>, field: string): string | null {
  const value = input[field];

  if (value === null) {
    return null;
  }

  if (typeof value !== 'string') {
    throw invalidField(field, 'Expected a string or null.');
  }

  return value;
}

function readRequiredEnum<T extends Record<string, string>>(
  input: Record<string, unknown>,
  field: string,
  enumValues: T,
): T[keyof T] {
  const value = input[field];

  if (typeof value !== 'string' || !Object.values(enumValues).includes(value)) {
    throw invalidField(field, `Expected one of: ${Object.values(enumValues).join(', ')}.`);
  }

  return value as T[keyof T];
}

function invalidField(field: string, reason: string) {
  return invalidNoteInput('Invalid note input.', {
    field,
    reason,
  });
}

function hasOwn(input: Record<string, unknown>, field: string): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
