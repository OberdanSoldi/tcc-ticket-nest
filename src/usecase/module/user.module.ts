import { Module } from '@nestjs/common';
import { UserController } from '../../adapter/controller/user.controller';
import { UserService } from '../service/user.service';
import { UserRepository } from '../../adapter/repository/user.repository';
import { DatabaseClient } from '../../adapter/repository/DatabaseClient';
import { UserConverter } from '../converter/user.converter';
import { TicketModule } from './ticket.module';

@Module({
  imports: [TicketModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserController,
    UserRepository,
    UserConverter,
    DatabaseClient,
  ],
  exports: [UserService, UserConverter, UserRepository],
})
export class UserModule {}
