import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { BaseRepository } from 'src/shared/database/repositories/base.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { ContractRepository } from 'src/shared/database/repositories/contract.repositories';

@Injectable()
export class BasesService {
  constructor(
    private readonly basesRepo: BaseRepository,
    private readonly usersRepo: UsersRepository,
    private readonly contractsRepo: ContractRepository,
  ) {}
  findAll() {
    return this.basesRepo.findMany({});
  }

  async create(userId: string, createBaseDto: CreateBaseDto) {
    const year = new Date().getFullYear();

    const user = await this.usersRepo.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('Usuário não autorizado!');
    }

    const contract = await this.contractsRepo.findUnique({
      where: { id: createBaseDto.contractId },
    });

    if (!contract) {
      throw new UnauthorizedException('Contrato não encontrado!');
    }

    const contractAlreadyHasABase = await this.basesRepo.findUnique({
      where: { contractId: contract.id },
    });

    if (contractAlreadyHasABase) {
      throw new ConflictException('Contrato já vinculado a uma base!');
    }

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
