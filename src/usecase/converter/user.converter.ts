import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { AbstractConverter } from './AbstractConverter';
import { UserEntity } from '../../domain/entity/user.entity';
import { UserRequestEntity } from '../../domain/request/user/userRequest.entity';
import { UserResponseEntity } from '../../domain/response/user/userResponse.entity';

@Injectable()
export class UserConverter
  implements
    AbstractConverter<UserEntity, UserRequestEntity, UserResponseEntity>
{
  toEntity(request: UserRequestEntity): UserEntity {
    return {
      id: UUID(),
      password: request.password,
      name: request.name,
      email: request.email,
      role: request.role,
    };
  }

  toResponse(entity: UserEntity): UserResponseEntity {
    return {
      id: entity.id,
      role: entity.role,
      email: entity.email,
      name: entity.name,
      password: entity.password,
    };
  }
}
