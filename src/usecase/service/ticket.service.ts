import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TicketRepository } from '../../adapter/repository/ticket.repository';
import { TicketConverter } from '../converter/ticket.converter';
import { TicketRequestDto } from '../../domain/dto/request/ticket/ticketRequest.dto';
import { FailCreateTicketException } from '../exceptions/FailCreateTicketException';
import { Priority, Status } from '@prisma/client';
import { FailChangeTicketException } from '../exceptions/FailChangeTicketException';
import { TicketResponseDto } from '../../domain/dto/response/ticket/ticketResponse.dto';

@Injectable()
export class TicketService {
  constructor(
    private ticketRepository: TicketRepository,
    private ticketConverter: TicketConverter,
  ) {}

  private readonly logger = new Logger();

  async create(ticket: TicketRequestDto, userId: string): Promise<void> {
    try {
      ticket.created_by = userId;
      await this.ticketRepository.create(this.ticketConverter.toEntity(ticket));
    } catch (ex) {
      this.logger.error(`Error on ${TicketService.name}, EX: ${ex}`);
      throw new FailCreateTicketException();
    }
  }

  async findById(ticketId: string): Promise<TicketResponseDto> {
    const ticket = await this.ticketRepository.findById(ticketId);
    return this.ticketConverter.toResponse(ticket);
  }

  async chanceTicketStatus(
    ticketId: string,
    ticketStatus: Status,
  ): Promise<void> {
    try {
      await this.ticketRepository.changeTicketStatus(ticketId, ticketStatus);
    } catch (ex) {
      this.logger.error(`Error on ${TicketService.name}, EX: ${ex}`);
      throw new FailChangeTicketException(
        'Fail change ticket status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async chanceTicketPriority(
    ticketId: string,
    ticketPriority: Priority,
  ): Promise<void> {
    try {
      await this.ticketRepository.changeTicketPriority(
        ticketId,
        ticketPriority,
      );
    } catch (ex) {
      this.logger.error(`Error on ${TicketService.name}, EX: ${ex}`);
      throw new FailChangeTicketException(
        'Fail change ticket priority',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async assigneeTicket(
    ticketId: string,
    assigneeUserId: string,
  ): Promise<void> {
    try {
      await this.ticketRepository.assigneeTicket(ticketId, assigneeUserId);
    } catch (ex) {
      this.logger.error(`Error on ${TicketService.name}, EX: ${ex}`);
      throw new FailChangeTicketException(
        'Fail assignee ticket',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
