import { Injectable, Logger } from '@nestjs/common';
import { InviteRepository } from '../../adapter/repository/invite.repository';
import { InviteConverter } from '../converter/invite.converter';
import { InviteRequestDto } from '../../domain/dto/request/invite/inviteRequest.dto';
import { InviteFailedException } from '../exceptions/InviteFailedException';
import { MailService } from './mail.service';
import { HashGenerator } from '../util/HashGenerator';

@Injectable()
export class InviteService {
  constructor(
    private inviteRepository: InviteRepository,
    private inviteConverter: InviteConverter,
    private mailService: MailService,
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
}
