import { CampaignChannel, CampaignComplexity, CampaignPriority, CampaignStatus } from '@prisma/client';
import { badRequest } from '../../common/api-response';

export type CreateCampaignRequest = {
  workspaceId: string;
  ownerId?: string | null;
  squadId?: string | null;
  name: string;
  description?: string | null;
  objective?: string | null;
  status: CampaignStatus;
  channel: CampaignChannel;
  priority: CampaignPriority;
  dueDate: Date;
  plannedDate?: Date | null;
  campaignType?: string | null;
  audience?: string | null;
  segmentation?: string | null;
  tags: string[];
  content?: unknown;
  metricsTarget?: unknown;
  estimatedComplexity?: CampaignComplexity | null;
};

export type UpdateCampaignRequest = Partial<{
  workspaceId: string;
  ownerId: string | null;
  squadId: string | null;
  name: string;
  description: string | null;
  objective: string | null;
  status: CampaignStatus;
  channel: CampaignChannel;
  priority: CampaignPriority;
  dueDate: Date;
  plannedDate: Date | null;
  campaignType: string | null;
  audience: string | null;
  segmentation: string | null;
  tags: string[];
  content: unknown;
  metricsTarget: unknown;
  estimatedComplexity: CampaignComplexity | null;
}>;

export type UpdateCampaignStatusRequest = {
  status: CampaignStatus;
};

export type UpdateCampaignPriorityRequest = {
  priority: CampaignPriority;
};

export type UpdateCampaignOwnerRequest = {
  ownerId: string | null;
};

export type UpdateCampaignSquadRequest = {
  squadId: string | null;
};

const FORBIDDEN_WRITE_FIELDS = ['id', 'createdAt', 'updatedAt'];

export function parseCreateCampaignRequest(body: unknown): CreateCampaignRequest {
  const input = requireBody(body);
  rejectForbiddenWriteFields(input);

  return {
    workspaceId: readRequiredString(input, 'workspaceId'),
    ownerId: readOptionalNullableString(input, 'ownerId'),
    squadId: readOptionalNullableString(input, 'squadId'),
    name: readRequiredString(input, 'name'),
    description: readOptionalNullableString(input, 'description'),
    objective: readOptionalNullableString(input, 'objective'),
    status: readOptionalEnum(input, 'status', CampaignStatus) ?? CampaignStatus.briefing,
    channel: readRequiredEnum(input, 'channel', CampaignChannel),
    priority: readOptionalEnum(input, 'priority', CampaignPriority) ?? CampaignPriority.medium,
    dueDate: readRequiredDate(input, 'dueDate'),
    plannedDate: readOptionalNullableDate(input, 'plannedDate'),
    campaignType: readOptionalNullableString(input, 'campaignType'),
    audience: readOptionalNullableString(input, 'audience'),
    segmentation: readOptionalNullableString(input, 'segmentation'),
    tags: readOptionalStringArray(input, 'tags') ?? [],
    content: readOptionalJson(input, 'content'),
    metricsTarget: readOptionalJson(input, 'metricsTarget'),
    estimatedComplexity: readOptionalEnum(input, 'estimatedComplexity', CampaignComplexity),
  };
}

export function parseUpdateCampaignRequest(body: unknown): UpdateCampaignRequest {
  const input = requireBody(body);
  rejectForbiddenWriteFields(input);

  const request: UpdateCampaignRequest = {};

  assignIfPresent(request, input, 'workspaceId', () => readRequiredString(input, 'workspaceId'));
  assignIfPresent(request, input, 'ownerId', () => readRequiredNullableString(input, 'ownerId'));
  assignIfPresent(request, input, 'squadId', () => readRequiredNullableString(input, 'squadId'));
  assignIfPresent(request, input, 'name', () => readRequiredString(input, 'name'));
  assignIfPresent(request, input, 'description', () => readRequiredNullableString(input, 'description'));
  assignIfPresent(request, input, 'objective', () => readRequiredNullableString(input, 'objective'));
  assignIfPresent(request, input, 'status', () => readRequiredEnum(input, 'status', CampaignStatus));
  assignIfPresent(request, input, 'channel', () => readRequiredEnum(input, 'channel', CampaignChannel));
  assignIfPresent(request, input, 'priority', () => readRequiredEnum(input, 'priority', CampaignPriority));
  assignIfPresent(request, input, 'dueDate', () => readRequiredDate(input, 'dueDate'));
  assignIfPresent(request, input, 'plannedDate', () => readRequiredNullableDate(input, 'plannedDate'));
  assignIfPresent(request, input, 'campaignType', () => readRequiredNullableString(input, 'campaignType'));
  assignIfPresent(request, input, 'audience', () => readRequiredNullableString(input, 'audience'));
  assignIfPresent(request, input, 'segmentation', () => readRequiredNullableString(input, 'segmentation'));
  assignIfPresent(request, input, 'tags', () => readRequiredStringArray(input, 'tags'));
  assignIfPresent(request, input, 'content', () => readRequiredJson(input, 'content'));
  assignIfPresent(request, input, 'metricsTarget', () => readRequiredJson(input, 'metricsTarget'));
  assignIfPresent(request, input, 'estimatedComplexity', () =>
    readRequiredNullableEnum(input, 'estimatedComplexity', CampaignComplexity),
  );

  if (Object.keys(request).length === 0) {
    throw invalidCampaignInput('At least one campaign field is required.');
  }

  return request;
}

export function parseUpdateCampaignStatusRequest(body: unknown): UpdateCampaignStatusRequest {
  const input = requireBody(body);
  return {
    status: readRequiredEnum(input, 'status', CampaignStatus),
  };
}

export function parseUpdateCampaignPriorityRequest(body: unknown): UpdateCampaignPriorityRequest {
  const input = requireBody(body);
  return {
    priority: readRequiredEnum(input, 'priority', CampaignPriority),
  };
}

export function parseUpdateCampaignOwnerRequest(body: unknown): UpdateCampaignOwnerRequest {
  const input = requireBody(body);
  return {
    ownerId: readRequiredNullableString(input, 'ownerId'),
  };
}

export function parseUpdateCampaignSquadRequest(body: unknown): UpdateCampaignSquadRequest {
  const input = requireBody(body);
  return {
    squadId: readRequiredNullableString(input, 'squadId'),
  };
}

export function invalidCampaignInput(message: string, details?: unknown) {
  return badRequest('INVALID_CAMPAIGN_INPUT', message, details);
}

function requireBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw invalidCampaignInput('Request body must be an object.');
  }

  return body as Record<string, unknown>;
}

function rejectForbiddenWriteFields(input: Record<string, unknown>) {
  const forbiddenFields = FORBIDDEN_WRITE_FIELDS.filter((field) => hasOwn(input, field));

  if (forbiddenFields.length > 0) {
    throw invalidCampaignInput('Campaign write contains read-only fields.', {
      fields: forbiddenFields,
    });
  }
}

function assignIfPresent<T extends Record<string, unknown>, K extends keyof UpdateCampaignRequest>(
  request: UpdateCampaignRequest,
  input: T,
  field: K,
  read: () => UpdateCampaignRequest[K],
) {
  if (hasOwn(input, field as string)) {
    request[field] = read() as UpdateCampaignRequest[K];
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

function readRequiredDate(input: Record<string, unknown>, field: string): Date {
  const value = input[field];

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw invalidField(field, 'Expected an ISO date string.');
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw invalidField(field, 'Expected a valid date.');
  }

  return date;
}

function readOptionalNullableDate(input: Record<string, unknown>, field: string): Date | null | undefined {
  if (!hasOwn(input, field)) {
    return undefined;
  }

  return readRequiredNullableDate(input, field);
}

function readRequiredNullableDate(input: Record<string, unknown>, field: string): Date | null {
  if (input[field] === null) {
    return null;
  }

  return readRequiredDate(input, field);
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

function readOptionalEnum<T extends Record<string, string>>(
  input: Record<string, unknown>,
  field: string,
  enumValues: T,
): T[keyof T] | undefined {
  if (!hasOwn(input, field)) {
    return undefined;
  }

  return readRequiredEnum(input, field, enumValues);
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

function readOptionalStringArray(input: Record<string, unknown>, field: string): string[] | undefined {
  if (!hasOwn(input, field)) {
    return undefined;
  }

  return readRequiredStringArray(input, field);
}

function readRequiredStringArray(input: Record<string, unknown>, field: string): string[] {
  const value = input[field];

  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    throw invalidField(field, 'Expected an array of strings.');
  }

  return value;
}

function readOptionalJson(input: Record<string, unknown>, field: string): unknown {
  if (!hasOwn(input, field)) {
    return undefined;
  }

  return readRequiredJson(input, field);
}

function readRequiredJson(input: Record<string, unknown>, field: string): unknown {
  const value = input[field];

  if (value === undefined) {
    throw invalidField(field, 'Expected a JSON value.');
  }

  return value;
}

function invalidField(field: string, reason: string) {
  return invalidCampaignInput('Invalid campaign input.', {
    field,
    reason,
  });
}

function hasOwn(input: Record<string, unknown>, field: string): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
