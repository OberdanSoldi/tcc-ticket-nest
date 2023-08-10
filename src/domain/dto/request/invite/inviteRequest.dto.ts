import { InviteStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class InviteRequestDto {
  hash: string;
  @ApiProperty()
  email: string;
  status: InviteStatus;
  date: Date;
}
