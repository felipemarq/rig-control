import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChecklistItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.ChecklistItemCreateArgs) {
    return await this.prismaService.checklistItem.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.ChecklistItemFindUniqueArgs) {
    return await this.prismaService.checklistItem.findUnique(findUniqueDto);
  }

  async findFirst(findUniqueDto: Prisma.ChecklistItemFindFirstArgs) {
    return await this.prismaService.checklistItem.findFirst(findUniqueDto);
  }

  async findMany(findManyDto: Prisma.ChecklistItemFindManyArgs) {
    return await this.prismaService.checklistItem.findMany(findManyDto);
  }
}
