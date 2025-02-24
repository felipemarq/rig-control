import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { differenceInMinutes } from 'date-fns';
import { EfficienciesRepository } from 'src/shared/database/repositories/efficiencies.repositories';
import { PeriodsRepository } from 'src/shared/database/repositories/period.repositories';
import { RigsRepository } from 'src/shared/database/repositories/rigs.repositories';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import { translateClassification } from 'src/shared/utils/translateClassifications';
import { EfficienciesService } from '../efficiencies/efficiencies.service';
@Injectable()
export class ExcelService {
  constructor(
    private readonly efficiencyRepo: EfficienciesRepository,
    private readonly userRigsRepo: UsersRigRepository,
    private readonly rigsRepo: RigsRepository,
    private readonly periodsRepo: PeriodsRepository,
    private readonly efficiencyService: EfficienciesService,
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
      /*

      if (period.type === 'DTM') {
        let updatedAcc = acc.map((accItem) =>
          accItem.rigId === period.efficiency.rigId
            ? {
                ...accItem,
                totalDtms: accItem.totalDtms + 1,
              }
            : accItem,
        );

        if (period.classification === 'LT20') {
            updatedAcc = acc.map((accItem) =>
              accItem.rigId === period.efficiency.rigId
                ? {
                    ...accItem,
                    dtmLt20TotalAmmount: accItem.dtmLt20TotalAmmount + 1,
                    dtmLt20TotalHours:
                      accItem.dtmLt20TotalHours + Number((diffInMinutes / 60).toFixed(2)),
                  }
                : accItem,
            );
            return updatedAcc;
          }

          if (period.classification === 'BT20AND50') {
            updatedAcc = acc.map((accItem) =>
              accItem.rigId === period.efficiency.rigId
                ? {
                    ...accItem,
                    dtmBt20and50TotalAmmout: accItem.dtmBt20and50TotalAmmout + 1,
                    dtmLt20TotalHours:
                      accItem.dtmBt20And50TotalHours + Number((diffInMinutes / 60).toFixed(2)),
                  }
                : accItem,
            );
            return updatedAcc;
          }

          if (period.classification === 'GT50') {
            updatedAcc = acc.map((accItem) =>
              accItem.rigId === period.efficiency.rigId
                ? {
                    ...accItem,
                    dtmGt50TotalAmount: accItem.dtmGt50TotalAmount + 1,
                    dtmGt50TotalHours:
                      accItem.dtmBt20And50TotalHours + Number((diffInMinutes / 60).toFixed(2)),
                  }
                : accItem,
            );
            return updatedAcc;
          }
        
        return updatedAcc;
      }
        */

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

  async getRigsAvailableHoursAverage(filters: {
    startDate: string;
    endDate: string;
    userId: string;
  }) {}
}
