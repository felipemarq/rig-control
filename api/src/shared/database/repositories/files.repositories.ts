import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.FileCreateArgs) {
    return await this.prismaService.file.create(createDto);
  }

  async update(updateDto: Prisma.FileUpdateArgs) {
    return await this.prismaService.file.update(updateDto);
  }

  async findFirst(findFirstDto: Prisma.FileFindFirstArgs) {
    return await this.prismaService.file.findFirst(findFirstDto);
  }

  async findMany(findManyDto: Prisma.FileFindManyArgs) {
    return await this.prismaService.file.findMany(findManyDto);
  }

  async findUnique(findUniqueDto: Prisma.FileFindUniqueArgs) {
    return await this.prismaService.file.findUnique(findUniqueDto);
  }

  async delete(deleteDto: Prisma.FileDeleteArgs) {
    return await this.prismaService.file.delete(deleteDto);
  }

  async deleteMany(deleteManyDto: Prisma.FileDeleteManyArgs) {
    return await this.prismaService.file.deleteMany(deleteManyDto);
  }

  /*  async createMany(createDto: Prisma.FileCreateManyArgs) {
    return await this.prismaService.file.createMany(createDto);
  }
    
  async findAll(findAllDto: Prisma.FileFindManyArgs) {
    return await this.prismaService.file.findMany(findAllDto);
  } */
}
