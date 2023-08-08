import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../../usecase/service/auth.service';
import { Response } from 'express';
import { UserRequestEntity } from '../../domain/request/user/userRequest.entity';
import { Public } from '../../usecase/decorators/auth.decorator';
import { Roles } from '../../usecase/decorators/role.decorator';
import { Role } from '../../domain/enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Res() res: Response, @Body() signIn: UserRequestEntity) {
    res
      .status(HttpStatus.OK)
      .json(await this.authService.signIn(signIn))
      .end();
  }
}
