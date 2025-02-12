import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BaseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.BaseCreateArgs) {
    return await this.prismaService.base.create(createDto);
  }

  async findMany(findManyDto: Prisma.BaseFindManyArgs) {
    return await this.prismaService.base.findMany(findManyDto);
  }

  async findUnique(findUnique: Prisma.BaseFindUniqueArgs) {
    return await this.prismaService.base.findUnique(findUnique);
  }
}
