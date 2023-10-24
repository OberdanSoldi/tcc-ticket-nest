import * as process from 'process';
import type { EmailPayload } from '../../domain/@types/EmailPayload';
import type { TemplateModel } from '../../domain/@types/EmailTemplateType';

class EmailPayloadGenerator {
  private from_email: string = process.env.FROM_EMAIL;

  private generateHtmlToInvite(email: string, hash: string): string {
    return `
    
    `;
  }

  private generateHtmlToResetPassword(email: string, hash: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Convite</title>
    </head>
    
    <body>
        <table style="text-align: center;width: 500px;border-collapse: collapse;background-color: #202024;">
            <tr>
                <td style="text-align: center;border-left: 1px solid;border-right: 1px solid;">
                </td>
            </tr>
    
            <tr>
                <td style="text-align: center;border-left: 1px solid;border-right: 1px solid;">
                    <table class="thead backColor" style="text-align: center;width: 500px;border-collapse: collapse;background-color: #202024;">
                        <tr>
                            <td style="text-align: center;border-left: 1px solid;border-right: 1px solid;">
                                <img src="https://i.imgur.com/ZO7nLFT.png" alt="">
                            </td>
                        </tr>
                    </table>
                    <table class="tbody backColor" style="text-align: center;width: 500px;border-collapse: collapse;background-color: #202024;">
                        <tr>
                            <td style="text-align: center;border-left: 1px solid;border-right: 1px solid;">
                                <hr style="width: 300px;border: 1px solid rgba(193, 193, 204, 0.5);">
                                <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif;">Convite de Acesso</h1>
                                <button style="font-family: Arial, Helvetica, sans-serif;font-weight: bold;padding: 15px 100px;color: #FFFFFF;background-color: #8257E5;border: 0px;border-radius: 10px;margin-bottom: 10px;"><a style="outline: none; color: #fff; text-decoration: none;" href="http://localhost:3000/auth/reset-password/${hash}">Acessar</a></button>
                                <hr style="width: 300px;border: 1px solid rgba(193, 193, 204, 0.5);">
                            </td>
                        </tr>
                    </table>
                    <table class="tfooter backColor" style="text-align: center;width: 500px;border-collapse: collapse;background-color: #202024;">
                        <tr>
                            <td style="text-align: center;border-left: 1px solid;border-right: 1px solid;">
                                <p style="font-family: 'Montserrat', sans-serif;padding-right: 88px;padding-left: 88px;color: #FFFFFF;opacity: 75%;">Ticket Manager é um software de gerenciamento de chamados de manutenção</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
    
            <tr>
                <td style="text-align: center;border-left: 1px solid;border-right: 1px solid;">
    
                </td>
            </tr>
    
        </table>
    </body>
    
    </html>
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
      html: this.generateHtmlToInvite(email, hash),
    };

    const resetPasswordPayload = {
      to: email,
      from: this.from_email,
      subject: 'Reset Password',
      text: 'Reset Password',
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
