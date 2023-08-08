import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestEntity } from '../../domain/request/user/userRequest.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(userRequest: UserRequestEntity): Promise<any> {
    const userEmail = userRequest.email;
    const user = await this.userService.findOne(userEmail);
    const isMatch = await bcrypt.compare(userRequest.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
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
}
