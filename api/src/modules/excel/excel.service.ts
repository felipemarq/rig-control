import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { differenceInMinutes, parse } from 'date-fns';
import { EfficienciesRepository } from 'src/shared/database/repositories/efficiencies.repositories';
import { PeriodsRepository } from 'src/shared/database/repositories/period.repositories';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import { translateClassification } from 'src/shared/utils/translateClassifications';
import { EfficienciesService } from '../efficiencies/efficiencies.service';
import { PeriodsService } from '../periods/periods.service';
import { PeriodType } from '../efficiencies/entities/PeriodType';
import { PeriodClassification } from '../efficiencies/entities/PeriodClassification';
import { RepairClassification } from '../efficiencies/entities/RepairClassification';
import { OrderByType } from '../periods/entities/OrderByType';
import { getDiffInMinutes } from 'src/shared/utils/getDiffInMinutes';
import { formatIsoStringToHours } from 'src/shared/utils/formatIsoStringToHours';
import { translateRepairClassification } from 'src/shared/utils/translateRepairClassification';
import { translateType } from 'src/shared/utils/translateType';
@Injectable()
export class ExcelService {
  constructor(
    private readonly efficiencyRepo: EfficienciesRepository,
    private readonly userRigsRepo: UsersRigRepository,
    private readonly rigsRepo: RigsRepository,
    private readonly periodsRepo: PeriodsRepository,
    private readonly efficiencyService: EfficienciesService,
    private readonly periodsService: PeriodsService,
  ) {}

  async getAllRigsReport(
    filters: {
      startDate: string;
      endDate: string;
      userId: string;
    },
    response: Response,
  ) {
    const { endDate, startDate, userId } = filters;
    if (!startDate || !endDate) {
      return [];
    }

    const rigs = await this.rigsRepo.findAll({});

    const usersRigs = await this.userRigsRepo.findMany({
      where: { userId: filters.userId },
    });

    let filteredRigs = [];

    if (usersRigs.length > 0) {
      filteredRigs = rigs.filter(({ id }) => {
        return usersRigs.find(({ rigId: userRigId }) => userRigId === id);
      });
    }

    const average = await this.efficiencyService.getRigsAvailableHoursAverage({
      endDate,
      startDate,
      userId,
    });

    console.log('average', average);

    type PeriodWithEfficiencyAndRig = Prisma.PeriodGetPayload<{
      include: {
        efficiency: {
          include: {
            rig: true;
          };
        };
      };
    }>;

    //@ts-ignore
    const periods: PeriodWithEfficiencyAndRig[] =
      await this.periodsRepo.findMany({
        where: {
          efficiency: {
            date: { gte: new Date(startDate), lte: new Date(endDate) },
          },
        },
        include: {
          efficiency: {
            include: { rig: true },
          },
        },
      });

    const result = periods.reduce((acc, period, index) => {
      const foundAccItem = acc.find(
        (acc) => acc.rigId === period.efficiency.rig.id,
      );

      const foundAvg = average.find(
        (avg) => avg.rigId === period.efficiency.rig.id,
      );

      //console.log(`index: ${index + 1} de: ${periods.length}`);

      const diffInMinutes = differenceInMinutes(
        period.endHour,
        period.startHour,
      );

      if (!foundAccItem) {
        acc.push({
          rigId: period.efficiency.rig.id,
          Sonda: period.efficiency.rig.name,
          'Eficiência (%)': Number(((foundAvg.avg / 24) * 100).toFixed(2)),
          //  'Eficiência ()': foundAvg.avg,

          'Hrs em Stand By': 0,
          'Hrs em Reparo': 0,
          'Hrs em Gloss': 0,
          'Hrs em DTM': 0,
          'Hrs em Parada Comercial': 0,
          'Hrs em Parada Programada Faturada': 0,
          'Hrs em Parada Programada Não Faturada': 0,
        });
        return acc;
      }

      if (period.type === 'COMMERCIALLY_STOPPED') {
        const updatedAcc = acc.map((accItem) =>
          accItem.rigId === period.efficiency.rigId
            ? {
                ...accItem,
                'Hrs em Parada Comercial':
                  accItem['Hrs em Parada Comercial'] +
                  Number((diffInMinutes / 60).toFixed(2)),
              }
            : accItem,
        );
        return updatedAcc;
      }

      if (
        period.type === 'SCHEDULED_STOP' &&
        period.classification === 'BILLED_SCHEDULED_STOP'
      ) {
        const updatedAcc = acc.map((accItem) =>
          accItem.rigId === period.efficiency.rigId
            ? {
                ...accItem,
                'Hrs em Parada Programada Faturada':
                  accItem['Hrs em Parada Programada Faturada'] +
                  Number((diffInMinutes / 60).toFixed(2)),
              }
            : accItem,
        );
        return updatedAcc;
      }

      if (
        period.type === 'SCHEDULED_STOP' &&
        period.classification === 'UNBILLED_SCHEDULED_STOP'
      ) {
        const updatedAcc = acc.map((accItem) =>
          accItem.rigId === period.efficiency.rigId
            ? {
                ...accItem,
                'Hrs em Parada Programada Não Faturada':
                  accItem['Hrs em Parada Programada Não Faturada'] +
                  Number((diffInMinutes / 60).toFixed(2)),
              }
            : accItem,
        );
        return updatedAcc;
      }

      if (period.type === 'STAND_BY') {
        const updatedAcc = acc.map((accItem) =>
          accItem.rigId === period.efficiency.rigId
            ? {
                ...accItem,
                'Hrs em Stand By':
                  accItem['Hrs em Stand By'] +
                  Number((diffInMinutes / 60).toFixed(2)),
              }
            : accItem,
        );
        return updatedAcc;
      }

      if (period.type === 'REPAIR') {
        const key = translateClassification(period.classification);

        return acc.map((accItem) =>
          accItem.rigId === period.efficiency.rigId
            ? {
                ...accItem,
                'Hrs em Reparo':
                  (accItem['Hrs em Reparo'] || 0) +
                  Number((diffInMinutes / 60).toFixed(2)),
                [key]:
                  (accItem[key] || 0) + Number((diffInMinutes / 60).toFixed(2)),
              }
            : accItem,
        );
      }
      return acc;
    }, []);

    console.log('result', result);

    // Criação da Planilha
    const ws = XLSX.utils.json_to_sheet(result);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');

    // Formatação Condicional (Exemplo básico de destaque de cabeçalhos)
    ws['A5'].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: '#FFFF00' } },
    }; // Exemplo de destaque no cabeçalho

    // Escreva o arquivo para o buffer
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Envie o arquivo para o cliente
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=relatorio.xlsx',
    );
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    response.send(buffer);
  }

  async getPeriodsReport(
    filters: {
      rigId: string;
      periodType: PeriodType;
      periodClassification: PeriodClassification | null;
      repairClassification: RepairClassification | null;
      orderBy: OrderByType;
      startDate: string;
      endDate: string;
      searchTerm: string;
    },
    response: Response,
  ) {
    const periods = await this.periodsService.findByPeriodType({
      ...filters,
    });

    const data = periods.data.map((period) => {
      const parsedStartHour = parse(
        period.startHour.toISOString().split('T')[1].slice(0, 5),
        'HH:mm',
        new Date(),
      );
      const parsedEndHour = parse(
        period.endHour.toISOString().split('T')[1].slice(0, 5),
        'HH:mm',
        new Date(),
      );

      return {
        'Nome da Sonda': period.efficiency?.rig?.name || '',
        Data: period.efficiency?.date
          ? new Date(period.efficiency.date).toLocaleDateString('pt-BR')
          : '',
        Poço: period.efficiency?.well || '',
        Início: formatIsoStringToHours(period.startHour.toISOString()),
        Fim: formatIsoStringToHours(period.endHour.toISOString()),
        Minutos: getDiffInMinutes(parsedEndHour, parsedStartHour),
        Tipo: translateType(period.type as PeriodType),
        Classificação: translateClassification(period.classification),
        'Classificação de Reparo':
          translateRepairClassification(
            period.repairClassification as RepairClassification,
          ) || '',
        Descrição: period.description?.replace(/\n/g, ' ') || '',
      };
    });

    // Criação da Planilha
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');

    // Escreva o arquivo para o buffer
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Envie o arquivo para o cliente
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=relatorio.xlsx',
    );
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    response.send(buffer);
  }

  async getRigsAvailableHoursAverage(filters: {
    startDate: string;
    endDate: string;
    userId: string;
  }) {}
}
