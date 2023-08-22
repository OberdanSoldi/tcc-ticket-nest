import { Module } from '@nestjs/common';
import { TicketService } from '../service/ticket.service';
import { TicketController } from '../../adapter/controller/ticket.controller';
import { DatabaseClient } from '../../adapter/repository/DatabaseClient';
import { TicketRepository } from '../../adapter/repository/ticket.repository';
import { TicketConverter } from '../converter/ticket.converter';

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketRepository, TicketConverter, DatabaseClient],
  exports: [TicketService, TicketRepository, TicketConverter],
})
export class TicketModule {}
