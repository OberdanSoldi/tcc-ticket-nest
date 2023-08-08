import { Role, User } from '@prisma/client';

export interface UserEntity extends User {
  id: string;
  role: Role;
  name: string;
  email: string;
  password: string;
}
