import { Priority, Status, Ticket } from "@prisma/client";
import { UserEntity } from "./user.entity";

export interface TicketEntity extends Ticket {
  descripton: string;
  date: Date;
  status: Status;
  priority: Priority;
  computer_id: string;
  user: UserEntity;
  userId: string;
}