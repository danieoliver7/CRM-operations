import { Injectable } from '@nestjs/common';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { SquadDto, toSquadDto } from './squad.dto';

@Injectable()
export class SquadsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ListResponse<SquadDto>> {
    const squads = await this.prisma.squad.findMany({
      orderBy: [{ workspaceId: 'asc' }, { name: 'asc' }],
      select: {
        id: true,
        workspaceId: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: squads.map(toSquadDto),
    };
  }

  async findById(squadId: string): Promise<DetailResponse<SquadDto>> {
    const squad = await this.prisma.squad.findUnique({
      where: { id: squadId },
      select: {
        id: true,
        workspaceId: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!squad) {
      throw notFound('SQUAD_NOT_FOUND', 'Squad not found.');
    }

    return {
      data: toSquadDto(squad),
    };
  }
}
