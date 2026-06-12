import { CampaignStatus } from '@prisma/client';
import { badRequest } from '../../common/api-response';

export type CreateCampaignHandoffRequest = {
  fromStage?: CampaignStatus | null;
  toStage?: CampaignStatus | null;
  fromOwnerId?: string | null;
  toOwnerId?: string | null;
  fromSquadId?: string | null;
  toSquadId?: string | null;
  reason?: string | null;
};

export type UpdateCampaignHandoffRequest = Partial<{
  fromStage: CampaignStatus | null;
  toStage: CampaignStatus | null;
  fromOwnerId: string | null;
  toOwnerId: string | null;
  fromSquadId: string | null;
  toSquadId: string | null;
  reason: string | null;
}>;

export type CompleteCampaignHandoffRequest = Record<string, never>;

export type CancelCampaignHandoffRequest = {
  reason?: string | null;
};

const CREATE_FORBIDDEN_FIELDS = [
  'id',
  'campaignId',
  'status',
  'requestedById',
  'completedById',
  'cancelledById',
  'notes',
  'dueAt',
  'completedAt',
  'cancelledAt',
  'createdAt',
  'updatedAt',
  'dependencyGraph',
  'workflowRuntimeState',
  'orchestrationState',
  'taskTree',
  'approvalState',
  'escalationState',
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

const UPDATE_FORBIDDEN_FIELDS = [
  ...CREATE_FORBIDDEN_FIELDS,
  'completed',
  'cancelled',
  'completedByUserId',
  'cancelledByUserId',
];

const COMPLETE_FORBIDDEN_FIELDS = [
  ...CREATE_FORBIDDEN_FIELDS,
  'completedById',
  'notes',
  'reason',
  'fromStage',
  'toStage',
  'fromOwnerId',
  'toOwnerId',
  'fromSquadId',
  'toSquadId',
];

const CANCEL_ALLOWED_FIELDS = ['reason'];

export function parseCreateCampaignHandoffRequest(body: unknown): CreateCampaignHandoffRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, CREATE_FORBIDDEN_FIELDS);

  const request: CreateCampaignHandoffRequest = {
    fromStage: readOptionalNullableEnum(input, 'fromStage', CampaignStatus),
    toStage: readOptionalNullableEnum(input, 'toStage', CampaignStatus),
    fromOwnerId: readOptionalNullableId(input, 'fromOwnerId'),
    toOwnerId: readOptionalNullableId(input, 'toOwnerId'),
    fromSquadId: readOptionalNullableId(input, 'fromSquadId'),
    toSquadId: readOptionalNullableId(input, 'toSquadId'),
    reason: readOptionalNullableString(input, 'reason'),
  };

  ensureHasDestination(request);

  return request;
}

export function parseUpdateCampaignHandoffRequest(body: unknown): UpdateCampaignHandoffRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, UPDATE_FORBIDDEN_FIELDS);

  const request: UpdateCampaignHandoffRequest = {};

  assignIfPresent(request, input, 'fromStage', () => readRequiredNullableEnum(input, 'fromStage', CampaignStatus));
  assignIfPresent(request, input, 'toStage', () => readRequiredNullableEnum(input, 'toStage', CampaignStatus));
  assignIfPresent(request, input, 'fromOwnerId', () => readRequiredNullableId(input, 'fromOwnerId'));
  assignIfPresent(request, input, 'toOwnerId', () => readRequiredNullableId(input, 'toOwnerId'));
  assignIfPresent(request, input, 'fromSquadId', () => readRequiredNullableId(input, 'fromSquadId'));
  assignIfPresent(request, input, 'toSquadId', () => readRequiredNullableId(input, 'toSquadId'));
  assignIfPresent(request, input, 'reason', () => readRequiredNullableString(input, 'reason'));

  if (Object.keys(request).length === 0) {
    throw invalidHandoffInput('At least one handoff field is required.');
  }

  return request;
}

export function parseCompleteCampaignHandoffRequest(body: unknown): CompleteCampaignHandoffRequest {
  if (body === undefined || body === null || body === '') {
    return {};
  }

  const input = requireBody(body);
  rejectForbiddenFields(input, COMPLETE_FORBIDDEN_FIELDS);

  if (Object.keys(input).length > 0) {
    throw invalidHandoffInput('Complete handoff request does not accept fields in the current schema.', {
      fields: Object.keys(input),
    });
  }

  return {};
}

export function parseCancelCampaignHandoffRequest(body: unknown): CancelCampaignHandoffRequest {
  if (body === undefined || body === null || body === '') {
    return {};
  }

  const input = requireBody(body);
  rejectUnsupportedFields(input, CANCEL_ALLOWED_FIELDS);

  if (!hasOwn(input, 'reason')) {
    return {};
  }

  return {
    reason: readRequiredNullableString(input, 'reason'),
  };
}

export function invalidHandoffInput(message: string, details?: unknown) {
  return badRequest('INVALID_HANDOFF_INPUT', message, details);
}

function requireBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw invalidHandoffInput('Request body must be an object.');
  }

  return body as Record<string, unknown>;
}

function rejectForbiddenFields(input: Record<string, unknown>, fields: string[]) {
  const forbiddenFields = fields.filter((field) => hasOwn(input, field));

  if (forbiddenFields.length > 0) {
    throw invalidHandoffInput('Handoff write contains forbidden fields.', {
      fields: forbiddenFields,
    });
  }
}

function rejectUnsupportedFields(input: Record<string, unknown>, fields: string[]) {
  const unsupportedFields = Object.keys(input).filter((field) => !fields.includes(field));

  if (unsupportedFields.length > 0) {
    throw invalidHandoffInput('Handoff request contains unsupported fields.', {
      fields: unsupportedFields,
    });
  }
}

function ensureHasDestination(request: CreateCampaignHandoffRequest) {
  if (request.toStage || request.toOwnerId || request.toSquadId) {
    return;
  }

  throw invalidHandoffInput('Handoff requires at least one destination field.', {
    fields: ['toStage', 'toOwnerId', 'toSquadId'],
  });
}

function assignIfPresent<K extends keyof UpdateCampaignHandoffRequest>(
  request: UpdateCampaignHandoffRequest,
  input: Record<string, unknown>,
  field: K,
  read: () => UpdateCampaignHandoffRequest[K],
) {
  if (hasOwn(input, field as string)) {
    request[field] = read() as UpdateCampaignHandoffRequest[K];
  }
}

function readOptionalNullableId(input: Record<string, unknown>, field: string): string | null | undefined {
  if (!hasOwn(input, field)) {
    return undefined;
  }

  return readRequiredNullableId(input, field);
}

function readRequiredNullableId(input: Record<string, unknown>, field: string): string | null {
  const value = input[field];

  if (value === null) {
    return null;
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw invalidField(field, 'Expected a non-empty string or null.');
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

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw invalidField(field, 'Expected a non-empty string or null.');
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
  return invalidHandoffInput('Invalid handoff input.', {
    field,
    reason,
  });
}

function hasOwn(input: Record<string, unknown>, field: string): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
