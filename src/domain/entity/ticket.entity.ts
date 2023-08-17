import { Priority, Status, Ticket } from '@prisma/client';

export interface TicketEntity extends Ticket {
  id: string;
  description: string;
  date: Date;
  status: Status;
  priority: Priority;
  created_by: string;
  assigned_to: string;
  computer_id: string;
}
