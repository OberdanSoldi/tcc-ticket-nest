import { HttpException, HttpStatus } from '@nestjs/common';

export class FailCreateTicketException extends HttpException {
  constructor() {
    super('Fail to create ticket', HttpStatus.BAD_REQUEST, {
      cause: new Error('Fail to create ticket'),
      description: 'Fail to create ticket',
    });
  }
}
