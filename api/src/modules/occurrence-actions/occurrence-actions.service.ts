import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOccurrenceActionDto } from './dto/create-occurrence-action.dto';
import { UpdateOccurrenceActionDto } from './dto/update-occurrence-action.dto';
import { OccurrenceActionsRepository } from 'src/shared/database/repositories/occurrence-actions.repositories';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';
import { FileService } from '../file/file.service';

@Injectable()
export class OccurrenceActionsService {
  constructor(
    private readonly occurrenceActionsRepo: OccurrenceActionsRepository,
    private readonly occurrenceRepo: OccurrenceRepository,
    private readonly filesService: FileService,
  ) {}
  async create(createOccurrenceActionDto: CreateOccurrenceActionDto) {
    const occurrence = await this.occurrenceRepo.findUnique({
      where: { id: createOccurrenceActionDto.occurrenceId },
      include: { occurrenceActions: true },
    });

    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada!');
    }

    return await this.occurrenceActionsRepo.create({
      data: createOccurrenceActionDto,
      include: {
        files: true,
      },
    });
  }

  async findAll() {
    return await this.occurrenceActionsRepo.findMany({
      include: {
        files: true,
      },
    });
  }

  async findOne(occurrenceId: string) {
    const occurrenceAction = await this.occurrenceActionsRepo.findUnique({
      where: { id: occurrenceId },
      include: {
        files: true,
      },
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
    await this.filesService.deleteOccurenceActionFile(occurrenceActionId);
    return await this.occurrenceActionsRepo.delete({
      where: { id: occurrenceActionId },
    });
  }
}
