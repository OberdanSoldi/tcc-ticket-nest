import { Hello } from '@prisma/client';

export interface HelloEntity extends Hello {
  id: string;
  message: string;
  date: Date;
}
