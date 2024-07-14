import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateManHourDto } from './dto/create-man-hour.dto';
import { UpdateManHourDto } from './dto/update-man-hour.dto';
import { ManHourRepository } from 'src/shared/database/repositories/manHour.repositories';
import { BaseRepository } from 'src/shared/database/repositories/base.repositories';
import { getMonth } from 'date-fns';
import dayjs from 'dayjs';

@Injectable()
export class ManHoursService {
  constructor(
    private readonly manHoursRepo: ManHourRepository,
    private readonly basesRepo: BaseRepository,
  ) {}

  async create(userId: string, createManHourDto: CreateManHourDto) {
    const { baseId, month, year } = createManHourDto;

    if (month > 12 || month < 1) {
      throw new BadRequestException(`Mês Inválido`);
    }
    const baseExists = await this.basesRepo.findUnique({
      where: { id: baseId },
    });

    if (!baseExists) {
      throw new NotFoundException(`Base não encontrada`);
    }

    const manHourAlreadyExists = await this.manHoursRepo.findFirst({
      where: {
        baseId,
        month,
        year,
      },
    });

    if (manHourAlreadyExists) {
      throw new ConflictException(`Hora já inserida!`);
    }

    return await this.manHoursRepo.create({
      data: {
        userId,
        ...createManHourDto,
      },
    });
  }

  async findAllByBaseId(baseId: string) {
    return await this.manHoursRepo.findMany({ where: { baseId } });
  }

  async findAll() {
    let whereClause = {};

    /*  whereClause = {
      startHour: { gte: new Date(startDate) },
      endHour: { lte: new Date(endDate) },
      type: periodType,

      efficiency: { rigId: rigId },
    };

    if (periodClassification) {
      whereClause = {
        ...whereClause,
        classification: periodClassification,
      };



      {
        "_max": {
            "hours": 7654
        },
        "baseId": "fe345b8a-aa7c-48fc-b117-0085088f0518",
        "month": 5,
        "year": 2024
    },
    } */

    /*  const grouppedManHours: {
      _max: {
        hours: number;
      };
      baseId: string;
      month: number;
      year: number;
    }[] = */

    const grouppedManHours = await this.manHoursRepo.groupByBase({
      by: ['baseId', 'month', 'year'],
      _max: { hours: true },
    });

    const bases = await this.basesRepo.findMany({});

    const result = grouppedManHours.map((grouppedManHour) => {
      return {
        hours: grouppedManHour._max.hours,
        baseId: grouppedManHour.baseId,
        baseName: bases.find((base) => base.id === grouppedManHour.baseId).name,
        year: grouppedManHour.year,
        month: grouppedManHour.month,
      };
    });

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} manHour`;
  }

  async update(
    userId: string,
    manHourId: string,
    updateManHourDto: UpdateManHourDto,
  ) {
    const baseExists = await this.basesRepo.findUnique({
      where: { id: updateManHourDto.baseId },
    });

    if (!baseExists) {
      throw new NotFoundException(`Base não encontrada`);
    }

    const manHoursExists = await this.manHoursRepo.findUnique({
      where: { id: manHourId },
    });

    if (!manHoursExists) {
      throw new NotFoundException(`Base não encontrada`);
    }
    return await this.manHoursRepo.update({
      where: {
        id: manHourId,
      },
      data: {
        userId,
        ...updateManHourDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} manHour`;
  }
}
