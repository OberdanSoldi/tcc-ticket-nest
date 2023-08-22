import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entity/user.entity';
import { DatabaseClient } from './DatabaseClient';

@Injectable()
export class UserRepository {
  constructor(private prisma: DatabaseClient) {}

  async create(user: UserEntity): Promise<void> {
    await this.prisma.user.create({ data: user });
  }

  async findById(userId: string): Promise<UserEntity> {
    return this.prisma.user.findFirst({ where: { id: userId } });
  }

  async findOne(email: string): Promise<UserEntity> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
