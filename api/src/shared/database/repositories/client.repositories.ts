import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.ClientCreateArgs) {
    return await this.prismaService.client.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.ClientFindUniqueArgs) {
    return await this.prismaService.client.findUnique(findUniqueDto);
  }

  async findFirst(findUniqueDto: Prisma.ClientFindUniqueArgs) {
    return await this.prismaService.client.findFirst(findUniqueDto);
  }

  async findMany(findManyDto: Prisma.ClientFindManyArgs) {
    return await this.prismaService.client.findMany(findManyDto);
  }
}
