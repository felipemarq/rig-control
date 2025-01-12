import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PeriodActionPlansRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.PeriodActionPlanCreateArgs) {
    return await this.prismaService.periodActionPlan.create(createDto);
  }

  async update(updateDto: Prisma.PeriodActionPlanUpdateArgs) {
    return await this.prismaService.periodActionPlan.update(updateDto);
  }

  async findUnique(findUniqueDto: Prisma.PeriodActionPlanFindUniqueArgs) {
    return await this.prismaService.periodActionPlan.findUnique(findUniqueDto);
  }

  async findFirst(findFirstDto: Prisma.PeriodActionPlanFindFirstArgs) {
    return await this.prismaService.periodActionPlan.findFirst(findFirstDto);
  }

  async findMany(findManyDto: Prisma.PeriodActionPlanFindManyArgs) {
    return await this.prismaService.periodActionPlan.findMany(findManyDto);
  }

  async remove(deleteDto: Prisma.PeriodActionPlanDeleteArgs) {
    return await this.prismaService.periodActionPlan.delete(deleteDto);
  }
}
