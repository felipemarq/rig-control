import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateOccurrenceActionDto } from '../occurrence-actions/dto/create-occurrence-action.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

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
            <h3 style="margin-top: 0; color: #333;">Detalhes da Ocorrência</h3>
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
              occurrence.category
            }</p>
            <p style="margin: 0;"><strong>Gravidade:</strong> ${
              occurrence.severity || 'Não especificado'
            }</p>
            <p style="margin: 0;"><strong>Tipo:</strong> ${occurrence.type}</p>
            <p style="margin: 0;"><strong>Natureza:</strong> ${
              occurrence.nature
            }</p>
          </div>
          
          <p style="color: #555;">
            Acesse o sistema para ver mais detalhes e acompanhar o progresso da ação e da ocorrência.
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
}
