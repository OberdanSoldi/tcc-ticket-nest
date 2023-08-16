import { Injectable } from '@nestjs/common';
import { AbstractConverter } from './AbstractConverter';
import { AcceptInviteEntity } from '../../domain/entity/acceptInvite.entity';
import { AcceptInviteRequestDto } from '../../domain/dto/request/invite/acceptInviteRequest.dto';
import { AcceptInviteResponseDto } from '../../domain/dto/response/invite/acceptInviteResponse.dto';

@Injectable()
export class AcceptInviteConverter
  implements
    AbstractConverter<
      AcceptInviteEntity,
      AcceptInviteRequestDto,
      AcceptInviteResponseDto
    >
{
  toEntity(request: AcceptInviteRequestDto): AcceptInviteEntity {
    return {
      name: request.name,
      password: request.password,
    };
  }

  toResponse(entity: AcceptInviteEntity): AcceptInviteResponseDto {
    return {
      name: entity.name,
      password: entity.password,
    };
  }
}
