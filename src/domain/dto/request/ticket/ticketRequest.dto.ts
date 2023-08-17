import { Priority, Status } from '@prisma/client';

export class TicketRequestDto {
  description: string;
  date: Date;
  status: Status;
  priority: Priority;
  created_by: string;
  assigned_to: string;
  computer_id: string;
}
