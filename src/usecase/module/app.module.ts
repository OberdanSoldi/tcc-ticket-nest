import { Module } from '@nestjs/common';
import { HelloModule } from './hello.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { InviteModule } from './invite.module';

@Module({
  imports: [HelloModule, UserModule, AuthModule, InviteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
