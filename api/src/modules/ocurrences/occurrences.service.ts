import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOcurrenceDto } from './dto/create-ocurrence.dto';
import { UpdateOcurrenceDto } from './dto/update-ocurrence.dto';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';
import { BaseRepository } from 'src/shared/database/repositories/base.repositories';
import { ManHourRepository } from 'src/shared/database/repositories/manHour.repositories';
import { FileService } from '../file/file.service';

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
  ) {}

  async create(userId: string, createOcurrenceDto: CreateOcurrenceDto) {
    const { baseId } = createOcurrenceDto;

    const baseExists = (await this.basesRepo.findUnique({
      where: { id: baseId },
      select: { contract: { select: { clientId: true } } },
    })) as unknown as BaseWithClientId;

    if (!baseExists) {
      throw new NotFoundException('Base não encontrada');
    }

    return await this.occurrencesRepo.create({
      data: {
        userId,
        ...createOcurrenceDto,
      },
    });
  }

  findAll() {
    return this.occurrencesRepo.findMany({
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ocurrence`;
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

  async getTaxes(baseId: string) {
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
        category: 'TOR',
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

      return Object.values(baseMap);
    }

    //@ts-ignore
    const [transformedManHours] = transformManHoursData(manHours);

    const aggroupOccurrencesByMonth = (
      occurrences: OccurrenceCountByMonth[],
    ) => {
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

        if (countsByMonth[month]) {
          countsByMonth[month] += _count.id;
        } else {
          countsByMonth[month] = _count.id;
        }
      });

      return Object.keys(countsByMonth).map((month) => {
        const tax =
          (countsByMonth[month] / transformedManHours[Number(month)]) *
          1_000_000;

        return {
          month: Number(month),
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
}
