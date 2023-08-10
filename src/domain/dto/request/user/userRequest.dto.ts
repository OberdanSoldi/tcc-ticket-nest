import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserRequestDto {
  @ApiProperty({ enum: Role })
  role: Role;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
