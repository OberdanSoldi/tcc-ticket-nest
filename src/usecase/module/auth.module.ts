import { Module } from '@nestjs/common';
import { AuthController } from '../../adapter/controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth.constants';
import { UserService } from '../service/user.service';
import { UserRepository } from '../../adapter/repository/user.repository';
import { UserConverter } from '../converter/user.converter';
import { DatabaseClient } from '../../adapter/repository/DatabaseClient';
import { AuthGuard } from '../guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guard/role.guard';

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
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    UserConverter,
    DatabaseClient,
    appGuard,
    roleGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
