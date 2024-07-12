import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOcurrenceDto } from './dto/create-ocurrence.dto';
import { UpdateOcurrenceDto } from './dto/update-ocurrence.dto';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';
import { BaseRepository } from 'src/shared/database/repositories/base.repositories';

@Injectable()
export class OccurrencesService {
  constructor(
    private readonly occurrencesRepo: OccurrenceRepository,
    private readonly basesRepo: BaseRepository,
  ) {}

  async create(userId: string, createOcurrenceDto: CreateOcurrenceDto) {
    const { baseId } = createOcurrenceDto;

    const baseExists = await this.basesRepo.findUnique({
      where: { id: baseId },
    });

    if (!baseExists) {
      throw new NotFoundException('Base não encontrada');
    }

    return await this.occurrencesRepo.create({
      data: { userId, ...createOcurrenceDto },
    });
  }

  findAll() {
    return this.occurrencesRepo.findMany({
      select: {
        id: true,
        date: true,
        hour: true,
        description: true,
        baseId: true,
        userId: true,
        createdAt: true,
        isAbsent: true,
        updatedAt: true,
        type: true,
        nature: true,
        category: true,
        base: {
          select: {
            name: true,
            state: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ocurrence`;
  }

  async update(occurrenceId: string, updateOcurrenceDto: UpdateOcurrenceDto) {
    const { baseId } = updateOcurrenceDto;

    const baseExists = await this.basesRepo.findUnique({
      where: { id: baseId },
    });

    if (!baseExists) {
      throw new NotFoundException('Base não encontrada');
    }

    return await this.occurrencesRepo.update({
      where: { id: occurrenceId },
      data: updateOcurrenceDto,
    });
  }

  async remove(occurrenceId: string) {
    await this.occurrencesRepo.delete({
      where: { id: occurrenceId },
    });

    return null;
  }
}
