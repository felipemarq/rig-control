import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EvaluationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.EvaluationCreateArgs) {
    return await this.prismaService.evaluation.create(createDto);
  }

  async findMany(findManyDto: Prisma.EvaluationFindManyArgs) {
    return await this.prismaService.evaluation.findMany(findManyDto);
  }

  async findUnique(findUnique: Prisma.EvaluationFindUniqueArgs) {
    return await this.prismaService.evaluation.findUnique(findUnique);
  }

  async delete(deleteDto: Prisma.EvaluationDeleteArgs) {
    return await this.prismaService.evaluation.delete(deleteDto);
  }

  async update(updateDto: Prisma.EvaluationUpdateArgs) {
    return await this.prismaService.evaluation.update(updateDto);
  }

  async groupBy(groupByDto: Prisma.EvaluationGroupByArgs): Promise<
    {
      _avg: { rating: number; score: number };
      checklistItemId: string;
    }[]
  > {
    //@ts-ignore
    return await this.prismaService.evaluation.groupBy(groupByDto);
  }
}
