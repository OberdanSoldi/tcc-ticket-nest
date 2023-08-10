import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from '../../usecase/service/user.service';
import { UserRequestDto } from '../../domain/dto/request/user/userRequest.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() user: UserRequestDto,
  ): Promise<void> {
    await this.userService.create(user);
    res.status(HttpStatus.CREATED).end();
  }
}
