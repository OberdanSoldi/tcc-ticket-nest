import { Injectable, Logger } from '@nestjs/common';
import { SendEmailFailException } from '../exceptions/SendEmailFailException';
import { emailPayloadGenerator } from '../util/EmailPayloadGenerator';
import * as sendgridEmail from '@sendgrid/mail';
import type { TemplateModel } from '../../domain/@types/EmailTemplateType';

@Injectable()
export class MailService {
  private readonly logger = new Logger();
  async sendEMail(email: string, hash: string, type: TemplateModel) {
    try {
      const payload = emailPayloadGenerator.createPayload(email, hash, type);
      await sendgridEmail.send(payload);
    } catch (ex) {
      this.logger.error(`Error on ${MailService.name}, EX: ${ex}`);
      throw new SendEmailFailException();
    }
  }
}
