import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../../usecase/service/auth.service';
import { Response } from 'express';
import { Public } from '../../usecase/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SignInRequestDto } from '../../domain/dto/request/signIn/signInRequest.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Res() res: Response, @Body() signIn: SignInRequestDto) {
    res
      .status(HttpStatus.OK)
      .json(await this.authService.signIn(signIn))
      .end();
  }
}
