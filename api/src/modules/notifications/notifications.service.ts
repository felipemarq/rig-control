import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsRepository } from 'src/shared/database/repositories/notifications.repositories';
import { UsersNotificationsRepository } from 'src/shared/database/repositories/usersNotification.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepo: NotificationsRepository,
    private readonly usersNotificationsRepo: UsersNotificationsRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationsRepo.create({
      data: {
        description: createNotificationDto.description,
        title: createNotificationDto.title,
        systemVersionId: createNotificationDto.systemVersionId,
      },
    });

    let whereClause = {};

    if (createNotificationDto.accessLevel) {
      whereClause = { accessLevel: createNotificationDto.accessLevel };
    }

    const users = await this.usersRepo.findAll({
      where: whereClause,
    });

    await this.usersNotificationsRepo.createMany({
      data: users.map((user) => ({
        notificationId: notification.id,
        userId: user.id,
        isRead: false,
      })),
    });
    return notification;
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }
  async markAsRead(notificationId: string, userId: string) {
    await this.usersNotificationsRepo.update({
      where: {
        userId_notificationId: {
          userId: userId,
          notificationId: notificationId,
        },
      },
      data: {
        isRead: true,
      },
    });
  }

  async remove(notificationId: string) {
    await this.usersNotificationsRepo.deleteMany({
      where: { notificationId: notificationId },
    });

    // Depois, delete a própria notificação
    await this.notificationsRepo.delete({
      where: { id: notificationId },
    });
  }
}
