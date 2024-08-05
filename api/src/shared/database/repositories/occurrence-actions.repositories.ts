import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OccurrenceActionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.OccurrenceActionCreateArgs) {
    return await this.prismaService.occurrenceAction.create(createDto);
  }

  async findMany(findManyDto: Prisma.OccurrenceActionFindManyArgs) {
    return await this.prismaService.occurrenceAction.findMany(findManyDto);
  }

  async findUnique(findUniqueDto: Prisma.OccurrenceActionFindUniqueArgs) {
    return await this.prismaService.occurrenceAction.findUnique(findUniqueDto);
  }

  async update(updateDto: Prisma.OccurrenceActionUpdateArgs) {
    return await this.prismaService.occurrenceAction.update(updateDto);
  }

  async delete(deleteDto: Prisma.OccurrenceActionDeleteArgs) {
    return await this.prismaService.occurrenceAction.delete(deleteDto);
  }
}
