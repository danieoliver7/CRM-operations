import { Injectable } from '@nestjs/common';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { toWorkspaceDto, WorkspaceDto } from './workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ListResponse<WorkspaceDto>> {
    const workspaces = await this.prisma.workspace.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        organizationId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: workspaces.map(toWorkspaceDto),
    };
  }

  async findById(workspaceId: string): Promise<DetailResponse<WorkspaceDto>> {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: {
        id: true,
        organizationId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!workspace) {
      throw notFound('WORKSPACE_NOT_FOUND', 'Workspace not found.');
    }

    return {
      data: toWorkspaceDto(workspace),
    };
  }
}
