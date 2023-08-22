import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapter/repository/user.repository';
import { UserConverter } from '../converter/user.converter';
import { UserRequestDto } from '../../domain/dto/request/user/userRequest.dto';
import { UserResponseDto } from '../../domain/dto/response/user/userResponse.dto';
import * as bcrypt from 'bcrypt';
import { TicketRepository } from '../../adapter/repository/ticket.repository';
import { TicketConverter } from '../converter/ticket.converter';
import { TicketResponseDto } from '../../domain/dto/response/ticket/ticketResponse.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userConverter: UserConverter,
    private ticketRepository: TicketRepository,
    private ticketConverter: TicketConverter,
  ) {}

  async create(request: UserRequestDto): Promise<void> {
    request.password = await bcrypt.hash(request.password, 10);
    const convertedUser = this.userConverter.toEntity(request);
    await this.userRepository.create(convertedUser);
  }

  async findById(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);
    return this.userConverter.toResponse(user);
  }

  async findOne(email: string): Promise<UserResponseDto> {
    return this.userConverter.toResponse(
      await this.userRepository.findOne(email),
    );
  }

  async findAllUserTickets(userId: string): Promise<TicketResponseDto[]> {
    const tickets = await this.ticketRepository.findAllByUserId(userId);
    return tickets.map((it) => {
      return this.ticketConverter.toResponse(it);
    });
  }
}
