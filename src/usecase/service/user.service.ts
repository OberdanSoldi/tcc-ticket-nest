import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapter/repository/user.repository';
import { UserConverter } from '../converter/user.converter';
import { UserRequestDto } from '../../domain/dto/request/user/userRequest.dto';
import { UserResponseDto } from '../../domain/dto/response/user/userResponse.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userConverter: UserConverter,
  ) {}

  async create(request: UserRequestDto): Promise<void> {
    request.password = await bcrypt.hash(request.password, 10);
    const convertedUser = this.userConverter.toEntity(request);
    await this.userRepository.create(convertedUser);
  }

  async findOne(email: string): Promise<UserResponseDto> {
    return this.userConverter.toResponse(
      await this.userRepository.findOne(email),
    );
  }
}
