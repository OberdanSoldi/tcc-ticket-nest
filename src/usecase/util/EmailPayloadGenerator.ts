import * as process from 'process';
import type { EmailPayload } from '../../domain/@types/EmailPayload';
import type { TemplateModel } from '../../domain/@types/EmailTemplateType';
import { createHtml } from './CreteHtmlString';

class EmailPayloadGenerator {
  private from_email: string = process.env.FROM_EMAIL;

  private generateHtmlToInvite(
    hash: string,
    templateModel: TemplateModel,
  ): string {
    return createHtml('Convite de Acesso', hash, templateModel);
  }

  private generateHtmlToResetPassword(
    hash: string,
    templateModel: TemplateModel,
  ): string {
    return createHtml('Troca de senha', hash, templateModel);
  }

  public createPayload(
    email: string,
    hash: string,
    type: TemplateModel,
  ): EmailPayload {
    switch (type) {
      case 'ResetPassword':
        const resetPasswordPayload = {
          to: email,
          from: this.from_email,
          subject: 'Troca de senha',
          text: 'Troca de senha',
          html: this.generateHtmlToResetPassword(hash, type),
        };
        return resetPasswordPayload;
      case 'Invite':
        const invitePayload = {
          to: email,
          from: this.from_email,
          subject: 'Convite de Acesso',
          text: 'Convite de Acesso',
          html: this.generateHtmlToInvite(hash, type),
        };
        return invitePayload;
    }
  }
}
export const emailPayloadGenerator = new EmailPayloadGenerator();
