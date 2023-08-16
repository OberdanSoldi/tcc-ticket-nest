import { HttpException, HttpStatus } from '@nestjs/common';

export class InviteHasAlreadyBeenUsedException extends HttpException {
  constructor() {
    super('The invite has already been used', HttpStatus.UNAUTHORIZED, {
      cause: new Error('The invite has already been used'),
      description: 'The invite has already been used',
    });
  }
}
