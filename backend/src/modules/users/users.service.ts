import { Injectable } from '@nestjs/common';
import { DetailResponse, ListResponse, notFound } from '../../common/api-response';
import { PrismaService } from '../../prisma/prisma.service';
import { toUserDto, UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ListResponse<UserDto>> {
    const users = await this.prisma.user.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        roleLabel: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: users.map(toUserDto),
    };
  }

  async findById(userId: string): Promise<DetailResponse<UserDto>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        roleLabel: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw notFound('USER_NOT_FOUND', 'User not found.');
    }

    return {
      data: toUserDto(user),
    };
  }
}
