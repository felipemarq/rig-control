import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateOccurrenceActionDto } from '../occurrence-actions/dto/create-occurrence-action.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOccurrenceActionEmail(
    occurrenceAction: CreateOccurrenceActionDto,
    to: string,
  ) {
    await this.mailerService.sendMail({
      to: to, // lista de destinatários
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
            <p style="margin: 0;"><strong>Descrição:</strong> ${
              occurrenceAction.description ||
              'Não foi fornecida uma descrição para esta ação.'
            }</p>
            <p style="margin: 0;"><strong>Status:</strong> ${
              occurrenceAction.isFinished ? 'Concluído' : 'Pendente'
            }</p>
          </div>
          
          <p style="color: #555;">
            Acesse o sistema para ver mais detalhes e acompanhar o progresso da ação. 
            Se precisar de mais informações, entre em contato conosco.
          </p>

          <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
            <p>Este é um e-mail automático, por favor, não responda.</p>
            <p>&copy; ${new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.</p>
          </footer>
        </div>
      `,
    });
  }
}
