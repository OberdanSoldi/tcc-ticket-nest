import { ResetPasswordRequest } from '@prisma/client';

export interface PasswordRequestEntity extends ResetPasswordRequest {
  id: string;
  date: Date;
  hash: string;
  email: string;
  isUsed: boolean;
}
