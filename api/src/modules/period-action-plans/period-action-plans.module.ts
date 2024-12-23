import { Module } from '@nestjs/common';
import { PeriodActionPlansService } from './period-action-plans.service';
import { PeriodActionPlansController } from './period-action-plans.controller';

@Module({
  controllers: [PeriodActionPlansController],
  providers: [PeriodActionPlansService],
})
export class PeriodActionPlansModule {}
