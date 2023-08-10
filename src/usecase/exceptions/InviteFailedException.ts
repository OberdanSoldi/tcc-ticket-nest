import { HttpException, HttpStatus } from '@nestjs/common';

export class InviteFailedException extends HttpException {
  constructor() {
    super('Invite fail', HttpStatus.BAD_REQUEST, {
      cause: new Error('Fail invite attempt'),
      description: 'Fail invite attempt',
    });
  }
}
