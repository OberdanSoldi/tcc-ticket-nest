import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AuthService } from '../../usecase/service/auth.service';
import { Response } from 'express';
import { Public } from '../../usecase/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SignInRequestDto } from '../../domain/dto/request/signIn/signInRequest.dto';
import { ForgotPasswordRequestDto } from '../../domain/dto/request/password/forgotPasswordRequest.dto';
import { ResetPasswordRequestDto } from '../../domain/dto/request/password/resetPasswordRequest.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Res() res: Response, @Body() signIn: SignInRequestDto) {
    const accessToken = await this.authService.signIn(signIn);
    res.status(HttpStatus.OK).json(accessToken).end();
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(
    @Res() res: Response,
    @Body() userRequest: ForgotPasswordRequestDto,
  ) {
    await this.authService.forgotPassword(userRequest);
    res.status(HttpStatus.CREATED).end();
  }

  @Public()
  @Post('reset-password/:id')
  async resetPassword(
    @Res() res: Response,
    @Body() userRequest: ResetPasswordRequestDto,
    @Param('id') hash: string,
  ) {
    await this.authService.resetPassword(userRequest, hash);
    res.status(HttpStatus.CREATED).end();
    return undefined;
  }
}
