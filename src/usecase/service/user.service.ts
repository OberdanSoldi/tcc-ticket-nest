import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../adapter/repository/user.repository';
import { UserConverter } from '../converter/user.converter';
import { UserRequestDto } from '../../domain/dto/request/user/userRequest.dto';
import { UserResponseDto } from '../../domain/dto/response/user/userResponse.dto';
import * as bcrypt from 'bcrypt';
import { TicketRepository } from '../../adapter/repository/ticket.repository';
import { TicketConverter } from '../converter/ticket.converter';
import { TicketResponseDto } from '../../domain/dto/response/ticket/ticketResponse.dto';
import { EmailOrPasswordIncorrectException } from '../exceptions/EmailOrPasswordIncorrectException';
import { ResetPasswordRequestDto } from '../../domain/dto/request/password/resetPasswordRequest.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userConverter: UserConverter,
    private ticketRepository: TicketRepository,
    private ticketConverter: TicketConverter,
  ) {}

  async create(request: UserRequestDto): Promise<void> {
    try {
      request.password = await bcrypt.hash(request.password, 10);
      const convertedUser = this.userConverter.toEntity(request);
      await this.userRepository.create(convertedUser);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async findById(userId: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findById(userId);
      return this.userConverter.toResponse(user);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async findOne(email: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne(email);

      if (!user) {
        throw new EmailOrPasswordIncorrectException();
      }
      return this.userConverter.toResponse(user);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async findAllUserTickets(userId: string): Promise<TicketResponseDto[]> {
    try {
      const tickets = await this.ticketRepository.findAllByUserId(userId);
      return tickets.map((it) => {
        return this.ticketConverter.toResponse(it);
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userRepository.findAll();
      return users.map((it) => {
        return this.userConverter.toResponse(it);
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async updateUserPassword(userRequest: ResetPasswordRequestDto, id: string) {
    try {
      const user = await this.userRepository.findById(id);
      if (userRequest.password !== userRequest.passwordConfirm) {
        new Error('Password mismatch');
      }
      if (!user) {
        return;
      }
      const userPasswordHashed = await bcrypt.hash(userRequest.password, 10);
      await this.userRepository.updateUserPassword(userPasswordHashed, id);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.userRepository.deleteUser(id);
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
