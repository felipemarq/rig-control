import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.PermissionCreateArgs) {
    return await this.prismaService.permission.create(createDto);
  }

  async upsert(upsertDto: Prisma.PermissionUpsertArgs) {
    return await this.prismaService.permission.upsert(upsertDto);
  }

  async findMany(findManyDto: Prisma.PermissionFindManyArgs) {
    return await this.prismaService.permission.findMany(findManyDto);
  }

  async findUnique(findUnique: Prisma.PermissionFindUniqueArgs) {
    return await this.prismaService.permission.findUnique(findUnique);
  }
}
