import { AbstractConverter } from './AbstractConverter';
import { InviteEntity } from '../../domain/entity/invite.entity';
import { InviteRequestDto } from '../../domain/dto/request/invite/inviteRequest.dto';
import { InviteResponseDto } from '../../domain/dto/response/invite/inviteResponse.dto';
import { v4 as UUID } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InviteStatus } from '@prisma/client';

@Injectable()
export class InviteConverter
  implements
    AbstractConverter<InviteEntity, InviteRequestDto, InviteResponseDto>
{
  toEntity(request: InviteRequestDto, hash: string): InviteEntity {
    return {
      id: UUID(),
      hash: hash,
      email: request.email,
      date: new Date(),
      status: InviteStatus.PENDING,
      role: request.role,
    };
  }

  toResponse(entity: InviteEntity): InviteResponseDto {
    return {
      id: entity.id,
      hash: entity.hash,
      email: entity.email,
      date: entity.date,
      status: entity.status,
      role: entity.role,
    };
  }
}
