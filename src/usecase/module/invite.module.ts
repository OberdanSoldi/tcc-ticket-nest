import { Module } from '@nestjs/common';
import { InviteController } from '../../adapter/controller/invite.controller';
import { InviteService } from '../service/invite.service';
import { InviteRepository } from '../../adapter/repository/invite.repository';
import { DatabaseClient } from '../../adapter/repository/DatabaseClient';
import { MailModule } from './mail.module';
import { InviteConverter } from '../converter/invite.converter';

@Module({
  imports: [MailModule],
  controllers: [InviteController],
  providers: [InviteService, InviteRepository, InviteConverter, DatabaseClient],
})
export class InviteModule {}
