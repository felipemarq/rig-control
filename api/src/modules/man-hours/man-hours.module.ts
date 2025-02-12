import { Module } from '@nestjs/common';
import { ManHoursService } from './man-hours.service';
import { ManHoursController } from './man-hours.controller';

@Module({
  controllers: [ManHoursController],
  providers: [ManHoursService],
})
export class ManHoursModule {}
