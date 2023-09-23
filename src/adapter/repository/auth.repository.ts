import { Injectable } from '@nestjs/common';
import { DatabaseClient } from './DatabaseClient';
import { PasswordRequestEntity } from '../../domain/entity/passwordRequest.entity';

@Injectable()
export class AuthRepository {
  constructor(private prisma: DatabaseClient) {}

  async createPasswordReset(email: string, hash: string): Promise<void> {
    await this.prisma.resetPasswordRequest.create({
      data: { email: email, hash: hash },
    });
  }

  async findByHash(hash: string): Promise<PasswordRequestEntity> {
    const value = await this.prisma.resetPasswordRequest.findFirst({
      where: { hash: hash },
    });
    return value as PasswordRequestEntity;
  }

  async changeIsUsed(id: string): Promise<void> {
    await this.prisma.resetPasswordRequest.update({
      where: { id: id },
      data: { isUsed: true },
    });
  }
}
