import { Module } from '@nestjs/common';
import { PeriodActionPlansService } from './period-action-plans.service';
import { PeriodActionPlansController } from './period-action-plans.controller';
import { PeriodActionPlanItemsService } from '../period-action-plan-items/period-action-plan-items.service';

@Module({
  controllers: [PeriodActionPlansController],
  providers: [PeriodActionPlansService, PeriodActionPlanItemsService],
})
export class PeriodActionPlansModule {}
