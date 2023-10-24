import * as process from 'process';
import type { EmailPayload } from '../../domain/@types/EmailPayload';
import type { TemplateModel } from '../../domain/@types/EmailTemplateType';
import { createHtml } from './CreteHtmlString';

class EmailPayloadGenerator {
  private from_email: string = process.env.FROM_EMAIL;

  private generateHtmlToInvite(email: string, hash: string): string {
    return createHtml('Convite de Acesso', hash);
  }

  private generateHtmlToResetPassword(email: string, hash: string): string {
    return createHtml('Troca de senha', hash);
  }

  public createPayload(
    email: string,
    hash: string,
    type: TemplateModel,
  ): EmailPayload {
    const invitePayload = {
      to: email,
      from: this.from_email,
      subject: 'Convite de Acesso',
      text: 'Convite de Acesso',
      html: this.generateHtmlToInvite(email, hash),
    };

    const resetPasswordPayload = {
      to: email,
      from: this.from_email,
      subject: 'Troca de senha',
      text: 'Troca de senha',
      html: this.generateHtmlToResetPassword(email, hash),
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
