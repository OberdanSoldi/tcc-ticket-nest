import { HttpException, HttpStatus } from '@nestjs/common';

export class FailChangeTicketException extends HttpException {
  constructor(message: string, httpStatus: HttpStatus) {
    super(message, httpStatus, {
      cause: new Error(message),
      description: message,
    });
  }
}
