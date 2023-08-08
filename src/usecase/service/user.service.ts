import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapter/repository/user.repository';
import { UserConverter } from '../converter/user.converter';
import { UserRequestEntity } from '../../domain/request/user/userRequest.entity';
import { UserResponseEntity } from '../../domain/response/user/userResponse.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userConverter: UserConverter,
  ) {}

  async create(request: UserRequestEntity): Promise<void> {
    await this.userRepository.create(this.userConverter.toEntity(request));
  }

  async findOne(email: string): Promise<UserResponseEntity> {
    return this.userConverter.toResponse(
      await this.userRepository.findOne(email),
    );
  }
}
