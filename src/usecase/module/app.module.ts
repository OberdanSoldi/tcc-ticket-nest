import { Module } from '@nestjs/common';
import { HelloModule } from './hello.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { InviteModule } from './invite.module';
import { TicketModule } from './ticket.module';

@Module({
  imports: [HelloModule, UserModule, AuthModule, InviteModule, TicketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
