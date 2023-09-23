import * as process from 'process';
import type { EmailPayload } from '../../domain/@types/EmailPayload';
import type { TemplateModel } from '../../domain/@types/EmailTemplateType';

class EmailPayloadGenerator {
  private from_email: string = process.env.FROM_EMAIL;

  private generateHtml(email: string, hash: string): string {
    return `
      <strong>${email} | ${hash}</strong>
    `;
  }
  public createPayload(
    email: string,
    hash: string,
    type: TemplateModel,
  ): EmailPayload {
    const invitePayload = {
      to: email,
      from: this.from_email,
      subject: 'Invite',
      text: 'Invite',
      html: this.generateHtml(email, hash),
    };

    const resetPasswordPayload = {
      to: email,
      from: this.from_email,
      subject: 'Reset Password',
      text: 'Reset Password',
      html: this.generateHtml(email, hash),
    };

    switch (type) {
      case 'ResetPassword':
        return resetPasswordPayload;
      case 'Invite':
        return invitePayload;
    }
  }
}
export const emailPayloadGenerator = new EmailPayloadGenerator();
