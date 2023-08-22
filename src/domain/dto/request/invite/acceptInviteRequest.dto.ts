import { ApiProperty } from '@nestjs/swagger';

export class AcceptInviteRequestDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
}
