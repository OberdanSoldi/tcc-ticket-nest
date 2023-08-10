import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendEMail(email: string, hash: string) {
    //TODO: Create a method to send email to user with sendgrid
    console.log(email, hash);
  }
}
