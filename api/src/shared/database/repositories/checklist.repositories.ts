import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChecklistRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.ChecklistCreateArgs) {
    return await this.prismaService.checklist.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.ChecklistFindUniqueArgs) {
    return await this.prismaService.checklist.findUnique(findUniqueDto);
  }

  async findFirst(findUniqueDto: Prisma.ChecklistFindFirstArgs) {
    return await this.prismaService.checklist.findFirst(findUniqueDto);
  }

  async findMany(findManyDto: Prisma.ChecklistFindManyArgs) {
    return await this.prismaService.checklist.findMany(findManyDto);
  }

  async delete(deleteDto: Prisma.ChecklistDeleteArgs) {
    return await this.prismaService.checklist.delete(deleteDto);
  }
}
