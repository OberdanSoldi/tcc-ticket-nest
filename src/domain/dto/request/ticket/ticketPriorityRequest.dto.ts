import { Priority } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TicketPriorityRequestDto {
  @ApiProperty()
  priority: Priority;
}
