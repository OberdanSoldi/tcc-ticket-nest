import { Injectable } from '@nestjs/common';
import { DatabaseClient } from './DatabaseClient';
import { InviteEntity } from '../../domain/entity/invite.entity';

@Injectable()
export class InviteRepository {
  constructor(private prisma: DatabaseClient) {}

  async create(invite: InviteEntity): Promise<void> {
    await this.prisma.invite.create({ data: invite });
  }
}
