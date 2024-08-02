import { Module } from '@nestjs/common';
import { OccurrenceActionsService } from './occurrence-actions.service';
import { OccurrenceActionsController } from './occurrence-actions.controller';

@Module({
  controllers: [OccurrenceActionsController],
  providers: [OccurrenceActionsService],
})
export class OccurrenceActionsModule {}
