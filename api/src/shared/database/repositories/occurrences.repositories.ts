import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

interface OccurrenceCountByMonth {
  date: Date;
  _count: {
    id: number;
  };
}

@Injectable()
export class OccurrenceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.OccurrenceCreateArgs) {
    return await this.prismaService.occurrence.create(createDto);
  }

  async findMany(findManyDto: Prisma.OccurrenceFindManyArgs) {
    return await this.prismaService.occurrence.findMany(findManyDto);
  }

  async update(updateDto: Prisma.OccurrenceUpdateArgs) {
    return await this.prismaService.occurrence.update(updateDto);
  }

  async delete(deleteDto: Prisma.OccurrenceDeleteArgs) {
    return await this.prismaService.occurrence.delete(deleteDto);
  }

  async count(countDto: Prisma.OccurrenceCountArgs) {
    return await this.prismaService.occurrence.count(countDto);
  }

  async groupBy(
    groupByDto: Prisma.OccurrenceGroupByArgs,
  ): Promise<OccurrenceCountByMonth[]> {
    //@ts-ignore
    return await this.prismaService.occurrence.groupBy(groupByDto);
  }
}
