import { InviteStatus, Role } from '@prisma/client';

export class InviteResponseDto {
  id: string;
  hash: string;
  email: string;
  status: InviteStatus;
  date: Date;
  role: Role;
}
