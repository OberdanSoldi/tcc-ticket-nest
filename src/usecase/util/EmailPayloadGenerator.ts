import { EmailPayload } from '../../domain/@types/EmailPayload';
import * as process from 'process';

class EmailPayloadGenerator {
  private from_email: string = process.env.FROM_EMAIL;

  private generate(email: string, hash: string): string {
    return `
      <strong>${email} | ${hash}</strong>
    `;
  }
  public createPayload(email: string, hash: string): EmailPayload {
    return {
      to: email,
      from: this.from_email,
      subject: 'Invite',
      text: 'Invite',
      html: this.generate(email, hash),
    };
  }
}
export const emailPayloadGenerator = new EmailPayloadGenerator();
