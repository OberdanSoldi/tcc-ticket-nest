import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../usecase/service/user.service';
import { Request, Response } from 'express';
import { Roles } from '../../usecase/decorators/role.decorator';
import { Role } from '../../domain/enum/role.enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.USER, Role.ADMIN, Role.TECHNICIAN)
  @Get('tickets')
  async findAllUserTickets(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req['user'].sub;
    const tickets = await this.userService.findAllUserTickets(userId);
    res.status(HttpStatus.OK).json(tickets).end();
  }

  @Roles(Role.TECHNICIAN, Role.ADMIN)
  @Get('/:id')
  async findById(
    @Res() res: Response,
    @Param('id') userId: string,
  ): Promise<void> {
    const user = await this.userService.findById(userId);
    delete user.password;
    res.status(HttpStatus.OK).json(user).end();
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const users = await this.userService.findAllUsers();
    const usersWithoutPassword = users.map((it) => {
      delete it.password;
      return it;
    });
    res.status(HttpStatus.OK).json(usersWithoutPassword).end();
  }
}
