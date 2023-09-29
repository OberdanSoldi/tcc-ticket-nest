import { HttpException, HttpStatus } from '@nestjs/common';

export class FailDeleteTicketException extends HttpException {
  constructor() {
    super('Fail to delete ticket', HttpStatus.BAD_REQUEST, {
      cause: new Error('Fail to delete ticket'),
      description: 'Fail to delete ticket',
    });
  }
}
