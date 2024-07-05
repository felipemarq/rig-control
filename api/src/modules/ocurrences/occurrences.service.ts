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

    console.log('Base Exists', baseExists);

    if (!baseExists) {
      throw new NotFoundException('Base não encontrada');
    }

    return await this.occurrencesRepo.create({
      data: { userId, ...createOcurrenceDto },
    });
  }

  findAll() {
    return this.occurrencesRepo.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} ocurrence`;
  }

  update(id: number, updateOcurrenceDto: UpdateOcurrenceDto) {
    return `This action updates a #${id} ocurrence`;
  }

  remove(id: number) {
    return `This action removes a #${id} ocurrence`;
  }
}
