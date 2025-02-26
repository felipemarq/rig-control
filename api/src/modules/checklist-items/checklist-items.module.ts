import { Module } from '@nestjs/common';
import { ChecklistItemsService } from './checklist-items.service';
import { ChecklistItemsController } from './checklist-items.controller';

@Module({
  controllers: [ChecklistItemsController],
  providers: [ChecklistItemsService],
})
export class ChecklistItemsModule {}
