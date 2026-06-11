import { BlockerSeverity, BlockerStatus } from '@prisma/client';
import { badRequest } from '../../common/api-response';

export type CreateBlockerRequest = {
  title: string;
  description?: string | null;
  severity: BlockerSeverity;
  createdById?: string | null;
};

export type UpdateBlockerRequest = Partial<{
  title: string;
  description: string | null;
  severity: BlockerSeverity;
  status: BlockerStatus;
}>;

export type ResolveBlockerRequest = {
  resolvedById?: string | null;
};

const CREATE_FORBIDDEN_FIELDS = [
  'id',
  'campaignId',
  'status',
  'createdAt',
  'updatedAt',
  'resolvedAt',
  'resolvedById',
  'resolvedByUserId',
];

const UPDATE_FORBIDDEN_FIELDS = [
  'id',
  'campaignId',
  'createdById',
  'createdByUserId',
  'resolvedById',
  'resolvedByUserId',
  'createdAt',
  'updatedAt',
  'resolvedAt',
];

export function parseCreateBlockerRequest(body: unknown): CreateBlockerRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, CREATE_FORBIDDEN_FIELDS);

  return {
    title: readRequiredString(input, 'title'),
    description: readOptionalNullableString(input, 'description'),
    severity: readRequiredEnum(input, 'severity', BlockerSeverity),
    createdById: readOptionalNullableString(input, 'createdById'),
  };
}

export function parseUpdateBlockerRequest(body: unknown): UpdateBlockerRequest {
  const input = requireBody(body);
  rejectForbiddenFields(input, UPDATE_FORBIDDEN_FIELDS);

  const request: UpdateBlockerRequest = {};

  assignIfPresent(request, input, 'title', () => readRequiredString(input, 'title'));
  assignIfPresent(request, input, 'description', () => readRequiredNullableString(input, 'description'));
  assignIfPresent(request, input, 'severity', () => readRequiredEnum(input, 'severity', BlockerSeverity));
  assignIfPresent(request, input, 'status', () => readRequiredEnum(input, 'status', BlockerStatus));

  if (Object.keys(request).length === 0) {
    throw invalidBlockerInput('At least one blocker field is required.');
  }

  return request;
}

export function parseResolveBlockerRequest(body: unknown): ResolveBlockerRequest {
  if (body === undefined || body === null || body === '') {
    return {};
  }

  const input = requireBody(body);
  const allowedFields = ['resolvedById'];
  const unsupportedFields = Object.keys(input).filter((field) => !allowedFields.includes(field));

  if (unsupportedFields.length > 0) {
    throw invalidBlockerInput('Resolve blocker request contains unsupported fields.', {
      fields: unsupportedFields,
    });
  }

  if (!hasOwn(input, 'resolvedById')) {
    return {};
  }

  return {
    resolvedById: readRequiredNullableString(input, 'resolvedById'),
  };
}

export function invalidBlockerInput(message: string, details?: unknown) {
  return badRequest('INVALID_BLOCKER_INPUT', message, details);
}

function requireBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw invalidBlockerInput('Request body must be an object.');
  }

  return body as Record<string, unknown>;
}

function rejectForbiddenFields(input: Record<string, unknown>, fields: string[]) {
  const forbiddenFields = fields.filter((field) => hasOwn(input, field));

  if (forbiddenFields.length > 0) {
    throw invalidBlockerInput('Blocker write contains forbidden fields.', {
      fields: forbiddenFields,
    });
  }
}

function assignIfPresent<K extends keyof UpdateBlockerRequest>(
  request: UpdateBlockerRequest,
  input: Record<string, unknown>,
  field: K,
  read: () => UpdateBlockerRequest[K],
) {
  if (hasOwn(input, field as string)) {
    request[field] = read() as UpdateBlockerRequest[K];
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
  return invalidBlockerInput('Invalid blocker input.', {
    field,
    reason,
  });
}

function hasOwn(input: Record<string, unknown>, field: string): boolean {
  return Object.prototype.hasOwnProperty.call(input, field);
}
