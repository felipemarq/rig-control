import { Module } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistsController } from './checklists.controller';
import { FileService } from '../file/file.service';

@Module({
  controllers: [ChecklistsController],
  providers: [ChecklistsService, FileService],
})
export class ChecklistsModule {}
