import { Invite, InviteStatus, Role } from '@prisma/client';

export interface InviteEntity extends Invite {
  id: string;
  hash: string;
  email: string;
  status: InviteStatus;
  date: Date;
  role: Role;
}
