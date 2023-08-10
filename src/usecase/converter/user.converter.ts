import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { AbstractConverter } from './AbstractConverter';
import { UserEntity } from '../../domain/entity/user.entity';
import { UserRequestDto } from '../../domain/dto/request/user/userRequest.dto';
import { UserResponseDto } from '../../domain/dto/response/user/userResponse.dto';

@Injectable()
export class UserConverter
  implements AbstractConverter<UserEntity, UserRequestDto, UserResponseDto>
{
  toEntity(request: UserRequestDto): UserEntity {
    return {
      id: UUID(),
      password: request.password,
      name: request.name,
      email: request.email,
      role: request.role,
    };
  }

  toResponse(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      role: entity.role,
      email: entity.email,
      name: entity.name,
      password: entity.password,
    };
  }
}
