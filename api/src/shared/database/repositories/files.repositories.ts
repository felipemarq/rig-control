import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.FileCreateArgs) {
    return await this.prismaService.file.create(createDto);
  }

  /*  async createMany(createDto: Prisma.FileCreateManyArgs) {
    return await this.prismaService.file.createMany(createDto);
  }

  async findUnique(findUniqueDto: Prisma.FileFindUniqueArgs) {
    return await this.prismaService.file.findUnique(findUniqueDto);
  }

  async findFirst(findUniqueDto: Prisma.FileFindUniqueArgs) {
    return await this.prismaService.file.findFirst(findUniqueDto);
  }

  async findAll(findAllDto: Prisma.FileFindManyArgs) {
    return await this.prismaService.file.findMany(findAllDto);
  } */
}
