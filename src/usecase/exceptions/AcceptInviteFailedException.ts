import { HttpException, HttpStatus } from '@nestjs/common';

export class AcceptInviteFailedException extends HttpException {
  constructor() {
    super('Fail to accept invite', HttpStatus.BAD_REQUEST, {
      cause: new Error('Fail to accept invite'),
      description: 'Fail to accept invite',
    });
  }
}
