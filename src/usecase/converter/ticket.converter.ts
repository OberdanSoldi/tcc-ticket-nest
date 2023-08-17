import { AbstractConverter } from './AbstractConverter';
import { TicketEntity } from '../../domain/entity/ticket.entity';
import { TicketRequestDto } from '../../domain/dto/request/ticket/ticketRequest.dto';
import { TicketResponseDto } from '../../domain/dto/response/ticket/ticketResponse.dto';
import { v4 as UUID } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketConverter
  implements
    AbstractConverter<TicketEntity, TicketRequestDto, TicketResponseDto>
{
  toEntity(request: TicketRequestDto): TicketEntity {
    return {
      id: UUID(),
      computer_id: request.computer_id,
      date: request.date,
      status: request.status,
      assigned_to: request.assigned_to,
      created_by: request.created_by,
      description: request.description,
      priority: request.priority,
    };
  }

  toResponse(entity: TicketEntity): TicketResponseDto {
    return {
      id: entity.id,
      computer_id: entity.computer_id,
      date: entity.date,
      status: entity.status,
      assigned_to: entity.assigned_to,
      created_by: entity.created_by,
      description: entity.description,
      priority: entity.priority,
    };
  }
}
