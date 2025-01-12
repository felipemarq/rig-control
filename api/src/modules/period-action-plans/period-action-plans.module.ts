import { Module } from '@nestjs/common';
import { PeriodActionPlansService } from './period-action-plans.service';
import { PeriodActionPlansController } from './period-action-plans.controller';
import { PeriodActionPlanItemsService } from '../period-action-plan-items/period-action-plan-items.service';
import { FileService } from '../file/file.service';
import { PeriodsService } from '../periods/periods.service';

@Module({
  controllers: [PeriodActionPlansController],
  providers: [
    PeriodActionPlansService,
    PeriodActionPlanItemsService,
    FileService,
    PeriodsService,
  ],
})
export class PeriodActionPlansModule {}
