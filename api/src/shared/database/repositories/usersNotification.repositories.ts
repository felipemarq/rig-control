import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersNotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.UserNotificationCreateArgs) {
    return await this.prismaService.userNotification.create(createDto);
  }

  async createMany(createManyDto: Prisma.UserNotificationCreateManyArgs) {
    return await this.prismaService.userNotification.createMany(createManyDto);
  }

  async findFirst(findFirstDto: Prisma.UserNotificationFindFirstArgs) {
    return await this.prismaService.userNotification.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.UserNotificationFindUniqueArgs) {
    return await this.prismaService.userNotification.findUnique(findUniqueDto);
  }

  async delete(deleteDto: Prisma.UserNotificationDeleteArgs) {
    return await this.prismaService.userNotification.delete(deleteDto);
  }

  async deleteMany(deleteManyDto: Prisma.UserNotificationDeleteManyArgs) {
    return await this.prismaService.userNotification.deleteMany(deleteManyDto);
  }

  async update(updateDto: Prisma.UserNotificationUpdateArgs) {
    return await this.prismaService.userNotification.update(updateDto);
  }

  /*  async createMany(createDto: Prisma.FileCreateManyArgs) {
    return await this.prismaService.file.createMany(createDto);
  }
    
  async findAll(findAllDto: Prisma.FileFindManyArgs) {
    return await this.prismaService.file.findMany(findAllDto);
  } */
}
