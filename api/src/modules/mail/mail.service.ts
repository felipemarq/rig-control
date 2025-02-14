import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateOccurrenceActionDto } from '../occurrence-actions/dto/create-occurrence-action.dto';
import { occurrenceSeverityTranslation } from './utils/occurrenceSeverityTranslation';
import { natureTranslation } from './utils/natureTranslation';
import { occurrenceTypeTranslation } from './utils/occurrenceTypeTranslation';
import { CreateOcurrenceDto } from '../ocurrences/dto/create-ocurrence.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private getTranslation<T extends { value: string; label: string }>(
    value: string | null | undefined,
    translationArray: T[],
  ): string {
    return (
      translationArray.find((item) => value === item.value)?.label ||
      'Não especificado'
    );
  }

  async sendOccurrenceAcidentEmail(createOcurrenceDto: CreateOcurrenceDto) {
    const severityLabel = this.getTranslation(
      createOcurrenceDto.severity,
      occurrenceSeverityTranslation,
    );
    const typeLabel = this.getTranslation(
      createOcurrenceDto.type,
      occurrenceTypeTranslation,
    );
    const natureLabel = this.getTranslation(
      createOcurrenceDto.nature,
      natureTranslation,
    );

    await this.sendEmail(
      ['oswaldo@conterp.com.br'], // Lista de destinatários
      `Notificação de Ocorrência de Acidente - ${createOcurrenceDto.title}`, // Assunto do e-mail
      `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ocorrência de Acidente</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .header {
                    background-color: #b71c1c;
                    color: #ffffff;
                    text-align: center;
                    padding: 20px;
                    font-size: 20px;
                    font-weight: bold;
                }
                .content {
                    padding: 20px;
                    line-height: 1.6;
                }
                .content p {
                    margin: 10px 0;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    Notificação de Ocorrência de Acidente
                </div>
                <div class="content">
                    <p>Prezado Oswaldo,</p>
                    <p>Uma nova ocorrência de acidente foi registrada. Seguem os detalhes:</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #333;">Detalhes da Ocorrência</h3>
                        <p style="margin: 0;"><strong>Título:</strong> ${
                          createOcurrenceDto.title
                        }</p>
                        <p style="margin: 0;"><strong>Data:</strong> ${new Date(
                          createOcurrenceDto.date,
                        ).toLocaleDateString()}</p>
                        <p style="margin: 0;"><strong>Hora:</strong> ${new Date(
                          createOcurrenceDto.hour,
                        ).toLocaleTimeString()}</p>
                        <p style="margin: 0;"><strong>Estado:</strong> ${
                          createOcurrenceDto.state
                        }</p>
                        <p style="margin: 0;"><strong>Descrição:</strong> ${
                          createOcurrenceDto.description
                        }</p>
                        <p style="margin: 0;"><strong>Gravidade:</strong> ${severityLabel}</p>
                        <p style="margin: 0;"><strong>Tipo:</strong> ${typeLabel}</p>
                        <p style="margin: 0;"><strong>Natureza:</strong> ${natureLabel}</p>
                        <p style="margin: 0;"><strong>Funcionário Ausente:</strong> ${
                          createOcurrenceDto.isAbsent ? 'Sim' : 'Não'
                        }</p>
                    </div>
                    <p style="color: #555;">
                        Esta é uma notificação automática sobre ocorrências de acidente. Para mais informações, entre em contato.
                    </p>
                </div>
                <div class="footer">
                    <p>Este é um e-mail automático. Por favor, não responda.</p>
                    <p>&copy; ${new Date().getFullYear()} Rig Manager. Todos os direitos reservados.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    );
  }

  async sendOccurrenceActionEmail(
    occurrenceAction: CreateOccurrenceActionDto,
    occurrence: {
      id: string;
      title: string;
      date: Date;
      state: string;
      hour: Date;
      description: string;
      category: string;
      severity: string | null;
      type: string;
      nature: string;
    },
  ) {
    const severityLabel = this.getTranslation(
      occurrence.severity,
      occurrenceSeverityTranslation,
    );
    const typeLabel = this.getTranslation(
      occurrence.type,
      occurrenceTypeTranslation,
    );
    const natureLabel = this.getTranslation(
      occurrence.nature,
      natureTranslation,
    );

    await this.mailerService.sendMail({
      to: occurrenceAction.responsibleEmail, // lista de destinatários
      subject: 'Nova Ação Vinculada a Você', // Assunto do e-mail
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #4CAF50;">Olá, ${occurrenceAction.responsible}!</h2>
        <p>Você foi vinculado a uma nova ação no sistema:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Detalhes do Plano de Ação</h3>
          <p style="margin: 0;"><strong>Título:</strong> ${
            occurrenceAction.title
          }</p>
          <p style="margin: 0;"><strong>Data de Vencimento:</strong> ${new Date(
            occurrenceAction.dueDate,
          ).toLocaleDateString()}</p>       
          <p style="margin: 0;"><strong>Status:</strong> ${
            occurrenceAction.isFinished ? 'Concluído' : 'Pendente'
          }</p>
        </div>

        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Detalhes do BDO</h3>
          <p style="margin: 0;"><strong>Título:</strong> ${occurrence.title}</p>
          <p style="margin: 0;"><strong>Data:</strong> ${new Date(
            occurrence.date,
          ).toLocaleDateString()}</p>
          <p style="margin: 0;"><strong>Hora:</strong> ${new Date(
            occurrence.hour,
          ).toLocaleTimeString()}</p>
          <p style="margin: 0;"><strong>Estado:</strong> ${occurrence.state}</p>
          <p style="margin: 0;"><strong>Descrição:</strong> ${
            occurrence.description
          }</p>
          <p style="margin: 0;"><strong>Categoria:</strong> ${
            occurrence.category || 'Sem categoria'
          }</p>
          <p style="margin: 0;"><strong>Gravidade:</strong> ${
            severityLabel || 'Não especificado'
          }</p>
          <p style="margin: 0;"><strong>Tipo:</strong> ${
            typeLabel || 'Não especificado'
          }</p>
          <p style="margin: 0;"><strong>Natureza:</strong> ${
            natureLabel || 'Não especificado'
          }</p>
        </div>
        
        <p style="color: #555;">
          Acesse o sistema para ver mais detalhes e acompanhar o progresso da ação e do BDO.
          Se precisar de mais informações, entre em contato conosco.
        </p>

        <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
          <p>Este é um e-mail automático, por favor, não responda.</p>
          <p>&copy; ${new Date().getFullYear()} Info Conterp. Todos os direitos reservados.</p>
        </footer>
      </div>
    `,
    });
  }

  async sendUpdateOccurrenceActionEmail(
    occurrenceAction: CreateOccurrenceActionDto,
    occurrence: {
      id: string;
      title: string;
      date: Date;
      state: string;
      hour: Date;
      description: string;
      category: string;
      severity: string | null;
      type: string;
      nature: string;
    },
  ) {
    const severityLabel = this.getTranslation(
      occurrence.severity,
      occurrenceSeverityTranslation,
    );
    const typeLabel = this.getTranslation(
      occurrence.type,
      occurrenceTypeTranslation,
    );
    const natureLabel = this.getTranslation(
      occurrence.nature,
      natureTranslation,
    );
    await this.mailerService.sendMail({
      to: occurrenceAction.responsibleEmail, // lista de destinatários
      subject: 'Ação Editada Vinculada a Você', // Assunto do e-mail
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #4CAF50;">Olá, ${occurrenceAction.responsible}!</h2>
          <p>Você foi vinculado a uma nova ação no sistema:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Detalhes do Plano de Ação</h3>
            <p style="margin: 0;"><strong>Título:</strong> ${
              occurrenceAction.title
            }</p>
            <p style="margin: 0;"><strong>Data de Vencimento:</strong> ${new Date(
              occurrenceAction.dueDate,
            ).toLocaleDateString()}</p>       
            <p style="margin: 0;"><strong>Status:</strong> ${
              occurrenceAction.isFinished ? 'Concluído' : 'Pendente'
            }</p>
          </div>

          <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Detalhes do BDO</h3>
            <p style="margin: 0;"><strong>Título:</strong> ${
              occurrence.title
            }</p>
            <p style="margin: 0;"><strong>Data:</strong> ${new Date(
              occurrence.date,
            ).toLocaleDateString()}</p>
            <p style="margin: 0;"><strong>Hora:</strong> ${new Date(
              occurrence.hour,
            ).toLocaleTimeString()}</p>
            <p style="margin: 0;"><strong>Estado:</strong> ${
              occurrence.state
            }</p>
            <p style="margin: 0;"><strong>Descrição:</strong> ${
              occurrence.description
            }</p>
            <p style="margin: 0;"><strong>Categoria:</strong> ${
              occurrence.category || 'Sem categoria'
            }</p>
            <p style="margin: 0;"><strong>Gravidade:</strong> ${
              severityLabel || 'Não especificado'
            }</p>
            <p style="margin: 0;"><strong>Tipo:</strong> ${
              typeLabel || 'Não especificado'
            }</p>
            <p style="margin: 0;"><strong>Natureza:</strong> ${
              natureLabel || 'Não especificado'
            }</p>
          </div>
          
          <p style="color: #555;">
            Acesse o sistema para ver mais detalhes e acompanhar o progresso da ação e do BDO.
            Se precisar de mais informações, entre em contato conosco.
          </p>

          <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
            <p>Este é um e-mail automático, por favor, não responda.</p>
            <p>&copy; ${new Date().getFullYear()} Rig Manager. Todos os direitos reservados.</p>
          </footer>
        </div>
      `,
    });
  }

  async sendEmail(email: string[], subject: string, html: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      html: html,
    });
  }
}
