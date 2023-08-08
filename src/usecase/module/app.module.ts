import { Module } from '@nestjs/common';
import { HelloModule } from './hello.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [HelloModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
