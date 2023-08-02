import { Role, User } from "@prisma/client";
import { TicketEntity } from "./ticket.entity";

export interface UserEntity extends User {
  id: string;
  role: Role;
  name: string;
  email: string;
  password: string;
  tickets: TicketEntity[]
}
