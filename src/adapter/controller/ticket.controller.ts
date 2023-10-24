import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketService } from '../../usecase/service/ticket.service';
import { Request, Response } from 'express';
import { TicketRequestDto } from '../../domain/dto/request/ticket/ticketRequest.dto';
import { Roles } from '../../usecase/decorators/role.decorator';
import { Role } from '../../domain/enum/role.enum';
import { TicketStatusRequestDto } from '../../domain/dto/request/ticket/ticketStatusRequest.dto';
import { TicketPriorityRequestDto } from '../../domain/dto/request/ticket/ticketPriorityRequest.dto';
import { TicketAssigneeRequestDto } from '../../domain/dto/request/ticket/TicketAssigneeRequest.dto';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Roles(Role.USER, Role.ADMIN, Role.TECHNICIAN)
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() ticket: TicketRequestDto,
  ): Promise<void> {
    const userId = req['user'].sub;
    await this.ticketService.create(ticket, userId);
    res.status(HttpStatus.CREATED).end();
  }

  @Get('/:id')
  async findById(
    @Res() res: Response,
    @Param('id') ticketId: string,
  ): Promise<void> {
    const ticket = await this.ticketService.findById(ticketId);
    res.status(HttpStatus.OK).json(ticket).end();
  }

  @Roles(Role.ADMIN, Role.TECHNICIAN)
  @Patch('/status/:id')
  async changeTicketStatus(
    @Res() res: Response,
    @Param('id') ticketId: string,
    @Body() ticket: TicketStatusRequestDto,
  ) {
    await this.ticketService.chanceTicketStatus(ticketId, ticket.status);
    res.status(HttpStatus.CREATED).end();
  }

  @Roles(Role.ADMIN, Role.TECHNICIAN)
  @Patch('/priority/:id')
  async chanceTicketPriority(
    @Res() res: Response,
    @Param('id') ticketId: string,
    @Body() ticket: TicketPriorityRequestDto,
  ): Promise<void> {
    await this.ticketService.chanceTicketPriority(ticketId, ticket.priority);
    res.status(HttpStatus.CREATED).end();
  }

  @Roles(Role.ADMIN)
  @Patch('/assignee/:id')
  async assigneeTicket(
    @Res() res: Response,
    @Param('id') ticketId: string,
    @Body() ticket: TicketAssigneeRequestDto,
  ): Promise<void> {
    await this.ticketService.assigneeTicket(ticketId, ticket.assignee_id);
    res.status(HttpStatus.CREATED).end();
  }

  @Roles(Role.ADMIN, Role.TECHNICIAN)
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const tickets = await this.ticketService.findAll();
    res.status(HttpStatus.OK).json(tickets).end();
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteTicket(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    await this.ticketService.deleteTicket(id);
    res.status(HttpStatus.OK).end();
  }
}
