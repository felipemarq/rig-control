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
    return await this.periodActionPlansRepo.create({
      data: {
        title: createPeriodActionPlanDto.title,
        periodId: createPeriodActionPlanDto.periodId,
        userId,
      },
    });
  }

  findAll() {
    return `This action returns all periodActionPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} periodActionPlan`;
  }

  async update(
    periodActionPlanId: string,
    updatePeriodActionPlanDto: UpdatePeriodActionPlanDto,
  ) {
    return await this.periodActionPlansRepo.update({
      where: { id: periodActionPlanId },
      data: {
        title: updatePeriodActionPlanDto.title,
        periodId: updatePeriodActionPlanDto.periodId,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} periodActionPlan`;
  }
}
