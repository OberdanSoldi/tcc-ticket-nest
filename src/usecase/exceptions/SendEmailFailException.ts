import { HttpException, HttpStatus } from '@nestjs/common';

export class SendEmailFailException extends HttpException {
  constructor() {
    super('Send invite email failed', HttpStatus.BAD_REQUEST, {
      cause: new Error('Send invite email failed'),
      description: 'Send invite email failed',
    });
  }
}
