import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePeriodActionPlanDto } from './dto/create-period-action-plan.dto';
import { UpdatePeriodActionPlanDto } from './dto/update-period-action-plan.dto';
import { PeriodActionPlansRepository } from 'src/shared/database/repositories/periodActionPlans.repositories';
import { PeriodActionPlanItemsService } from '../period-action-plan-items/period-action-plan-items.service';

@Injectable()
export class PeriodActionPlansService {
  constructor(
    private readonly periodActionPlansRepo: PeriodActionPlansRepository,
    private readonly periodActionPlanItemsService: PeriodActionPlanItemsService,
  ) {}

  async create(
    userId: string,
    createPeriodActionPlanDto: CreatePeriodActionPlanDto,
  ) {
    const periodActionPlanExists = await this.periodActionPlansRepo.findFirst({
      where: {
        periodId: createPeriodActionPlanDto.periodId,
      },
    });

    if (periodActionPlanExists) {
      throw new ConflictException(
        'Já existe um plano de ação para o período selecionado!',
      );
    }

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
        rigId: createPeriodActionPlanDto.rigId,
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
        rig: {},
        period: {
          include: {
            well: {},
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
        rig: {},
        period: {
          include: {
            well: {},
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

    await this.periodActionPlanItemsService.deleteManyByActionPlanId(
      periodActionPlanId,
    );

    const updatedPeriodActionPlanItems = periodActionPlanItems.map(
      ({
        assignee,
        dueDate,
        instructions,
        notes,
        reason,
        sequenceNumber,
        task,
        finishedAt,
        isFinished,
      }) => ({
        assignee,
        task,
        dueDate,
        instructions,
        notes,
        reason,
        sequenceNumber,
        actionPlanId: periodActionPlanId,
        finishedAt,
        isFinished,
      }),
    );

    await this.periodActionPlanItemsService.createMany(
      updatedPeriodActionPlanItems,
    );

    return await this.periodActionPlansRepo.update({
      where: { id: periodActionPlanId },
      data: {
        title: title,
        periodId: periodId,
        finishedAt: finishedAt,
        isFinished: isFinished,
      },
    });
  }

  async remove(periodActionPlanId: string) {
    return await this.periodActionPlansRepo.remove({
      where: { id: periodActionPlanId },
    });
  }
}
