import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ManHourRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.ManHourCreateArgs) {
    return await this.prismaService.manHour.create(createDto);
  }

  async createMany(createManyDto: Prisma.ManHourCreateManyArgs) {
    return await this.prismaService.manHour.createMany(createManyDto);
  }

  async findMany(findManyDto: Prisma.ManHourFindManyArgs) {
    return await this.prismaService.manHour.findMany(findManyDto);
  }

  async findUnique(findUnique: Prisma.ManHourFindUniqueArgs) {
    return await this.prismaService.manHour.findUnique(findUnique);
  }

  async findFirst(findFirst: Prisma.ManHourFindFirstArgs) {
    return await this.prismaService.manHour.findFirst(findFirst);
  }

  async update(updateDto: Prisma.ManHourUpdateArgs) {
    return await this.prismaService.manHour.update(updateDto);
  }

  async updateMany(updateManyDto: Prisma.ManHourUpdateManyArgs) {
    return await this.prismaService.manHour.updateMany(updateManyDto);
  }

  async groupByBase(groupByDto: Prisma.ManHourGroupByArgs): Promise<
    {
      _max: {
        hours: number;
      };
      baseId: string;
      month: number;
      year: number;
    }[]
  > {
    //@ts-ignore
    return await this.prismaService.manHour.groupBy(groupByDto);
  }
}
