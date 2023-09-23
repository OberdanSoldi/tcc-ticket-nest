import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotFindPasswordRequestException extends HttpException {
  constructor() {
    super('Cannot find password request', HttpStatus.NOT_FOUND, {
      cause: new Error('Cannot find password request'),
      description: 'Cannot find password request',
    });
  }
}
