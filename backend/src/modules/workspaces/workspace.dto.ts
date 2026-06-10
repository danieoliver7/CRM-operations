import { toIsoString } from '../../common/api-response';

export type WorkspaceDto = {
  id: string;
  organizationId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type WorkspaceRecord = {
  id: string;
  organizationId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toWorkspaceDto(workspace: WorkspaceRecord): WorkspaceDto {
  return {
    id: workspace.id,
    organizationId: workspace.organizationId,
    name: workspace.name,
    createdAt: toIsoString(workspace.createdAt),
    updatedAt: toIsoString(workspace.updatedAt),
  };
}
