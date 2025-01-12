import { Injectable } from '@nestjs/common';
import { CreatePeriodActionPlanItemDto } from './dto/create-period-action-plan-item.dto';
import { UpdatePeriodActionPlanItemDto } from './dto/update-period-action-plan-item.dto';
import { PeriodActionPlanItemsRepository } from 'src/shared/database/repositories/periodActionPlanItems.repositories';

@Injectable()
export class PeriodActionPlanItemsService {
  constructor(
    private readonly periodActionPlanItemsRepo: PeriodActionPlanItemsRepository,
  ) {}

  async create(createPeriodActionPlanItemDto: CreatePeriodActionPlanItemDto) {
    return await this.periodActionPlanItemsRepo.create({
      data: {
        task: createPeriodActionPlanItemDto.task,
        assignee: createPeriodActionPlanItemDto.assignee,
        dueDate: createPeriodActionPlanItemDto.dueDate,
        reason: createPeriodActionPlanItemDto.reason,
        instructions: createPeriodActionPlanItemDto.instructions,
        notes: createPeriodActionPlanItemDto.notes,
        sequenceNumber: createPeriodActionPlanItemDto.sequenceNumber,
        actionPlanId: createPeriodActionPlanItemDto.actionPlanId,
      },
    });
  }

  async createMany(
    createPeriodActionPlanItemDto: CreatePeriodActionPlanItemDto[],
  ) {
    console.log('createMany', createPeriodActionPlanItemDto);
    return await this.periodActionPlanItemsRepo.createMany({
      data: createPeriodActionPlanItemDto,
    });
  }

  async update(
    periodActionPlanItemId: string,
    updatePeriodActionPlanItemDto: UpdatePeriodActionPlanItemDto,
  ) {
    const {
      task,
      assignee,
      dueDate,
      reason,
      instructions,
      notes,
      sequenceNumber,
      actionPlanId,
      finishedAt,
      isFinished,
    } = updatePeriodActionPlanItemDto;
    return await this.periodActionPlanItemsRepo.update({
      where: { id: periodActionPlanItemId },
      data: {
        task: task,
        assignee: assignee,
        dueDate: dueDate,
        reason: reason,
        instructions: instructions,
        notes: notes,
        sequenceNumber: sequenceNumber,
        actionPlanId: actionPlanId,
        finishedAt: finishedAt,
        isFinished: isFinished,
      },
    });
  }

  async remove(periodActionPlanItemId: string) {
    return await this.periodActionPlanItemsRepo.remove({
      where: { id: periodActionPlanItemId },
    });
  }

  async deleteManyByActionPlanId(periodActionPlanId: string) {
    return await this.periodActionPlanItemsRepo.deleteMany({
      where: {
        actionPlanId: periodActionPlanId,
      },
    });
  }
}
