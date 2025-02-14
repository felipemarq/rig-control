import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodsRepository } from 'src/shared/database/repositories/period.repositories';
import { RepairClassification } from '../efficiencies/entities/RepairClassification';
import { PeriodType } from '../efficiencies/entities/PeriodType';
import { OrderByType } from './entities/OrderByType';
import { PeriodClassification } from '../efficiencies/entities/PeriodClassification';
import { UsersRigRepository } from 'src/shared/database/repositories/usersRig.repositories';
import { EfficienciesRepository } from 'src/shared/database/repositories/efficiencies.repositories';
import { differenceInMinutes } from 'date-fns';

@Injectable()
export class PeriodsService {
  constructor(
    private readonly periodsRepo: PeriodsRepository,
    private readonly efficienciesRepo: EfficienciesRepository,
    private readonly userRigsRepo: UsersRigRepository,
  ) {}

  create(createPeriodDto: CreatePeriodDto) {
    return 'This action adds a new period';
  }

  async findOne(periodId: string) {
    const period = await this.periodsRepo.findUnique({
      where: {
        id: periodId,
      },
    });
    return period;
  }

  async findByPeriodType(
    rigId: string,
    periodType: PeriodType,
    periodClassification: PeriodClassification | null,
    repairClassification: RepairClassification | null,
    orderBy: OrderByType,
    startDate: string,
    endDate: string,
    pageSize: string,
    pageIndex: string,
    searchTerm: string,
  ) {
    let whereClause = {};

    whereClause = {
      efficiency: {
        date: { gte: new Date(startDate), lte: new Date(endDate) },
      },
    };

    if (rigId) {
      whereClause['efficiency'] = { ...whereClause['efficiency'], rigId };
    }

    if (searchTerm) {
      whereClause = {
        ...whereClause,
        description: { contains: searchTerm, mode: 'insensitive' },
      };
    }

    if (periodType) {
      whereClause = {
        ...whereClause,
        type: periodType,
      };
    }

    if (periodClassification) {
      whereClause = {
        ...whereClause,
        classification: periodClassification,
      };
    }

    if (repairClassification) {
      whereClause = {
        ...whereClause,
        repairClassification: repairClassification,
      };
    }

    console.log('totalItems', whereClause);
    const totalItems = await this.periodsRepo.count({
      where: whereClause,
    });

    console.log('totalItems', totalItems);

    const periods = await this.periodsRepo.findMany({
      where: whereClause,
      orderBy: { efficiency: { date: orderBy } },
      skip: (Number(pageIndex) - 1) * Number(pageSize),
      take: Number(pageSize),
      include: { efficiency: {} },
    });

    return { data: periods, totalItems };
  }

  async getUnbilledPeriods(filters: {
    startDate: string;
    endDate: string;
    userId: string;
  }) {
    if (!filters.startDate || !filters.endDate) {
      throw new BadRequestException('Datas são necessárias');
    }

    const usersRigs = await this.userRigsRepo.findMany({
      where: { userId: filters.userId },
    });

    const unbilledPeriods = await this.periodsRepo.findMany({
      where: {
        efficiency: {
          date: {
            gte: new Date(filters.startDate),
            lte: new Date(filters.endDate),
          },
        },
        OR: [
          { type: 'GLOSS' },
          { type: 'REPAIR' },
          { type: 'COMMERCIALLY_STOPPED' },
          { classification: 'UNBILLED_SCHEDULED_STOP' },
        ],
      },
      include: { efficiency: { include: { rig: true } } },
    });

    let filteredPeriods = [];

    if (usersRigs.length > 0) {
      //@ts-ignore
      filteredPeriods = unbilledPeriods.filter(({ efficiency }) => {
        return usersRigs.find(
          ({ rigId: userRigId }) => userRigId === efficiency.rig.id,
        );
      });
    }

    return filteredPeriods;
  }

  async getTotalInterventions(filters: { startDate: string; endDate: string }) {
    const efficiencies = await this.efficienciesRepo.findMany({
      where: {
        date: {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate),
        },
      },
      include: {
        periods: {
          where: {
            type: 'DTM',
          },
        },
        rig: true, // Incluímos a informação da sonda associada
      },
    });

    // Objeto para armazenar os resultados agrupados por sonda
    const dtmDaysByRig: Record<string, Set<string>> = {};

    efficiencies.forEach((efficiency) => {
      // Verificar se há ao menos um período com tipo DTM
      //@ts-ignore
      if (efficiency.periods.length > 0) {
        //@ts-ignore
        const rigName = efficiency.rig.name; // Nome da sonda
        const efficiencyDate = efficiency.date.split('T')[0]; // Data da eficiência (sem horário)

        // Inicializar o conjunto para a sonda, caso ainda não exista
        if (!dtmDaysByRig[rigName]) {
          dtmDaysByRig[rigName] = new Set();
        }

        // Adicionar a data ao conjunto da sonda
        dtmDaysByRig[rigName].add(efficiencyDate);
      }
    });

    // Transformar o resultado em um formato mais legível
    const result = Object.entries(dtmDaysByRig).map(([rig, dates]) => ({
      rig,
      dtmDays: dates.size, // Quantidade de dias únicos
    }));

    // Array para salvar as datas das eficiências que atendem ao critério
    const daysWithDTM = new Set<string>();

    efficiencies.forEach((efficiency) => {
      // Verificar se há ao menos um período com tipo DTM
      //@ts-ignore
      if (efficiency.periods.length > 0) {
        // Extrair a data da eficiência (ignorando o horário)
        const efficiencyDate = efficiency.date.split('T')[0];
        daysWithDTM.add(efficiencyDate); // Adicionar ao conjunto de dias únicos
      }
    });
  }

  update(id: number, updatePeriodDto: UpdatePeriodDto) {
    return `This action updates a #${id} period`;
  }

  remove(id: number) {
    return `This action removes a #${id} period`;
  }
}
