import { Injectable } from '@nestjs/common';
import { UpdateUserLogDto } from './dto/update-user-log.dto';
import { UserLogsRepository } from 'src/shared/database/repositories/userLog.repositories';
import { LogType } from './entities/LogType';

@Injectable()
export class UserLogService {
  constructor(private readonly userLogRepo: UserLogsRepository) {}
  async create(loginTime: string, userId: string, logType?: LogType) {
    return await this.userLogRepo.create({
      data: {
        loginTime,
        userId,
        logType: logType,
      },
    });
  }

  async findAll({
    pageSize,
    pageIndex,
    userId,
    logType,
  }: {
    pageSize: string;
    pageIndex: string;
    userId?: string;
    logType: string;
  }) {
    let whereClause = {};

    if (logType !== 'ALL') {
      whereClause = { ...whereClause, logType: logType };
    }

    if (userId) {
      whereClause = { ...whereClause, userId: userId };
    }
    const userLogs = await this.userLogRepo.findMany({
      where: whereClause,
      skip: (Number(pageIndex) - 1) * Number(pageSize),
      take: Number(pageSize),
      orderBy: { loginTime: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            accessLevel: true,
          },
        },
      },
    });

    const totalItems = await this.userLogRepo.count({
      where: whereClause,
    });

    return { data: userLogs, totalItems };
  }

  async findByUserId(userId: string) {
    return await this.userLogRepo.findMany({
      where: { userId },
      orderBy: { loginTime: 'desc' },
    });
  }

  update(id: number, updateUserLogDto: UpdateUserLogDto) {
    return `This action updates a #${id} userLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLog`;
  }
}
