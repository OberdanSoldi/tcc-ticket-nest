import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../usecase/decorators/role.decorator';
import { Role } from '../../domain/enum/role.enum';
import { InviteService } from '../../usecase/service/invite.service';
import { InviteRequestDto } from '../../domain/dto/request/invite/inviteRequest.dto';
import { Response } from 'express';

@ApiTags('invite')
@Controller('invite')
export class InviteController {
  constructor(private inviteService: InviteService) {}
  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Res() res: Response,
    @Body() invite: InviteRequestDto,
  ): Promise<void> {
    await this.inviteService.create(invite);
    res.status(HttpStatus.CREATED).end();
  }
}
