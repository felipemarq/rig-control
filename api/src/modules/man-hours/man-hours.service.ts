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
import { CreateManyManHourDto } from './dto/create-many-man-hour.dto';

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

  async createMany(userId: string, createManyManHourDto: CreateManyManHourDto) {
    const { baseId, year } = createManyManHourDto;
    const numberYear = Number(year);

    const baseExists = await this.basesRepo.findUnique({
      where: { id: baseId },
    });

    if (!baseExists) {
      throw new NotFoundException(`Base não encontrada`);
    }

    for (let index = 1; index <= 12; index++) {
      const manHourAlreadyExists = await this.manHoursRepo.findFirst({
        where: {
          baseId,
          month: index,
          year: numberYear,
        },
      });

      if (manHourAlreadyExists) {
        throw new ConflictException(`Hora já inserida!`);
      }
    }

    await this.manHoursRepo.createMany({
      data: [
        { hours: 0, month: 1, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 2, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 3, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 4, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 5, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 6, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 7, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 8, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 9, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 10, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 11, year: numberYear, userId: userId, baseId },
        { hours: 0, month: 12, year: numberYear, userId: userId, baseId },
      ],
    });
  }

  async findAllByBaseId(baseId: string) {
    return await this.manHoursRepo.findMany({ where: { baseId } });
  }

  async findAll(year: string) {
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

    /* const grouppedManHours = await this.manHoursRepo.groupByBase({
      by: ['baseId', 'month', 'year'],
      _max: { hours: true },
    }); */

    /*    const bases = await this.basesRepo.findMany({});

    const result = grouppedManHours.map((grouppedManHour) => {
      return {
        hours: grouppedManHour._max.hours,
        baseId: grouppedManHour.baseId,
        baseName: bases.find((base) => base.id === grouppedManHour.baseId).name,
        year: grouppedManHour.year,
        month: grouppedManHour.month,
      };
    }); */

    return await this.manHoursRepo.findMany({
      where: {
        year: Number(year),
      },
      select: {
        id: true,
        baseId: true,
        createdAt: true,
        updatedAt: true,
        hours: true,
        month: true,
        userId: true,
        year: true,
        base: { select: { name: true } },
      },
    });
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
