import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapter/repository/user.repository';
import { UserConverter } from '../converter/user.converter';
import { UserRequestDto } from '../../domain/dto/request/user/userRequest.dto';
import { UserResponseDto } from '../../domain/dto/response/user/userResponse.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userConverter: UserConverter,
  ) {}

  async create(request: UserRequestDto): Promise<void> {
    await this.userRepository.create(this.userConverter.toEntity(request));
  }

  async findOne(email: string): Promise<UserResponseDto> {
    return this.userConverter.toResponse(
      await this.userRepository.findOne(email),
    );
  }
}
