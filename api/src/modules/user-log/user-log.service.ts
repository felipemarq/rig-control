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

  findAll() {
    return `This action returns all userLog`;
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
