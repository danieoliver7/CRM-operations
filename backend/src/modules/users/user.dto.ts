import { toIsoString } from '../../common/api-response';

export type UserDto = {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  roleLabel?: string;
  createdAt: string;
  updatedAt: string;
};

type UserRecord = {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
  roleLabel: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function toUserDto(user: UserRecord): UserDto {
  return {
    id: user.id,
    name: user.name,
    ...(user.email ? { email: user.email } : {}),
    ...(user.avatarUrl ? { avatarUrl: user.avatarUrl } : {}),
    ...(user.roleLabel ? { roleLabel: user.roleLabel } : {}),
    createdAt: toIsoString(user.createdAt),
    updatedAt: toIsoString(user.updatedAt),
  };
}
