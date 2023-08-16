import { HttpException, HttpStatus } from '@nestjs/common';

export class InviteNotFoundException extends HttpException {
  constructor() {
    super('Invite not found', HttpStatus.NOT_FOUND, {
      cause: new Error('Invite not found'),
      description: 'Invite not found',
    });
  }
}
