import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedbackRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.FeedbackCreateArgs) {
    return await this.prismaService.feedback.create(createDto);
  }

  async findMany(findManyDto: Prisma.FeedbackFindManyArgs) {
    return await this.prismaService.feedback.findMany(findManyDto);
  }

  async findUnique(findUnique: Prisma.FeedbackFindUniqueArgs) {
    return await this.prismaService.feedback.findUnique(findUnique);
  }
}
