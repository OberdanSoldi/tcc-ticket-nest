import { Role } from '@prisma/client';

export class UserResponseDto {
  id: string;
  role: Role;
  name: string;
  email: string;
  password: string;
}
