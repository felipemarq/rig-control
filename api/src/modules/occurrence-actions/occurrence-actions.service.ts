import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOccurrenceActionDto } from './dto/create-occurrence-action.dto';
import { UpdateOccurrenceActionDto } from './dto/update-occurrence-action.dto';
import { OccurrenceActionsRepository } from 'src/shared/database/repositories/occurrence-actions.repositories';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';
import { FileService } from '../file/file.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OccurrenceActionsService {
  constructor(
    private readonly occurrenceActionsRepo: OccurrenceActionsRepository,
    private readonly occurrenceRepo: OccurrenceRepository,
    private readonly filesService: FileService,
    private readonly mailsService: MailService,
  ) {}
  async create(createOccurrenceActionDto: CreateOccurrenceActionDto) {
    const occurrence = await this.occurrenceRepo.findUnique({
      where: { id: createOccurrenceActionDto.occurrenceId },
    });

    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada!');
    }

    const occurrenceAction = await this.occurrenceActionsRepo.create({
      data: createOccurrenceActionDto,
      include: {
        files: true,
      },
    });

    await this.mailsService.sendOccurrenceActionEmail(
      createOccurrenceActionDto,
      occurrence,
    );

    return occurrenceAction;
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
    const occurrence = await this.occurrenceRepo.findUnique({
      where: { id: updateOccurrenceActionDto.occurrenceId },
    });

    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada!');
    }

    await this.mailsService.sendUpdateOccurrenceActionEmail(
      updateOccurrenceActionDto,
      occurrence,
    );

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
