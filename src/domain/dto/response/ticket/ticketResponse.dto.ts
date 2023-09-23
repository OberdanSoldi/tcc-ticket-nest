import { Priority, ProblemType, Status } from '@prisma/client';

export class TicketResponseDto {
  problemType: ProblemType;
  id: string;
  title: string;
  description: string;
  date: Date;
  status: Status;
  priority: Priority;
  created_by: string;
  assigned_to: string;
  computer_id: string;
}
