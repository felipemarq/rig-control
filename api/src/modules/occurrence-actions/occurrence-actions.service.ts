import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOccurrenceActionDto } from './dto/create-occurrence-action.dto';
import { UpdateOccurrenceActionDto } from './dto/update-occurrence-action.dto';
import { OccurrenceActionsRepository } from 'src/shared/database/repositories/occurrence-actions.repositories';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';

@Injectable()
export class OccurrenceActionsService {
  constructor(
    private readonly occurrenceActionsRepo: OccurrenceActionsRepository,
    private readonly occurrenceRepo: OccurrenceRepository,
  ) {}
  async create(createOccurrenceActionDto: CreateOccurrenceActionDto) {
    const occurrence = await this.occurrenceRepo.findUnique({
      where: { id: createOccurrenceActionDto.occurrenceId },
    });

    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada!');
    }

    return await this.occurrenceActionsRepo.create({
      data: createOccurrenceActionDto,
    });
  }

  async findAll() {
    return await this.occurrenceActionsRepo.findMany({});
  }

  async findOne(occurrenceId: string) {
    const occurrenceAction = await this.occurrenceActionsRepo.findUnique({
      where: { id: occurrenceId },
    });

    if (!occurrenceAction) {
      throw new NotFoundException('Plano de ação não encontrado!');
    }
    return occurrenceAction;
  }

  async update(
    occurrenceActionId: string,
    updateOccurrenceActionDto: UpdateOccurrenceActionDto,
  ) {
    return await this.occurrenceActionsRepo.update({
      where: { id: occurrenceActionId },
      data: updateOccurrenceActionDto,
    });
  }

  async remove(occurrenceActionId: string) {
    return await this.occurrenceActionsRepo.delete({
      where: { id: occurrenceActionId },
    });
  }
}
