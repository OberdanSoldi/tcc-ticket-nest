import { Injectable, Logger } from '@nestjs/common';
import { SendEmailFailException } from '../exceptions/SendEmailFailException';
import { emailPayloadGenerator } from '../util/EmailPayloadGenerator';
import * as sendgridEmail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger();
  async sendEMail(email: string, hash: string) {
    try {
      const payload = emailPayloadGenerator.createPayload(email, hash);
      await sendgridEmail.send(payload);
    } catch (ex) {
      this.logger.error(`Error on ${MailService.name}, EX: ${ex}`);
      throw new SendEmailFailException();
    }
  }
}
