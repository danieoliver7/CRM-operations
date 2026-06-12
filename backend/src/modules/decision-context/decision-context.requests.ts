import { CampaignNoteType, CampaignStatus } from '@prisma/client';
import { badRequest } from '../../common/api-response';

export type CreateCampaignDecisionContextRequest = {
  type: CampaignNoteType;
  title: string;
  body: string;
  authorId?: string | null;
  relatedWorkflowStage?: CampaignStatus | null;
  relatedBlockerId?: string | null;
  relatedActivityId?: string | null;
  relatedHandoffId?: string | null;
};

export type UpdateCampaignDecisionContextRequest = Partial<{
  type: CampaignNoteType;
  title: string;
  body: string;
  relatedWorkflowStage: CampaignStatus | null;
  relatedBlockerId: string | null;
  relatedActivityId: string | null;
  relatedHandoffId: string | null;
}>;

const CREATE_FORBIDDEN_FIELDS = [
  'id',
  'campaignId',
  'authorUserId',
  'content',
  'relatedStatus',
  'importance',
  'createdAt',
  'updatedAt',
];

const UPDATE_FORBIDDEN_FIELDS = [
  'id',
  'campaignId',
  'authorId',
  'authorUserId',
  'content',
  'relatedStatus',
  'importance',
  'createdAt',
  'updatedAt',
];

export function parseCreateCampaignDecisionContextRequest(body: unknown): CreateCampaignDecisionContextRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, CREATE_FORBIDDEN_FIELDS);

  return {
    type: readRequiredEnum(input, 'type', CampaignNoteType),
    title: readRequiredString(input, 'title'),
    body: readRequiredString(input, 'body'),
    authorId: readOptionalNullableString(input, 'authorId'),
    relatedWorkflowStage: readOptionalNullableEnum(input, 'relatedWorkflowStage', CampaignStatus),
    relatedBlockerId: readOptionalNullableString(input, 'relatedBlockerId'),
    relatedActivityId: readOptionalNullableString(input, 'relatedActivityId'),
    relatedHandoffId: readOptionalNullableString(input, 'relatedHandoffId'),
  };
}

export function parseUpdateCampaignDecisionContextRequest(body: unknown): UpdateCampaignDecisionContextRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, UPDATE_FORBIDDEN_FIELDS);

  const request: UpdateCampaignDecisionContextRequest = {};

  assignIfPresent(request, input, 'type', () => readRequiredEnum(input, 'type', CampaignNoteType));
  assignIfPresent(request, input, 'title', () => readRequiredString(input, 'title'));
  assignIfPresent(request, input, 'body', () => readRequiredString(input, 'body'));
  assignIfPresent(request, input, 'relatedWorkflowStage', () =>
    readRequiredNullableEnum(input, 'relatedWorkflowStage', CampaignStatus),
  );
  assignIfPresent(request, input, 'relatedBlockerId', () => readRequiredNullableString(input, 'relatedBlockerId'));
  assignIfPresent(request, input, 'relatedActivityId', () => readRequiredNullableString(input, 'relatedActivityId'));
  assignIfPresent(request, input, 'relatedHandoffId', () => readRequiredNullableString(input, 'relatedHandoffId'));

  if (Object.keys(request).length === 0) {
    throw invalidDecisionContextInput('At least one decision context field is required.');
  }

  return request;
}

export function invalidDecisionContextInput(message: string, details?: unknown) {
  return badRequest('INVALID_DECISION_CONTEXT_INPUT', message, details);
}

function requireBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw invalidDecisionContextInput('Request body must be an object.');
  }

  return body as Record<string, unknown>;
}

function rejectForbiddenFields(input: Record<string, unknown>, fields: string[]) {
  const forbiddenFields = fields.filter((field) => hasOwn(input, field));

  if (forbiddenFields.length > 0) {
    throw invalidDecisionContextInput('Decision context write contains forbidden fields.', {
      fields: forbiddenFields,
    });
  }
}

function assignIfPresent<K extends keyof UpdateCampaignDecisionContextRequest>(
  request: UpdateCampaignDecisionContextRequest,
  input: Record<string, unknown>,
  field: K,
  read: () => UpdateCampaignDecisionContextRequest[K],
) {
  if (hasOwn(input, field as string)) {
    request[field] = read() as UpdateCampaignDecisionContextRequest[K];
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

function readOptionalNullableEnum<T extends Record<string, string>>(
  input: Record<string, unknown>,
  field: string,
  enumValues: T,
): T[keyof T] | null | undefined {
  if (!hasOwn(input, field)) {
    return undefined;
  }

  return readRequiredNullableEnum(input, field, enumValues);
}

function readRequiredNullableEnum<T extends Record<string, string>>(
  input: Record<string, unknown>,
  field: string,
  enumValues: T,
): T[keyof T] | null {
  if (input[field] === null) {
    return null;
  }

  return readRequiredEnum(input, field, enumValues);
}

function invalidField(field: string, reason: string) {
  return invalidDecisionContextInput('Invalid decision context input.', {
    field,
    reason,
  });
}

function hasOwn(input: Record<string, unknown>, field: string): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
