import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInRequestDto } from '../../domain/dto/request/signIn/signInRequest.dto';
import { AccessToken } from '../../domain/@types/AccessToken';
import { EmailOrPasswordIncorrectException } from '../exceptions/EmailOrPasswordIncorrectException';
import { ForgotPasswordDto } from '../../domain/dto/request/forgotPassword/forgotPassword.dto';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
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

  async forgotPassword(userRequest: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.findOne(userRequest.email);
  }
}
