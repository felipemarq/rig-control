import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOcurrenceDto } from './dto/create-ocurrence.dto';
import { UpdateOcurrenceDto } from './dto/update-ocurrence.dto';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';
import { BaseRepository } from 'src/shared/database/repositories/base.repositories';
import { ManHourRepository } from 'src/shared/database/repositories/manHour.repositories';
import { FileService } from '../file/file.service';

import { OccurrenceCategory } from './entities/OccurrenceCategory';
import { OccurrenceSeverity } from './entities/OccurrenceSeverity';
import { OccurrenceType } from './entities/OccurrenceType';
import { UF } from './entities/UF';
import { OccurenceNature } from './entities/OccurenceNature';
import { Prisma } from '@prisma/client';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { PermissionsService } from '../permissions/permissions.service';

interface OccurrenceCountByMonth {
  date: Date;
  _count: {
    id: number;
  };
}

interface BaseWithClientId {
  contract: { clientId: string };
}

type TransformedManHoursData = {
  id: string;
  baseName: string;
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
  7?: number;
  8?: number;
  9?: number;
  10?: number;
  11?: number;
  12?: number;
};

@Injectable()
export class OccurrencesService {
  constructor(
    private readonly occurrencesRepo: OccurrenceRepository,
    private readonly basesRepo: BaseRepository,
    private readonly manHoursRepo: ManHourRepository,
    private readonly filesService: FileService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) {}

  async create(userId: string, createOcurrenceDto: CreateOcurrenceDto) {
    const { baseId } = createOcurrenceDto;

    const userPermissions =
      await this.permissionsService.getUserPermissionsByModule(userId, 'SMS');

    const canCreate = userPermissions.find((p) => p.canCreate);

    if (!canCreate) {
      throw new UnauthorizedException(
        'Você não tem permissão para criar uma ocorrência',
      );
    }

    const baseExists = (await this.basesRepo.findUnique({
      where: { id: baseId },
      select: { contract: { select: { clientId: true } } },
    })) as unknown as BaseWithClientId;

    if (!baseExists) {
      throw new NotFoundException('Base não encontrada');
    }

    if (createOcurrenceDto.nature === OccurenceNature.ACCIDENT) {
      await this.mailService.sendOccurrenceAcidentEmail(createOcurrenceDto);
    }

    return await this.occurrencesRepo.create({
      data: {
        userId,
        ...createOcurrenceDto,
      },
    });
  }

  async findAll(
    nature: OccurenceNature,
    category: OccurrenceCategory,
    severity: OccurrenceSeverity,
    type: OccurrenceType,
    uf: UF,
    baseId: string,
    year: string,
  ) {
    let whereClause: Prisma.OccurrenceWhereInput = {};

    if (year) {
      const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
      const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

      whereClause = {
        ...whereClause,
        AND: [{ date: { gte: startOfYear } }, { date: { lte: endOfYear } }],
      };
    }

    if (nature) {
      whereClause = {
        ...whereClause,
        nature: nature,
      };
    }

    if (category) {
      whereClause = {
        ...whereClause,
        category: category,
      };
    }

    if (severity) {
      whereClause = {
        ...whereClause,
        severity: severity,
      };
    }

    if (type) {
      whereClause = {
        ...whereClause,
        type: type,
      };
    }

    if (baseId && baseId !== 'all') {
      whereClause = {
        ...whereClause,
        baseId: baseId,
      };
    }

    if (uf) {
      whereClause = {
        ...whereClause,
        state: uf,
      };
    }

    return await this.occurrencesRepo.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        hour: true,
        description: true,
        baseId: true,
        userId: true,
        clientId: true,
        createdAt: true,
        isAbsent: true,
        updatedAt: true,
        type: true,
        nature: true,
        category: true,
        severity: true,
        state: true,
        base: {
          select: {
            name: true,
            state: true,
          },
        },
        files: {
          select: {
            path: true,
          },
        },
        occurrenceActions: {
          select: {
            id: true,
            occurrenceId: true,
            title: true,
            dueDate: true,
            responsible: true,
            description: true,
            isFinished: true,
            createdAt: true,
            finishedAt: true,
            responsibleEmail: true,
            files: {
              select: {
                path: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      where: whereClause,
    });
  }

  async update(occurrenceId: string, updateOcurrenceDto: UpdateOcurrenceDto) {
    const { baseId } = updateOcurrenceDto;

    const baseExists = await this.basesRepo.findUnique({
      where: { id: baseId },
    });

    if (!baseExists) {
      throw new NotFoundException('Base não encontrada');
    }

    return await this.occurrencesRepo.update({
      where: { id: occurrenceId },
      data: {
        ...updateOcurrenceDto,
        category: updateOcurrenceDto.category
          ? updateOcurrenceDto.category
          : null,
        severity: updateOcurrenceDto.severity
          ? updateOcurrenceDto.severity
          : null,
      },
    });
  }

  async remove(occurrenceId: string) {
    await this.filesService.deleteOccurenceFile(occurrenceId);
    await this.occurrencesRepo.delete({
      where: { id: occurrenceId },
    });

    return null;
  }

  async getTaxesByRigId(baseId: string) {
    const baseExists = await this.basesRepo.findUnique({
      where: { id: baseId },
    });

    if (!baseExists) {
      throw new NotFoundException('Base não encontrada');
    }

    const tarOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        baseId: baseId,
        category: 'TAR',
      },
      _count: {
        id: true,
      },
    });

    const torOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        baseId: baseId,
        OR: [{ category: 'TOR' }, { category: 'TAR' }],
      },
      _count: {
        id: true,
      },
    });

    const notIsAbsentOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        baseId: baseId,
        isAbsent: false,
      },
      _count: {
        id: true,
      },
    });

    const isAbsentOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        baseId: baseId,
        isAbsent: true,
      },
      _count: {
        id: true,
      },
    });

    const commutingOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        baseId: baseId,
        nature: 'COMMUTING_ACCIDENT',
      },
      _count: {
        id: true,
      },
    });

    const manHours = await this.manHoursRepo.findMany({
      select: {
        id: true,
        baseId: true,
        hours: true,
        month: true,
        year: true,
        base: { select: { name: true } },
      },
      where: { baseId: baseId },
    });

    function transformManHoursData(
      data: {
        id: string;
        baseId: string;
        hours: number;
        year: number;
        month: number;
        base: { name: string };
      }[],
    ): TransformedManHoursData[] {
      const baseMap: { [baseName: string]: TransformedManHoursData } = {};

      data.forEach((record) => {
        const baseName = record.base.name;
        const month = record.month;

        if (!baseMap[baseName]) {
          baseMap[baseName] = { baseName, id: record.baseId };
        }
        //@ts-ignore
        baseMap[baseName][month] = record.hours;
      });

      const [transformedManHours] = Object.values(baseMap);

      for (let index = 2; index < 11; index++) {
        transformedManHours[index] =
          transformedManHours[index] + transformedManHours[index - 1];
      }

      return [transformedManHours];
    }

    //@ts-ignore
    const [transformedManHours] = transformManHoursData(manHours);

    const aggroupOccurrencesByMonth = (
      occurrences: OccurrenceCountByMonth[],
    ) => {
      const countsByMonthAccumulated: { [key: number]: number } = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      };

      const countsByMonth: { [key: number]: number } = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      };

      occurrences.forEach(({ date, _count }) => {
        const month = date.getMonth() + 1; // Convertendo para mês (1-12)

        if (countsByMonthAccumulated[month]) {
          countsByMonthAccumulated[month] += _count.id;
          countsByMonth[month] += _count.id;
        } else {
          countsByMonthAccumulated[month] = _count.id;
          countsByMonth[month] = _count.id;
        }
      });

      for (let index = 2; index < 11; index++) {
        countsByMonthAccumulated[index] =
          countsByMonthAccumulated[index] + countsByMonthAccumulated[index - 1];
      }

      return Object.keys(countsByMonthAccumulated).map((month) => {
        const tax =
          (countsByMonthAccumulated[month] /
            transformedManHours[Number(month)]) *
          1_000_000;

        return {
          month: Number(month),
          accCount: countsByMonthAccumulated[month],
          count: countsByMonth[month],
          tax: isNaN(tax) ? 0 : tax,
        };
      });
    };

    const totalTarOccurrences = aggroupOccurrencesByMonth(tarOccurrences);

    const totalTorOccurrences = aggroupOccurrencesByMonth(torOccurrences);

    const totalNotAbsentOccurrences = aggroupOccurrencesByMonth(
      notIsAbsentOccurrences,
    );

    const totalAbsentOccurrences =
      aggroupOccurrencesByMonth(isAbsentOccurrences);

    const totalCommutingOccurrences =
      aggroupOccurrencesByMonth(commutingOccurrences);

    return {
      tarOccurrences: totalTarOccurrences,
      torOccurrences: totalTorOccurrences,
      notAbsentOccurrences: totalNotAbsentOccurrences,
      absentOccurrences: totalAbsentOccurrences,
      commutingOccurrences: totalCommutingOccurrences,
    };
  }

  async getAllTaxes(filters: {
    startDate: string;
    endDate: string;
    baseId: string;
    year: string;
  }) {
    const startOfYear = new Date(`${filters.year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${filters.year}-12-31T23:59:59.999Z`);

    let occurrencesWhereClause: Prisma.OccurrenceWhereInput = {
      AND: [{ date: { gte: startOfYear } }, { date: { lte: endOfYear } }],
    };

    if (filters.baseId && filters.baseId !== 'all') {
      occurrencesWhereClause = {
        ...occurrencesWhereClause,
        baseId: filters.baseId,
      };
    }

    const tarOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        category: 'TAR',
        ...occurrencesWhereClause,
      },
      _count: {
        id: true,
      },
    });

    const torOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        OR: [{ category: 'TOR' }, { category: 'TAR' }],
        ...occurrencesWhereClause,
      },
      _count: {
        id: true,
      },
    });

    const notIsAbsentOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        isAbsent: false,
        ...occurrencesWhereClause,
      },
      _count: {
        id: true,
      },
    });

    const isAbsentOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        isAbsent: true,
        ...occurrencesWhereClause,
      },
      _count: {
        id: true,
      },
    });

    const commutingOccurrences = await this.occurrencesRepo.groupBy({
      by: ['date'],
      where: {
        nature: 'COMMUTING_ACCIDENT',
        ...occurrencesWhereClause,
      },
      _count: {
        id: true,
      },
    });

    let manHoursWhereClause: any = {
      year: Number(filters.year),
    };

    if (filters.baseId && filters.baseId !== 'all') {
      manHoursWhereClause = {
        ...manHoursWhereClause,
        baseId: filters.baseId,
      };
    }

    // const endDate = new Date(filters.endDate);

    /* if (startDate.getFullYear() !== endDate.getFullYear()) {
      throw new BadRequestException(
        'Data de inicio e fim devem ser do mesmo ano!',
      );
    } */

    const manHoursAgg: { _sum: { hours: number }; month: number }[] =
      await this.manHoursRepo.groupBy({
        by: ['month'],
        _sum: {
          hours: true,
        },
        where: manHoursWhereClause,
      });

    const aggroupedMenHours = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
    };

    console.log('manHoursAgg', manHoursAgg);

    // Iterando sobre o array e somando as horas para cada mês
    manHoursAgg
      .sort((a, b) => a.month - b.month)
      .forEach(({ _sum, month }) => {
        if (aggroupedMenHours.hasOwnProperty(month) && month == 1) {
          aggroupedMenHours[month] += _sum?.hours || 0;
        } else if (aggroupedMenHours.hasOwnProperty(month)) {
          aggroupedMenHours[month] =
            _sum?.hours + aggroupedMenHours[month - 1] || 0;
        }
      });

    const aggroupOccurrencesByMonth = (
      occurrences: OccurrenceCountByMonth[],
    ) => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      let countsByMonthAccumulated: { [key: number]: number } = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      };

      const countsByMonth: { [key: number]: number } = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      };

      occurrences.forEach(({ date, _count }) => {
        const month = date.getMonth() + 1; // Convertendo para mês (1-12)

        if (countsByMonthAccumulated[month]) {
          countsByMonth[month] += _count.id;
          countsByMonthAccumulated[month] += _count.id;
        } else {
          countsByMonth[month] = _count.id;
          countsByMonthAccumulated[month] = _count.id;
        }
      });

      for (let index = 2; index <= 12; index++) {
        countsByMonthAccumulated[index] = countsByMonthAccumulated[index] +=
          countsByMonthAccumulated[index - 1];
      }

      return Object.keys(countsByMonthAccumulated).map((month) => {
        let tax =
          (countsByMonthAccumulated[month] / aggroupedMenHours[Number(month)]) *
          1_000_000;

        if (
          (currentYear === Number(filters.year) &&
            currentMonth <= Number(month)) ||
          isNaN(tax)
        ) {
          tax = 0;
        }
        return {
          month: Number(month),
          count: countsByMonth[month],
          accCount: countsByMonthAccumulated[month],
          tax: tax,
        };
      });
    };

    const totalTarOccurrences = aggroupOccurrencesByMonth(tarOccurrences);

    const totalTorOccurrences = aggroupOccurrencesByMonth(torOccurrences);

    const totalNotAbsentOccurrences = aggroupOccurrencesByMonth(
      notIsAbsentOccurrences,
    );

    const totalAbsentOccurrences =
      aggroupOccurrencesByMonth(isAbsentOccurrences);

    const totalCommutingOccurrences =
      aggroupOccurrencesByMonth(commutingOccurrences);

    return {
      tarOccurrences: totalTarOccurrences,
      torOccurrences: totalTorOccurrences,
      notAbsentOccurrences: totalNotAbsentOccurrences,
      absentOccurrences: totalAbsentOccurrences,
      commutingOccurrences: totalCommutingOccurrences,
    };
  }
}
