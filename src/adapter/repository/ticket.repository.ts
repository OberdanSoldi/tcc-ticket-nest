import { Injectable } from '@nestjs/common';
import { DatabaseClient } from './DatabaseClient';
import { TicketEntity } from '../../domain/entity/ticket.entity';
import { Priority, Status } from '@prisma/client';

@Injectable()
export class TicketRepository {
  constructor(private prisma: DatabaseClient) {}

  async create(ticket: TicketEntity): Promise<void> {
    await this.prisma.ticket.create({ data: ticket });
  }

  async findById(ticketId: string): Promise<TicketEntity> {
    return this.prisma.ticket.findUnique({ where: { id: ticketId } });
  }

  async changeTicketStatus(
    ticketId: string,
    ticketStatus: Status,
  ): Promise<void> {
    await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { status: ticketStatus },
    });
  }

  async changeTicketPriority(
    ticketId: string,
    ticketPriority: Priority,
  ): Promise<void> {
    await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { priority: ticketPriority },
    });
  }

  async assigneeTicket(
    ticketId: string,
    assigneeUserId: string,
  ): Promise<void> {
    await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { assigned_to: assigneeUserId },
    });
  }

  async findAllByUserId(userId: string): Promise<TicketEntity[]> {
    return this.prisma.ticket.findMany({ where: { created_by: userId } });
  }

  async findAll(): Promise<TicketEntity[]> {
    return this.prisma.ticket.findMany();
  }
}
