import { PeriodClassification } from 'src/modules/efficiencies/entities/PeriodClassification';
import { RepairClassification } from 'src/modules/efficiencies/entities/RepairClassification';
import { formatDate } from 'src/shared/utils/formatDate';
import { translateClassification } from 'src/shared/utils/translateClassifications';
import { translateRepairClassification } from 'src/shared/utils/translateRepairClassification';

export const repairHTMLEmailTemplateString = ({
  rig,
  date,
  classification,
  diffInMinutes,
  repairClassification,
}: {
  rig: any;
  date: string;
  classification: PeriodClassification;
  diffInMinutes: number;
  repairClassification: RepairClassification;
}) => {
  return `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Reparo de Equipamento</title>
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
                              background-color: #1c7b7b;
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
                              Notificação de Reparo de Equipamento
                          </div>
                          <div class="content">
                              <p>Prezado,</p>
                              <p>Foi identificado um reparo em um dos equipamentos. Seguem os detalhes:</p>
                              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                  <h3 style="margin-top: 0; color: #333;">Detalhes do Reparo</h3>
                                  <p style="margin: 0;"><strong>Sonda:</strong> ${
                                    rig.name
                                  }</p>
                                  <p style="margin: 0;"><strong>Dia:</strong> ${formatDate(
                                    new Date(date),
                                  )}</p>
                                  <p style="margin: 0;"><strong>Parte do Equipamento:</strong> ${translateClassification(
                                    classification,
                                  )}</p>
                                  <p style="margin: 0;"><strong>Parte Quebrada:</strong> ${translateRepairClassification(
                                    repairClassification,
                                  )}</p>
                                  <p style="margin: 0;"><strong>Tempo de Parada:</strong> ${(
                                    diffInMinutes / 60
                                  ).toFixed(2)} Hrs</p>
                              </div>
                              <p style="color: #555;">
                                  Esta é uma notificação padrão sobre os reparos em andamento.
                              </p>
                          </div>
                          <div class="footer">
                              <p>Este é um e-mail automático. Por favor, não responda.</p>
                              <p>&copy; ${new Date().getFullYear()} Rig Manager. Todos os direitos reservados.</p>
                          </div>
                      </div>
                  </body>
                  </html>
                `;
};
