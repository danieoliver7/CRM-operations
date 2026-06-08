import assert from 'node:assert/strict';
import { test } from 'node:test';
import { HEALTH_RESPONSE } from '../src/health/health.response';

test('health response stays intentionally minimal', () => {
  assert.deepEqual(HEALTH_RESPONSE, {
    status: 'ok',
    service: 'crm-operations-backend',
  });
});
