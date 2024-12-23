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
}
