import { Invite, InviteStatus } from '@prisma/client';

export interface InviteEntity extends Invite {
  id: string;
  hash: string;
  email: string;
  status: InviteStatus;
  date: Date;
}
