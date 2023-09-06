import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailOrPasswordIncorrectException extends HttpException {
  constructor() {
    super('Email or password incorrect', HttpStatus.NOT_FOUND, {
      cause: new Error('Email or password incorrect'),
      description: 'Email or password incorrect',
    });
  }
}
