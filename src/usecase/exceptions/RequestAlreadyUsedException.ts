import { HttpException, HttpStatus } from '@nestjs/common';

export class RequestAlreadyUsedException extends HttpException {
  constructor() {
    super('Request already used', HttpStatus.CONFLICT, {
      cause: new Error('Request already used'),
      description: 'Request already used',
    });
  }
}
