import { Module } from '@nestjs/common';
import { OccurrenceActionsService } from './occurrence-actions.service';
import { OccurrenceActionsController } from './occurrence-actions.controller';
import { FileService } from '../file/file.service';

@Module({
  controllers: [OccurrenceActionsController],
  providers: [OccurrenceActionsService, FileService],
})
export class OccurrenceActionsModule {}
