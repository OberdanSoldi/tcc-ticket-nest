import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../usecase/decorators/role.decorator';
import { Role } from '../../domain/enum/role.enum';
import { InviteService } from '../../usecase/service/invite.service';
import { InviteRequestDto } from '../../domain/dto/request/invite/inviteRequest.dto';
import { Response } from 'express';
import { Public } from '../../usecase/decorators/auth.decorator';
import { AcceptInviteRequestDto } from '../../domain/dto/request/invite/acceptInviteRequest.dto';

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

  @Public()
  @Post('/:id')
  async acceptInvite(
    @Res() res: Response,
    @Param('id') hash: string,
    @Body() invite: AcceptInviteRequestDto,
  ): Promise<void> {
    await this.inviteService.acceptInvite(hash, invite);
    res.status(HttpStatus.CREATED).end();
  }
}
