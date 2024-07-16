import { Injectable } from '@nestjs/common';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { BaseRepository } from 'src/shared/database/repositories/base.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class BasesService {
  constructor(
    private readonly basesRepo: BaseRepository,
    private readonly usersRepo: UsersRepository,
  ) {}
  findAll() {
    return this.basesRepo.findMany({});
  }

  async create(userId: string, createBaseDto: CreateBaseDto) {
    const year = new Date().getFullYear();

    const user = await this.usersRepo.findUnique({ where: { id: userId } });

    return await this.basesRepo.create({
      data: {
        ...createBaseDto,
        manHours: {
          createMany: {
            data: [
              { hours: 0, month: 1, year: year, userId: userId },
              { hours: 0, month: 2, year: year, userId: userId },
              { hours: 0, month: 3, year: year, userId: userId },
              { hours: 0, month: 4, year: year, userId: userId },
              { hours: 0, month: 5, year: year, userId: userId },
              { hours: 0, month: 6, year: year, userId: userId },
              { hours: 0, month: 7, year: year, userId: userId },
              { hours: 0, month: 8, year: year, userId: userId },
              { hours: 0, month: 9, year: year, userId: userId },
              { hours: 0, month: 10, year: year, userId: userId },
              { hours: 0, month: 11, year: year, userId: userId },
              { hours: 0, month: 12, year: year, userId: userId },
            ],
          },
        },
      },
    });
  }
}
