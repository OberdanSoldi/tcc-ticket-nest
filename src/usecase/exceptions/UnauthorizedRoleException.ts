import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedRoleException extends HttpException {
  constructor() {
    super('Permission denied', HttpStatus.FORBIDDEN, {
      cause: new Error('Insufficient role permission'),
      description: 'Insufficient role permission',
    });
  }
}
