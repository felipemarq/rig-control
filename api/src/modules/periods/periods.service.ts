import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodsRepository } from 'src/shared/database/repositories/period.repositories';
import { RepairClassification } from '../efficiencies/entities/RepairClassification';
import { PeriodType } from '../efficiencies/entities/PeriodType';
import { OrderByType } from './entities/OrderByType';
import { PeriodClassification } from '../efficiencies/entities/PeriodClassification';

@Injectable()
export class PeriodsService {
  constructor(private readonly periodsRepo: PeriodsRepository) {}
  create(createPeriodDto: CreatePeriodDto) {
    return 'This action adds a new period';
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
      startHour: { gte: new Date(startDate) },
      endHour: { lte: new Date(endDate) },
      efficiency: { rigId: rigId },
    };

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
    const totalItems = await this.periodsRepo.count({
      where: whereClause,
    });

    const periods = await this.periodsRepo.findMany({
      where: whereClause,
      orderBy: { startHour: orderBy },
      skip: (Number(pageIndex) - 1) * Number(pageSize),
      take: Number(pageSize),
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

    const res = await this.periodsRepo.findMany({
      where: {
        efficiency: {
          date: {
            gte: new Date(filters.startDate),
            lte: new Date(filters.endDate),
          },
        },
        OR: [{ type: 'GLOSS' }, { type: 'REPAIR' }],
      },
      include: { efficiency: { include: { rig: true } } },
    });

    console.log(res);

    return res;
  }

  update(id: number, updatePeriodDto: UpdatePeriodDto) {
    return `This action updates a #${id} period`;
  }

  remove(id: number) {
    return `This action removes a #${id} period`;
  }
}
