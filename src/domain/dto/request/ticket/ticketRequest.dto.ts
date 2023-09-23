import { Priority, ProblemType, Status } from '@prisma/client';

export class TicketRequestDto {
  problemType: ProblemType;
  description: string;
  title: string;
  date: Date;
  status: Status;
  priority: Priority;
  created_by: string;
  assigned_to: string;
  computer_id: string;
}
