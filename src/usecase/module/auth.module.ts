import { Module } from '@nestjs/common';
import { AuthController } from '../../adapter/controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth.constants';
import { DatabaseClient } from '../../adapter/repository/DatabaseClient';
import { AuthGuard } from '../guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guard/role.guard';
import { MailModule } from './mail.module';
import { AuthRepository } from '../../adapter/repository/auth.repository';

const appGuard = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

const roleGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

@Module({
  imports: [
    MailModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DatabaseClient, appGuard, roleGuard, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
