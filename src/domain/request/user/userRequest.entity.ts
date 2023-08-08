import { Role } from '@prisma/client';

export interface UserRequestEntity {
  role: Role;
  name: string;
  email: string;
  password: string;
}
