import { ApiProperty } from '@nestjs/swagger';

export class TicketAssigneeRequestDto {
  @ApiProperty()
  assignee_id: string;
}
