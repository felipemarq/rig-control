import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChecklistItemsService } from './checklist-items.service';
import { CreateChecklistItemDto } from './dto/create-checklist-item.dto';
import { UpdateChecklistItemDto } from './dto/update-checklist-item.dto';

@Controller('checklist-items')
export class ChecklistItemsController {
  constructor(private readonly checklistItemsService: ChecklistItemsService) {}

  @Post()
  create(@Body() createChecklistItemDto: CreateChecklistItemDto) {
    return this.checklistItemsService.create(createChecklistItemDto);
  }

  @Get()
  findAll() {
    return this.checklistItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checklistItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecklistItemDto: UpdateChecklistItemDto) {
    return this.checklistItemsService.update(+id, updateChecklistItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistItemsService.remove(+id);
  }
}
