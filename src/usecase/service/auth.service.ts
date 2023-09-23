import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInRequestDto } from '../../domain/dto/request/signIn/signInRequest.dto';
import { AccessToken } from '../../domain/@types/AccessToken';
import { EmailOrPasswordIncorrectException } from '../exceptions/EmailOrPasswordIncorrectException';
import { ForgotPasswordRequestDto } from '../../domain/dto/request/password/forgotPasswordRequest.dto';
import { MailService } from './mail.service';
import { HashGenerator } from '../util/HashGenerator';
import { AuthRepository } from '../../adapter/repository/auth.repository';
import { ResetPasswordRequestDto } from '../../domain/dto/request/password/resetPasswordRequest.dto';
import { RequestAlreadyUsedException } from '../exceptions/RequestAlreadyUsedException';
import { CannotFindPasswordRequestException } from '../exceptions/CannotFindPasswordRequestException';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    private authRepository: AuthRepository,
  ) {}

  async signIn(userRequest: SignInRequestDto): Promise<AccessToken> {
    const userEmail = userRequest.email;
    const user = await this.userService.findOne(userEmail);
    const isMatch = await bcrypt.compare(userRequest.password, user.password);
    if (!isMatch) {
      throw new EmailOrPasswordIncorrectException();
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      username: user.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async forgotPassword(userRequest: ForgotPasswordRequestDto): Promise<void> {
    const user = await this.userService.findOne(userRequest.email);
    if (!user) {
      return;
    }
    const resetPasswordHash = await HashGenerator.generate();
    await this.authRepository.createPasswordReset(
      user.email,
      resetPasswordHash,
    );
    await this.mailService.sendEMail(
      user.email,
      resetPasswordHash,
      'ResetPassword',
    );
  }

  async resetPassword(userRequest: ResetPasswordRequestDto, hash: string) {
    const resetRequest = await this.authRepository.findByHash(hash);
    if (!resetRequest && resetRequest === null) {
      throw new CannotFindPasswordRequestException();
    }
    if (resetRequest.isUsed) {
      throw new RequestAlreadyUsedException();
    }
    const user = await this.userService.findOne(resetRequest.email);
    if (!user && user === null) {
      throw new Error('Cannot find user');
    }
    await this.userService.updateUserPassword(userRequest, user.id);
    await this.authRepository.changeIsUsed(resetRequest.id);
  }
}
