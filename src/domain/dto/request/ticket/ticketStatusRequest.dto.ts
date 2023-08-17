import { Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TicketStatusRequestDto {
  @ApiProperty()
  status: Status;
}
