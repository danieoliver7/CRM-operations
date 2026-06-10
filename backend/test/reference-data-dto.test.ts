import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toSquadDto } from '../src/modules/squads/squad.dto';
import { toUserDto } from '../src/modules/users/user.dto';
import { toWorkspaceDto } from '../src/modules/workspaces/workspace.dto';

const createdAt = new Date('2026-06-10T12:00:00.000Z');
const updatedAt = new Date('2026-06-10T13:00:00.000Z');

test('workspace dto exposes reference facts only', () => {
  assert.deepEqual(
    toWorkspaceDto({
      id: 'workspace-id',
      organizationId: 'organization-id',
      name: 'Default Workspace',
      createdAt,
      updatedAt,
    }),
    {
      id: 'workspace-id',
      organizationId: 'organization-id',
      name: 'Default Workspace',
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    },
  );
});

test('user dto omits null optional reference fields', () => {
  assert.deepEqual(
    toUserDto({
      id: 'user-id',
      name: 'Daniel Oliveira',
      email: null,
      avatarUrl: null,
      roleLabel: 'CRM Operations Lead',
      createdAt,
      updatedAt,
    }),
    {
      id: 'user-id',
      name: 'Daniel Oliveira',
      roleLabel: 'CRM Operations Lead',
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    },
  );
});

test('squad dto exposes workspace reference without pressure fields', () => {
  assert.deepEqual(
    toSquadDto({
      id: 'squad-id',
      workspaceId: 'workspace-id',
      name: 'CRM Lifecycle',
      description: null,
      createdAt,
      updatedAt,
    }),
    {
      id: 'squad-id',
      workspaceId: 'workspace-id',
      name: 'CRM Lifecycle',
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    },
  );
});
