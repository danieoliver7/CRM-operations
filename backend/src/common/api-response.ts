import { NotFoundException } from '@nestjs/common';

export type ListResponse<T> = {
  data: T[];
};

export type DetailResponse<T> = {
  data: T;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function toIsoString(value: Date) {
  return value.toISOString();
}

export function notFound(code: string, message: string): NotFoundException {
  return new NotFoundException({
    error: {
      code,
      message,
    },
  } satisfies ApiErrorResponse);
}
