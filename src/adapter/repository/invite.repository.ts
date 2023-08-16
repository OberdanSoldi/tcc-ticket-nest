import { Injectable } from '@nestjs/common';
import { DatabaseClient } from './DatabaseClient';
import { InviteEntity } from '../../domain/entity/invite.entity';

@Injectable()
export class InviteRepository {
  constructor(private prisma: DatabaseClient) {}

  async create(invite: InviteEntity): Promise<void> {
    await this.prisma.invite.create({ data: invite });
  }

  async findByHash(hash: string): Promise<InviteEntity> {
    return this.prisma.invite.findFirst({
      where: {
        hash: hash,
      },
    });
  }

  async changeStatus(id: string) {
    await this.prisma.invite.update({
      where: { id: id },
      data: { status: 'ACCEPTED' },
    });
  }
}
