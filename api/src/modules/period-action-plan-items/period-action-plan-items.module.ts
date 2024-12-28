import { Module } from '@nestjs/common';
import { PeriodActionPlanItemsService } from './period-action-plan-items.service';
import { PeriodActionPlanItemsController } from './period-action-plan-items.controller';

@Module({
  controllers: [PeriodActionPlanItemsController],
  providers: [PeriodActionPlanItemsService],
})
export class PeriodActionPlanItemsModule {}
