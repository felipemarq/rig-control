import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.NotificationCreateArgs) {
    return await this.prismaService.notification.create(createDto);
  }

  async createMany(createManyDto: Prisma.NotificationCreateManyArgs) {
    return await this.prismaService.notification.createMany(createManyDto);
  }

  async findFirst(findFirstDto: Prisma.NotificationFindFirstArgs) {
    return await this.prismaService.notification.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.NotificationFindUniqueArgs) {
    return await this.prismaService.notification.findUnique(findUniqueDto);
  }

  async delete(deleteDto: Prisma.NotificationDeleteArgs) {
    return await this.prismaService.notification.delete(deleteDto);
  }

  async deleteMany(deleteManyDto: Prisma.NotificationDeleteManyArgs) {
    return await this.prismaService.notification.deleteMany(deleteManyDto);
  }

  /*  async createMany(createDto: Prisma.FileCreateManyArgs) {
    return await this.prismaService.file.createMany(createDto);
  }
    
  async findAll(findAllDto: Prisma.FileFindManyArgs) {
    return await this.prismaService.file.findMany(findAllDto);
  } */
}
