import { toIsoString } from '../../common/api-response';

export type SquadDto = {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

type SquadRecord = {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function toSquadDto(squad: SquadRecord): SquadDto {
  return {
    id: squad.id,
    workspaceId: squad.workspaceId,
    name: squad.name,
    ...(squad.description ? { description: squad.description } : {}),
    createdAt: toIsoString(squad.createdAt),
    updatedAt: toIsoString(squad.updatedAt),
  };
}
