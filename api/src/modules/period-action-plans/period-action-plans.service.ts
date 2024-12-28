import { Injectable } from '@nestjs/common';
import { CreatePeriodActionPlanDto } from './dto/create-period-action-plan.dto';
import { UpdatePeriodActionPlanDto } from './dto/update-period-action-plan.dto';
import { PeriodActionPlansRepository } from 'src/shared/database/repositories/periodActionPlans.repositories';

@Injectable()
export class PeriodActionPlansService {
  constructor(
    private readonly periodActionPlansRepo: PeriodActionPlansRepository,
  ) {}

  async create(
    userId: string,
    createPeriodActionPlanDto: CreatePeriodActionPlanDto,
  ) {
    const periodActionPlanItems =
      createPeriodActionPlanDto.periodActionPlanItems.map(
        ({
          assignee,
          dueDate,
          instructions,
          notes,
          reason,
          sequenceNumber,
          task,
        }) => ({
          assignee,
          task,
          dueDate,
          instructions,
          notes,
          reason,
          sequenceNumber,
        }),
      );

    return await this.periodActionPlansRepo.create({
      data: {
        title: createPeriodActionPlanDto.title,
        periodId: createPeriodActionPlanDto.periodId,
        userId,
        periodActionPlanItems: {
          createMany: {
            data: periodActionPlanItems,
          },
        },
      },
    });
  }

  async findMany() {
    return await this.periodActionPlansRepo.findMany({
      include: {
        periodActionPlanItems: {
          orderBy: {
            sequenceNumber: 'asc',
          },
        },
      },
    });
  }

  async findOne(periodActionPlanId: string) {
    return await this.periodActionPlansRepo.findUnique({
      where: {
        id: periodActionPlanId,
      },
      include: {
        periodActionPlanItems: {
          orderBy: {
            sequenceNumber: 'asc',
          },
        },
      },
    });
  }

  async update(
    periodActionPlanId: string,
    updatePeriodActionPlanDto: UpdatePeriodActionPlanDto,
  ) {
    const { periodActionPlanItems, periodId, title, finishedAt, isFinished } =
      updatePeriodActionPlanDto;
    return await this.periodActionPlansRepo.update({
      where: { id: periodActionPlanId },
      data: {
        title: title,
        periodId: periodId,
        finishedAt: finishedAt,
        isFinished: isFinished,
        periodActionPlanItems: {
          updateMany: {
            where: {
              actionPlanId: periodActionPlanId,
            },
            data: periodActionPlanItems,
          },
        },
      },
    });
  }

  async remove(periodActionPlanId: string) {
    return await this.periodActionPlansRepo.remove({
      where: { id: periodActionPlanId },
    });
  }
}
