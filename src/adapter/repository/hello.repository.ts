import { Injectable } from '@nestjs/common';
import { DatabaseClient } from './DatabaseClient';

@Injectable()
export class HelloRepository {
  constructor(private prisma: DatabaseClient) {}

  getAll() {
    return this.prisma.hello.findMany();
  }
}
