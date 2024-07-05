import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OccurrenceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.OccurrenceCreateArgs) {
    return await this.prismaService.occurrence.create(createDto);
  }

  async findMany(findManyDto: Prisma.OccurrenceFindManyArgs) {
    return await this.prismaService.occurrence.findMany(findManyDto);
  }
}
