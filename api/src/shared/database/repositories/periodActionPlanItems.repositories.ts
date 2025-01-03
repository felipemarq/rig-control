import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PeriodActionPlanItemsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.PeriodActionPlanItemCreateArgs) {
    return await this.prismaService.periodActionPlanItem.create(createDto);
  }

  async createMany(createManyDto: Prisma.PeriodActionPlanItemCreateManyArgs) {
    return await this.prismaService.periodActionPlanItem.createMany(
      createManyDto,
    );
  }

  async update(updateDto: Prisma.PeriodActionPlanItemUpdateArgs) {
    return await this.prismaService.periodActionPlanItem.update(updateDto);
  }

  async remove(deleteDto: Prisma.PeriodActionPlanItemDeleteArgs) {
    return await this.prismaService.periodActionPlanItem.delete(deleteDto);
  }

  async deleteMany(deleteManyDto: Prisma.PeriodActionPlanItemDeleteManyArgs) {
    return await this.prismaService.periodActionPlanItem.deleteMany(
      deleteManyDto,
    );
  }
}
