import { Role } from '@prisma/client';

export interface UserResponseEntity {
  id: string;
  role: Role;
  name: string;
  email: string;
  password: string;
}
