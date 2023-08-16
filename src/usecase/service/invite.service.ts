import { Injectable, Logger } from '@nestjs/common';
import { InviteRepository } from '../../adapter/repository/invite.repository';
import { InviteConverter } from '../converter/invite.converter';
import { InviteRequestDto } from '../../domain/dto/request/invite/inviteRequest.dto';
import { InviteFailedException } from '../exceptions/InviteFailedException';
import { MailService } from './mail.service';
import { HashGenerator } from '../util/HashGenerator';
import { AcceptInviteRequestDto } from '../../domain/dto/request/invite/acceptInviteRequest.dto';
import { UserService } from './user.service';
import { UserConverter } from '../converter/user.converter';
import { InviteHasAlreadyBeenUsedException } from '../exceptions/InviteHasAlreadyBeenUsedException';
import { InviteNotFoundException } from '../exceptions/InviteNotFoundException';
import { AcceptInviteFailedException } from '../exceptions/AcceptInviteFailedException';

@Injectable()
export class InviteService {
  constructor(
    private inviteRepository: InviteRepository,
    private inviteConverter: InviteConverter,
    private mailService: MailService,
    private userService: UserService,
    private userConverter: UserConverter,
  ) {}

  private readonly logger = new Logger();

  async create(invite: InviteRequestDto): Promise<void> {
    try {
      const inviteHash = await HashGenerator.generate();
      const convertedInvite = this.inviteConverter.toEntity(invite, inviteHash);
      await this.inviteRepository.create(convertedInvite);
      await this.mailService.sendEMail(convertedInvite.email, inviteHash);
    } catch (ex) {
      this.logger.error(`Error on ${InviteService.name}, EX: ${ex}`);
      throw new InviteFailedException();
    }
  }

  async findByHashOrThrow(hash: string) {
    const result = await this.inviteRepository.findByHash(hash);
    if (!result) {
      throw new InviteNotFoundException();
    }
    return this.inviteConverter.toResponse(result);
  }

  async changeInviteStatus(id: string): Promise<void> {
    return await this.inviteRepository.changeStatus(id);
  }

  async acceptInvite(
    hash: string,
    acceptInvitePayload: AcceptInviteRequestDto,
  ): Promise<void> {
    const invite = await this.findByHashOrThrow(hash);
    if (invite.status !== 'PENDING') {
      throw new InviteHasAlreadyBeenUsedException();
    }
    try {
      const user = this.userConverter.toEntity({
        ...acceptInvitePayload,
        email: invite.email,
        role: invite.role,
      });
      await this.changeInviteStatus(invite.id);
      return await this.userService.create(user);
    } catch (ex) {
      this.logger.error(`Error on ${InviteService.name}, EX: ${ex}`);
      throw new AcceptInviteFailedException();
    }
  }
}
