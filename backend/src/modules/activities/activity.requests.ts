import { CampaignActivityCategory, CampaignActivityType } from '@prisma/client';
import { badRequest } from '../../common/api-response';

export type ActivityMetadata = Record<string, unknown>;

export type CreateCampaignActivityRequest = {
  type: CampaignActivityType;
  category?: CampaignActivityCategory | null;
  message: string;
  actorId?: string | null;
  metadata?: ActivityMetadata | null;
  relatedBlockerId?: string | null;
  relatedNoteId?: string | null;
  relatedDecisionContextId?: string | null;
  relatedHandoffId?: string | null;
};

const CREATE_FORBIDDEN_FIELDS = [
  'id',
  'campaignId',
  'actorUserId',
  'title',
  'description',
  'body',
  'content',
  'occurredAt',
  'createdAt',
  'updatedAt',
  'aggregateVersion',
  'eventSequence',
  'replayCursor',
  'projectionVersion',
  'eventStoreId',
  'notificationStatus',
  'timelinePosition',
  'timelineIcon',
  'timelineColor',
  'timelinePresentation',
  'executionHealth',
  'slaState',
  'operationalRisk',
  'coordinationState',
  'workflowContinuity',
  'commandCenterSummary',
  'dashboardWarnings',
  'aiSummary',
  'aiRecommendation',
  'copilotInsight',
  'embeddingId',
  'vectorId',
];

const METADATA_FORBIDDEN_FIELDS = [
  ...CREATE_FORBIDDEN_FIELDS,
  'relatedBlockerId',
  'relatedNoteId',
  'relatedDecisionContextId',
  'relatedHandoffId',
];

export function parseCreateCampaignActivityRequest(body: unknown): CreateCampaignActivityRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, CREATE_FORBIDDEN_FIELDS);

  return {
    type: readRequiredEnum(input, 'type', CampaignActivityType),
    category: readOptionalNullableEnum(input, 'category', CampaignActivityCategory),
    message: readRequiredString(input, 'message'),
    actorId: readOptionalNullableString(input, 'actorId'),
    metadata: readOptionalNullableMetadata(input, 'metadata'),
    relatedBlockerId: readOptionalNullableString(input, 'relatedBlockerId'),
    relatedNoteId: readOptionalNullableString(input, 'relatedNoteId'),
    relatedDecisionContextId: readOptionalNullableString(input, 'relatedDecisionContextId'),
    relatedHandoffId: readOptionalNullableString(input, 'relatedHandoffId'),
  };
}

export function invalidActivityInput(message: string, details?: unknown) {
  return badRequest('INVALID_ACTIVITY_INPUT', message, details);
}

function requireBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw invalidActivityInput('Request body must be an object.');
  }

  return body as Record<string, unknown>;
}

function rejectForbiddenFields(input: Record<string, unknown>, fields: string[]) {
  const forbiddenFields = fields.filter((field) => hasOwn(input, field));

  if (forbiddenFields.length > 0) {
    throw invalidActivityInput('Activity write contains forbidden fields.', {
      fields: forbiddenFields,
    });
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

  if (input[field] === null) {
    return null;
  }

  return readRequiredEnum(input, field, enumValues);
}

function readOptionalNullableMetadata(
  input: Record<string, unknown>,
  field: string,
): ActivityMetadata | null | undefined {
  if (!hasOwn(input, field)) {
    return undefined;
  }

  const value = input[field];

  if (value === null) {
    return null;
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw invalidField(field, 'Expected an object or null.');
  }

  const metadata = value as ActivityMetadata;
  rejectForbiddenFields(metadata, METADATA_FORBIDDEN_FIELDS);

  return metadata;
}

function invalidField(field: string, reason: string) {
  return invalidActivityInput('Invalid activity input.', {
    field,
    reason,
  });
}

function hasOwn(input: Record<string, unknown>, field: string): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
