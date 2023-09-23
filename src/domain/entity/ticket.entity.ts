import { Priority, ProblemType, Status, Ticket } from '@prisma/client';

export interface TicketEntity extends Ticket {
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
